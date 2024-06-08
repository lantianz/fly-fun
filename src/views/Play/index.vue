<script setup>
import PlayPageTop from './components/PlayPageTop.vue';
import { usePlayStore } from '@/stores/play';
import { onMounted, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()

const playStore = usePlayStore()
const { getPlayByUrl } = playStore

const show = ref(false)
getPlayByUrl({ url: route.query.url })
watchEffect(() => {
  if (playStore.urls[0]) {
    show.value = true
  }
})

onMounted(() => {
  scrollTo(0, 0)
})
</script>

<template>
  <div class="play" v-if="playStore.urls">
    <PlayPageTop :url="playStore.urls[0]" :dramasList="playStore.dramasList" v-if="show" />
  </div>
</template>

<style scoped lang="scss">
.play {
  margin-top: 90px;
  width: 100vw;
}
</style>
