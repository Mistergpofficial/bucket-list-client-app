<template>
   <div class="bg1" style="background: url('/images/banner.jpg');background-size:cover;">
<br>
<br>
            <div class="row">
                <div class="col-md-7"></div>
                <div class="col-md-4 panel">
                 
                    <!-- sign in form begins -->
                    <form @submit.prevent="register()"  class="form-horizontal" enctype="multipart/form-data" @keydown="clear($event.target.name)">
                        <fieldset>
                             <div class="alert alert-success" v-if="submitted">
                                   <button class="close" type="button" data-dismiss="alert" aria-hidden="true">&#215;</button>
                                   You request has been sent..A mail has been sent to you
                               </div>
    	                    <p style="color:red;" v-if="errors.length > 0">{{ errors }}</p><br/>
                            
                            <!-- Text input-->
                            <div class="form-group">
                                <label class="col-md-12 control-label"></label>
                                <div class="col-md-12">
                                    <input name="full_name" id="full_name" v-model="signupData.full_name" placeholder="Enter your full name" class="form-control input-md" type="text" >
                                </div>
                            </div>
                           
                           <div class="form-group">
                                <label class="col-md-12 control-label"></label>
                                <div class="col-md-12">
                                    <input name="username" id="username" v-model="signupData.username" placeholder="Enter your username" class="form-control input-md" type="text" >
                                    <span style="color: red;" class="text-danger"></span>
                                </div>
                            </div>
                          

                            <!-- Text input-->
                            <div class="form-group">
                                <label class="col-md-12 control-label"></label>
                                <div class="col-md-12">
                                    <input name="email" id="email" v-model="signupData.email" placeholder="Enter your email" class="form-control input-md" type="email" >
                                </div>
                            </div>

                             <!-- Text input-->
                            <div class="form-group">
                                <label class="col-md-12 control-label"></label>
                                <div class="col-md-12">
                                    <input name="password" id="password" v-model="signupData.password" placeholder="******" class="form-control input-md" type="password">
                                </div>
                            </div>


                            <div class="group">
                                <button type="submit" :class="[ (signingUp)?  'is-loading' : '' ]" class="btn btn-primary" >Sign Up</button>
                            </div>
                            <div class="hr"></div>
                            <div class="foot-lnk">
                                <label>Already Member?</label>
                                <a href="/login" class="btn btn-primary">Login</a>
                            </div>

                        </fieldset>
                    </form>
                </div><!--col-md-6 end-->

            </div>
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
