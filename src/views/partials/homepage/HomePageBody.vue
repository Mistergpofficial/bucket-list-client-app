<template>
   <div>
          <!-- Start Preloader -->
    <div id="preload-block">
      <div class="square-block"></div>
    </div>
    <!-- Preloader End -->
    
    <div class="container-fluid">
      <div class="row">
        <div class="authfy-container col-xs-12 col-sm-10 col-md-8 col-lg-6 col-sm-offset-1 col-md-offset-2 col-lg-offset-3">
          <div class="col-sm-5 authfy-panel-left">
            <div class="brand-col">
              <div class="headline">
                <!-- brand-logo start -->
                <div class="brand-logo">
                 <h1>Meeks Bucket Service</h1>
                </div><!-- ./brand-logo -->
                <p>Login using social media to get quick access</p>
                <!-- social login buttons start -->
                <div class="row social-buttons">
                  <div class="col-xs-4 col-sm-4 col-md-12">
                    <a href="#" class="btn btn-block btn-facebook" disabled>
                      <i class="fa fa-facebook"></i> <span class="hidden-xs hidden-sm">Signin with facebook</span>
                    </a>
                  </div>
                  <div class="col-xs-4 col-sm-4 col-md-12">
                    <a href="#" class="btn btn-block btn-twitter" disabled>
                      <i class="fa fa-twitter"></i> <span class="hidden-xs hidden-sm">Signin with twitter</span>
                    </a>
                  </div>
                  <div class="col-xs-4 col-sm-4 col-md-12">
                    <a href="#" class="btn btn-block btn-google" disabled>
                      <i class="fa fa-google-plus"></i> <span class="hidden-xs hidden-sm">Signin with google</span>
                    </a>
                  </div>
                </div><!-- ./social-buttons -->
              </div>
            </div>
          </div>
          <div class="col-sm-7 authfy-panel-right">
            <!-- authfy-login start -->
            <div class="authfy-login">
              <!-- panel-login start -->
              <div class="authfy-panel panel-login text-center active">
    
                  <h4 class="auth-title">Sign up to get started</h4>
                  <p>Already have an account? <a class="lnk-toggler" data-panel=".panel-signup" href="/index">Login Now!</a></p>
          
                <div class="row">
                  <div class="col-xs-12 col-sm-12">
                    <div class="alert alert-success" v-if="submitted">
                                   <button class="close" type="button" data-dismiss="alert" aria-hidden="true">&#215;</button>
                                   Registered Successfully
                               </div>
                      <span style="color:red;" v-if="errors.length > 0">{{ errors }}</span><br/>
                    <form @submit.prevent="register()"  name="signupForm" class="signupForm" @keydown="clear($event.target.name)">
                       <div class="form-group">
                        <input type="text" class="form-control" name="full_name"  v-model="signupData.full_name" placeholder="Full Name">
                      </div>
                       <div class="form-group">
                        <input type="text" class="form-control" name="username"  v-model="signupData.username" placeholder="Username">
                      </div>
                      <div class="form-group">
                        <input type="email" class="form-control" name="email"  v-model="signupData.email" placeholder="Email address">
                      </div>
                      <div class="form-group">
                        <div class="pwdMask">
                          <input  type="password" class="form-control" name="password"  v-model="signupData.password" placeholder="Password">
                          <span class="fa fa-eye-slash pwd-toggle"></span>
                        </div>
                      </div>
                      <div class="form-group">
                        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div> <!-- ./panel-login -->
              <!-- panel-signup start -->
              <div class="authfy-panel panel-signup text-center">
                <div class="row">
                  <div class="col-xs-12 col-sm-12">
                    <div class="authfy-heading">
                      <h3 class="auth-title">Login to your account</h3>
                         <p>Don't have an account already? <a class="lnk-toggler" data-panel=".panel-signup" href="/index">Sign Up Now!</a></p>
                    </div>
                   <form @submit.prevent="login" name="loginForm" class="loginForm" action="#" method="POST" @keydown="clear($event.target.name)">
                      <div class="form-group">
                        <input type="email" class="form-control email" name="email" v-model="loginData.email" placeholder="Email address">
                      </div>
                      <div class="form-group">
                        <div class="pwdMask">
                          <input type="password" class="form-control password" v-model="loginData.password" name="password" placeholder="Password">
                          <span class="fa fa-eye-slash pwd-toggle"></span>
                        </div>
                      </div>
                      <!-- start remember-row -->
                      <div class="row remember-row">
                        <div class="col-xs-6 col-sm-6">
                          <p class="forgotPwd">
                            <a class="lnk-toggler" data-panel=".panel-forgot" href="#">Forgot password?</a>
                          </p>
                        </div>
                      </div> <!-- ./remember-row -->
                      <div class="form-group">
                        <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
                      </div>
                    </form>
                    <a class="lnk-toggler" data-panel=".panel-login" href="#">Already have an account?</a>
                  </div>
                </div>
              </div> <!-- ./panel-signup -->
              <!-- panel-forget start -->
              <div class="authfy-panel panel-forgot">
                <div class="row">
                  <div class="col-xs-12 col-sm-12">
                    <div class="authfy-heading">
                      <h3 class="auth-title">Recover your password</h3>
                      <p>Fill in your e-mail address below and we will send you an email with further instructions.</p>
                    </div>
                    <form name="forgetForm" class="forgetForm" action="#" method="POST">
                      <div class="form-group">
                        <input type="email" class="form-control" name="username" placeholder="Email address">
                      </div>
                      <div class="form-group">
                        <button class="btn btn-lg btn-primary btn-block" type="submit">Recover your password</button>
                      </div>
                      <div class="form-group">
                        <a class="lnk-toggler" data-panel=".panel-login" href="#">Already have an account?</a>
                      </div>
                      <div class="form-group">
                        <a class="lnk-toggler" data-panel=".panel-signup" href="#">Don’t have an account?</a>
                      </div>
                    </form>
                  </div>
                </div>
              </div> <!-- ./panel-forgot -->
            </div> <!-- ./authfy-login -->
          </div>
        </div>
      </div> <!-- ./row -->
    </div> <!-- ./container -->
    
   
  
 
    </div>

</template>
<script>
 import {regUrl} from '../../../config'
 import {loginUrl} from '../../../config'
    export default {
        data () {
            return {
                signupData: {
                    email: '',
                    password: '',
                    full_name: '',
                    username: ''
                },
                loginData: {
                email: '',
                password: '',
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
            this.errors = false;
                 }, 

                

        }


    }
</script>


<style scoped>
    .full-height {
        height: 100vh;
    }

    .flex-center {
        align-items: center;
        display: flex;
        justify-content: center;
    }

    .position-ref {
        position: relative;
    }

    .top-right {
        position: absolute;
        right: 10px;
        top: 18px;
    }

    .content {
        text-align: center;
    }

    .title {
        font-size: 84px;
    }

    .links > a {
        color: #636b6f;
        padding: 0 25px;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: .1rem;
        text-decoration: none;
        text-transform: uppercase;
    }

    .m-b-md {
        margin-bottom: 30px;
    }
</style>
