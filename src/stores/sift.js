import { reactive, ref, watchEffect } from "vue";
import { defineStore } from "pinia";
import { getSiftAPI } from "@/apis/sift";
import { useRoute } from "vue-router";

export const useSiftStore = defineStore(
  "sift",
  () => {
    const siftOptions = reactive({
      id: "",
      type: "",
      area: "",
      year: "",
      lang: "",
      latter: "",
      by: "",
      page: "",
    });
    const route = useRoute();
    siftOptions.id = route.query.id ? route.query.id : "";
    siftOptions.type = route.query.type ? route.query.type : "";
    siftOptions.area = route.query.area ? route.query.area : "";
    siftOptions.year = route.query.year ? route.query.year : "";
    siftOptions.lang = route.query.lang ? route.query.lang : "";
    siftOptions.latter = route.query.latter ? route.query.latter : "";
    siftOptions.by = route.query.by ? route.query.by : "";
    siftOptions.page = route.query.page ? route.query.page : "";

    const pageCount = ref(0);
    const vodDataBean = reactive({
      itemList: [],
    });
    const classificationDataBeans = ref([]);

    const getSift = async () => {
      const res = await getSiftAPI(siftOptions);
      pageCount.value = res.data.pageCount;
      vodDataBean.itemList = res.data.vodDataBean
        ? res.data.vodDataBean.itemList
        : "";
      classificationDataBeans.value = res.data.classificationDataBeans;
    };

    const getSiftByID = async (id) => {
      siftOptions.id = id;
      const res = await getSiftAPI(siftOptions);
      pageCount.value = res.data.pageCount;
      vodDataBean.itemList = res.data.vodDataBean
        ? res.data.vodDataBean.itemList
        : "";
      classificationDataBeans.value = res.data.classificationDataBeans;
    };

    return {
      siftOptions,
      pageCount,
      vodDataBean,
      classificationDataBeans,
      getSift,
      getSiftByID,
    };
  },
  {
    persist: false,
  }
);
