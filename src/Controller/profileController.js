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
        const { accountid } = req.headers; // Retrieve accountid from headers
        // console.log('accountid:', accountid); // Check if accountid is received

        const query = 'SELECT * FROM profile WHERE accountid = ?';
        const profileData = await executeQuery(query, [accountid]);

        if (profileData.length === 0) {
            return res.status(404).json({
                result: 3,
                message: 'Profile not found',
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
        const { avata, backgroundavata, background } = req.files;
        const { accountid, fullname, phone, address, bod, introduce, herfid, profileid } = req.body;

        const avataPath = avata ? avata[0].path : null;
        const backgroundPath = background ? background[0].path : null;
        const backgroundavataPath = backgroundavata ? backgroundavata[0].path : null;

        const queryCheck = 'SELECT * FROM profile WHERE herfid = ?';
        const profileData = await executeQuery(queryCheck, [herfid]);
        if (profileData.length > 0) {
            return res.status(400).json({
                result: 2,
                message: 'herfid already exists',
                data: [],
            });
        }

        const queryCheck2 = 'SELECT * FROM profile WHERE profileid = ?';
        const profileData2 = await executeQuery(queryCheck2, [profileid]);
        if (profileData2.length > 0) {
            return res.status(400).json({
                result: 2,
                message: 'profileid already exists',
                data: [],
            });
        }

        const query = 'INSERT INTO profile SET ?';
        const params = { accountid, avata: avataPath, backgroundavata: backgroundavataPath, background: backgroundPath, fullname, phone, address, bod, introduce, herfid, profileid };
        await executeQuery(query, params);

        res.status(200).json({
            result: 1,
            message: 'Create profile user successfully',
            data: { accountid, avata, backgroundavata, background, fullname, phone, address, bod, introduce, herfid, profileid },
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
        const { avata, background, backgroundavata } = req.files;
        const { accountId, fullname, phone, address, bod, introduce, herfid, profileid } = req.body;

        const queryCheck = 'SELECT * FROM profile WHERE herfid = ?';
        const profileData = await executeQuery(queryCheck, [herfid]);
        if (profileData.length > 0) {
            return res.status(400).json({
                result: 2,
                message: 'herfid already exists',
                data: [],
            });
        }

        const queryCheck2 = 'SELECT * FROM profile WHERE profileid = ?';
        const profileData2 = await executeQuery(queryCheck2, [profileid]);
        if (profileData2.length > 0) {
            return res.status(400).json({
                result: 2,
                message: 'profileid already exists',
                data: [],
            });
        }

        const avataPath = avata ? avata[0].path : null;
        const backgroundPath = background ? background[0].path : null;
        const backgroundavataPath = backgroundavata ? backgroundavata[0].path : null;

        const query = 'UPDATE profile SET accountId = ?, avata = ?, backgroundavata = ?, background = ?, fullname = ?, bod = ?, introduce = ? herfid=? profileid=? WHERE id = ?';
        const params = [accountId, avataPath, backgroundPath, backgroundavataPath, fullname, phone, address, bod, introduce, herfid, profileid, id];
        await executeQuery(query, params);
        res.status(200).json({
            result: 1,
            message: 'Update profile successfully',
            data: { id, accountId, avata, background, fullname, phone, address, bod, introduce, herfid, profileid },
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
