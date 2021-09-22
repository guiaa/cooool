import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Account from '../views/Account.vue'
import Account1 from '../components/Account1.vue'
import nav from '../components/Usernav.vue'
Vue.use(VueRouter)

const routes = [
  // {
  //   mode: 'history'
  // },
  {
    path: '/',
    redirect: '/nav'
  },
  {
    path: '/trade',
    name: 'Trade',
    component: () => import('../views/Trade.vue')
  },
  {
    path: '/nav',
    name: 'Nav',
    redirect: '/show',
    component: nav,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/show',
        name: 'Show',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/Show.vue')
      },
      {
        path: '/account',
        name: 'Account',
        redirect: '/account/account1',
        component: Account,
        children: [
          {
            path: 'account1',
            component: Account1
          },
          {
            path: 'account2',
            component: () => import('../components/Account2')
          }
        ]
      },
      {
        path: '/order',
        name: 'Order',
        component: () => import('../views/Order.vue')
      },
      {
        path: '/shop',
        name: 'Shop',
        component: () => import('../views/Shop.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue')
  },
  {
    path: '/back',
    name: 'Back',
    redirect: '/user',
    component: () => import('../views/Back.vue'),
    children: [
      {
        path: '/user',
        name: 'User',
        component: () => import('../views/User.vue')
      },
      {
        path: '/orderback',
        name: 'Orderback',
        component: () => import('../views/Orderback.vue')
      },
      {
        path: '/Newgoods',
        name: 'Newgoods',
        component: () => import('../views/Newgoods.vue')
      },
      {
        path: '/goods',
        name: 'Goods',
        component: () => import('../views/Goods.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
// router.beforeEach((to, from, next) => {
//   if (to.path === '/home' || from.path === '/home') {
//     if (!localStorage.getItem('token')) {
//       return next()
//     } else {
//       return next('/admin')
//     }
//   }
// })
export default router
