<template>
  <h1 class="logo"><a href="https://github.com/leftstick/vue-memory-game" target="_blank">Memory</a></h1>
</template>

<script>
export default {}
</script>

<style scoped>
.logo {
  width: 160px;
  height: 100px;
  line-height: 90px;
  padding: 5px;
  border-radius: 5px;
  background-color: #5979ac;
  color: #fff;
  text-align: center;
}
a {
  text-decoration: none;
  color: #fff;
}

@media screen and (max-width: 450px) {
  .logo {
    width: 150px;
  }
}

@media screen and (max-width: 380px) {
  .logo {
    width: 140px;
  }
}

@media screen and (max-width: 360px) {
  .logo {
    width: 110px;
  }
  a {
    font-size: 18px;
  }
}
</style>
