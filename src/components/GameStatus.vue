<template>
  <div class="status-footer">
    <span v-if="status === IStatus.READY">Ready</span>
    <span v-if="status === IStatus.PLAYING">Playing</span>
    <a v-if="status === IStatus.PASSED" @click.prevent.stop="reset">Play again</a>
    <span class="time-cost">{{ timeCost }} s</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { mapMutations, mapGetters, useStore } from 'vuex'
import { GameStoreKey } from '@/stores'
import { IStatus } from '@/IType'

export default defineComponent({
  setup: () => {
    const { state, commit } = useStore(GameStoreKey)
    return {
      IStatus,
      status: computed(() => state.status),
      timeCost: computed(() => state.timeCost),
      reset: () => commit('reset')
    }
  }
})
</script>

<style scoped>
.status-footer {
  position: relative;
  margin-top: 10px;
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}
a {
  text-decoration: none;
  cursor: pointer;
}
.time-cost {
  position: absolute;
  right: 10px;
  font-size: 15px;
  font-weight: normal;
}
</style>
