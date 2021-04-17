import compose from 'koa-compose';
import { customRandom, urlAlphabet, random } from "nanoid";
import jwt from 'jsonwebtoken';

import { ApplicationForm } from "../../models";
import { secret, hostname } from '../config';

/**
 * For Internal Service.
 */

const randUrl = customRandom(urlAlphabet, 22, random);

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
    const link = hostname + `/application-form/active/${result.key}`;

    ctx.body = {
        link
    };
}

const create = compose([
    CreateRequestMiddleware,
    createApplicationForm
]);

/**
 * For External Service
 */

const ApplicationFormExistMiddleware = async (ctx, next) => {
    const { id } = ctx.params;
    const result = await ApplicationForm.findOne({
        where: { key: id, active: false, consumed_at: null }, // where 條件
    });

    if (result === null) {
        ctx.throw(404);
    } else {
        ctx.state.applicationForm = result;
        await next();
    }
};

const ApplicationFormValidMiddleware = async (ctx, next) => {
    const { applicationForm } = ctx.state;
    const createdTimestamp = new Date(applicationForm.created_at).getTime();
    const expiredTimestamp = createdTimestamp + 60 * 60 * 1000;
    const currentTimestamp = Date.now();
    if (currentTimestamp <= expiredTimestamp) {
        ctx.state.timestamps = {
            createdTimestamp,
            expiredTimestamp,
            currentTimestamp,
            expiresIn: expiredTimestamp - currentTimestamp,
        };
        await next();
    } else {
        await applicationForm.update({
            active: false,
            consumed_at: Date.now(),
        });
        ctx.throw(401, 'The link are expired.');
    }
};

const activeApplicationForm = async (ctx, next) => {
    const { applicationForm, timestamps } = ctx.state;

    await applicationForm.update({
        active: true,
        consumed_at: timestamps.currentTimestamp,
    });/** */

    const token = jwt.sign({
        id: applicationForm.id,
        type: applicationForm.type,
        user: applicationForm.created_by,
        iat: Math.floor(timestamps.createdTimestamp / 1000),
    }, secret, { algorithm: 'HS256', expiresIn: "1hr" });

    ctx.cookies.set('jwt', token, { httpOnly: false, maxAge: timestamps.expiresIn });
    ctx.redirect('/');
}

const active = compose([
    ApplicationFormExistMiddleware,
    ApplicationFormValidMiddleware,
    activeApplicationForm
]);


export default {
    create,
    active
};