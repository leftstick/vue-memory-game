<template>
    <div class="board">
        <span>Pairs Left To Match</span>
        <h2>{{ leftNum }}</h2>
    </div>
</template>

<script>

export default {
    props: {
        leftNum: {
            type: Number,
            twoWay: false,
            default: 0
        }
    }
}
</script>

<style scoped>
.board{
    width: 120px;
    height: 100px;
    padding: 5px;
    background-color: #bbada0;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    color: #eae0d1;
}

span{
    font-size: 19px;
    font-weight: bold;
    display: block;
    width: 100%;
    text-align: center;
}

h2{
    color: #fff;
}
</style>
