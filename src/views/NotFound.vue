<template>
  <div class="">
   <Header></Header>
	  <!--==========Error area==========-->
        <section class="error_area p_100">
            <div class="container">
                <div class="error_content">
                    <h3>404</h3>
                    <h4>This page is not be found</h4>
                    <p>Uh oh, we can’t seem to find the page you’re looking for. Try going back to the previous page or see our Help Center for more information</p>
                    <a class="blog_btn" href="/">Back to Home Page</a>
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