import { MemberContact } from "../../models";

const create = async (ctx, next) => {
    var result = await MemberContact.create({
        name: 'John',
        email: 'test@gmail.com'
    });
    //for test
    ctx.body = result;//'Hello World';

}

export default {
    create,
};