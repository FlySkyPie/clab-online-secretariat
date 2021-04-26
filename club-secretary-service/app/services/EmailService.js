import fs from 'fs';
import nodemailer from 'nodemailer';
import path from 'path';

import { gmail } from '../config';

const sender = `"${gmail.name}" <${gmail.account}>`;

const createMailBody = (message) => {
    const templatePath = path.join(__dirname, '../templates/mail-theme-1.html');
    const htmlString = fs.readFileSync(templatePath, 'utf8');
    return htmlString.replace('{{Message}}', message);
};

/**
 * 
 * @param {{
 * recipients: string[],
 * content: string,
 * title: string,
 * }} options 
 * @returns 
 */
export const sendBatchMail = async (options) => {
    const { recipients, content, title } = options;
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: gmail.account,
            pass: gmail.password,
        },
    });

    await transporter.sendMail({
        from: sender,
        to: recipients.join(', '),
        subject: title,
        html: createMailBody(content),
    });
}

/**
 * @typedef {Object} Recipient
 * @property name {string}
 * @property address {string}
 */

/**
 * 
 * @param {{
 * content: string,
 * title: string,
 * recipients: Recipient[]
 * }} options 
 * @returns {{success:string[],failure:string[]}}
 */
export const sendTestMail = async (options) => {
    const { content, title, recipients } = options;
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    console.log(recipients);
    const info = await transporter.sendMail({
        from: sender,
        to: recipients,//"bar@example.com, baz@example.com",
        subject: title,
        html: createMailBody(content)
    });

    console.log({ link: nodemailer.getTestMessageUrl(info) });

    return {
        success: info.accepted,
        failure: info.rejected,
    };
}