<template>
    <div>
    <br/>
    <br/>
   <div class="col-md-9 col-lg-9 pull-left">
                <div class="panel panel-primary">
               <div class="alert alert-dismissable alert-success" v-if="submitted">
                        <button class="close" type="button" data-dismiss="alert" aria-hidden="true">&#215;</button>
                        Update is successful
                    </div>
                    <div class="panel-heading">EDIT BUCKET LIST</div>
                    <div class="panel-body">
                        <p style="color:red;" v-if="error.length > 0">{{ error }}</p><br/>
                         <form @submit.prevent="edit()" @keydown="clear($event.target.name)">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text"  name="name" v-model="bucketlist.bucket_list_name" class="form-control" placeholder="Enter bucket list name">
                                <p style="color:red;" v-if="error.length > 0">{{ error }}</p><br/>
                            </div>

                            <div class="group">
                                <button type="submit"   class="button">Update</button>
                            </div>

                        </form>
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
                    <li><router-link to="/bucketlists/create" tag="span" active-class="active" exact>Create new Bucket List Item</router-link></li>
                    <li><a @click="logout">Logout</a></li>
            </ol>
          </div>
</div> 
</template>

<script>
//import BucketListService from '@/services/BucketListService'
 import {getBucketListById} from '../config'
    export default {
        data () {
            return {
                bucketlist: {},
                error: {},
                submitted: false,
                editing: false,
            }
        },
        
    
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn
        },
        currentUser(){
            return this.$store.getters.currentUser
        }
    }, 
         mounted () {
        this.getBucketListsById();
            },
        methods: {
    
        getBucketListsById() {
                this.$http.get(getBucketListById + this.$route.params.id , {
              headers:{
						"Authorization":"Bearer "+ this.$store.state.token
					}
                }).then(response =>{
                    this.bucketlist = response.data
                })
          },
           edit() {
                this.$http.patch(getBucketListById + this.$route.params.id , this.bucketlist, {
              headers:{
						"Authorization":"Bearer "+ this.$store.state.token
					}
                 })
                .then(response => {
                    this.submitted = true;
                })
                    .catch((err) => {
                    this.error = err.response.data;
                    });
            },
                 logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
            window.location = "/"
          //this.$router.push({name: 'login'})
        })
      },
         
             clear(){
            this.error = false;
                 }, 
   

        }
    }
</script>