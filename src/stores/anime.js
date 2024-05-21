import { ref } from "vue";
import { defineStore } from "pinia";
import { getAnimeAPI } from "@/apis/anime";

export const useAnimeStore = defineStore("anime", () => {
  // import { useRoute } from 'vue-router';

  // const route = useRoute()
  const id = 2469;
  const anime = ref({});
  anime.value.actors = ref([]);
  anime.value.categories = ref([]);
  const getAnime = async () => {
    const res = await getAnimeAPI(id);
    anime.value = res.data;
  };
  return {
    anime,
    getAnime,
  };
});
