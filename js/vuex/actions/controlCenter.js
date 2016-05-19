
import {shuffle} from 'js/lib/shuffle';

const cardNames = ['8-ball', 'kronos', 'baked-potato', 'dinosaur', 'rocket', 'skinny-unicorn',
    'that-guy', 'zeppelin'];

export const reset = function({dispatch, state}) {
    dispatch('RESET', {
        leftMatched: 8,
        highestSpeed: localStorage.getItem('highestSpeed') || 0,
        status: 'READY',
        cards: shuffle(cardNames.concat(cardNames))
            .map(name => ({flipped: false, cardName: name})),
        elapsedMs: 0
    });
};

let timerId;

export const updateStatus = function({dispatch, state}, status) {
    dispatch('UPDATE-STATUS', status || 'READY');
    if (status === 'PLAYING') {
        timerId = setInterval(function() {
            dispatch('COUNTING');
        }, 1000);

    } else if (status === 'PASS') {
        clearInterval(timerId);
        dispatch('UPDATE-HIGHESTSPEED');
    }
};

export const flipCard = function({dispatch, state}, card) {
    dispatch('FLIP', card);
};

export const flipCards = function({dispatch, state}, cards) {
    dispatch('FLIPS', cards);
};

export const match = function({dispatch, state}) {
    dispatch('DECREASE-MATCH', 1);
};
