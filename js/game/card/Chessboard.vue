<template>
    <div class="chessboard">
        <Card v-for="n in 16"></Card>
    </div>
</template>

<script>
import Card from './Card';

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
    margin-top: 30px;
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
