import jwt from 'jsonwebtoken';

import { secret } from '../config';

const verify = (token) =>
    new Promise((resolve, reject) => {
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                reject(err);
                return;
            }
            resolve(decoded);
        });
    });

const authenticate = async (ctx, next) => {
    if (ctx.originalUrl.match(/^\/application-form\/active/i) !== null) {
        await next();
    } else if (process.env.NODE_ENV === 'development') {
        ctx.state.jwt = {
            id: "--",
            type: "--",
            user: "DevelopmentTestUser",
            iat: 9999999999,
        };

        await next();
    }
    else {
        const token = ctx.cookies.get('jwt');
        try {
            const jwt = await verify(token);
            ctx.state.jwt = jwt;
        } catch (error) {
            ctx.throw(401);
        }
        await next();
    }
}/** */

export default authenticate;