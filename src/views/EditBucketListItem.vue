<template>
    <div class="container">
        <br>
        <br>
        <br>
        <div class="row col-md-9 col-lg-9 col-sm-9 pull-left">
            <div class="row col-md-12 col-lg-12 col-sm-12" style="background-color: white; margin: 10px;">
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
            </div>
        </div>


        <div class="col-sm-3 col-md-3 col-lg-3 pull-right" style="padding: 60px;">
            <div class="sidebar-module">
                <h4>Actions</h4>
                <ol class="list-unstyled">
                    <li><a :href="`/bucketlists`">All Bucket Listing</a></li>
                </ol>
            </div>

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

         clear(){
        this.error = false;
                 },   



        }
    }
</script>