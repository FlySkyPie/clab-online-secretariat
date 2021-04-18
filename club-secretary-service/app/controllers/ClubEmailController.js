import compose from 'koa-compose';

import { sendTestMail } from "../services/EmailService";

const sendClubEmail = async (ctx, next) => {
    const options = {
        message: "Awesome Message",
        title: "Awesome Title"
    };
    const testPreviewLink = await sendTestMail(options);

    ctx.body = {
        link: testPreviewLink,
    };
}

const send = compose([

    sendClubEmail
]);


export default {
    send,
};