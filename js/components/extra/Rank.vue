<template>
    <div class="rank">
        <div class="header">
            <h1>Hey Ranky！！</h1>
        </div>
        <div class="content">
            <Rank-list :list="ranks"></Rank-list>
        </div>

        <div class="footer">
            <a class="back-btn" href v-on:click.prevent.stop="reset">Back To Game</a>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import RankList from './RankList';

export default {

    computed: {
        ...mapGetters([
            'ranks'
        ])
    },

    methods: {
        ...mapActions([
            'reset'
        ])
    },

    components: { RankList }
}
</script>

<style scoped>
.rank{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    background-color: #faf8ef;
}

.header{
    border: 4px solid #BDBDBD;
    border-radius: 2px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    background-color: #5979ac;
    color: #fff;
}

.content{
    padding: 5px;
    margin-top: 20px;
    border: 4px solid #BDBDBD;
    border-radius: 2px;
    height: 370px;
}

.footer{
    flex-grow: 2;
    display: flex;
    justify-content: center;
    align-items: center;
}

.back-btn{
    width: 150px;
    border-radius: 2px;
    outline: none;
    text-align: center;
    text-decoration: none;
}
</style>
