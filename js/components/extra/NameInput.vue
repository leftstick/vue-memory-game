<template>
    <div class="container">
        <div class="naming">
            <h3>Your Name</h3>
            <input type="text" :value="userName" v-on:keyup.enter="modifyName" autofocus="true">
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {

    computed: {
        ...mapGetters([
            'userName'
        ])
    },

    methods: {
        ...mapActions([
            'toggleRank',
            'toggleNameInput',
            'updateUserName',
            'updateRank'
        ]),
        modifyName: function(e) {
            if(!e.target.value){
                return;
            }
            this.updateUserName(e.target.value);
            this.updateRank();
            this.toggleRank(true);
            this.toggleNameInput(false);
        }
    }
}
</script>

<style scoped>
.container{
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(164, 164, 164, 0.7);
    top: 0;
    left: 0;
    z-index: 10;
}
.naming{
    width: 250px;
    height: 100px;
    border: 4px solid #BDBDBD;
    border-radius: 2px;
    padding: 10px;
    position: absolute;
    top: 50%;
    margin-top: -50px;
    left: 50%;
    margin-left: -125px;
    background-color: #faf8ef;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

h3{
    margin-bottom: 10px;
}

input{
    width: 200px;
    height: 25px;
    line-height: 25px;
    padding: 2px;
}

</style>
