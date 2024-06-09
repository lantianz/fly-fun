<script setup>
import { watchEffect } from "vue";
import { useWindowSize } from "@vueuse/core";
import { useRouter } from "vue-router";
const { width } = useWindowSize();
const router = useRouter();

watchEffect(() => {
  width.value < 768 ? router.push({ path: '/mobile' }) : null
});
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="slide" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped lang="scss">
.slide-enter-active {
  transition: opacity 1.2s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
</style>
