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
    component: () => import('../components/MemberContacts/MemberContacts')
  },{
    path: '/organization-email',
    name: 'organization-email',
    component: () => import('../components/OrganizationEmail/OrganizationEmail')
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  if (process.env.NODE_ENV === 'development') {
    next();
    return;
  }
  const token = await getCookiePromise();
  const jwt = await decodePromese(token);
  if (to.name === jwt.type) {
    next();
  } else if (jwt.type === 'member-contacts') {
    next({ name: 'member-contacts' });
  } else if (jwt.type === 'organization-email') {
    next({ name: 'organization-email' });
  } else {
    next({ name: 'homepage' });
  }
});

export default router
