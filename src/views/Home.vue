<template>
  <div class="">
	 <Body></Body>
	 <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Body from '@/views/partials/homepage/HomePageBody.vue'
import Footer from '@/views/partials/homepage/Footer.vue'

export default {
  name: 'home',
  components: {
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

