import compose from 'koa-compose';
import marked from 'marked';

import { MemberContact } from "../../models";
import { sendTestMail, sendBatchMail } from "../services/EmailService";
import { announce } from "../services/DiscordService";

const AuthenticateMiddleware = async (ctx, next) => {
    const jwt = ctx.state.jwt;
    if (process.env.NODE_ENV !== 'development' && jwt.type !== 'organization-email') {
        ctx.throw(401);
        return;
    }
    await next();
};

const RequestMiddleware = async (ctx, next) => {
    const request = ctx.request.body;
    switch (undefined) {
        case request.title:
            ctx.throw(400, "The title is missing.");
            break;
        case request.content:
            ctx.throw(400, "The content is missing.");
            break;
        default:
            await next();
            break;
    }
};

const MarkdownTranslateMiddleware = async (ctx, next) => {
    try {
        const { content, title } = ctx.request.body;
        const html = marked(content);

        ctx.state.post = {
            title,
            content: html,
        };
    } catch (error) {
        ctx.throw(400, error.toString());
        return;
    }

    await next();
};

const sendEmail = async (ctx, next) => {
    const { title, content } = ctx.state.post;

    const memberContacts = await MemberContact.findAll();
    const recipients = memberContacts.map(item => ({
        name: item.dataValues.name,
        address: item.dataValues.email,
    }));

    const result = await sendBatchMail({ title, content, recipients });
    const username = ctx.state.jwt.user;

    const successMessage = `${username} 寄出了一封社群信\n` +
        `總共有 ${result.success.length} 封成功寄出`;
    const failureMessage = successMessage +
        `；並且 ${result.failure.length} 封寄件失敗，請檢查是否為有效信箱。`;
    const message = (result.failure.length > 0) ? failureMessage : successMessage + "。";
    await announce(message);

    ctx.cookies.set('jwt', "deleted", { maxAge: -1 });
    ctx.body = JSON.stringify(result);
}

const send = compose([
    AuthenticateMiddleware,
    RequestMiddleware,
    MarkdownTranslateMiddleware,
    sendEmail
]);

export default {
    send,
};