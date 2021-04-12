import Koa from "koa";
import KoaRouter from "koa-router";
import bodyParser from 'koa-bodyparser';

class AnnounceService {
    constructor() {
        const app = new Koa();
        const router = new KoaRouter();

        router
            .post('/announcement', this.announce);

        app.use(bodyParser());
        app.use(router.routes());

        app.listen(3020, () => {
            console.log("\x1b[32mService are online.\x1b[0m")
        });

        this.toggleAnnounce = () => { };
    }

    /**
     * @public
     * @param {(message:string)=>void} callback 
     * @returns {AnnounceService}
     */
    onAnnounce(callback) {
        this.toggleAnnounce = callback;
        return this;
    }

    announce = async (ctx, next) => {
        try {
            const { message } = ctx.request.body;
            this.toggleAnnounce(message);
            ctx.status = 200;
            ctx.body = 'OK';
        } catch (error) {
            ctx.throw(400, error);
        }
    };
}

export default AnnounceService;