const express = require('express');
const router = express.Router();
const { executeQuery } = require('../database');

const viewUser = async (req, res) => {
    try {
        const { id } = req.params;

        let query = '';
        let userData;
        let isHerfid = isNaN(id);

        if (isHerfid) {
            // id là herfid
            query = 'SELECT * FROM profile WHERE herfid = ?';
            userData = await executeQuery(query, [id]);
        } else {
            // id là profileid
            query = 'SELECT * FROM profile WHERE profileid = ?';
            userData = await executeQuery(query, [id]);
        }

        if (userData.length === 0) {
            return res.status(404).json({ result: 3, message: 'Profile not found', data: [] });
        }

        const profileId = userData[0].id;

        // Truy vấn để lấy tất cả profile có id trùng với id profile
        const profileQuery = 'SELECT * FROM profile WHERE id = ?';
        const profileData = await executeQuery(profileQuery, [profileId]);

        // Truy vấn để lấy tất cả link có profileid trùng với id profile
        const linkQuery = 'SELECT profileid, title, link, indexid FROM link WHERE profileid = ?';
        const linkData = await executeQuery(linkQuery, [profileId]);

        res.status(200).json({
            result: 1,
            message: 'Get user profile and links successfully',
            data: {
                profile: profileData,
                links: linkData,
            },
        });
    } catch (error) {
        console.error('Error fetching profile data:', error);
        res.status(500).json({
            result: 0,
            message: 'Error fetching profile data',
            error: error.message,
        });
    }
};

module.exports = { viewUser };
