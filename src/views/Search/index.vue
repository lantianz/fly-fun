<script setup>
import SearchContent from './components/SearchContent.vue'
import { getSearchAPI } from '@/apis/search'
import { onMounted } from 'vue';

const search = async () => {
  const res = await getSearchAPI('form.value');
  console.log("搜索结果:", res.data);
};

onMounted(() => search())
</script>

<template>
  <div class="search">
    <SearchContent />
  </div>
</template>

<style scoped lang="scss">
.search {
  margin-top: 90px;
  width: 100vw;
}
</style>