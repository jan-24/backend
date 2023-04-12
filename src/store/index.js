import Vue from 'vue'
import Vuex from 'vuex'
import tad from './tad'


Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    tad
  }
})