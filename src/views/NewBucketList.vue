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
            
            </div>
        </div>


        <div class="col-sm-3 col-md-3 col-lg-3 pull-right" style="padding: 60px;">
            <div class="sidebar-module">
                <h4>Actions</h4>
                <ol class="list-unstyled">
                    <li><a :href="`/bucketlists`">All Bucket Lists</a></li>
                </ol>
            </div>

        </div>




    </div>
</template>

<script>
import {addBucketList} from '../config'
    export default {
        data () {
            return {
                bucketListData: {
                    bucket_list_name: '',
                    full_name: this.$store.getters.currentUser.full_name
                },
                saving: false,
                submitted: false,
                error: {}
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
                })
                .catch(err => {
                    this.error = err.body;
                    });
            },
             clear(){
            this.error = false;
                 }, 
       

        }


    }
</script>