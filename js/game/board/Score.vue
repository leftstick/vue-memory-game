<template>
    <div class="score">
        <span>Highest Score</span>
        <h2>{{ highestScore }}</h2>
    </div>
</template>

<script>

export default {
    props: {
        highestScore: {
            type: Number,
            twoWay: false,
            default: 0
        }
    }
}
</script>

<style scoped>
.score{
    width: 120px;
    height: 100px;
    padding: 10px;
    background-color: #bbada0;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    color: #eae0d1;
}

.score span{
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
