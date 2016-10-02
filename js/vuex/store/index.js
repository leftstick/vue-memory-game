import Vue from 'vue';
import Vuex from 'vuex';

import actions from 'vuex/actions';
import getters from 'vuex/getters';
import mutations from 'vuex/mutations';

//have vuex involved
Vue.use(Vuex);

const state = {
    leftMatched: 0,
    highestSpeed: 0,
    status: '',
    cards: [],
    elapsedMs: 0,
    displayRank: false,
    displayNameInput: false,
    ranks: [],
    userName: ''
};

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    strict: process.env.NODE_ENV !== 'production'
});
