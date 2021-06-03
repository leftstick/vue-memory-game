<template>
  <div class="game-panel">
    <ScoreBoard />
    <ChessBoard />
    <GameStatus />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GameStoreKey } from '@/stores'
import { ScoreBoard, ChessBoard, GameStatus } from '@/components'

export default defineComponent({
  name: 'Game',
  setup() {
    const store = useStore(GameStoreKey)
    const { commit } = store

    onMounted(() => {
      commit('reset')
    })
  },
  components: { ScoreBoard, ChessBoard, GameStatus }
})
</script>

<style scoped>
.game-panel {
  width: 450px;
  height: 670px;
  border: 4px solid #bdbdbd;
  border-radius: 2px;
  background-color: #faf8ef;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 450px) {
  .game-panel {
    width: 100%;
    height: 100%;
    justify-content: space-around;
  }
}
</style>
