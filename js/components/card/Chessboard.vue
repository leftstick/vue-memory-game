<template>
    <div class="chessboard">
        <Card v-for="cart in cards" :option="cart" v-on:flipped="onFlipped"></Card>
    </div>
</template>

<script>
import Card from './Card';

import { updateStatus, match, flipCards } from 'js/vuex/actions/controlCenter';
import { leftMatched, cards, status } from 'js/vuex/getters/stateHolder';

import { STATUS } from 'js/vuex/store/statusEnum';

export default {

    data: function() {
        return {
            lastCard: null
        };
    },

    vuex: {
        actions: {
            updateStatus,
            match,
            flipCards
        },
        getters: {
            leftMatched,
            cards,
            status
        }
    },

    methods: {

        onFlipped: function(e) {
            if(this.status === STATUS.READY){
                this.updateStatus(STATUS.PLAYING);
            }
            if(!this.lastCard){
                return this.lastCard = e;
            }
            if(this.lastCard !== e && this.lastCard.cardName === e.cardName){
                this.lastCard = null;
                this.match();
                return this.leftMatched || this.updateStatus(STATUS.PASS);
            }
            let lastCard = this.lastCard;
            this.lastCard = null;
            setTimeout(() =>{
                this.flipCards([lastCard, e]);
            }, 1000);
        }

    },

    components: {Card}
}
</script>

<style scoped>
.chessboard{
    margin-top: 20px;
    width: 100%;
    background-color: #fff;
    height: 530px;
    border-radius: 4px;
    padding: 10px 5px 10px 5px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: space-around;
}

.container:nth-child(4n){
    margin-right: 0px;
}
</style>
