<script setup>
import PlayPageTop from './components/PlayPageTop.vue';
import { usePlayStore } from '@/stores/play';
import { onMounted } from 'vue';

const playStore = usePlayStore()
const { getPlay } = playStore

getPlay()

onMounted(() => {
  scrollTo(0, 0)
})
</script>

<template>
  <div class="play" v-if="playStore.urls">
    <PlayPageTop :urls="playStore.urls[0]" :dramasList="playStore.dramasList" />
  </div>
</template>

<style scoped lang="scss">
.play {
  margin-top: 90px;
  width: 100vw;
}
</style>
