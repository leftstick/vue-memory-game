import 'css/main.css';
import Vue from 'vue';
import Game from './components/Game';
import store from 'js/vuex/store';


/* eslint-disable no-new */
new Vue({el: 'body', components: {Game}, store});
