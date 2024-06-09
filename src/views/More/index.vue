<script setup>
import MoreTypeOne from './components/MoreTypeOne.vue';
import { onMounted } from 'vue';


onMounted(() => {
  scrollTo(0, 0)
})
</script>

<template>
  <div class="more">
    <MoreTypeOne />
  </div>
  <el-backtop style="
  --el-backtop-bg-color: var(--el-color-primary);
  --el-backtop-text-color: var(--el-bg-color-overlay);
  --el-backtop-hover-bg-color: #000;" 
  :right="100" 
  :bottom="100" />
</template>

<style scoped lang="scss">
.more {
  margin-top: 90px;
  width: 100vw;
}
</style>