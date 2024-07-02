const { executeQuery } = require('../database');
const { generateToken } = require('../auth');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {

        let idapi = 22;
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

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                result: 2,
                message: 'Missing required fields: email or password',
                data: [],
            });
        }

        const query = 'SELECT * FROM account WHERE email = ?';
        const params = [email];
        const users = await executeQuery(query, params);

        if (users.length === 0) {
            return res.status(404).json({
                result: 3,
                message: 'User not found',
                data: [],
            });
        }

        const foundUser = users[0];

        const passwordMatch = await bcrypt.compare(password, foundUser.password);
        if (!passwordMatch) {
            return res.status(401).json({
                result: 4,
                message: 'Wrong password',
                data: [],
            });
        }

        const token = generateToken(foundUser);

        const checkTokenQuery = 'SELECT * FROM token WHERE accountid = ?';
        const checkTokenParams = [foundUser.id];
        const existingTokens = await executeQuery(checkTokenQuery, checkTokenParams);

        if (existingTokens.length > 0) {
            const updateTokenQuery = 'UPDATE token SET token = ?, status = 1 WHERE accountid = ?';
            const updateTokenParams = [token, foundUser.id];
            await executeQuery(updateTokenQuery, updateTokenParams);
        } else {
            const insertTokenQuery = 'INSERT INTO token (accountid, token, status) VALUES (?, ?, 1)';
            const insertTokenParams = [foundUser.id, token];
            await executeQuery(insertTokenQuery, insertTokenParams);
        }

        return res.status(200).json({
            result: 1,
            message: 'Login successful',
            data: { user: foundUser, token },
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            result: 0,
            message: 'Error during login',
            error: error.message,
        });
    }
};

module.exports = {
    login,
};
