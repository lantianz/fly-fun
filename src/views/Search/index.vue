<script setup>
import AnimeDetail from './components/AnimeDetail.vue';
import AnimeRecommend from './components/AnimeRecommend.vue';
import { useAnimeStore } from "@/stores/anime";
import { onMounted } from 'vue';
const animeStore = useAnimeStore()
onMounted(() => {
  animeStore.getAnime()
})
</script>

<template>
  <div class="anime">
    <AnimeDetail />
    <AnimeRecommend />
  </div>
</template>

<style scoped lang="scss">
.anime {
  margin-top: 90px;
  width: 100vw;
}
</style>