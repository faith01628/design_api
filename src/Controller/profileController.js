const express = require('express');
const router = express.Router();
const { executeQuery } = require('../database');

const getProfileData = async (req, res) => {
    try {

        let idapi = 11;
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

        let idapi = 12;
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

        let idapi = 13;
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

        const { avata, backgroundavata, background } = req.files;
        const { fullname, phone, address, bod, introduce, herfid, profileid } = req.body;
        const { accountid } = req.headers;

        const avataPath = avata ? avata[0].path : null;
        const backgroundPath = background ? background[0].path : null;
        const backgroundavataPath = backgroundavata ? backgroundavata[0].path : null;

        const queryCheck3 = 'SELECT * FROM profile WHERE accountid = ?';
        const profileData3 = await executeQuery(queryCheck3, [accountid]);
        if (profileData3.length > 0) {
            return res.status(400).json({
                result: 2,
                message: 'Profile already exists',
                data: [],
            });
        }

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

        let idapi = 14;
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

        let idapi = 15;
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
        const { avata, background, backgroundavata } = req.files;
        const { accountid, fullname, phone, address, bod, introduce, herfid, profileid } = req.body;

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

        // Fetch current profile data
        const currentProfileQuery = 'SELECT * FROM profile WHERE id = ?';
        const currentProfile = await executeQuery(currentProfileQuery, [id]);
        if (currentProfile.length === 0) {
            return res.status(404).json({
                result: 0,
                message: 'Profile not found',
                data: [],
            });
        }

        // Determine which fields to update
        let updateFields = [];
        let updateValues = [];

        if (accountid) {
            updateFields.push('accountid = ?');
            updateValues.push(accountid);
        }
        if (fullname) {
            updateFields.push('fullname = ?');
            updateValues.push(fullname);
        }
        if (phone) {
            updateFields.push('phone = ?');
            updateValues.push(phone);
        }
        if (address) {
            updateFields.push('address = ?');
            updateValues.push(address);
        }
        if (bod) {
            updateFields.push('bod = ?');
            updateValues.push(bod);
        }
        if (introduce) {
            updateFields.push('introduce = ?');
            updateValues.push(introduce);
        }
        if (herfid) {
            updateFields.push('herfid = ?');
            updateValues.push(herfid);
        }
        if (profileid) {
            updateFields.push('profileid = ?');
            updateValues.push(profileid);
        }
        if (avata && avata[0].path !== currentProfile[0].avata) {
            updateFields.push('avata = ?');
            updateValues.push(avata[0].path);
        }
        if (background && background[0].path !== currentProfile[0].background) {
            updateFields.push('background = ?');
            updateValues.push(background[0].path);
        }
        if (backgroundavata && backgroundavata[0].path !== currentProfile[0].backgroundavata) {
            updateFields.push('backgroundavata = ?');
            updateValues.push(backgroundavata[0].path);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({
                result: 0,
                message: 'No changes detected',
                data: [],
            });
        }

        const query = `UPDATE profile SET ${updateFields.join(', ')} WHERE id = ?`;
        updateValues.push(id);

        console.log('Executing query with params:', query, updateValues);
        const result = await executeQuery(query, updateValues);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                result: 0,
                message: 'Profile not found or no changes made',
                data: [],
            });
        }

        res.status(200).json({
            result: 1,
            message: 'Update profile successfully',
            data: { id, accountid, avata: avata ? avata[0].path : currentProfile[0].avata, background: background ? background[0].path : currentProfile[0].background, backgroundavata: backgroundavata ? backgroundavata[0].path : currentProfile[0].backgroundavata, fullname, phone, address, bod, introduce, herfid, profileid },
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
