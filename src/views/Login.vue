<template>
    <div>
     <section id="content" class="m-t-lg wrapper-md animated fadeInUp"> 
       <a class="nav-brand" :href="`/`">Bucket List App</a> 
       <div class="row m-n">
          <div class="col-md-4 col-md-offset-4 m-t-lg">
             <section class="panel">
                <header class="panel-heading text-center"> Sign in </header>
                  <span style="color:red;" v-if="errors.length > 0">{{ errors }}</span><br/>
                <form @submit.prevent="login" class="panel-body" action="#" method="POST" @keydown="clear($event.target.name)">
                  <div class="form-group">
                     <label class="control-label">Email</label>
                      <input type="email" placeholder="test@example.com" name="email" v-model="loginData.email"  class="form-control"> 
                  </div> 
                  <div class="form-group"> 
                    <label class="control-label">Password</label> 
                    <input type="password" id="inputPassword" placeholder="Password" name="password" v-model="loginData.password" class="form-control">
                  </div>
                  <div class="checkbox"><label><input type="checkbox"> Keep me logged in </label> </div> 
                  <a href="#" class="pull-right m-t-xs"><small>Forgot password?</small></a> 
                 <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
                  <div class="line line-dashed"></div> 
                  <a href="#" class="btn btn-facebook btn-block m-b-sm"><i class="fa fa-facebook pull-left"></i>Sign in with Facebook</a> 
                  <a href="#" class="btn btn-twitter btn-block"><i class="fa fa-twitter pull-left"></i>Sign in with Twitter</a> 
                  <div class="line line-dashed"></div> 
                  <p class="text-muted text-center"><small>Do not have an account?</small></p> 
                  <a :href="`/`" class="btn btn-white btn-block">Create an account</a> 
                  </form> 
                  </section> 
                  </div> 
                  </div> 
                  </section> 
 
    </div>
</template>


<script>
 import {loginUrl} from '../config'
    export default {
        data () {
             return {
                loginData: {
                    email: '',
                    password: '',
                },
                errors: {}
                }
            },
        methods: {
             login(){
              this.$http.post(loginUrl, this.loginData).then(response => {
                  this.$store.dispatch('setToken', JSON.stringify(response.data.token));
                    this.$store.dispatch('setUser', JSON.stringify(response.data.user));
                    localStorage.setItem('token', JSON.stringify(response.data.token));
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    window.location = "/bucketlists"
              })
              .catch(err => {
                this.errors = err.body
              })
            },
              clear(){
            this.error = false;
                 }, 
            
        }

    }
</script>

<style lang="css" scoped>
 @import "/css/login/login3-style.css";
</style>