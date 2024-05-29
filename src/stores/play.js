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

    const playUrl = ref("");

    const getPlay = async () => {
      const res = await getPlayAPI(url);
      playUrl.value = res.data.urls[0];
    };

    return {
      playUrl,
      getPlay,
    };
  },
  { persist: false }
);
