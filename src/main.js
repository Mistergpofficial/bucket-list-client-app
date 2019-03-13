import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Axios from 'axios'
import {sync} from 'vuex-router-sync'
import store from './store'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueResource from 'vue-resource'



Vue.use(BootstrapVue)
Vue.use(Axios);
Vue.use(VueResource);
Vue.use(moment);

Vue.filter('timeago', function (value) {
    return moment.utc(value).local().fromNow();
});


Vue.config.productionTip = false


Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

router.beforeEach(
    (to, from, next) => {

        if(to.matched.some(record => record.meta.forVisitors)){

    if(store.getters.loggedIn === true){
        next({
            path: '/bucketlists'
        })
    }else next()
}

else if(to.matched.some(record => record.meta.forAuth))
        {
            if(store.getters.loggedIn === false){
                next({
                    path: '/'
                })
            }else next()
        }

else next()

    }
    )





sync(store, router)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
