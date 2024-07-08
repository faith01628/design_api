const express = require('express');
const router = express.Router();
const { executeQuery } = require('../database');

const getContent = async (req, res) => {
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

        const query = 'SELECT * FROM contentbio';
        const contentData = await executeQuery(query);

        res.status(200).json({
            result: 1,
            message: 'Get content successfully',
            data: contentData,
        });

    } catch (error) {
        console.error('Error fetching content:', error);
        res.status(500).json({
            result: 0,
            message: 'Error fetching content',
            error: error.message,
        });
    }
};

const getContentById = async (req, res) => {
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
        const query = 'SELECT * FROM contentbio WHERE profileid = ?';
        const contentData = await executeQuery(query, [profileid]);

        if (contentData.length === 0) {
            return res.status(404).json({
                result: 3,
                message: 'content not found',
                data: [],
            });
        }

        res.status(200).json({
            result: 1,
            message: 'Get content successfully',
            data: contentData[0],
        });


    } catch (error) {
        console.error('Error fetching content:', error);
        res.status(500).json({
            result: 0,
            message: 'Error fetching content',
            error: error.message,
        });
    }
};

const createContent = async (req, res) => {
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

        const { imgcontent } = req.files;

        const { title } = req.body;
        const imgcontentPath = imgcontent ? imgcontent[0].path : null;

        const query = 'INSERT INTO contentbio (title, imgcontent, hotcontent) VALUES (?, ?, ?)';
        const params = [title, imgcontentPath, 'false'];
        await executeQuery(query, params);

        res.status(200).json({
            result: 1,
            message: 'Create content successfully',
            data: { title, imgcontent, hotcontent: 'false' },
        });

    } catch (error) {
        res.status(500).json({
            result: 0,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

const deleteContent = async (req, res) => {
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
        const query = 'DELETE FROM contentbio WHERE id = ?';
        await executeQuery(query, [id]);
        res.status(200).json({
            result: 1,
            message: 'Delete content successfully',
            data: { id },
        });

    } catch (error) {
        console.error('Error deleting content:', error);
        res.status(500).json({
            result: 0,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

const updateContent = async (req, res) => {
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
        const { imgcontent } = req.files;

        const { title, hotcontent } = req.body;

        const imgcontentPath = imgcontent ? imgcontent[0].path : null;


        const query = 'UPDATE contentbio SET title = ?, imgcontent = ?, hotcontent = ? WHERE id = ?';
        const params = [title, imgcontentPath, hotcontent, id];
        await executeQuery(query, params);
        res.status(200).json({
            result: 1,
            message: 'Update profile successfully',
            data: { id, title, imgcontent, hotcontent },
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
    getContent, getContentById, createContent, deleteContent, updateContent
};