import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import BucketList from './views/NewBucketList.vue'
import BucketListById from './views/ShowBucketListById.vue'
import EditBucketList from "./views/EditBucketList.vue"
import AddItemToBucketList from './views/AddItemToBucketList.vue'
import BucketListItemById from './views/ShowBucketListItemById.vue'
import EditBucketListItem from "./views/EditBucketListItem.vue"
import Axios from 'axios'


Vue.use(VueRouter)
Vue.use(Axios);


const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/bucketlists',
      name: 'bucketlist',
      component: Dashboard,
      meta:{
        requiresAuth:true
    }
    },
    {
      path: '/bucketlists/create',
      name: 'bucketlists',
      component: BucketList,
      meta:{
        requiresAuth:true
    }
    },
    {
      path: '/bucketlists/:id',
      name: 'bucketlistById',
      component: BucketListById,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/bucketlists/:id/edit',
      name: "editBucketList",
      component: EditBucketList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/bucketlists/:id/items/',
      name: 'addItemToBucketList',
      component: AddItemToBucketList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/bucketlists/:id/item/:item',
      name: 'bucketlistItemById',
      component: BucketListItemById,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/bucketlists/:id/item/:item/edit',
      name: "editBucketListItem",
      component: EditBucketListItem,
      meta: {
        requiresAuth: true
      }
    },
  ]
});

// router.beforeEach((to,from,next)=>{
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth );
//   const currentUser = store.getters.currentUser;

//   if(requiresAuth && !currentUser){
//       store.commit("showAlert","You need to login for accessing this content. new user ? register now")
//       next('/login');
//   } else if(to.path == '/login' && currentUser){
//       next('/');
//   } else {
//       next();
//   }
//   setTimeout(()=>{
//       store.commit("showAlert","")
//   },5000)
// });

// Axios.interceptors.response.use(null,(error)=>{
//   if(error.response.status == 401){
//       store.commit('logout');
//       router.push('/login');
//   }
//   return Promise.reject(error);
// });







export default router