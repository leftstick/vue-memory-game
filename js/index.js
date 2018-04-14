import '../css/main.css'
import Vue from 'vue'
import Game from './components/Game'
import store from './vuex/store'

// the main entrance
/* eslint-disable no-new */
new Vue({
  el: '#application',
  render(h) {
    return h(Game)
  },
  store
})
