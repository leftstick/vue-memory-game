<template>
  <div class="game-panel">
    <!-- 组装上、中、下三个部分组件 -->
    <Dashboard></Dashboard>
    <Chessboard></Chessboard>
    <Status></Status>
  </div>
</template>

<script>
import Dashboard from './dashboard/Dashboard'
import Chessboard from './card/Chessboard'
import Status from './footer/PlayStatus'

import { mapActions } from 'vuex'
import { STATUS } from '../vuex/store/statusEnum'

export default {
  components: { Dashboard, Chessboard, Status },
  created() {
    this.updateStatus(STATUS.READY)
    this.reset()
  },
  // 通过mapActions将actions映射到methods里

  methods: {
    ...mapActions(['updateStatus', 'reset'])
  }
}
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
