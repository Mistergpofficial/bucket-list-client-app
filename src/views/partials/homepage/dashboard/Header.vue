<template>
<div>
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/">PMan<span>ager</span></a>
        </div>
      <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="nav navbar-nav navbar-right">
                        <li class="active" v-if="!loggedIn"><router-link :to="{name: 'home'}">Home</router-link></li>
                        <li v-if="!loggedIn"><router-link :to="{name: 'home'}">About</router-link></li>
                        <li class="btn-trial" v-if="!loggedIn"><router-link :to="{name: 'login'}">Login</router-link></li>
                        <li v-if="loggedIn"><a href="/buckets"><i class="fa fa-building" aria-hidden="true"></i>Buckets</a></li>
                        <li class="dropdown" v-if="loggedIn"><a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user"></i>{{ currentUser }} </a>
                            <ul class="dropdown-menu">
                                <li v-if="loggedIn"><a @click.prevent="logout" href=""><i class="fa fa-sign-out fa-2x"></i> Logout</a></li>
                            </ul>
                        </li>                       
                    </ul>
                </div>
           
      </div>
    </nav>
</div>  
</template>

<script>
export default {
    data () {
        return {
            
        }
    },
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn
        },
        currentUser(){
            return this.$store.state.currentUser
        }
    }
}
</script>
