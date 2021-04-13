import Vue from 'vue'
import VueRouter from 'vue-router'
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';

const getCookiePromise = () => new Promise((resolve, reject) => {
  const jwt = Cookies.get('jwt');
  if (jwt === undefined) {
    reject();
    return;
  }
  resolve(jwt)
});

const decodePromese = (tokenString) => new Promise((resolve, reject) => {
  try {
    const decode = jwt_decode(tokenString);
    resolve(decode);
  } catch (error) {
    reject();
  }
});

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homepage',
    //component: () => import('../views/TimelineTypeAView.vue')
  }, {
    path: '/member-contacts',
    name: 'member-contacts',
    component: () => import('../components/MemberContactUploader/MemberContactUploader')
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  const token = await getCookiePromise();
  const jwt = await decodePromese(token);
  if (to.name === jwt.type) {
    next();
  }else if (jwt.type === 'member-contacts') {
    next({ name: 'member-contacts' });
  }else{
    next({ name: 'homepage' });
  }/***/
});

export default router
