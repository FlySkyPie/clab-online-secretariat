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
 * @typedef {Object} Recipient
 * @property {string} name
 * @property {string} address
 * 
 * @typedef {Object} EmailOptions
 * @property {Recipient[]} recipients
 * @property {string} title
 * @property {string} content
 */

/**
 * 
 * @param {EmailOptions} options 
 * @returns {{success:string[],failure:string[]}}
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

    const info = await transporter.sendMail({
        from: sender,
        bcc: recipients,
        subject: title,
        html: createMailBody(content),
    });

    return {
        success: info.accepted,
        failure: info.rejected,
    };
}

/**
 * 
 * @param {EmailOptions} options 
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

    const info = await transporter.sendMail({
        from: sender,
        bcc: recipients,//"bar@example.com, baz@example.com",
        subject: title,
        html: createMailBody(content)
    });

    console.log(nodemailer.getTestMessageUrl(info));

    return {
        success: info.accepted,
        failure: info.rejected,
    };
}