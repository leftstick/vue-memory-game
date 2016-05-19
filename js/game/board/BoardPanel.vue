<template>
    <div class="status-bar">
       <Logo></Logo>
       <Board></Board>
       <Score></Score>
    </div>
</template>

<script>

import Logo from './Logo';
import Board from './Board';
import Score from './Score';

export default {

    components: {Logo, Board, Score}
}
</script>

<style scoped>
.status-bar{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
