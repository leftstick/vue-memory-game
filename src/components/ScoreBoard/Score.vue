<template>
  <div class="score">
    <span>Highest Record</span>
    <h2>{{ highestRecord }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { GameStoreKey } from '@/stores'
export default defineComponent({
  name: 'Score',
  setup: () => {
    const { state } = useStore(GameStoreKey)
    return {
      highestRecord: computed(() => state.highestRecord)
    }
  }
})
</script>

<style scoped>
.score {
  width: 120px;
  height: 100px;
  padding: 10px;
  background-color: #bbada0;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: #eae0d1;
}

span {
  font-size: 19px;
  font-weight: bold;
  display: block;
  width: 100%;
  text-align: center;
}

h2 {
  color: #fff;
}
@media screen and (max-width: 450px) {
  .score {
    width: 105px;
  }
  span {
    font-size: 17px;
  }
}
@media screen and (max-width: 380px) {
  .score {
    width: 95px;
  }
}

@media screen and (max-width: 360px) {
  .score {
    width: 90px;
  }
  span {
    font-size: 15px;
  }
}
</style>
