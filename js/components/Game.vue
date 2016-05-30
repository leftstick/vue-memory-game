<template>
    <div class="game-panel">
       <!-- 组装上、中、下三个部分组件 -->
       <Dashboard></Dashboard>
       <Chessboard></Chessboard>
       <Status></Status>

       <Rank v-if="displayRank"></Rank>
       <Name-input v-if="displayNameInput"></Name-input>
    </div>
</template>

<script>

import Dashboard from './dashboard/Dashboard';
import Chessboard from './card/Chessboard';
import Status from './footer/PlayStatus';
import Rank from './extra/Rank';
import NameInput from './extra/NameInput';

import { reset, updateStatus, setupServerChannel } from 'vuex/actions/controlCenter';
import { displayRank, displayNameInput } from 'vuex/getters/stateHolder';
import { STATUS } from 'vuex/store/statusEnum';

export default {

    //vuex是一个特殊的属性，actions放在里面，
    //省却了我们手动传入this.$store的麻烦

    vuex: {
        actions: {
            reset,
            updateStatus,
            setupServerChannel
        },
        getters: {
            displayRank,
            displayNameInput
        }
    },

    created: function() {
        this.updateStatus(STATUS.READY);
        this.setupServerChannel();
        this.reset();
    },

    components: {Dashboard, Chessboard, Status, Rank, NameInput}
}
</script>

<style scoped>
.game-panel{
    position: relative;
    width: 450px;
    height: 670px;
    border: 4px solid #BDBDBD;
    border-radius: 2px;
    background-color: #faf8ef;
    padding: 10px;
    display: flex;
    flex-direction: column;
}

@media screen and (max-width: 450px) {
    .game-panel{
        width: 100%;
        height: 100%;
        justify-content: space-around;
    }
}
</style>
