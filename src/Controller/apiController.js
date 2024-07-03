const express = require('express');
const router = express.Router();
const { executeQuery } = require('../database');

const getApi = async (req, res) => {
    try {
        let idapi = 23;
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

        const query = 'SELECT * FROM api';
        const ApiData = await executeQuery(query);

        res.status(200).json({
            result: 1,
            message: 'Get Api successfully',
            data: ApiData,
        });
    } catch (error) {
        console.error('Error fetching Api:', error);
        res.status(500).json({
            result: 0,
            message: 'Error fetching Api',
            error: error.message,
        });
    }
};

const getApiById = async (req, res) => {
    try {
        let idapi = 24;
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
        const query = 'SELECT * FROM api WHERE id = ?';
        const ApiData = await executeQuery(query, [id]);

        if (ApiData.length === 0) {
            return res.status(404).json({
                result: 3,
                message: 'Api not found',
                data: [],
            });
        }

        res.status(200).json({
            result: 1,
            message: 'Get Api successfully',
            data: ApiData[0],
        });
    } catch (error) {
        console.error('Error fetching Api:', error);
        res.status(500).json({
            result: 0,
            message: 'Error fetching Api',
            error: error.message,
        });
    }
};

const createApi = async (req, res) => {
    try {
        let idapi = 25;
        const getapi = 'SELECT * FROM api WHERE id = ?';
        const apicheck = await executeQuery(getapi, [idapi]);
        if (apicheck.length === 0) {
            return res.status(404).json({
                result: 3,
                message: 'API not found',
                data: [],
            });
        }

        const apiStatus = apicheck[0].status.toString('hex');

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

        const { api, method } = req.body;
        const accesses = 0;
        const status = 'true';

        const query = 'INSERT INTO Api SET ?';
        const params = { api, method, accesses, status };
        await executeQuery(query, params);

        res.status(200).json({
            result: 1,
            message: 'Create Api successfully',
            data: { api, method, accesses, status },
        });
    } catch (error) {
        res.status(500).json({
            result: 0,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

const deleteApi = async (req, res) => {
    try {

        let idapi = 26;
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
        const query = 'DELETE FROM Api WHERE id = ?';
        await executeQuery(query, [id]);
        res.status(200).json({
            result: 1,
            message: 'Delete Api successfully',
            data: { id },
        });
    } catch (error) {
        console.error('Error deleting Api:', error);
        res.status(500).json({
            result: 0,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

const updateApi = async (req, res) => {
    try {

        let idapi = 27;
        const getapi = 'SELECT * FROM api WHERE id = ?';
        const apicheck = await executeQuery(getapi, [idapi]);
        if (apicheck.length === 0) {
            return res.status(404).json({
                result: 3,
                message: 'API not found',
                data: [],
            });
        }

        const apiStatus = apicheck[0].status.toString('hex');

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
        const { api, method, accesses, status } = req.body;
        const query = 'UPDATE Api SET api = ?, method = ?, accesses = ?, status = ? WHERE id = ?';
        const params = [api, method, accesses, status, id];
        await executeQuery(query, params);
        res.status(200).json({
            result: 1,
            message: 'Update profile successfully',
            data: { id, api, method, accesses, status },
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

const updateActiveOn = async (req, res) => {
    try {

        let idapi = 28;
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
        const status = "true";

        const query = 'UPDATE Api SET status = ? WHERE id = ?';
        await executeQuery(query, [status, id]);
        res.status(200).json({
            result: 1,
            message: 'Update profile successfully',
            data: { id, status },
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

const updateActiveOff = async (req, res) => {
    try {

        let idapi = 29;
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
        const status = "false";

        const query = 'UPDATE Api SET status = ? WHERE id = ?';
        await executeQuery(query, [status, id]);
        res.status(200).json({
            result: 1,
            message: 'Update profile successfully',
            data: { id, status },
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
    getApi, getApiById, createApi, deleteApi, updateApi, updateActiveOn, updateActiveOff
};