import { getIndexAPI } from "@/apis/home";
import { getWeekAPI } from '@/apis/home'
import { ref } from "vue";
import { defineStore } from "pinia";

export const useHomeStore = defineStore(
  "home",
  () => {
    const indexList = ref([]);

    const tagObj = ref({});
    const bannerObj = ref({});
    const animeObj = ref([]);
    const week = ref([]);

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
    const getWeek = async () => {
      const res = await getWeekAPI();
      week.value = res.data.weekDataBeans;
  };

    return {
      tagObj,
      bannerObj,
      animeObj,
      week,
      getIndex,
      getWeek,
    };
  },
  {
    persist: {
      paths: ["tagObj"],
    },
  }
);
