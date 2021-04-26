import compose from 'koa-compose';

import { MemberContact } from "../../models";
import { sendTestMail } from "../services/EmailService";
import { announce } from "../services/DiscordService";

const AuthenticateMiddleware = async (ctx, next) => {
    const jwt = ctx.state.jwt;
    if (jwt.type !== 'organization-email') {
        ctx.throw(401);
        return;
    }
    await next();
};

const UpdateRequestMiddleware = async (ctx, next) => {
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


const sendEmail = async (ctx, next) => {
    const { title, content } = ctx.request.body;

    const memberContacts = await MemberContact.findAll();
    const recipients = memberContacts.map(item => ({
        name: item.dataValues.name,
        address: item.dataValues.email,
    }));

    const result = await sendTestMail({ title, content, recipients });
    console.log(result);
    ctx.body = JSON.stringify(result);

    const username = ctx.state.jwt.user;
    const message = `${username} 寄出了一封社群信\n` +
        `總共有 封成功寄出；並且 封寄件失敗，請檢查是否為有效信箱。`;
    await announce(message);

    ctx.cookies.set('jwt', "deleted", { maxAge: -1 });
    //ctx.body = JSON.stringify(response);
}

const send = compose([
    //AuthenticateMiddleware,
    UpdateRequestMiddleware,
    sendEmail
]);

export default {
    send,
};