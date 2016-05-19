<template>
    <div class="chessboard">
        <Card v-for="cart in cards" :option="cart" v-on:flipped="onFlipped"></Card>
    </div>
</template>

<script>
import Card from './Card';

import { reset, updateStatus, match, flipCards } from 'js/vuex/actions/controlCenter';
import { leftMatched, cards, status } from 'js/vuex/getters/stateHolder';

export default {

    data: function() {
        return {
            lastCard: null
        };
    },

    vuex: {
        actions: {
            reset,
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

    created: function() {
        this.reset();
    },

    methods: {

        onFlipped: function(e) {
            if(this.status === 'READY'){
                this.updateStatus('PLAYING');
            }
            if(!this.lastCard){
                return this.lastCard = e;
            }
            if(this.lastCard !== e && this.lastCard.cardName === e.cardName){
                this.lastCard = null;
                this.match();
                if(!this.leftMatched){
                    return this.updateStatus('PASS');
                }
                return;
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
