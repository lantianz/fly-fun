<script setup>
import AnimeList from '@/components/AnimeList.vue';
import { useRouter } from 'vue-router'
import { useHomeStore } from '@/stores/home';
import { storeToRefs } from 'pinia';

const router = useRouter()
const goToAnime = (url) => {
  router.push({ path: '/Anime' + url })
}

const homeStore = useHomeStore()
const { animeObj } = storeToRefs(homeStore)
</script>

<template>
  <AnimeList v-for="anime in animeObj" :key="anime" :line-num="2" :animeObj="anime" :click-event="goToAnime" />
</template>

<style scoped lang="scss">

</style>