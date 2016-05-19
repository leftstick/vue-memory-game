import 'css/main.css';
import Vue from 'vue';
import Game from './components/Game';
import store from 'js/vuex/store';

//the main entrance
/* eslint-disable no-new */
new Vue({el: 'body', components: {Game}, store});
