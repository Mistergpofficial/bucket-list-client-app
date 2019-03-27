<template>
<div class="container">
 <br>
 <br>
    <div class="row">
        <div class="col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3">
            <div class="panel panel-primary">
 
                <p>Welcome, {{ currentUser.full_name }} || <a @click="logout">Logout</a>
                <div class="panel-heading">Buckets <a class="pull-right btn btn-primary btn-sm" :href="`/bucketlists/create`">Create new</a></div>
                    <br/>
                            <form v-on:keyup="postSearch" @keydown="clear($event.target.name)">
        <div class="form-row">
          <div class="col-10">
            <input type="text" name="bucket_list_name" class="form-control" placeholder="Enter key word  ..." v-model="search.bucket_list_name">
          </div>

           <!-- v-on:keyup="postSearch" -->
          <div class="col-2">
            <button type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>
          </div>
        </div>
      </form>
<span v-show="submitted">  
<div class="panel-body" v-if="searchArray.data">
    <ul class="list-group">
        <li class="list-group-item">
            <a :href="`/bucketlists/${searchArray.data._id}`"  class="btn-default">{{ searchArray.data.bucket_list_name }} || created by {{ searchArray.data.full_name }}</a>
        </li>
    </ul>
</div>
</span>
<span v-show="submitted" v-if="!searchArray.data">  
<div class="panel-body">
    <ul class="list-group">
        <li class="list-group-item">
            <a   class="btn-default">No record found</a>
        </li>
    </ul>
</div>
</span>
<span v-show="!submitted" v-if="!error.msg">
<div class="panel-body" v-if="bucketlistsRetrieved.data && bucketlistsRetrieved.data.length !== 0">
<!-- <span>
<div class="panel-body"> -->
    <ul class="list-group" v-for="bucket in bucketlistsRetrieved.data" v-bind:key="bucket._id" v-show="bucket.full_name === currentUser.full_name">
        <li class="list-group-item">
            <a :href="`/bucketlists/${bucket._id}`" >{{ bucket.bucket_list_name }} || created by {{ bucket.full_name }}</a>
        </li>
    </ul>
</div>
</span>
                <span v-if="bucketlistsRetrieved.data && bucketlistsRetrieved.data.length === 0">
                 <center class="m-t-lg">Bucket List is empty.</center>
                </span>
        </div>
    </div>
 </div>


</div>
</template>



<script>
import Header from "@/views/partials/homepage/dashboard/Header.vue";
 import {getAllBucketList} from '../config'
  import {search} from '../config'
export default {
    data () {
        return {
            bucketlistsRetrieved: [],
            search: {
                bucket_list_name: ""
            },
            searchArray: [],
            error: {},
            submitted: false
        }
    },
      mounted(){
        this.getBucketLists();
        //this.postSearch();
        },

        computed: {
        loggedIn() {
            return this.$store.getters.loggedIn
        },
        currentUser(){
            return JSON.parse(localStorage.getItem('user'))
        }
    },
    methods: {
            getBucketLists() {
                this.$http.get(getAllBucketList, {
              headers:{
						"Authorization":"Bearer "+ this.$store.state.token
					}
          }).then(response =>{
              this.bucketlistsRetrieved = response.body
          })
          },
         
          postSearch() {
            this.$http.post(search, this.search, {
                  headers: {
                      "Authorization":"Bearer "+ this.$store.state.token
                  }
              })
              .then(response => {
                  this.searchArray = response.body
                  this.submitted = true
              })
            .catch(err => {
                 this.submitted = false
                this.error = err.body
            })
          },

              clear(){
            this.submitted = true;
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



<style lang="css" scoped>
 @import "/css/dashboard/bootstrap.min.css";
  @import "/css/dashboard/bootstrap-theme.min.css";
 @import "/css/dashboard/styles.css";
</style>


