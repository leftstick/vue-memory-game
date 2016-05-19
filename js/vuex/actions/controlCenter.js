
import {shuffle} from 'js/lib/shuffle';

import {RESET, UPDATE_STATUS, COUNTING, UPDATE_HIGHESTSPEED, FLIP, FLIPS, DECREASE_MATCH} from './types';

const cardNames = ['8-ball', 'kronos', 'baked-potato', 'dinosaur', 'rocket', 'skinny-unicorn',
    'that-guy', 'zeppelin'];

export const reset = function({dispatch, state}) {
    dispatch(RESET, {
        leftMatched: 8,
        highestSpeed: localStorage.getItem('highestSpeed') || 0,
        status: 'READY',
        cards: shuffle(cardNames.concat(cardNames))
            .map(name => ({flipped: false, cardName: name})),
        elapsedMs: 0
    });
};

let timerId;

let statusHandler = {
    PLAYING: function(dispatch) {
        timerId = setInterval(function() {
            dispatch(COUNTING);
        }, 1000);
    },

    PASS: function(dispatch) {
        clearInterval(timerId);
        dispatch(UPDATE_HIGHESTSPEED);
    }
};

export const updateStatus = function({dispatch, state}, status) {
    dispatch(UPDATE_STATUS, status);
    statusHandler[status] && statusHandler[status](dispatch);
};

export const flipCard = function({dispatch, state}, card) {
    dispatch(FLIP, card);
};

export const flipCards = function({dispatch, state}, cards) {
    dispatch(FLIPS, cards);
};

export const match = function({dispatch, state}) {
    dispatch(DECREASE_MATCH);
};
