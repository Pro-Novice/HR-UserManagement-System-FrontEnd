const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
}
module.exports = UserService;