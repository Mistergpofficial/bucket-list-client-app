<template>
    <div class="container">
    <br>
 <br>
 <br>
 <br>
 <br>
        <div class="row col-md-9 col-lg-9 col-sm-9 pull-left">
            <div class="jumbotron">
            <h1 v-if="bucketlist.full_name === currentUser.full_name">{{ bucketlist.bucket_list_name }}</h1>
            <p class="lead"></p>
            <p><a class="btn btn-lg btn-success">Get Started Today</a></p>
            </div>

            <div class="row col-md-12 col-lg-12 col-sm-12" style="background-color: white; margin: 10px;">
            <!-- <a :href="`/bucketlists/${bucketlist._id}/items`" class="pull-right btn btn-success btn-sm">Add Item</a>
                 -->
                 
                 <p><u>Items in your Bucket List</u></p><br/><br/>
                <span v-for="item in items.itemArray" :key="item._id" v-if="item.bucketlist === params">
                <div class="col-lg-4 col-lg-4 col-sm-4">
                 <p class="text-danger">{{ item.item_name }}</p>
                 <p><a :href="`/bucketlists/${bucketlist._id}/item/${item._id}`" class="btn btn-primary" role="button">View Item</a></p>
                </div>
                </span><br/><br/>
                <div id="alert-info" v-if="!items.count">
                    <center class="m-t-lg">{{ items.message }}</center>
                </div>
                 <!-- <span v-if="!items.count">
                 <center class="m-t-lg">{{ items.message }}</center>
                </span> -->
            </div>
        </div>


        <div class="col-sm-3 col-md-3 col-lg-3 pull-right" style="padding: 60px;">
            <div class="sidebar-module">
                <h4>Actions</h4>
                <ol class="list-unstyled" v-show="bucketlist.full_name === currentUser.full_name">
                    <li><a :href="`/bucketlists/${bucketlist._id}/edit`">Edit Bucket List</a></li>
                    <li><a @click="remove">Delete Bucket List</a></li>
                    <li><a :href="`/bucketlists/${bucketlist._id}/items`">Add Item to Bucket List</a></li>
                    <li><a :href="`/bucketlists`">Bucket Listing</a></li>
                    <li><a :href="`/bucketlists/create`">Create new Bucket List</a></li>
                </ol>
            </div>

            <div class="sidebar-module">
                <h4>Members</h4>
                <ol class="list-unstyled">
                    <li><a href="">{{ currentUser.full_name }}</a></li>
                </ol>
            </div>
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
          this.$router.push({name: 'login'})
        })
      }
    }
}
</script>