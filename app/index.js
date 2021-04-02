import bodyParser from 'koa-bodyparser';
import Koa from "koa";
import KoaRouter from "koa-router";

import ApplicationFormController from './controllers/ApplicationFormController';

/**
 * Internal Service
 */

const app = new Koa();
const router = new KoaRouter();

router
    .post('/application-form/create', ApplicationFormController.create);

app.use(bodyParser());
app.use(router.routes());

app.listen(3000, () => {
    console.log("\x1b[32mService are online.\x1b[0m")
});


/**
 * External Service
 */