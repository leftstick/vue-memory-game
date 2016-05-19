<template>
    <div class="game-panel">
       <Board-panel></Board-panel>
       <Chessboard></Chessboard>
       <Status></Status>
    </div>
</template>

<script>

import BoardPanel from './board/BoardPanel';
import Chessboard from './card/Chessboard';
import Status from './footer/PlayStatus';

import { updateStatus } from 'js/vuex/actions/controlCenter';

export default {

    vuex: {
        actions: {
            updateStatus
        }
    },

    created: function() {
        this.updateStatus();
    },

    components: {BoardPanel, Chessboard, Status}
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
