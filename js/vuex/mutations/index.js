export default {
  reset(st, newState) {
    st.leftMatched = newState.leftMatched
    st.highestSpeed = newState.highestSpeed
    st.status = newState.status
    st.cards = newState.cards
    st.elapsedMs = newState.elapsedMs
  },

  updateStatus(st, newStatus) {
    st.status = newStatus
  },

  decreaseMatch(st) {
    st.leftMatched--
  },

  flip(st, card) {
    var c = st.cards.find(cc => cc === card)
    c.flipped = !c.flipped
  },

  flips(st, cards) {
    st.cards
      .filter(cc => cards.indexOf(cc) >= 0)
      .forEach(cc => {
        cc.flipped = !cc.flipped
      })
  },

  counting(st) {
    st.elapsedMs++
  },

  updateHighestSpeed(st) {
    if (!localStorage.getItem('highestSpeed')) {
      return localStorage.setItem('highestSpeed', st.elapsedMs)
    }
    if (localStorage.getItem('highestSpeed') > st.elapsedMs) {
      return localStorage.setItem('highestSpeed', st.elapsedMs)
    }
  }
}
