const redisClient = require('../libs/redis');

const checkRole = (requiredRole) => {
    return async (req, res, next) => {
        try {
            const accessToken = req.headers.authorization;

            if (!accessToken) {
                return res.status(403).json({ message: 'Access token is required' });
            }

            const userDataString = await redisClient.get(accessToken);
            if (!userDataString) {
                return res.status(403).json({ message: 'Invalid access token' });
            }

            const userData = JSON.parse(userDataString);

            if (userData.role !== requiredRole) {
                return res.status(403).json({ message: 'Access denied' });
            }

            req.user = userData;
            next();
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };
};

const isNotSupport = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization;

        if (!accessToken) {
            return res.status(403).json({ message: 'Access token is required' });
        }

        const userDataString = await redisClient.get(accessToken);
        if (!userDataString) {
            return res.status(403).json({ message: 'Invalid access token' });
        }

        const userData = JSON.parse(userDataString);

        if (userData.role === 'support') {
            return res.status(403).json({ message: 'Access denied for support role' });
        }

        req.user = userData;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    isAdmin: checkRole('admin'),
    isSupport: checkRole('support'),
    isFinance: checkRole('finance'),
    isUser: checkRole('user'),
    isNotSupport
};