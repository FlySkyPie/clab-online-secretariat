import compose from 'koa-compose';
import { customRandom, urlAlphabet, random } from "nanoid";

import { ApplicationForm } from "../../models";

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

    ctx.body = {
        link: process.env.HOSTNAME + `/${result.key}`
    };
}

const create = compose([
    CreateRequestMiddleware,
    createApplicationForm
]);


export default {
    create,
};