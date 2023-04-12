import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../viesw/Home.vue'
import user from '../viesw/User.vue'
import min from '../viesw/Min.vue'
import mall from '../viesw/Mall.vue'
import PageOne from '../viesw/PageOne.vue'
import PageTwo from '../viesw/PageTwo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: min,
    redirect: 'home',
    children: [
      { path: 'home', name: 'home', component: home },
      { path: 'user', name: 'suer', component: user },
      { path: 'mall', name: 'mall', component: mall },
      { path: 'page1', name: 'page1', component: PageOne },
      { path: 'page2', name: 'page2', component: PageTwo },

    ]
  },

]

const router = new VueRouter({
  routes
})

export default router