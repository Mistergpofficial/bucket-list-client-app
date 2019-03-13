<template>
<div>
    <br/>
    <br/>
   <div class="col-md-9 col-lg-9 pull-left">
    <!-- Jumbotron -->
      <div class="jumbotron">
            <marquee>Your Bucket List</marquee>
        <h1 v-if="bucketlist.full_name === currentUser.full_name">{{ bucketlist.bucket_list_name }}</h1>
        <p class="lead">Created By: {{ bucketlist.full_name }}</p>
        <p>Created: {{ bucketlist.createdAt | timeago }}</p>
      </div>

      <!-- Example row of columns -->
      <p><u><strong>Items in your Bucket List</strong></u></p>
      <div class="row">
        <div class="col-lg-4" v-for="item in items.itemArray" :key="item._id" v-if="item.bucketlist === params">
          <h2>{{ item.item_name }}</h2>
          <p><a class="btn btn-primary" :href="`/bucketlists/${bucketlist._id}/item/${item._id}`" role="button">View details »</a></p>
        </div>
         <div class="col-lg-4" v-if="!items.count">
          <h2>{{ items.message }}</h2>
        </div>
      </div>

       <!-- Site footer -->
      <footer class="footer">
        <p>© 2019 Meeks Bucket Listing.</p>
      </footer>
       
    </div>
      <div class="sidebar-module">
            <h4>Actions</h4>
            <ol class="list-unstyled" v-if="bucketlist.full_name === currentUser.full_name">
                    <li><a :href="`/bucketlists/${bucketlist._id}/edit`">Edit Bucket List</a></li>
                    <li><a @click="remove">Delete Bucket List</a></li>
                    <li><a :href="`/bucketlists/${bucketlist._id}/items`">Add Item to Bucket List</a></li>
                    <li><a :href="`/bucketlists`">All Bucket Listing</a></li>
                    <li><a @click="logout">Logout</a></li>
            </ol>
          </div>
</div>
</template>

<script>
import Header from "@/views/partials/homepage/dashboard/Header.vue";
 import {getBucketListById} from '../config'
export default {
    data () {
        return {
            bucketlist: {},
            items: {},
            params: ""
        }
    },
    created(){
        this.getBucketListsById();
        this.getItem();
    },
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn
        },
        currentUser(){
            return this.$store.getters.currentUser
        }
    },
    async mounted (){
        this.params =  this.$route.params.id
    
    },
    methods: {
         getBucketListsById() {
                this.$http.get(getBucketListById + this.$route.params.id, {
              headers:{
						"Authorization":"Bearer "+ this.$store.state.token
					}
          }).then(response =>{
              this.bucketlist = response.data
          })
          },

          getItem() {
                this.$http.get(getBucketListById + this.$route.params.id + '/items', {
              headers:{
						"Authorization":"Bearer "+ this.$store.state.token
					}
          }).then(response =>{
              this.items = response.data
          })
     },

           remove() {
              let shouldDelete = confirm('Are you sure you want to delete this bucket list');

              if (!shouldDelete) return;

              this.$http.delete(getBucketListById + this.$route.params.id, {
              headers:{
						"Authorization":"Bearer "+ this.$store.state.token
					}
          }).then(response => {
                      alert("Successfully Deleted !!");
                      window.location = "/bucketlists"
                     //this.$router.push('/bucketlists')
                  })
                  .catch(() => {
                      alert('error', "could not delete !!");
                  })

          },
         logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          window.location = "/"
          //this.$router.push({name: '/'})
        })
      }
    }
}
</script>