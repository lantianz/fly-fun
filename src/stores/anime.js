import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { getAnimeAPI } from "@/apis/anime";
import { useRoute } from "vue-router";

export const useAnimeStore = defineStore(
  "anime",
  () => {
    const route = useRoute();
    const param = reactive({
      from: "",
      url: "",
    });

    const anime = ref({});
    const recommendList = ref([]);

    const getAnime = async () => {
      param.url = route.query.url != null? route.query.url : route.query.from
      const res = await getAnimeAPI(param);
      anime.value = res.data.detailsDataBean;
      recommendList.value = res.data.detailsDataBean.recommendList;
    };

    return {
      anime,
      recommendList,
      getAnime,
    };
  },
  {
    persist: false,
  }
);
