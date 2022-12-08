<template>
  <div class="score-board">
    <GameLogo />
    <ProgressBar />
    <GameScore />
  </div>
</template>

<script lang="ts">
export default {
  name: 'ScoreBoard'
}
</script>
<script lang="ts" setup>
import GameLogo from './GameLogo.vue'
import GameScore from './GameScore.vue'
import ProgressBar from './ProgressBar.vue'
</script>

<style scoped>
.score-board {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
