const express = require('express');
const router = express.Router();
const { executeQuery } = require('../database');

const getUserData = async (req, res) => {
    try {
        const query = 'SELECT * FROM account';
        const userData = await executeQuery(query);

        res.status(200).json({
            result: 1,
            message: 'Get user data successfully',
            data: userData,
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({
            result: 0,
            message: 'Error fetching user data',
            error: error.message,
        });
    }
};

module.exports = { getUserData };
