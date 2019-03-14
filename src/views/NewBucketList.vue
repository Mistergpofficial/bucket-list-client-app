<template>
<div>
    <br/>
    <br/>
   <div class="col-md-9 col-lg-9 pull-left">
                <div class="panel panel-primary">
                    <div class="alert alert-dismissable alert-success" v-if="submitted">
                           <button class="close" type="button" data-dismiss="alert" aria-hidden="true">&#215;</button>
                           Bucket Details Added Successfully
                    </div>
                    <div class="panel-heading">ADD NEW BUCKET</div>
                    <div class="panel-body">
                        <form @submit.prevent="addBucketList" @keydown="clear($event.target.name)">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" name="bucket_list_name" v-model="bucketListData.bucket_list_name" class="form-control" placeholder="Enter bucket list name">
                                <p style="color:red;" v-if="error">{{ error.msg }}</p><br/>
                            </div>
                            <input type="hidden" name="full_name" v-model="bucketListData.full_name">
                            
                            <div class="group">
                                 <button type="submit" :class="[ (saving)?  'is-loading' : '' ]" class="button">Create</button>
                            </div>

                        </form>
                    </div>
                </div>

      <!-- Example row of columns -->
      <p><u><strong>Your Bucket Lists</strong></u></p>
      <div class="row">
        <div class="col-lg-4" v-for="bucket in bucketlistsRetrieved.bucketArray" v-bind:key="bucket._id" v-if="bucket.full_name === currentUser.full_name">
          <h2><a :href="`/bucketlists/${bucket._id}`">{{ bucket.bucket_list_name }}</a></h2>
        </div>
         <div class="col-lg-4"  v-if="!bucketlistsRetrieved.count">
          <h2>{{ bucketlistsRetrieved.message }}</h2>
        </div>
      </div>

       <!-- Site footer -->
      <footer class="footer">
        <p>© 2019 Meeks Bucket Listing.</p>
      </footer>
       
    </div>
      <div class="sidebar-module">
            <h4>Actions</h4>
            <ol class="list-unstyled" v-if="currentUser.full_name">
                    <li><router-link to="/bucketlists" tag="span" active-class="active" exact>Bucket Listing</router-link></li>
                    <li><router-link to="/bucketlists/create" tag="span" active-class="active" exact>Create new Bucket List</router-link></li>
                    <li><a @click="logout">Logout</a></li>
            </ol>
          </div>
</div>
</template>

<script>
import {addBucketList} from '../config'
import {getAllBucketList} from '../config'
    export default {
        data () {
            return {
                bucketListData: {
                    bucket_list_name: '',
                    full_name: this.$store.getters.currentUser.full_name
                },
                saving: false,
                submitted: false,
                error: {},
                bucketlistsRetrieved: [],
                }
            },
        mounted(){
        this.getBucketLists();
        },

        computed: {
        loggedIn() {
            return this.$store.getters.loggedIn
        },
        currentUser(){
            return this.$store.getters.currentUser
        }
    },
        methods:{
            addBucketList(){
                this.$http.post(addBucketList, this.bucketListData, {
              headers:{
						"Authorization":"Bearer "+ this.$store.state.token
					}
          })
                .then(response => {
                    this.submitted = true;
                    this.bucketListData = ""
                    window.location = '/bucketlists/create'
                })
                .catch(err => {
                    this.error = err.body;
                    });
            },
             getBucketLists() {
                this.$http.get(getAllBucketList, {
              headers:{
						"Authorization":"Bearer "+ this.$store.state.token
					}
          }).then(response =>{
              this.bucketlistsRetrieved = response.body || JSON.parse(response.data)
          })
          },
        clear(){
        this.error = false;
        }, 
           logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
            window.location = "/"
          //this.$router.push({name: 'login'})
        })
      }
       

        }


    }
</script>
<style scoped>
    .active{
        color: red;
    }
</style>
