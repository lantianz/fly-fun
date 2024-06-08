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

    const urls = ref([]);
    const dramasList = ref({});

    const getPlay = async () => {
      const res = await getPlayAPI(url);
      urls.value = res.data.urls;
      dramasList.value = res.data.dramasList;
    };
    const getPlayByUrl = async (val) => {
      const res = await getPlayAPI(val);
      urls.value = res.data.urls;
      dramasList.value = res.data.dramasList;
    };

    return {
      urls,
      dramasList,
      getPlay,
      getPlayByUrl,
    };
  },
  { persist: false }
);
