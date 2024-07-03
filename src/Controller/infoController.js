const express = require('express');
const router = express.Router();
const { executeQuery } = require('../database');

const getInfoUserData = async (req, res) => {
    try {

        let idapi = 6;
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

        const query = 'SELECT * FROM info';
        const infoData = await executeQuery(query);

        res.status(200).json({
            result: 1,
            message: 'Get user data successfully',
            data: infoData,
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

const getInfoUserById = async (req, res) => {
    try {
        let idapi = 7;
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
        const query = 'SELECT * FROM info WHERE id = ?';
        const infoData = await executeQuery(query, [id]);

        if (infoData.length === 0) {
            return res.status(404).json({
                result: 3,
                message: 'User not found',
                data: [],
            });
        }

        res.status(200).json({
            result: 1,
            message: 'Get user data successfully',
            data: infoData[0],
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

const createInfoUser = async (req, res) => {
    try {
        let idapi = 8;
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

        const { avata, background } = req.files;
        const { accountId, fullname, bod } = req.body;

        const avataPath = avata ? avata[0].path : null;
        const backgroundPath = background ? background[0].path : null;

        const queryCheck3 = 'SELECT * FROM info WHERE accountid = ?';
        const profileData3 = await executeQuery(queryCheck3, [accountId]);
        if (profileData3.length > 0) {
            return res.status(400).json({
                result: 2,
                message: 'Profile already exists',
                data: [],
            });
        }

        const query = 'INSERT INTO info SET ?';
        const params = { accountId, fullname, avata: avataPath, background: backgroundPath, bod };
        await executeQuery(query, params);

        res.status(200).json({
            result: 1,
            message: 'Create info user successfully',
            data: { accountId, fullname, avata: avataPath, background: backgroundPath, bod },
        });

    } catch (error) {
        res.status(500).json({
            result: 0,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

const deleteinfoUser = async (req, res) => {
    try {
        let idapi = 9;
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
        const query = 'DELETE FROM info WHERE id = ?';
        await executeQuery(query, [id]);

        res.status(200).json({
            result: 1,
            message: 'Delete info user successfully',
            data: { id },
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            result: 0,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

const updateinfoUser = async (req, res) => {
    try {
        let idapi = 10;
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
        const { avata, background } = req.files;

        const avataPath = avata ? avata[0].path : null;
        const backgroundPath = background ? background[0].path : null;



        const { accountId, fullname, bod } = req.body;
        const query = 'UPDATE info SET accountId = ?, fullname = ?, avata = ?, background = ?, bod = ? WHERE id = ?';
        const params = [accountId, fullname, avataPath, backgroundPath, bod, id];
        await executeQuery(query, params);
        res.status(200).json({
            result: 1,
            message: 'Update info user successfully',
            data: { id, accountId, fullname, avata, background, bod },
        });


    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            result: 0,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

module.exports = {
    getInfoUserData, getInfoUserById, createInfoUser, deleteinfoUser, updateinfoUser
};
