const express = require('express');
const router = express.Router();
const { executeQuery } = require('../database');

// Function to fetch images
const getImg = async (req, res) => {
    try {
        const query = 'SELECT * FROM img';
        const imgData = await executeQuery(query);

        res.status(200).json({
            result: 1,
            message: 'Get img successfully',
            data: imgData,
        });
    } catch (error) {
        console.error('Error fetching img:', error);
        res.status(500).json({
            result: 0,
            message: 'Error fetching img',
            error: error.message,
        });
    }
};

// Function to create a new image entry
const create = async (req, res) => {

    try {
        if (!req.file) {
            return res.status(400).json({
                result: 2,
                message: 'No file uploaded',
                data: [],
            });
        }

        const imgPath = req.file.path;
        console.log('imgPath:', imgPath);

        const query = 'INSERT INTO img (img) VALUES (?)';
        const params = [imgPath];
        await executeQuery(query, params);

        res.status(200).json({
            result: 1,
            message: 'Create img successfully',
            data: { img: imgPath },
        });
    } catch (error) {
        res.status(500).json({
            result: 0,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

module.exports = { getImg, create };