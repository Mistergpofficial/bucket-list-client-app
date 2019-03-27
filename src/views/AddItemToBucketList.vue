<template>
  <div>
    <br/>
    <br/>
   <div class="col-md-9 col-lg-9 pull-left">
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
                                        <option v-for="bucket in bucketlists.data"  v-bind:value="bucket._id" v-if="bucket.full_name === currentUser.full_name && bucket._id === itemData.bucketlist_id">{{bucket.bucket_list_name}}</option>
                                    </select>
                                </div>
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" name="item_name" v-model="itemData.item_name" class="form-control" placeholder="Enter name">
                            </div>

                             <input type="hidden" name="full_name" v-model="itemData.full_name">
                           

                            <div class="group">
                                <button type="submit" :class="[ (saving)?  'is-loading' : '' ]" class="button" >Create</button>
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
 import {getAllBucketList} from '../config'
 import {getBucketListById} from '../config'
    export default {
        data () {
            return {
                itemData: {
                    item_name: '',
                    bucketlist_id: this.$route.params.id,
                    full_name: this.$store.getters.currentUser.full_name
                },
                saving: false,
                submitted: false,
                error: {},
                bucketlists: [],
                items: {},

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
            this.getItem();
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
            getItem() {
                this.$http.get(getBucketListById + this.$route.params.id + '/items', {
              headers:{
						"Authorization":"Bearer "+ this.$store.state.token
					}
          }).then(response =>{
              this.items = response.data
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
                     window.location = '/bucketlists'
                })
                .catch(err => {
                    this.error = err.body;
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