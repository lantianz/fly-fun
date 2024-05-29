<script setup>
import AnimeDetail from './components/AnimeDetail.vue';
import AnimeRecommend from './components/AnimeRecommend.vue';
import { onMounted, watchEffect } from 'vue';
import { useAnimeStore } from "@/stores/anime";

const animeStore = useAnimeStore()
watchEffect(() => {
  animeStore.getAnime()
  scrollTo({ top: 0, behavior: 'smooth' })
})
onMounted(() => scrollTo(0, 0))
</script>

<template>
  <div class="anime">
    <AnimeDetail />
    <AnimeRecommend />
  </div>
  <el-backtop :right="100" :bottom="100" />
</template>

<style scoped lang="scss">
.anime {
  margin-top: 90px;
  width: 100vw;
}
</style>