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
                    <div class="panel-heading">EDIT BUCKET LIST ITEM</div>
                    <p style="color:red;">{{ error.message }}</p><br/>
                    <div class="panel-body">
                        <form @submit.prevent="edit()" @keydown="clear($event.target.name)">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text"  name="item_name" v-model="outcome.item_name" class="form-control" placeholder="Enter bucket list name">
                            </div>
                              <div class="form-group">
                                <label>Name</label>
                                <input type="text"  name="bucketlist" v-model="outcome.bucketlist" class="form-control" disabled>
                            </div>
                             <!-- <div class="form-group" >
                                    <label>Select BucketList</label>
                                    <select name="bucketlist" class="form-control" v-model="outcome.bucketlist">
                                        <option value="0">Choose a bucketlist --*</option>
                                        <option v-for="bucket in bucketlists"  v-bind:value="bucket._id" v-if="bucket.full_name === currentUser.full_name">{{bucket.bucket_list_name}}</option>
                                    </select>
                                </div> -->


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
import {getBucketListById} from '../config'
    export default {
        data () {
            return {
                bucketlists: {},
                outcome: {},
                error: {},
                submitted: false,
                editing: false,
            }
        },
    
    computed: {
        currentUser(){
            return this.$store.getters.currentUser
        }  
    },
    created () {
        this.getOneBucketListItemNow();
    },
        methods: {
          getOneBucketListItemNow() {
                this.$http.get(getBucketListById + this.$route.params.id + '/items/' + this.$route.params.item , {
              headers:{
						"Authorization":"Bearer "+ this.$store.state.token
					}
                }).then(response =>{
                    this.outcome = response.data
                })
          },

          edit() {
                this.$http.patch(getBucketListById + this.$route.params.id + '/items/' + this.$route.params.item , this.outcome, {
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