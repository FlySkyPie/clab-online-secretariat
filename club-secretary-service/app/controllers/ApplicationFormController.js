import compose from 'koa-compose';
import { customRandom, urlAlphabet, random } from "nanoid";
import jwt from 'jsonwebtoken';

import { ApplicationForm } from "../../models";
import { secret } from '../config';

/**
 * For Internal Service.
 */

const randUrl = customRandom(urlAlphabet, 22, random);
const hostname = process.env.HOSTNAME;

const CreateRequestMiddleware = async (ctx, next) => {
    const request = ctx.request.body;
    switch (undefined) {
        case request.type:
            ctx.throw(400, "The type is missing.");
            break;
        case request.applicant:
            ctx.throw(400, "The applicant is missing.");
            break;
        default:
            await next();
            break;
    }
};

const createApplicationForm = async (ctx, next) => {
    const { type, applicant } = ctx.request.body;
    const result = await ApplicationForm.create({
        type,
        key: randUrl(),
        active: false,
        created_by: applicant,
    });

    ctx.body = {
        link: hostname + `/${result.key}`
    };
}

const create = compose([
    CreateRequestMiddleware,
    createApplicationForm
]);

/**
 * For External Service
 */

const activeApplicationForm = async (ctx, next) => {
    const { id } = ctx.params;
    const result = await ApplicationForm.findOne({
        where: { key: id, active: false, consumed_at: null }, // where 條件
    });

    if (result === null) {
        ctx.throw(404);
    }

    /*await result.update({
        active: true,
        consumed_at: Date.now(),
    });/** */

    const token = jwt.sign({
        id: result.id,
        type: result.type,
        user: result.created_by,
    }, secret, { algorithm: 'HS256', expiresIn: '1h' });

    ctx.cookies.set('jwt', token, { httpOnly: false, maxAge: 60 * 60 * 1000 });
    ctx.redirect('/');
}

const active = compose([
    activeApplicationForm
]);


export default {
    create,
    active
};