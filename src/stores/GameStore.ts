import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { ICard, IState, IStatus } from '@/IType'
import { getHighestRecord, saveHighestRecord, shuffleAllCards } from '@/helper'
import CountTimer from './CountTimer'

export const GameStoreKey: InjectionKey<Store<IState>> = Symbol()

const GameStore = createStore<IState>({
  state() {
    return {
      nonMatchedPairs: 8,
      highestRecord: getHighestRecord(),
      status: IStatus.READY,
      cards: shuffleAllCards(),
      timeCost: 0
    }
  },
  getters: {
    nonMatchedPairs: s => s.nonMatchedPairs,
    highestRecord: s => s.highestRecord,
    status: s => s.status,
    cards: s => s.cards,
    timeCost: s => s.timeCost
  },
  actions: {
    updateStatus: (context, status: IStatus) => {
      context.commit('changeStatus', status)
      CountTimer.tryStartGame(status, context)
      CountTimer.tryEndGame(status, context)
    },
    flipsDelay: (context, { timeout, cards }: { timeout: number; cards: ICard[] }) => {
      setTimeout(() => {
        context.commit('flips', cards)
      }, timeout)
    }
  },
  mutations: {
    reset: state => {
      state.nonMatchedPairs = 8
      state.highestRecord = getHighestRecord()
      state.cards = shuffleAllCards()
      state.status = IStatus.READY
      state.timeCost = 0
    },
    counting: state => {
      state.timeCost = state.timeCost + 1
    },
    updateNonMatchedPairs: (state, payload) => {
      state.nonMatchedPairs = state.nonMatchedPairs + payload
    },
    flips: (state, cards: ICard[]) => {
      state.cards
        .filter(c => cards.some(cc => cc.id === c.id))
        .forEach(c => {
          c.flipped = !c.flipped
        })
    },
    changeStatus: (state, status: IStatus) => {
      state.status = status
    },
    updateTopScore(state) {
      saveHighestRecord(state.timeCost)
    }
  }
})

export { GameStore }
