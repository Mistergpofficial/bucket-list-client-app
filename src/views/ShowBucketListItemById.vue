<template>
    <div>
    <br/>
    <br/>
   <div class="col-md-9 col-lg-9 pull-left">
    <!-- Jumbotron -->
      <div class="jumbotron">
          <marquee>Your Bucket List Item</marquee>
        <h1 v-if="outcome.full_name === currentUser.full_name">{{ outcome.item_name }}</h1>
        <p class="lead">Created:{{ outcome.createdAt | timeago }}</p>
        <p v-if="outcome.done === false">Status: <span>Not Done</span></p>
        <p v-if="outcome.done !== false">Status: <span> Done</span></p>
      </div>

      <!-- Example row of columns -->
      <!-- <p><u><strong>Items in your Bucket List</strong></u></p>
      <div class="row">
        <div class="col-lg-4" v-for="item in items.itemArray" :key="item._id" v-if="item.bucketlist === params">
          <h2>{{ item.item_name }}</h2>
          <p><a class="btn btn-primary" :href="`/bucketlists/${bucketlist._id}/item/${item._id}`" role="button">View details »</a></p>
        </div>
         <div class="col-lg-4" v-if="!items.count">
          <h2>{{ items.message }}</h2>
        </div>
      </div> -->

       <!-- Site footer -->
      <footer class="footer">
        <p>© 2019 Meeks Bucket Listing.</p>
      </footer>
       
    </div>
      <div class="sidebar-module">
            <h4>Actions</h4>
            <ol class="list-unstyled" v-if="outcome.full_name === currentUser.full_name">
                    <li><a :href="`/bucketlists/${outcome.bucketlist}/item/${outcome._id}/edit`">Edit Bucket List Item</a></li>
                    <li><a @click="remove">Delete Bucket List Item</a></li>
                    <li><a :href="`/bucketlists/${outcome.bucketlist}/items`">Add Item to Bucket List</a></li>
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
            outcome: {}
        }
    },
    created(){
       this.getBucketListsItemById();
    },
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn
        },
        currentUser(){
            return this.$store.getters.currentUser
        }
    },
    methods: {
         getBucketListsItemById() {
                this.$http.get(getBucketListById + this.$route.params.id + '/items/' + this.$route.params.item, {
              headers:{
						"Authorization":"Bearer "+ this.$store.state.token
					}
          }).then(response =>{
              this.outcome = response.data
          })
          },
          remove() {
              let shouldDelete = confirm('Are you sure you want to delete this bucket list item');

              if (!shouldDelete) return;

              this.$http.delete(getBucketListById + this.$route.params.id + '/items/' + this.$route.params.item, {
              headers:{
						"Authorization":"Bearer "+ this.$store.state.token
					}
          }).then(response => {
                      alert("Successfully Deleted !!");
                        window.location = "/bucketlists"
                   //  this.$router.push('/bucketlists')
                  })
                  .catch(() => {
                      alert('error', "could not delete !!");
                  })

          },
         logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push({name: '/'})
        })
      }
    }
}
</script>