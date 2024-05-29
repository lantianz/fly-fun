import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { getPlayAPI } from "@/apis/play";
import { useRoute } from "vue-router";

export const usePlayStore = defineStore(
  "play",
  () => {
    const route = useRoute();
    const url = reactive({}); //请求参数必须是对象
    url.url = route.query.url;

    // const result = ref([]);
    const urls = ref([]);
    const dramasList = ref({});

    // const process = () => {
    //   urls.value = result.value.urls;
    //   dramasList.value = result.value.dramasList;
    // };

    const getPlay = async () => {
      const res = await getPlayAPI(url);
      urls.value = res.data.urls;
      dramasList.value = res.data.dramasList;
      // result.value.urls = res.data.urls
      // result.value.dramasList = res.data.dramasList
      // process();
    };

    return {
      urls,
      dramasList,
      getPlay,
    };
  },
  { persist: true }
);
