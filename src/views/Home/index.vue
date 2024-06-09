<script setup>
import HomeBanner from './components/HomeBanner.vue';
import HomeSchedule from './components/HomeSchedule.vue';
import HomeAnimes from './components/HomeAnimes.vue';
import { useHomeStore } from '@/stores/home';

const homeStore = useHomeStore()
const { getIndex, getWeek } = homeStore
getIndex()
getWeek()
document.title = '首页-FlyFun'

</script>

<template>
  <div class="home">
    <HomeBanner />
    <HomeSchedule v-if="homeStore.week" />
    <HomeAnimes />
  </div>
  <el-backtop style="
  --el-backtop-bg-color: var(--el-color-primary);
  --el-backtop-text-color: var(--el-bg-color-overlay);
  --el-backtop-hover-bg-color: #000;" 
  :right="100" 
  :bottom="100" />
</template>

<style scoped lang="scss">
.home {
  margin-top: 90px;
  width: 100vw;
}
</style>