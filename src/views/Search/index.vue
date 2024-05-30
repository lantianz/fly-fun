<script setup>
import SearchHeader from './components/SearchHeader.vue'
import SearchContent from './components/SearchContent.vue'
import SearchFooter from './components/SearchFooter.vue'
import { onMounted, ref, watchEffect } from 'vue';
import { useSearchStore } from '@/stores/search';
const searchStore = useSearchStore();

const res = ref({})
searchStore.getSearch()
watchEffect(() => {
  res.value = searchStore.result
  scrollTo({ top: 0, behavior: 'smooth' })
})

onMounted(() => {
  scrollTo(0, 0)
})
</script>

<template>
  <div class="search">
    <SearchHeader />
    <SearchContent :result="res" />
    <SearchFooter />
  </div>
  <el-backtop :right="100" :bottom="100" />
</template>

<style scoped lang="scss">
.search {
  margin-top: 90px;
  width: 100vw;
}
</style>