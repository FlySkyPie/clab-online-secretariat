import compose from 'koa-compose';
import { MemberContact } from "../../models";

const UpdateRequestMiddleware = async (ctx, next) => {
    const request = ctx.request.body;
    switch (undefined) {
        case request.members:
            ctx.throw(400, "The members is missing.");
            break;
        default:
            await next();
            break;
    }
};

const updateMemberContact = async (ctx, next) => {
    const newContacts = ctx.request.body.members;
    const members = await MemberContact.findAll();

    const newMemberNames = newContacts.map(item => item.name);
    const prevMemberNames = members.map(item => item.dataValues.name);

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

    ctx.body = JSON.stringify(response);
};

const update = compose([
    UpdateRequestMiddleware,
    updateMemberContact
]);

export default {
    update,
};