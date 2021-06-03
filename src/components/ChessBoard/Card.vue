<template>
  <div class="container" @click="doFlip">
    <div class="card" :class="{ flipped: card.flipped }">
      <img v-if="card.name === '8-ball'" class="front" src="../../assets/8-ball.png" />
      <img v-if="card.name === 'baked-potato'" class="front" src="../../assets/baked-potato.png" />
      <img v-if="card.name === 'dinosaur'" class="front" src="../../assets/dinosaur.png" />
      <img v-if="card.name === 'kronos'" class="front" src="../../assets/kronos.png" />
      <img v-if="card.name === 'rocket'" class="front" src="../../assets/rocket.png" />
      <img v-if="card.name === 'skinny-unicorn'" class="front" src="../../assets/skinny-unicorn.png" />
      <img v-if="card.name === 'that-guy'" class="front" src="../../assets/that-guy.png" />
      <img v-if="card.name === 'zeppelin'" class="front" src="../../assets/zeppelin.png" />

      <img class="back" src="../../assets/back.png" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, PropType } from 'vue'
import { useStore } from 'vuex'
import { ICard } from '@/IType'
import { GameStoreKey } from '@/stores'

export default defineComponent({
  name: 'Card',
  props: {
    card: {
      type: Object as PropType<ICard>,
      required: true
    }
  },
  emits: {
    onFlip: (payload: ICard) => {
      return !!payload
    }
  },
  setup: (props, context) => {
    const { card } = toRefs(props)
    const { commit } = useStore(GameStoreKey)

    const doFlip = (e: MouseEvent) => {
      if (card.value.flipped) {
        return
      }
      commit('flips', [card.value])
      context.emit('onFlip', card.value)
    }

    return {
      card,
      doFlip
    }
  }
})
</script>

<style scoped>
.container {
  width: 100px;
  height: 121px;
  margin-right: 3px;
  cursor: pointer;
  position: relative;
  perspective: 800px;
}

.card {
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
}

.card.flipped {
  transform: rotateY(180deg);
}

.card img {
  display: block;
  height: 100%;
  width: 100%;
  position: absolute;
  backface-visibility: hidden;
}

.card .back {
  background: blue;
  transform: rotateY(0deg);
}

.card .front {
  background: blue;
  transform: rotateY(180deg);
}

@media screen and (max-width: 450px) {
  .container {
    width: 92px;
    height: 111px;
    margin-right: 1px;
  }
}

@media screen and (max-width: 380px) {
  .container {
    width: 85px;
    height: 102px;
    margin-right: 1px;
  }
}

@media screen and (max-width: 360px) {
  .container {
    width: 70px;
    height: 84px;
    margin-right: 1px;
  }
}
</style>
