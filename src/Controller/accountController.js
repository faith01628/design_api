const express = require('express');
const router = express.Router();
const { executeQuery } = require('../database');
const bcrypt = require('bcrypt');

const getUserData = async (req, res) => {
    try {

        let idapi = 1;
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

        if (apiStatus === '0000') {
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

        let idapi = 2;
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

        if (apiStatus === '0000') {
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

        let idapi = 5;
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

        if (apiStatus === '0000') {
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

        const queryemail = 'SELECT * FROM account WHERE email = ?';
        const paramsemail = [email];
        const users = await executeQuery(queryemail, paramsemail);

        if (users.length > 0) {
            return res.status(409).json({
                result: 3,
                message: 'Email already exists',
                data: [],
            });
        }

        const queryusername = 'SELECT * FROM account WHERE username = ?';
        const paramsusername = [username];
        const usernames = await executeQuery(queryusername, paramsusername);

        if (usernames.length > 0) {
            return res.status(409).json({
                result: 3,
                message: 'Username already exists',
                data: [],
            });
        }

        // Mã hóa mật khẩu
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const query = 'INSERT INTO account SET ?';
        const params = { username, email, password: hashedPassword, role };
        await executeQuery(query, params);


        res.status(200).json({
            result: 1,
            message: 'Create user successfully',
            data: { username, email, password, role },
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            result: 0,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        let idapi = 3;
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

        if (apiStatus === '0000') {
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
        const query = 'DELETE FROM account WHERE id = ?';
        await executeQuery(query, [id]);

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
        let idapi = 4;
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

        if (apiStatus === '0000') {
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
        const { username, email, password } = req.body;

        // Truy vấn thông tin hiện tại của người dùng
        const queryUser = 'SELECT * FROM account WHERE id = ?';
        const paramsUser = [id];
        const user = await executeQuery(queryUser, paramsUser);

        if (user.length === 0) {
            return res.status(404).json({
                result: 2,
                message: 'User not found',
                data: [],
            });
        }

        const currentUser = user[0];

        // Kiểm tra xem email hoặc username mới có khác với giá trị hiện tại không
        if (email && email !== currentUser.email) {
            const queryEmail = 'SELECT * FROM account WHERE email = ?';
            const paramsEmail = [email];
            const users = await executeQuery(queryEmail, paramsEmail);

            if (users.length > 0) {
                return res.status(409).json({
                    result: 3,
                    message: 'Email already exists',
                    data: [],
                });
            }
        }

        if (username && username !== currentUser.username) {
            const queryUsername = 'SELECT * FROM account WHERE username = ?';
            const paramsUsername = [username];
            const usernames = await executeQuery(queryUsername, paramsUsername);

            if (usernames.length > 0) {
                return res.status(409).json({
                    result: 3,
                    message: 'Username already exists',
                    data: [],
                });
            }
        }

        // Chỉ mã hóa mật khẩu nếu có mật khẩu mới được cung cấp
        let hashedPassword = currentUser.password;
        if (password) {
            const saltRounds = 10;
            hashedPassword = await bcrypt.hash(password, saltRounds);
        }

        // Tạo câu lệnh cập nhật động
        const updateFields = [];
        const updateParams = [];

        if (username && username !== currentUser.username) {
            updateFields.push('username = ?');
            updateParams.push(username);
        }

        if (email && email !== currentUser.email) {
            updateFields.push('email = ?');
            updateParams.push(email);
        }

        if (password) {
            updateFields.push('password = ?');
            updateParams.push(hashedPassword);
        }

        if (updateFields.length > 0) {
            const query = `UPDATE account SET ${updateFields.join(', ')} WHERE id = ?`;
            updateParams.push(id);
            await executeQuery(query, updateParams);
        }


        res.status(200).json({
            result: 1,
            message: 'Update user successfully',
            data: { id, username, password, email },
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
