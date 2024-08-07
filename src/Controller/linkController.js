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
        const { profileid } = req.params;
        const query = 'SELECT * FROM link WHERE profileid = ?';
        const linkData = await executeQuery(query, [profileid]);

        if (linkData.length === 0) {
            return res.status(404).json({
                result: 3,
                message: 'Link not found',
                data: [],
            });
        }

        res.status(200).json({
            result: 1,
            message: 'Get links successfully',
            data: linkData, // Trả về tất cả các dòng dữ liệu thỏa mãn điều kiện profileid
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
        const { profileid, title, link, indexid } = req.body;

        const query = 'INSERT INTO link SET ?';
        const params = { profileid, title, link, indexid };
        await executeQuery(query, params);

        res.status(200).json({
            result: 1,
            message: 'Create link successfully',
            data: { profileid, title, link, indexid },
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
        const { profileid, title, link, indexid } = req.body;
        const query = 'UPDATE link SET profileid = ?, title = ?, link = ?, indexid = ? WHERE id = ?';
        const params = [profileid, title, link, indexid, id];
        await executeQuery(query, params);
        res.status(200).json({
            result: 1,
            message: 'Update profile successfully',
            data: { id, profileid, title, link, indexid },
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