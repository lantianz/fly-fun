<script setup>

</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="slide" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: opacity 1.5s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
</style>
