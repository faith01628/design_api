const express = require('express');
const router = express.Router();
const { executeQuery } = require('../database');

const getBio = async (req, res) => {
    try {
        let idapi = 30;
        const getapi = 'SELECT * FROM api WHERE id = ?';
        const api = await executeQuery(getapi, [idapi]);
        if (api.length === 0) {
            return res.status(404).json({
                result: 3,
                message: 'API not found',
                data: [],
            });
        }

        const apiStatus = api[0].status.toString('hex');

        if (apiStatus === 'false') {
            return res.status(401).json({
                result: 0,
                message: 'API has been blocked',
                data: [],
            });
        } else {
            const updateAccessQuery = 'UPDATE api SET accesses = accesses + 1 WHERE id = ?';
            const updateAccessParams = [idapi];
            await executeQuery(updateAccessQuery, updateAccessParams);
        }

        const query = 'SELECT * FROM bio';
        const bioData = await executeQuery(query);

        res.status(200).json({
            result: 1,
            message: 'Get bio successfully',
            data: bioData,
        });

    } catch (error) {
        console.error('Error fetching bio:', error);
        res.status(500).json({
            result: 0,
            message: 'Error fetching bio',
            error: error.message,
        });
    }
};

const getBioById = async (req, res) => {
    try {

        let idapi = 31;
        const getapi = 'SELECT * FROM api WHERE id = ?';
        const api = await executeQuery(getapi, [idapi]);
        if (api.length === 0) {
            return res.status(404).json({
                result: 3,
                message: 'API not found',
                data: [],
            });
        }

        const apiStatus = api[0].status.toString('hex');

        if (apiStatus === 'false') {
            return res.status(401).json({
                result: 0,
                message: 'API has been blocked',
                data: [],
            });
        } else {
            const updateAccessQuery = 'UPDATE api SET accesses = accesses + 1 WHERE id = ?';
            const updateAccessParams = [idapi];
            await executeQuery(updateAccessQuery, updateAccessParams);
        }

        const { profileid } = req.body;
        const query = 'SELECT * FROM bio WHERE profileid = ?';
        const bioData = await executeQuery(query, [profileid]);

        if (bioData.length === 0) {
            return res.status(404).json({
                result: 3,
                message: 'bio not found',
                data: [],
            });
        }

        res.status(200).json({
            result: 1,
            message: 'Get bio successfully',
            data: bioData[0],
        });


    } catch (error) {
        console.error('Error fetching bio:', error);
        res.status(500).json({
            result: 0,
            message: 'Error fetching bio',
            error: error.message,
        });
    }
};

const createBio = async (req, res) => {
    try {

        let idapi = 32;
        const getapi = 'SELECT * FROM api WHERE id = ?';
        const api = await executeQuery(getapi, [idapi]);
        if (api.length === 0) {
            return res.status(404).json({
                result: 3,
                message: 'API not found',
                data: [],
            });
        }

        const apiStatus = api[0].status.toString('hex');

        if (apiStatus === 'false') {
            return res.status(401).json({
                result: 0,
                message: 'API has been blocked',
                data: [],
            });
        } else {
            const updateAccessQuery = 'UPDATE api SET accesses = accesses + 1 WHERE id = ?';
            const updateAccessParams = [idapi];
            await executeQuery(updateAccessQuery, updateAccessParams);
        }

        const { imgbio } = req.files;

        const { title } = req.body;
        const imgbioPath = imgbio ? imgbio[0].path : null;

        const query = 'INSERT INTO bio (title, imgbio, hotbio) VALUES (?, ?, ?)';
        const params = [title, imgbioPath, 'false'];
        await executeQuery(query, params);

        res.status(200).json({
            result: 1,
            message: 'Create bio successfully',
            data: { title, imgbio, hotbio: 'false' },
        });

    } catch (error) {
        res.status(500).json({
            result: 0,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

const deleteBio = async (req, res) => {
    try {

        let idapi = 33;
        const getapi = 'SELECT * FROM api WHERE id = ?';
        const api = await executeQuery(getapi, [idapi]);
        if (api.length === 0) {
            return res.status(404).json({
                result: 3,
                message: 'API not found',
                data: [],
            });
        }

        const apiStatus = api[0].status.toString('hex');

        if (apiStatus === 'false') {
            return res.status(401).json({
                result: 0,
                message: 'API has been blocked',
                data: [],
            });
        } else {
            const updateAccessQuery = 'UPDATE api SET accesses = accesses + 1 WHERE id = ?';
            const updateAccessParams = [idapi];
            await executeQuery(updateAccessQuery, updateAccessParams);
        }

        const { id } = req.params;
        const query = 'DELETE FROM bio WHERE id = ?';
        await executeQuery(query, [id]);
        res.status(200).json({
            result: 1,
            message: 'Delete bio successfully',
            data: { id },
        });

    } catch (error) {
        console.error('Error deleting bio:', error);
        res.status(500).json({
            result: 0,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

const updateBio = async (req, res) => {
    try {

        let idapi = 34;
        const getapi = 'SELECT * FROM api WHERE id = ?';
        const api = await executeQuery(getapi, [idapi]);
        if (api.length === 0) {
            return res.status(404).json({
                result: 3,
                message: 'API not found',
                data: [],
            });
        }

        const apiStatus = api[0].status.toString('hex');

        if (apiStatus === 'false') {
            return res.status(401).json({
                result: 0,
                message: 'API has been blocked',
                data: [],
            });
        } else {
            const updateAccessQuery = 'UPDATE api SET accesses = accesses + 1 WHERE id = ?';
            const updateAccessParams = [idapi];
            await executeQuery(updateAccessQuery, updateAccessParams);
        }

        const { id } = req.params;
        const { imgbio } = req.files;

        const { title, hotbio } = req.body;

        const imgbioPath = imgbio ? imgbio[0].path : null;


        const query = 'UPDATE bio SET title = ?, imgbio = ?, hotbio = ? WHERE id = ?';
        const params = [title, imgbioPath, hotbio, id];
        await executeQuery(query, params);
        res.status(200).json({
            result: 1,
            message: 'Update profile successfully',
            data: { id, title, imgbio, hotbio },
        });

    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({
            result: 0,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

module.exports = {
    getBio, getBioById, createBio, deleteBio, updateBio
};