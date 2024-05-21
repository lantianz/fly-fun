<script setup>
import HomeBanner from './components/HomeBanner.vue';
import HomeWeekFun from './components/HomeAnimeSchedule.vue';
import HomeJpAnime from './components/HomeJpAnime.vue';
import HomeCnAnime from './components/HomeCnAnime.vue';
</script>

<template>
  <div class="home">
    <HomeBanner />
    <HomeWeekFun />
    <HomeJpAnime />
    <HomeCnAnime />
  </div>
</template>

<style scoped lang="scss">
.home {
  margin-top: 90px;
  width: 100vw;
}
</style>