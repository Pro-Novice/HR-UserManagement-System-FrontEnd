const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({
            msg: 'Not authorized'
        });
    }

    try {

        const token = authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : authHeader;

        const decoded = jwt.verify(
            token,
            process.env.jwtSecret
        );

        req.user = decoded.employee;

        next();

    } catch (err) {

        return res.status(401).json({
            msg: 'Token is not valid'
        });

    }
};