<script setup>
import HomeBanner from './components/HomeBanner.vue';
import HomeSchedule from './components/HomeSchedule.vue';
import HomeAnimes from './components/HomeAnimes.vue';
import { useHomeStore } from '@/stores/home';

const homeStore = useHomeStore()
const { getIndex, getWeek } = homeStore
getIndex()
getWeek()

</script>

<template>
  <div class="home">
    <HomeBanner />
    <HomeSchedule />
    <HomeAnimes />
  </div>
  <el-backtop :right="100" :bottom="100" />
</template>

<style scoped lang="scss">
.home {
  margin-top: 90px;
  width: 100vw;
}
</style>