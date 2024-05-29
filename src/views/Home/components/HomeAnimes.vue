<script setup>
import BaseAnimeList from '@/components/BaseAnimeList.vue';
import { useHomeStore } from '@/stores/home';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'

const homeStore = useHomeStore()
const { animeObj } = storeToRefs(homeStore)

const router = useRouter()
const goToAnime = (url) => router.push({ path: '/Anime', query: { url: url }})
</script>

<template>
  <BaseAnimeList v-for="anime in animeObj" :key="anime" :line-num="2" :animeObj="anime" :click-event="goToAnime" />
</template>

<style scoped lang="scss">

</style>