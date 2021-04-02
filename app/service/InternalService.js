import Koa from "koa";
import KoaRouter from "koa-router";

class InternalService {
    constructor() {
        this.toggleAnnounce = () => { };

        const app = new Koa();
        const router = new KoaRouter();
        const announce = async (ctx, next) => {
            try {
                this.toggleAnnounce();
                ctx.status = 200;
                ctx.body = 'OK';
            } catch (error) {
                ctx.throw(400, error);
            }
        };

        router
            .post('/announcement', announce);

        //app.use(bodyParser());
        app.use(router.routes());

        app.listen(3000, () => {
            console.log("\x1b[32mService are online.\x1b[0m")
        });
    }

    onAnnounce(callback) {
        this.toggleAnnounce = callback;
    }
}

export default InternalService;