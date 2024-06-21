const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const secretKey = process.env.YOUR_SECRET_KEY;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.log('Error verifying token:', err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

const authenticateAdminToken = (req, res, next) => {
    authenticateToken(req, res, () => {
        if (req.user && req.user.role === "admin") {
            next();
        } else {
            return res.status(403).json({ error: 'Unauthorized' });
        }
    });
};

const authenticateBothTokens = (req, res, next) => {
    authenticateToken(req, res, () => {
        if (req.user && (req.user.role === "admin" || req.user.role === "user")) {
            next();
        } else {
            return res.status(403).json({ error: 'Unauthorized' });
        }
    });
};

const authenticateUserToken = (req, res, next) => {
    authenticateToken(req, res, () => {
        if (req.user && req.user.role === "user") {
            next();
        } else {
            return res.status(403).json({ error: 'Unauthorized' });
        }
    });
};

function generateToken(user) {
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
        secretKey
    );
    return token;
}

function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken,
    authenticateToken,
    authenticateAdminToken,
    authenticateBothTokens,
    authenticateUserToken
};
