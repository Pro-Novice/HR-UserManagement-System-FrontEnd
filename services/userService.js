const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const PDFDocument = require('pdfkit');
const Candidate = require('../models/Candidate');

class UserService {

    async createUser(candidateData, employeeId) {

    let candidate = await Candidate.findOne({
        email: candidateData.email
    });

    if(candidate){
        throw new Error('Candidate already exists');
    }

    candidate = new Candidate({

        ...candidateData,

        createdBy: employeeId

    });

    const salt = await bcrypt.genSalt(10);

    candidate.password =
        await bcrypt.hash(
            candidateData.password,
            salt
        );

    await candidate.save();

    return {

        success: true,

        candidate: {
            id: candidate._id,
            email: candidate.email,
            createdBy: employeeId
        }

    };
    }
    async getCandidatesByEmployee(employeeId) {

    const candidates = await Candidate.find({
        createdBy: employeeId
    })
    .select('-password')
    .populate('createdBy', 'fullname email');

    return candidates;
    }

    async updateUser(candidateId, updateData, employeeId) {
    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
        throw new Error('Candidate not found');
    }

    // ownership check
    if (candidate.createdBy.toString() !== employeeId) {
        throw new Error(
            'You are not authorized to update this candidate'
        );
    }

    Object.assign(candidate, updateData);

    const updatedCandidate =
        await candidate.save();

    return {

        success: true,

        message: 'Candidate updated successfully',

        candidate: updatedCandidate

    };
}

    async deleteUser(candidateId, employeeId) {
        // const candidate = await Candidate.findById(candidateId).deleteOne();
        const candidate = await Candidate.where({ _id: candidateId }).where({ createdBy: employeeId }).findOneAndDelete();
        if (!candidate) {
            throw new Error('Candidate not found');
        }

        // if (!candidate) {
        //     throw new Error('Candidate not found');
        // }

        // // ownership check
        // if (candidate.createdBy.toString() !== employeeId) {
        //     throw new Error(
        //         'You are not authorized to delete this candidate'
        //     );
        // }

        // await candidate.delete();

        return {
            success: true,
            message: 'Candidate deleted successfully'
        };
    }

    async exportCandidatesPdf(employeeId, res) {

    const candidates =
        await Candidate.find({
            createdBy: employeeId
        });

    const doc = new PDFDocument();

    res.setHeader(
        'Content-Type',
        'application/pdf'
    );

    res.setHeader(
        'Content-Disposition',
        'attachment; filename=candidates.pdf'
    );

    doc.pipe(res);

    doc
        .fontSize(20)
        .text('Candidate Report', {
            align: 'center'
        });

    doc.moveDown();

    candidates.forEach((candidate, index) => {

        doc
            .fontSize(12)
            .text(
                `${index + 1}. ${candidate.firstname} ${candidate.lastname}`
            );

        doc.text(
            `Email: ${candidate.email}`
        );

        doc.text(
            `Phone: ${candidate.phone}`
        );

        doc.text(
            `Gender: ${candidate.gender}`
        );

        doc.text(
            `DOB: ${candidate.dob}`
        );

        doc.moveDown();

    });

    doc.end();
}

}
module.exports = UserService;