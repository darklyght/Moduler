import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    {
      name: 'Index',
      path: '/',
      component: load('Index'),
      beforeEnter: (to, from, next) => {
        if (localStorage['username']) {
          sessionStorage.setItem('username', localStorage['username'])
        }
        if (sessionStorage['username']) {
          next('/modules/' + sessionStorage.username)
        }
        else {
          next()
        }
      }
    }, // Default
    {
      name: 'Modules',
      path: '/modules/:username',
      component: load('Modules'),
      beforeEnter: (to, from, next) => {
        if (from.path === '/' || sessionStorage['username']) {
          next()
        }
        else {
          next(false)
        }
      }
    }, // Modules page
    {
      name: 'View',
      path: '/view/:username',
      component: load('View')
      // beforeEnter: (to, from, next) => {
      //   if (from.path.substring(0, 9) !== '/modules/' || from.path !== '') {
      //     next(false)
      //   }
      //   else {
      //     next()
      //   }
      // }
    },
    {
      path: '*',
      component: load('Error404')
    } // Not found
  ]
})
