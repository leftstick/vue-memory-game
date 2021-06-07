<template>
  <div class="chessboard">
    <Card v-for="card of cards" :key="card.id" :card="card" @onFlip="onFlip" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ICard, IStatus } from '@/IType'
import { GameStoreKey } from '@/stores'
import Card from './Card.vue'

export default defineComponent({
  name: 'ChessBoard',
  components: { Card },
  setup: () => {
    let lastCard = ref<ICard | null>(null)
    const { state, dispatch, commit } = useStore(GameStoreKey)
    const realtimeStatus = computed(() => state.status)
    const realtimeNonMatchedPairs = computed(() => state.nonMatchedPairs)
    const realtimeCards = computed(() => state.cards)

    const onFlip = (e: ICard) => {
      if (realtimeStatus.value === IStatus.READY) {
        dispatch('updateStatus', IStatus.PLAYING)
      }
      if (!lastCard.value) {
        lastCard.value = e
        return
      }
      if (lastCard.value !== e && lastCard.value.name === e.name) {
        lastCard.value = null
        commit('updateNonMatchedPairs', -1)
        if (!realtimeNonMatchedPairs.value) {
          dispatch('updateStatus', IStatus.PASSED)
        }
        return
      }

      const savedLastCard = lastCard.value
      lastCard.value = null
      dispatch('flipsDelay', {
        timeout: 1000,
        cards: [savedLastCard, e]
      })
    }

    return {
      onFlip,
      cards: realtimeCards
    }
  }
})
</script>

<style scoped>
.chessboard {
  margin-top: 20px;
  width: 100%;
  background-color: #fff;
  height: 530px;
  border-radius: 4px;
  padding: 10px 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: space-around;
}

.container:nth-child(4n) {
  margin-right: 0px;
}

@media screen and (max-width: 450px) {
  .chessboard {
    height: 480px;
    padding: 10px 0px;
  }
}
@media screen and (max-width: 370px) {
  .chessboard {
    height: 450px;
  }
}
</style>
