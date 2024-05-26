<script setup>
import HomeBanner from './components/HomeBanner.vue';
import HomeSchedule from './components/HomeSchedule.vue';
import HomeAnime from './components/HomeAnime.vue';
import { useRouter } from 'vue-router'
import { useHomeStore } from '@/stores/home';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const router = useRouter()
const goToAnime = (url) => {
  router.push({ path: '/Anime' + url })
}

const homeStore = useHomeStore()
const { animeObj } = storeToRefs(homeStore)
const { getIndex } = homeStore

onMounted(() => {
  getIndex()
})

</script>

<template>
  <div class="home">
    <HomeBanner />
    <HomeSchedule />
    <HomeAnime v-for="anime in animeObj" :key="anime" :line-num="2" :animeObj="anime" :click-event="goToAnime" />
  </div>
</template>

<style scoped lang="scss">
.home {
  margin-top: 90px;
  width: 100vw;
}
</style>