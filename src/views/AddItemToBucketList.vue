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
                           Bucket List Item is created
                       </div>
                    <div class="panel-heading">ADD NEW ITEM TO BUCKET LIST</div>
                    <div class="panel-body">
                        <p style="color:red;" v-if="error.length > 0">{{ error }}</p><br/>
                        <form @submit.prevent="addItem" @keydown="clear($event.target.name)">
                            
                                <div class="form-group" >
                                    <label>Select BucketList</label>
                                    <select name="bucketlist_id" class="form-control" v-model="itemData.bucketlist_id">
                                        <option value="0">Choose a bucketlist --*</option>
                                        <option v-for="bucket in bucketlistsRetrieved.bucketArray"  v-bind:value="bucket._id" v-if="bucket.full_name === currentUser.full_name">{{bucket.bucket_list_name}}</option>
                                    </select>
                                </div>
                    

                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" name="item_name" v-model="itemData.item_name" class="form-control" placeholder="Enter name">
                            </div>

                            <div class="group">
                                <button type="submit" :class="[ (saving)?  'is-loading' : '' ]" class="button" >Create</button>
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
                    <li><a :href="`/bucketlists`">All Bucket Listings</a></li>
                </ol>
            </div>

        </div>




    </div>
</template>

<script>
 import {getAllBucketList} from '../config'
 import {getBucketListById} from '../config'
    export default {
        data () {
            return {
                itemData: {
                    item_name: '',
                    bucketlist_id: this.$route.params.id
                },
                saving: false,
                submitted: false,
                error: {},
                bucketlists: [],

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
        created() {
            this.getBucketLists();
        },
        methods: {
            getBucketLists() {
                this.$http.get(getAllBucketList, {
              headers:{
						"Authorization":"Bearer "+ this.$store.state.token
					}
          }).then(response =>{
              this.bucketlists = response.data
          })
          },
             addItem(){
                this.$http.post(getBucketListById + this.$route.params.id + '/items', this.itemData, {
              headers:{
						"Authorization":"Bearer "+ this.$store.state.token
					}
          })
                .then(response => {
                    this.submitted = true;
                    this.itemData = "";
                })
                .catch(err => {
                    this.error = err.body;
                    });
            },
             clear(){
            this.error = false;
                 }, 
        //   async addItem() {
        //       try{
        //           const response = await ItemList.saveItem(this.$route.params.id, this.itemData)
        //           this.submitted = true;
        //           this.itemData = "";
        //       }
        //       catch(err) {
        //           this.error = err.response.data
        //       }
        //   }
        }




    }
</script>