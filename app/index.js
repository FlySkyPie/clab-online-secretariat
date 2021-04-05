import bodyParser from 'koa-bodyparser';
import Koa from "koa";
import KoaRouter from "koa-router";

import ApplicationFormController from './controllers/ApplicationFormController';
import MemberContactController from './controllers/MemberContactController';

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
    console.log("\x1b[32mInternal Service are online.\x1b[0m")
});



/**
 * External Service
 */

 const externalApp = new Koa();
 const externalRouter = new KoaRouter();
 
 externalRouter
     .post('/membercontact/update', MemberContactController.update);
 
 externalApp.use(bodyParser());
 externalApp.use(externalRouter.routes());
 
 externalApp.listen(3050, () => {
     console.log("\x1b[32mExternal Service are online.\x1b[0m")
 });
 