

const injection = async (ctx, next) => {
    if (ctx.originalUrl.match(/^\/application-form\/active/i) !== null) {
        await next();
    } else {
        ctx.state.jwt = {
            id: "--",
            type: "--",
            user: "Somebody",
            iat: 9999999999,
        };

        await next();
    }
}/** */

export default injection;