<script setup>
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import { useRoute } from 'vue-router' 
const route = useRoute()
 
</script>

<template>
  <div class="layout">
    <LayoutHeader v-if="!route.query.keyword" />
    <RouterView />
    <LayoutFooter v-if="!route.query.keyword" />
  </div>
</template>

<style scoped lang="scss">
</style>