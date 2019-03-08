<template>
    <div class="container">
    <br>
 <br>
 <br>
 <br>
 <br>
        <div class="row col-md-9 col-lg-9 col-sm-9 pull-left">
            <div class="jumbotron">
            <h1>{{ outcome.item_name }}</h1>
             <p class="lead">Created:{{ outcome.createdAt | timeago }}</p>
              <p class="lead" v-if="outcome.done === false">Status: <span>Not Done</span></p>
              <p class="lead" v-if="outcome.done !== false">Status: <span> Done</span></p>
            <p class="lead"></p>
            </div>

           
        </div>


        <div class="col-sm-3 col-md-3 col-lg-3 pull-right" style="padding: 60px;">
            <div class="sidebar-module">
                <h4>Actions</h4>
                <ol class="list-unstyled">
                    <li><a :href="`/bucketlists/${outcome.bucketlist}/item/${outcome._id}/edit`">Edit Item</a></li>
                    <li><a @click="remove">Delete</a></li>
                    <li><a :href="`/bucketlists/${outcome.bucketlist}/items`">Add Item to Bucket List</a></li>
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
        async remove(){
            try{
                let shouldDelete = confirm('Are you sure you want to delete this company');

                if (!shouldDelete) return;
                const response = await BucketListService.removed(this.$route.params.id, this.bucketlist)
                this.$router.push('/bucketlists')
            }
            catch(err){
            this.errors = err.response.data.errors
            }
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