<template>
  <div class="">
    <section id="content"> 
      <div class="row m-n"> 
        <div class="col-sm-4 col-sm-offset-4"> 
          <div class="text-center m-b-lg"> 
            <h1 class="h text-white animated bounceInDown">404</h1> 
          </div> 
          <div class="list-group m-b-sm bg-white m-b-lg"> 
            <a :href="`/`" class="list-group-item"> 
              <i class="fa fa-chevron-right text-muted"></i> 
              <i class="fa fa-fw fa-home text-muted"></i> Goto homepage 
            </a> 
            <a href="#" class="list-group-item"> 
              <i class="fa fa-chevron-right text-muted"></i> 
              <i class="fa fa-fw fa-question text-muted"></i> Send us a tip 
              </a> 
            <a href="#" class="list-group-item"> 
              <i class="fa fa-chevron-right text-muted"></i> 
              <span class="badge">+234(70)88510224</span> 
              <i class="fa fa-fw fa-phone text-muted"></i> Call us 
            </a> </div> 
          </div> 
        </div> 
      </section>
	 <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/views/partials/homepage/Header.vue'
import Footer from '@/views/partials/homepage/Footer.vue'

export default {
  name: 'home',
  components: {
        Header,
        Footer
  },
  data () {
    return {
			
		}
  },
  methods: {
    
  }
}
</script>

<style lang="css" scoped>
 @import "/css/admin/bootstrap.min.css";
 @import "/static/css/admin/font-awesome.min.css";
 @import "/static/css/admin/ionicons.css";
 @import "/static/css/admin/simple-line-icons.css";
 @import "/static/css/error.css";
</style>