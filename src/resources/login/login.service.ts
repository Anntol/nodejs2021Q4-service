import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import config from '../../common/config';
import UnauthorizedError from '../../errors/UnauthorizedError';
import { getByLogin } from '../users/user.pg.repository';

export const signin = async (login: string, password: string) => {
    const user = await getByLogin(login);

    if (!bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedError('Password incorrect!');
    }

    const tokenInfo = {
        id: user.id,
        login: user.login
    }

    if (!config.JWT_SECRET_KEY) {
        throw new Error('JWT_SECRET_KEY is missing');
    }
    return jwt.sign(tokenInfo, config.JWT_SECRET_KEY );
}
