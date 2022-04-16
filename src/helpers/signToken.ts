import jwt from 'jsonwebtoken';
import config from '../config/config';
import Logging from '../library/Logging';
import IUser from '../interfaces/user';

const signToken = (user: IUser, callback: (error: Error | null, token: string | null) => void): void => {
    var timeSinceEpoch = new Date().getTime();
    var expirationTime = timeSinceEpoch + Number(config.token.expireTime) * 100000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    Logging.info(`Attempting to sign token for ${user.id}`);

    try {
        jwt.sign(
            {
                username: user.username
            },
            config.token.secret,
            {
                issuer: config.token.issuer,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds
            },
            (error, token) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    callback(null, token);
                }
            }
        );
    } catch (error) {
        Logging.error(error);
    }
};

export default signToken;
