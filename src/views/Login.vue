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
                  <img src="images/login/brand-logo-white.png" width="150" alt="brand-logo">
                </div><!-- ./brand-logo -->
                <p>Login using social media to get quick access</p>
                <!-- social login buttons start -->
                <div class="row social-buttons">
                  <div class="col-xs-4 col-sm-4 col-md-12">
                    <a href="#" class="btn btn-block btn-facebook">
                      <i class="fa fa-facebook"></i> <span class="hidden-xs hidden-sm">Signin with facebook</span>
                    </a>
                  </div>
                  <div class="col-xs-4 col-sm-4 col-md-12">
                    <a href="#" class="btn btn-block btn-twitter">
                      <i class="fa fa-twitter"></i> <span class="hidden-xs hidden-sm">Signin with twitter</span>
                    </a>
                  </div>
                  <div class="col-xs-4 col-sm-4 col-md-12">
                    <a href="#" class="btn btn-block btn-google">
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
                <div class="authfy-heading">
                  <h3 class="auth-title">Login to your account</h3>
                  <p>Don’t have an account? <a class="lnk-toggler" data-panel=".panel-signup" href="/home">Sign Up Free!</a></p>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-sm-12">
                      <p style="color:red;" v-if="errors.length > 0">{{ errors }}</p><br/>
                                
                    <form @submit.prevent="login" name="loginForm" class="loginForm" action="#" method="POST">
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
                          <label class="checkbox text-left">
                            <input type="checkbox" value="remember-me">
                            <span class="label-text">Remember me</span>
                          </label>
                        </div>
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
                  </div>
                </div>
              </div> <!-- ./panel-login -->
              <!-- panel-signup start -->
              <div class="authfy-panel panel-signup text-center">
                <div class="row">
                  <div class="col-xs-12 col-sm-12">
                    <div class="authfy-heading">
                      <h3 class="auth-title">Sign up for free!</h3>
                    </div>
                    <form name="signupForm" class="signupForm" action="#" method="POST">
                      <div class="form-group">
                        <input type="email" class="form-control" name="username" placeholder="Email address">
                      </div>
                      <div class="form-group">
                        <input type="text" class="form-control" name="fullname" placeholder="Full name">
                      </div>
                      <div class="form-group">
                        <div class="pwdMask">
                          <input  type="password" class="form-control" name="password" placeholder="Password">
                          <span class="fa fa-eye-slash pwd-toggle"></span>
                        </div>
                      </div>
                      <div class="form-group">
                        <p class="term-policy text-muted small">I agree to the <a href="#">privacy policy</a> and <a href="#">terms of service</a>.</p>
                      </div>
                      <div class="form-group">
                        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign up with email</button>
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
 import {loginUrl} from '../config'
    export default {
        data () {
            return {
                loginData: {
                email: '',
                password: '',
                },
               errors: {},
                
            }


        },
        methods: {
            // async login() {
            //     try {
            //         const response = await UserService.login(this.loginData)
            //         this.$store.dispatch('setToken', JSON.stringify(response.data.token));
            //         this.$store.dispatch('setUser', JSON.stringify(response.data.user));
            //         localStorage.setItem('token', JSON.stringify(response.data.token));
            //         localStorage.setItem('user', JSON.stringify(response.data.user));
            //         window.location = "/bucketlists"
            //         //this.$router.push({name: 'bucketlist'});
            //     }
            //     catch(err) {
            //         this.errors = err.response.data.errors
            //     }
              
            // },
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
            }
            
        }

    }
</script>

<style lang="css" scoped>
 @import "/css/login/login3-style.css";
</style>