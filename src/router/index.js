import Vue from 'vue'
import VueRouter from 'vue-router'

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

export default router
