import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@views/Home.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes : [
  {
    path: '/echart',
    name: 'echart',
    component: () => import('@views/charts/echart/Echart.vue'),
    meta: { pageTitle: 'echart' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@views/Login.vue'),
    meta: { pageTitle: 'login' }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { pageTitle: 'Home' }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@views/dashboard/Dashboard.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard-home',
        component: () => import('@views/dashboard/Home.vue'),
        meta: { 
          pageTitle: 'Home',
          breadcrumb: [
            {
              text: 'Dashboard',
              active: true,
            },
            {
              text: 'Home',
              active: true,
            },
          ],
        }
      },
      {
        path: '/dashboard/actions',
        name: 'dashboard-actions',
        component: () => import('@views/dashboard/Actions.vue'),
        meta: { 
          pageTitle: 'Actions', 
          breadcrumb: [
            {
              text: 'Dashboard',
            },
            {
              text: 'Actions',
              active: true,
            },
          ],
        }
      },
      {
        path: '/dashboard/incidents',
        name: 'dashboard-incidents',
        component: () => import('@views/dashboard/Incidents.vue'),
        meta: { 
          pageTitle: 'Incidents', 
          breadcrumb: [
            {
              text: 'Dashboard',
            },
            {
              text: 'Incidents',
              active: true,
            },
          ],
        }
      },
      {
        path: '/dashboard/hazards',
        name: 'dashboard-hazards',
        component: () => import('@views/dashboard/Hazards.vue'),
        meta: { 
          pageTitle: 'Hazards', 
          breadcrumb: [
            {
              text: 'Dashboard',
            },
            {
              text: 'Hazards',
              active: true,
            },
          ],
        }
      },
      {
        path: '/dashboard/tips',
        name: 'dashboard-tips',
        component: () => import('@views/dashboard/TIPS.vue'),
        meta: { 
          pageTitle: 'TIPS', 
          breadcrumb: [
            {
              text: 'Dashboard',
            },
            {
              text: 'TIPS',
              active: true,
            },
          ],
        }
      },
      {
        path: '/dashboard/email',
        name: 'dashboard-contact',
        component: () => import('@views/dashboard/Contact.vue'),
        meta: { 
          pageTitle: 'Contact', 

        }
      },
      {
        path: '/dashboard/calendar',
        name: 'dashboard-calendar',
        component: () => import('@views/apps/calendar/Calendar.vue'),
        meta: { 
          pageTitle: 'Calendar', 
          breadcrumb: [
            {
              text: 'Dashboard',
            },
            {
              text: 'Calendar',
              active: true,
            },
          ],
        }
      },
      {
        path: '/dashboard/statistics',
        name: 'dashboard-statistics',
        component: () => import('@views/dashboard/Report.vue'),
        meta: { 
          pageTitle: 'Statistics', 
          breadcrumb: [
            {
              text: 'Dashboard',
            },
            {
              text: 'Statistics',
              active: true,
            },
          ],
        }
      },
      {
        path: '/dashboard/worker',
        name: 'dashboard-worker',
        component: () => import('@views/dashboard/Worker.vue'),
        meta: { 
          layout: 'worker',
          pageTitle: 'Worker', 
          breadcrumb: [
            {
              text: 'Dashboard',
            },
            {
              text: 'Home',
              active: true,
            },
          ],
        }
      },
    ]
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]
})


router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
