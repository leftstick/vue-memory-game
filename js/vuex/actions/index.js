
import {shuffle} from 'lib/shuffle';
import {STATUS} from 'vuex/store/statusEnum';

import wilddog from 'wilddog';

const cardNames = ['8-ball', 'kronos', 'baked-potato', 'dinosaur', 'rocket', 'skinny-unicorn',
    'that-guy', 'zeppelin'];

let timerId,
    ref;

const config = {syncURL: 'https://memorygame.wilddogio.com'};

let statusHandler = {
    PLAYING: function({commit}) {
        timerId = setInterval(function() {
            commit('counting');
        }, 1000);
    },

    PASS: function({commit}) {
        clearInterval(timerId);
        commit('updateHighestSpeed');
        commit('toggleNameInput', true);
    }
};

export default {
    reset: function({commit}) {
        commit('reset', {
            leftMatched: 8,
            highestSpeed: localStorage.getItem('highestSpeed') || 9999,
            status: STATUS.READY,
            cards: shuffle(cardNames.concat(cardNames))
                .map(name => ({flipped: false, cardName: name})),
            elapsedMs: 0,
            displayRank: false,
            displayNameInput: false,
            ranks: [],
            userName: localStorage.getItem('userName') || ''
        });
    },

    updateStatus: function(context, status) {
        context.commit('updateStatus', status);
        statusHandler[status] && statusHandler[status](context);
    },

    setupServerChannel: function({commit}) {
        wilddog.initializeApp(config);
        ref = wilddog.sync().ref('users');
        ref
            .orderByChild('speed')
            .limitToFirst(10)
            .on('value', function(data) {

                let ranks = [];
                let obj = data.val();
                if (!obj) {
                    return;
                }
                let keys = Object.keys(obj);

                for (let i = 0; i < keys.length; i++) {
                    ranks.push(obj[keys[i]]);
                }
                ranks.sort((a, b) => a.speed - b.speed);
                commit('updateRanks', ranks);
            }, function(err) {
                console.log('error', err);
            });
    },

    updateUserName: function({commit}, name) {
        commit('updateUsername', name);
    },

    flipCard: function({commit}, card) {
        commit('flip', card);
    },

    flipCards: function({commit}, cards) {
        commit('flips', cards);
    },

    match: function({commit}) {
        commit('decreaseMatch');
    },

    toggleRank: function({commit}, boo) {
        commit('toggleRank', boo);
    },

    toggleNameInput: function({commit}, boo) {
        commit('toggleNameInput', boo);
    },

    updateRank: function({state, commit}) {
        ref
            .child(state.userName)
            .set({
                username: state.userName,
                speed: state.elapsedMs
            });
    }
};
