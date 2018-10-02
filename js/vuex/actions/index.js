import { shuffle } from '../../lib/shuffle'
import { STATUS } from '../store/statusEnum'

const cardNames = ['8-ball', 'kronos', 'baked-potato', 'dinosaur', 'rocket', 'skinny-unicorn', 'that-guy', 'zeppelin']

let timerId

const statusHandler = {
  PLAYING: function({ commit }) {
    timerId = setInterval(function() {
      commit('counting')
    }, 1000)
  },

  PASS: function({ commit }) {
    clearInterval(timerId)
    commit('updateHighestSpeed')
  }
}

export default {
  reset: function({ commit }) {
    commit('reset', {
      leftMatched: 8,
      highestSpeed: localStorage.getItem('highestSpeed') || 9999,
      status: STATUS.READY,
      cards: shuffle(cardNames.concat(cardNames)).map(name => ({ flipped: false, cardName: name })),
      elapsedMs: 0
    })
  },

  updateStatus: function(context, status) {
    context.commit('updateStatus', status)
    statusHandler[status] && statusHandler[status](context)
  },

  flipCard: function({ commit }, card) {
    commit('flip', card)
  },

  flipCards: function({ commit }, cards) {
    commit('flips', cards)
  },

  match: function({ commit }) {
    commit('decreaseMatch')
  }
}
