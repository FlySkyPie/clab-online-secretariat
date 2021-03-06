import compose from 'koa-compose';

import { MemberContact } from "../../models";
import { announce } from "../services/DiscordService";

const AuthenticateMiddleware = async (ctx, next) => {
    const jwt = ctx.state.jwt;
    if (process.env.NODE_ENV !== 'development' && jwt.type !== 'member-contacts') {
        ctx.throw(401);
        return;
    }
    await next();
}

const UpdateRequestMiddleware = async (ctx, next) => {
    const request = ctx.request.body;
    switch (undefined) {
        case request.contacts:
            ctx.throw(400, "The contacts is missing.");
            break;
        default:
            await next();
            break;
    }
};

const updateMemberContact = async (ctx, next) => {
    const newContacts = ctx.request.body.contacts;
    const contacts = await MemberContact.findAll();

    const newMemberNames = newContacts.map(item => item.name);
    const prevMemberNames = contacts.map(item => item.dataValues.name);

    const plannedRemoveMemberNames = prevMemberNames.filter(name => !newMemberNames.includes(name))
    const plannedAddMemberContacts = newContacts.filter(item => !prevMemberNames.includes(item.name));

    await MemberContact.destroy({
        where: {
            name: plannedRemoveMemberNames
        },
    });
    await MemberContact.bulkCreate(plannedAddMemberContacts);

    const response = {
        added: plannedAddMemberContacts.map(item => item.name),
        removed: plannedRemoveMemberNames,
    };

    const username = ctx.state.jwt.user;
    const message = `${username} 更新了社群通訊錄\n` +
        `總共有 ${response.added.length} 個人被新增至社群通訊錄，` +
        `以及 ${response.removed.length} 個人被從名單中移除。`;
    await announce(message);

    ctx.cookies.set('jwt', "deleted", { maxAge: -1 });
    ctx.body = JSON.stringify(response);
};

const update = compose([
    AuthenticateMiddleware,
    UpdateRequestMiddleware,
    updateMemberContact
]);

export default {
    update,
};