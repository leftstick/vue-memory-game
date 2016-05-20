
import {shuffle} from 'lib/shuffle';
import {STATUS} from 'vuex/store/statusEnum';

import {TYPES} from './types';

const cardNames = ['8-ball', 'kronos', 'baked-potato', 'dinosaur', 'rocket', 'skinny-unicorn',
    'that-guy', 'zeppelin'];

export const reset = function({dispatch, state}) {
    dispatch(TYPES.RESET, {
        leftMatched: 8,
        highestSpeed: localStorage.getItem('highestSpeed') || 9999,
        status: STATUS.READY,
        cards: shuffle(cardNames.concat(cardNames))
            .map(name => ({flipped: false, cardName: name})),
        elapsedMs: 0
    });
};

let timerId;

let statusHandler = {
    PLAYING: function(dispatch) {
        timerId = setInterval(function() {
            dispatch(TYPES.COUNTING);
        }, 1000);
    },

    PASS: function(dispatch) {
        clearInterval(timerId);
        dispatch(TYPES.UPDATE_HIGHESTSPEED);
    }
};

export const updateStatus = function({dispatch, state}, status) {
    dispatch(TYPES.UPDATE_STATUS, status);
    statusHandler[status] && statusHandler[status](dispatch);
};

export const flipCard = function({dispatch, state}, card) {
    dispatch(TYPES.FLIP, card);
};

export const flipCards = function({dispatch, state}, cards) {
    dispatch(TYPES.FLIPS, cards);
};

export const match = function({dispatch, state}) {
    dispatch(TYPES.DECREASE_MATCH);
};
