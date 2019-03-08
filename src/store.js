import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
Vue.use(axios);
const regUrl = "http://localhost:4000/auth/register"

export default new Vuex.Store({
  strict: true,
  state: {
    token: JSON.parse(localStorage.getItem('token')) || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    loggedIn: false,
    message: '',
  },
  getters: {
    loggedIn(state) {
      return state.token != null
    },
    currentUser(state){
      return state.user
    },
    getMessage(state){
			return state.message;
    }
  },
  mutations: {
    setToken: (state, token) => {
        state.token = token
        },
    setUser: (state, user) => {
      state.user = user
    },
    logout(state){
			state.message = "You have been Logged out...";
      localStorage.removeItem("user");
      localStorage.removeItem("token");
		//	getters.loggedIn = false;
      state.user = null;
  	},
  },
  actions: {
    setToken({commit}, token){
      commit('setToken', token)
    },
    setUser({commit}, user){
      commit('setUser', user)
    },
    logout(context){
			context.commit("logout");
  }
  },
});
