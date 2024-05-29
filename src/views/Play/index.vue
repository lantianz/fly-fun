<script setup>
import PlayPageTop from './components/PlayPageTop.vue';
import { usePlayStore } from '@/stores/play';
import { useAnimeStore } from "@/stores/anime";

const playStore = usePlayStore()
const animeStore = useAnimeStore()

playStore.getPlay()
animeStore.getAnime()
</script>

<template>
  <div class="play">
    <PlayPageTop />
  </div>
</template>

<style scoped lang="scss">
.play {
  margin-top: 90px;
  width: 100vw;
}
</style>
