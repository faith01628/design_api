const { executeQuery } = require('../database');
const { generateToken } = require('../auth');
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                result: 2,
                message: 'Missing required fields: email or password',
            });
        }

        const query = 'SELECT * FROM account WHERE email = ?';
        const params = [email];
        const users = await executeQuery(query, params);

        if (users.length === 0) {
            return res.status(404).json({
                result: 3,
                message: 'User not found',
            });
        }

        // console.log(users);

        const foundUser = users[0];

        if (foundUser.password !== password) {
            return res.status(401).json({
                result: 4,
                message: 'Wrong password',
            });
        }

        const token = generateToken(foundUser);
        // await saveOrUpdateToken(foundUser.id, token);

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
