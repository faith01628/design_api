const express = require('express');
const router = express.Router();
const { executeQuery } = require('../database');

const getProfileData = async (req, res) => {
    try {
        const query = 'SELECT * FROM profile';
        const profileData = await executeQuery(query);

        res.status(200).json({
            result: 1,
            message: 'Get profile data successfully',
            data: profileData,
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

const getProfileById = async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM profile WHERE id = ?';
        const profileData = await executeQuery(query, [id]);

        if (profileData.length === 0) {
            return res.status(404).json({
                result: 3,
                message: 'profile not found',
                data: [],
            });
        }

        res.status(200).json({
            result: 1,
            message: 'Get user profile successfully',
            data: profileData[0],
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

const createProfile = async (req, res) => {
    try {
        const { accountid, avata, background, fullname, introduce } = req.body;

        const query = 'INSERT INTO profile SET ?';
        const params = { accountid, avata, background, fullname, introduce };
        await executeQuery(query, params);

        res.status(200).json({
            result: 1,
            message: 'Create profile user successfully',
            data: { accountid, avata, background, fullname, introduce },
        });
    } catch (error) {
        res.status(500).json({
            result: 0,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM profile WHERE id = ?';
        await executeQuery(query, [id]);
        res.status(200).json({
            result: 1,
            message: 'Delete profile profile successfully',
            data: { id },
        });
    } catch (error) {
        console.error('Error deleting profile:', error);
        res.status(500).json({
            result: 0,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { accountId, avata, background, fullname, introduce } = req.body;
        const query = 'UPDATE profile SET accountId = ?, avata = ?, background = ?,, fullname = ? introduce = ? WHERE id = ?';
        const params = [accountId, avata, background, fullname, introduce, id];
        await executeQuery(query, params);
        res.status(200).json({
            result: 1,
            message: 'Update profile successfully',
            data: { id, accountId, avata, background, fullname, introduce },
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
    getProfileData, getProfileById, createProfile, deleteProfile, updateProfile
};
