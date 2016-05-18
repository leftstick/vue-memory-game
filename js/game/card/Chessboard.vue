<template>
    <div class="chessboard">
        <Card v-for="n in 16"></Card>
    </div>
</template>

<script>
import Card from './Card';

const cardNames = ['8-ball', 'kronos', 'baked-potato', 'dinosaur', 'rocket', 'skinny-unicorn',
    'that-guy', 'zeppelin'];

export default {

    data: function() {
        return {
        };
    },

    props: {
    },

    computed: {
    },

    created: function() {
    },

    beforeDestroy: function() {
    },

    methods: {
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

.card:nth-child(4n){
    margin-right: 0px;
}
</style>
