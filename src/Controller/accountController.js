const express = require('express');
const router = express.Router();
const { executeQuery } = require('../database');

const getUserData = async (req, res) => {
    try {
        // const query = 'SELECT * FROM account';
        const query = 'SELECT account.id, account.username, account.password, account.email, account.role, info.fullname, info.avata, info.background, info.bod FROM account LEFT JOIN info ON account.id = info.accountId';
        const userData = await executeQuery(query);

        res.status(200).json({
            result: 1,
            message: 'Get user data successfully',
            data: userData,
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

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'SELECT account.id, account.username, account.password, account.email, account.role, info.fullname, info.avata, info.background, info.bod FROM account LEFT JOIN info ON account.id = info.accountId WHERE account.id = ?';
        const userData = await executeQuery(query, [id]);

        if (userData.length === 0) {
            return res.status(404).json({
                result: 3,
                message: 'User not found',
                data: [],
            });
        }

        res.status(200).json({
            result: 1,
            message: 'Get user data successfully',
            data: userData[0],
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

const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let { role } = req.body;

        role = "user";

        if (!username || !email || !password) {
            return res.status(400).json({
                result: 2,
                message: 'Missing required fields',
                data: [],
            });
        }

        const query = 'INSERT INTO account SET ?';
        const params = { username, email, password, role };
        await executeQuery(query, params);

        res.status(200).json({
            result: 1,
            message: 'Create user successfully',
            data: { username, email, password, role },
        });
    } catch (error) {
        res.status(500).json({
            result: 0,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM account WHERE id = ?';
        await executeQuery(query, [id]);
        res.status(200).json({
            result: 1,
            message: 'Delete user successfully',
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

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;
        const query = 'UPDATE account SET username = ?, email = ?, password = ? WHERE id = ?';
        const params = [username, email, password, id];
        await executeQuery(query, params);
        res.status(200).json({
            result: 1,
            message: 'Update user successfully',
            data: { id, username, email, password },
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

module.exports = { getUserData, createUser, deleteUser, getUserById, updateUser };
