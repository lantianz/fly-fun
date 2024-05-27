import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { getAnimeAPI } from "@/apis/anime";
import { useRoute } from "vue-router";

export const useAnimeStore = defineStore("anime", () => {
  const route = useRoute();
  const url = reactive({
    path: "",
    id: "",
  });
  url.path = route.params.path
  url.id = route.params.id

  const anime = ref({});
  const recommendList = ref([]);

  const getAnime = async () => {
    const res = await getAnimeAPI(url);
    anime.value = res.data.detailsDataBean;
    recommendList.value = res.data.detailsDataBean.recommendList;
  };
  
  return {
    anime,
    recommendList,
    getAnime,
  };
});
