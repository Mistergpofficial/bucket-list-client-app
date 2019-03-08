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
                    <div class="panel-heading">EDIT BUCKET LIST</div>
                    <div class="panel-body">
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
            </div>
        </div>


        <div class="col-sm-3 col-md-3 col-lg-3 pull-right" style="padding: 60px;">
            <div class="sidebar-module">
                <h4>Actions</h4>
                <ol class="list-unstyled">
                    <li><a :href="`/bucketlists/${bucketlist._id}`">View Bucket Listing</a></li>
                    <li><a :href="`/bucketlists`">All Bucket Listing</a></li>
                </ol>
            </div>

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
             clear(){
            this.error = false;
                 }, 
   

        }
    }
</script>