<template>
<div class="container">
 <br>
 <br>
    <div class="row">
        <div class="col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3">
            <div class="panel panel-primary">
 
                <p>Welcome, {{ currentUser.full_name }} || <a @click="logout">Logout</a>
                
                <div class="panel-heading">Buckets <a class="pull-right btn btn-primary btn-sm" :href="`/bucketlists/create`">Create new</a></div>
                    <div class="panel-body">
                        <ul class="list-group" v-for="bucket in bucketlistsRetrieved.bucketArray" v-bind:key="bucket._id" v-show="bucket.full_name === currentUser.full_name">
        <li class="list-group-item">
            <a :href="`/bucketlists/${bucket._id}`" class="btn-default">{{ bucket.bucket_list_name }} || created by {{ bucket.full_name }}</a>
        </li>
        

<span v-if="bucket.full_name === currentUser.full_name === 0">
                 <center class="m-t-lg">Bucket List is empty.</center>
                </span>

    </ul>

      

                    </div>
                </div>
            </div>
        </div>


</div>
</template>



<script>
import Header from "@/views/partials/homepage/dashboard/Header.vue";
 import {getAllBucketList} from '../config'
//import BucketListService from '@/services/BucketListService'
export default {
    data () {
        return {
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
              this.bucketlistsRetrieved = response.body || JSON.parse(response.data)
          })
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



<style lang="css" scoped>
 @import "/css/dashboard/bootstrap.min.css";
  @import "/css/dashboard/bootstrap-theme.min.css";
 @import "/css/dashboard/styles.css";
</style>


