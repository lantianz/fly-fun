import { getIndexAPI } from "@/apis/home";
import { ref } from "vue";
import { defineStore } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const useHomeStore = defineStore("home", () => {
  const indexList = ref([]);

  const tagObj = ref({});
  const bannerObj = ref({});
  const animeObj = ref([]);

  const process = () => {
    indexList.value.forEach((item) => {
      switch (item.dataType) {
        case 0:
          tagObj.value = item;
          break;
        case 1:
          bannerObj.value = item;
          break;
        case 2:
          animeObj.value.push(item);
          break;
      }
    });
  };
  const getIndex = async () => {
    const res = await getIndexAPI();
    indexList.value = res.data.mainDataBeans;
    process();
  };

  return {
    tagObj,
    bannerObj,
    animeObj,
    getIndex,
  };
});
