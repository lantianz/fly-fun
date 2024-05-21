<script setup>
import AnimeInfo from './components/AnimeInfo.vue';
import AnimePlay from './components/AnimePlay.vue';

import { onMounted } from 'vue';
import { useAnimeStore } from '@/stores/anime';

const animeStore = useAnimeStore()

onMounted(() => {
    animeStore.getAnime()
})
</script>

<template>
  <div class="anime">
    <AnimeInfo />
    <AnimePlay />
  </div>
</template>

<style scoped lang="scss">
.anime {
    width: 100vw;
}
</style>