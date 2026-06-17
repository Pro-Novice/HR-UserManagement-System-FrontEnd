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
}
module.exports = UserService;