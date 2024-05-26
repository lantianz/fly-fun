import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";
import { getAnimeAPI } from "@/apis/anime";
import { useRoute } from "vue-router";

export const useAnimeStore = defineStore("anime", () => {
  const route = useRoute();
  const url = reactive({
    path: "",
    id: "",
  });
  url.path = computed(() => {
    return route.params.path;
  });
  url.id = computed(() => {
    return route.params.id;
  });

  const animeR = ref({});
  const recommendListR = ref([]);

  const getAnime = async () => {
    const res = await getAnimeAPI(url);
    animeR.value = res.data.detailsDataBean;
    recommendListR.value = res.data.detailsDataBean.recommendList;
  };

  const anime = computed(() => {
    return animeR.value;
  });
  const recommendList = computed(() => {
    return recommendListR.value;
  });
  
  return {
    anime,
    recommendList,
    getAnime,
  };
});
