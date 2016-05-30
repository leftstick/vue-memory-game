<template>
    <div class="status-footer">
        <span v-if="status === READY">{{ userName }}</span>
        <span v-if="status === PLAYING">Playing</span>
        <span class="elapsed">{{ elapsedMs }} s</span>
    </div>
</template>

<script>
import { status, elapsedMs, userName } from 'vuex/getters/stateHolder';
import { STATUS } from 'vuex/store/statusEnum';

export default {

    data: () => STATUS,

    vuex: {
        getters: {
            userName,
            elapsedMs,
            status
        }
    }
}
</script>

<style scoped>
.status-footer{
    position: relative;
    margin-top: 10px;
    width: 100%;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
}
.elapsed{
    position: absolute;
    right: 10px;
    font-size: 15px;
    font-weight: normal;
}
</style>
