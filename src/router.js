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
import Error from './views/NotFound.vue'
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
      meta: { forVisitors: true} 
    },
    {
      path: '/bucketlists',
      name: 'bucketlist',
      component: Dashboard,
      meta:{
        forAuth: true
    }
    },
    {
      path: '/bucketlists/create',
      name: 'bucketlists',
      component: BucketList,
      meta:{
        forAuth: true
    }
    },
    {
      path: '/bucketlists/:id',
      name: 'bucketlistById',
      component: BucketListById,
      meta: {
        forAuth: true
      }
    },
    {
      path: '/bucketlists/:id/edit',
      name: "editBucketList",
      component: EditBucketList,
      meta: {
        forAuth: true
      }
    },
    {
      path: '/bucketlists/:id/items/',
      name: 'addItemToBucketList',
      component: AddItemToBucketList,
      meta: {
        forAuth: true
      }
    },
    {
      path: '/bucketlists/:id/item/:item',
      name: 'bucketlistItemById',
      component: BucketListItemById,
      meta: {
        forAuth: true
      }
    },
    {
      path: '/bucketlists/:id/item/:item/edit',
      name: "editBucketListItem",
      component: EditBucketListItem,
      meta: {
        forAuth: true
      }
    },
    {
      path: '*',
      name: 'Error',
      component: Error
  }
  ]
});




export default router