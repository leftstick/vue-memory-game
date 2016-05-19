import Vue from 'vue';
import Vuex from 'vuex';

//have vuex involved
Vue.use(Vuex);

const state = {
    leftMatched: 0,
    highestSpeed: 0,
    status: '',
    cards: [],
    elapsedMs: 0
};

const mutations = {
    RESET(st, newState) {
        st.leftMatched = newState.leftMatched;
        st.highestSpeed = newState.highestSpeed;
        st.status = newState.status;
        st.cards = newState.cards;
        st.elapsedMs = newState.elapsedMs;
    },

    'UPDATE-STATUS'(st, newStatus) {
        st.status = newStatus;
    },

    'DECREASE-MATCH'(st) {
        st.leftMatched--;
    },

    FLIP(st, card) {
        var c = st.cards.find(cc => cc === card);
        c.flipped = !c.flipped;
    },

    FLIPS(st, cards) {
        st.cards
            .filter(cc => cards.indexOf(cc) >= 0)
            .forEach(cc => {
                cc.flipped = !cc.flipped;
            });
    },

    COUNTING(st) {
        st.elapsedMs++;
    },

    'UPDATE-HIGHESTSPEED'(st) {
        if (!localStorage.getItem('highestSpeed')) {
            return localStorage.setItem('highestSpeed', st.elapsedMs);
        }
        if (localStorage.getItem('highestSpeed') > st.elapsedMs) {
            return localStorage.setItem('highestSpeed', st.elapsedMs);
        }
    }
};

export default new Vuex.Store({state, mutations});
