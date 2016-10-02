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

import { mapActions, mapGetters } from 'vuex';
import { STATUS } from 'vuex/store/statusEnum';

export default {

    //通过mapGetters将getters映射到computed里

    computed: {
        ...mapGetters([
            'displayRank',
            'displayNameInput'
        ])
    },

    //通过mapActions将actions映射到methods里

    methods: {
        ...mapActions([
            'reset',
            'updateStatus',
            'setupServerChannel'
        ])
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
