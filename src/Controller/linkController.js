const express = require('express');
const router = express.Router();
const { executeQuery } = require('../database');

const getLink = async (req, res) => {
    try {
        const query = 'SELECT * FROM link';
        const linkData = await executeQuery(query);

        res.status(200).json({
            result: 1,
            message: 'Get link successfully',
            data: linkData,
        });
    } catch (error) {
        console.error('Error fetching link:', error);
        res.status(500).json({
            result: 0,
            message: 'Error fetching link',
            error: error.message,
        });
    }
};

const getLinkById = async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM link WHERE id = ?';
        const linkData = await executeQuery(query, [id]);

        if (linkData.length === 0) {
            return res.status(404).json({
                result: 3,
                message: 'link not found',
                data: [],
            });
        }

        res.status(200).json({
            result: 1,
            message: 'Get link successfully',
            data: linkData[0],
        });
    } catch (error) {
        console.error('Error fetching link:', error);
        res.status(500).json({
            result: 0,
            message: 'Error fetching link',
            error: error.message,
        });
    }
};

const createLink = async (req, res) => {
    try {
        const { profileid, link } = req.body;

        const query = 'INSERT INTO link SET ?';
        const params = { profileid, link };
        await executeQuery(query, params);

        res.status(200).json({
            result: 1,
            message: 'Create link successfully',
            data: { profileid, link },
        });
    } catch (error) {
        res.status(500).json({
            result: 0,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

const deleteLink = async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM link WHERE id = ?';
        await executeQuery(query, [id]);
        res.status(200).json({
            result: 1,
            message: 'Delete link successfully',
            data: { id },
        });
    } catch (error) {
        console.error('Error deleting link:', error);
        res.status(500).json({
            result: 0,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

const updateLink = async (req, res) => {
    try {
        const { id } = req.params;
        const { profileid, link } = req.body;
        const query = 'UPDATE link SET profileid = ?, link = ? WHERE id = ?';
        const params = [profileid, link, id];
        await executeQuery(query, params);
        res.status(200).json({
            result: 1,
            message: 'Update profile successfully',
            data: { id, profileid, link },
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
    getLink, getLinkById, createLink, deleteLink, updateLink
};