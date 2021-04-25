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
 * 
 * @param {{
 * content: string,
 * title: string,
 * }} options 
 * @returns {string}
 */
export const sendTestMail = async (options) => {
    const { content, title } = options;
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
        to: "bar@example.com, baz@example.com",
        subject: title,
        html: createMailBody(content)
    });

    return nodemailer.getTestMessageUrl(info);
}