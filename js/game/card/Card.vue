<template>
    <img class="card" src="../../../img/back.png"/>
</template>

<script>

export default {

    data: function() {
        return {
        };
    },

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

    computed: {
    },

    created: function() {
    },

    beforeDestroy: function() {
    },

    methods: {
    },

    components: {}
}
</script>

<style scoped>
.card{
    width: 100px;
    height: 121px;
    margin-right: 3px;
}
</style>
