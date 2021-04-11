import bodyParser from 'koa-bodyparser';
import Koa from "koa";
import KoaRouter from "koa-router";
import koaStatic from 'koa-static';
import path from "path";
import cors from '@koa/cors';

import ApplicationFormController from './controllers/ApplicationFormController';
import MemberContactController from './controllers/MemberContactController';
import authenticate from './middleware/authenticate';

/**
 * Internal Service
 */

const app = new Koa();
const router = new KoaRouter();

router
    .post('/application-form/create', ApplicationFormController.create);

app.use(bodyParser())
    .use(router.routes());


app.listen(3030, () => {
    console.log("\x1b[32mInternal Service are online.\x1b[0m")
});



/**
 * External Service
 */

const externalApp = new Koa();
const externalRouter = new KoaRouter();

externalRouter
    .post('/membercontact/update', MemberContactController.update);

externalRouter
    .get('/application-form/active/:id', ApplicationFormController.active);

externalApp.use(cors())
    .use(bodyParser())
    .use(authenticate)
    .use(externalRouter.routes())
    .use(koaStatic(path.join(__dirname, "../public")));



externalApp.listen(3050, () => {
    console.log("\x1b[32mExternal Service are online.\x1b[0m")
});
