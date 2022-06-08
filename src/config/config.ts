require('dotenv-flow').config();

const config = {
    mongo: {
        url: process.env.MONGO_URL || ''
    },
    server: {
        port: process.env.PORT || 4000
    },
    token: {
        expireTime: process.env.SERVER_TOKEN_EXPIRETIME || 3600,
        issuer: process.env.SERVER_TOKEN_ISSUER || 'coolIssuer',
        secret: process.env.SERVER_TOKEN_SECRET || 'superencryptedsecret'
    }
};

export default config;
