<template>
    <div class="container" v-on:click="flip">
        <div class="card" v-bind:class="{ flipped: option.flipped }">
            <img class="front" v-if="option.cardName === '8-ball'" src="../../../img/8-ball.png"/>
            <img class="front" v-if="option.cardName === 'baked-potato'" src="../../../img/baked-potato.png"/>
            <img class="front" v-if="option.cardName === 'dinosaur'" src="../../../img/dinosaur.png"/>
            <img class="front" v-if="option.cardName === 'kronos'" src="../../../img/kronos.png"/>
            <img class="front" v-if="option.cardName === 'rocket'" src="../../../img/rocket.png"/>
            <img class="front" v-if="option.cardName === 'skinny-unicorn'" src="../../../img/skinny-unicorn.png"/>
            <img class="front" v-if="option.cardName === 'that-guy'" src="../../../img/that-guy.png"/>
            <img class="front" v-if="option.cardName === 'zeppelin'" src="../../../img/zeppelin.png"/>

            <img class="back" src="../../../img/back.png"/>
        </div>
    </div>
</template>

<script>
import { flipCard } from 'vuex/actions/controlCenter';

export default {

    props: {
        option: {
            type: Object,
            default: function () {
                return {
                    flipped: false,
                    cardName: ''
                };
            }
        }
    },

    vuex: {
        actions: {
            flipCard
        }
    },

    methods: {
        flip: function() {
            if(this.option.flipped){
                return;
            }
            this.flipCard(this.option);
            this.$emit('flipped', this.option);
        }
    },

    components: {}
}
</script>

<style scoped>
.container{
    width: 100px;
    height: 121px;
    margin-right: 3px;
    cursor: pointer;
    position: relative;
    perspective: 800px;
}

.card {
    width: 100%;
    height: 100%;
    transition: transform 1s;
    transform-style: preserve-3d;
}

.card.flipped {
    transform: rotateY( 180deg );
}

.card img {
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    backface-visibility: hidden;
}

.card .back {
    background: blue;
    transform: rotateY( 0deg );
}

.card .front {
    background: blue;
    transform: rotateY( 180deg );
}

@media screen and (max-width: 450px) {
    .container{
        width: 92px;
        height: 111px;
        margin-right: 1px;
    }
}

@media screen and (max-width: 380px) {
    .container{
        width: 85px;
        height: 102px;
        margin-right: 1px;
    }
}

@media screen and (max-width: 360px) {
    .container{
        width: 70px;
        height: 84px;
        margin-right: 1px;
    }
}
</style>
