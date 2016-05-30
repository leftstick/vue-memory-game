<template>
    <table align="center">
        <thead>
            <tr>
                <th width="10%">No.</th>
                <th width="70%">Alias</th>
                <th width="20%">Speed</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="rank of list" v-bind:style="{ backgroundColor: rank.username === userName ? 'yellow' : 'transparent' }">
                <td width="10%" align="center">{{ $index + 1 }}</td>
                <td width="70%" align="center">{{ rank.username }}</td>
                <td width="20%" align="center">{{ rank.speed }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { userName } from 'vuex/getters/stateHolder';

export default {
    props: {
        list: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },

    vuex: {
        getters: {
            userName
        }
    }
}
</script>

<style scoped>
table{
    width: 100%;
}

thead{
    background-color: #bd2d30;
    font-size: 18px;
    color: #fff;
}

tbody tr{
    height: 30px;
}
</style>
