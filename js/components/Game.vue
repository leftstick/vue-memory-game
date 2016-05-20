<template>
    <div class="game-panel">
       <Dashboard></Dashboard>
       <Chessboard></Chessboard>
       <Status></Status>
    </div>
</template>

<script>

import Dashboard from './dashboard/Dashboard';
import Chessboard from './card/Chessboard';
import Status from './footer/PlayStatus';

import { reset, updateStatus } from 'vuex/actions/controlCenter';
import { STATUS } from 'vuex/store/statusEnum';

export default {

    vuex: {
        actions: {
            reset,
            updateStatus
        }
    },

    created: function() {
        this.updateStatus(STATUS.READY);
        this.reset();
    },

    components: {Dashboard, Chessboard, Status}
}
</script>

<style scoped>
.game-panel{
    width: 450px;
    height: 670px;
    border: 4px solid #BDBDBD;
    border-radius: 2px;
    background-color: #faf8ef;
    padding: 10px;
    display: flex;
    flex-direction: column;
}
</style>
