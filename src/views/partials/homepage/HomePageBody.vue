<template>
   <div>
   <section id="content" class="m-t-lg wrapper-md animated fadeInDown"> 
     <a class="nav-brand" href="/">Bucket List App</a> 
     <div class="row m-n"> 
       <div class="col-md-4 col-md-offset-4 m-t-lg">
          <section class="panel"> 
            <header class="panel-heading text-center"> Sign up </header> 
            <div class="alert alert-success" v-if="submitted">
                <button class="close" type="button" data-dismiss="alert" aria-hidden="true">&#215;</button>
                  Registered Successfully
            </div>
            <span style="color:red;" v-if="errors.length > 0">{{ errors }}</span><br/>
            <form @submit.prevent="register()"  class="panel-body"> 
            <div class="form-group"> 
              <label class="control-label">Full name</label> 
              <input type="text" name="full_name" v-model="signupData.full_name" class="form-control"> 
            </div> 
            <div class="form-group"> 
              <label class="control-label">Username</label> 
              <input type="text" name="username" v-model="signupData.username" class="form-control"> 
            </div> 
            <div class="form-group"> 
              <label class="control-label">Your email address</label> 
              <input type="email" placeholder="test@example.com" v-model="signupData.email"  class="form-control"> 
            </div> 
            <div class="form-group"> 
              <label class="control-label">Type a password</label> 
              <input type="password" id="inputPassword" placeholder="Password" v-model="signupData.password"  class="form-control"> 
            </div> 
            <button type="submit" class="btn btn-lg btn-primary btn-block">Sign up</button> 
            <div class="line line-dashed"></div> 
            <p class="text-muted text-center"><small>Already have an account?</small></p> 
            <a :href="`/login`" class="btn btn-white btn-block">Sign in</a> 
            </form> 
          </section> 
          </div> 
          </div> 
          </section>
  
 
    </div>

</template>
<script>
 import {regUrl} from '../../../config'
    export default {
        data () {
            return {
                signupData: {
                    email: '',
                    password: '',
                    full_name: '',
                    username: ''
                },
                signingUp: false,
                submitted: false,
                errors: {}
                }
            },
            methods:{
                register(){
              this.$http.post(regUrl, this.signupData).then(response => {
                    this.$store.dispatch('setUser', JSON.stringify(response.data.user));
                    this.submitted = true;
                    this.signupData = "";
                   // this.$router.push('/')
              })
              .catch(err => {
                this.errors = err.body
              })
            },
              clear(){
            this.errors = false;
                 }, 

                

        }


    }
</script>



