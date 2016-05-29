<template>
    <div class="status-footer">
        <span>{{ userName }}</span>
        <span class="elapsed">{{ elapsedMs }} s</span>
    </div>
</template>

<script>
import { userName, elapsedMs } from 'vuex/getters/stateHolder';

export default {
    vuex: {
        getters: {
            userName,
            elapsedMs
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
