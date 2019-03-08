<template>
  <div class="">
   <Header></Header>
	 <Body></Body>
	 <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/views/partials/homepage/Header.vue'
import Body from '@/views/partials/homepage/HomePageBody.vue'
import Footer from '@/views/partials/homepage/Footer.vue'

export default {
  name: 'home',
  components: {
		Header,
		Body,
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
</style>