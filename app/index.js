import Koa from "koa";
import KoaRouter from "koa-router";
import logger from "koa-logger";

import ApplicationFormController from './controllers/ApplicationFormController';

const app = new Koa();
const router = new KoaRouter();

router
    .post('/api', ApplicationFormController.create);

app.use(router.routes());
app.use(logger())


app.listen(3000, () => {
    console.log("\x1b[32mService are online.\x1b[0m")
});