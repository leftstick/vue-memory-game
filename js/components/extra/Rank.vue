<template>
    <div class="rank">
        <div class="header">
            <h1>Hey Ranky</h1>
        </div>
        <div class="content">
            <table align="center">
                <thead>
                    <tr>
                        <th width="10%">No.</th>
                        <th width="70%">Alias</th>
                        <th width="20%">Speed</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rank of ranks">
                        <td width="10%" align="center">{{ $index + 1 }}</td>
                        <td width="70%" align="center">{{ rank.username }}</td>
                        <td width="20%" align="center">{{ rank.speed }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="footer">
            <a class="back-btn" href v-on:click.prevent.stop="reset">Back To Game</a>
        </div>
    </div>
</template>

<script>
import { reset } from 'js/vuex/actions/controlCenter';

import { ranks } from 'js/vuex/getters/stateHolder';

export default {

    vuex: {
        actions: {
            reset
        },
        getters: {
            ranks
        }
    },

    components: {}
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

table{
    width: 100%;
}

thead{
    background-color: #bd2d30;
    font-size: 18px;
    color: #fff;
}

tr{
    height: 30px;
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
