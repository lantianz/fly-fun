import { getSearchAPI } from "@/apis/search";
import { reactive } from "vue";
import { defineStore } from "pinia";
import { useRoute } from "vue-router";

export const useSearchStore = defineStore(
  "search",
  () => {
    const result = reactive({
      pageCount: 0,
      vodDataBean: {},
    });

    const route = useRoute();
    const params = reactive({
      keyword: "",
      page: 1, //搜索结果从第一页开始
    });
    params.keyword = route.query.keyword;
    if (route.query.page) params.page = route.query.page;

    const getSearch = async () => {
      const res = await getSearchAPI(params);
      result.pageCount = res.data.pageCount;
      result.vodDataBean = res.data.vodDataBean;
    };
    
    const getSearchByKeyword = async (keyword) => {
      params.keyword = keyword
      const res = await getSearchAPI(params);
      result.pageCount = res.data.pageCount;
      result.vodDataBean = res.data.vodDataBean;
    };

    const getSearchByPage = async (page) => {
      params.page = page
      const res = await getSearchAPI(params);
      result.pageCount = res.data.pageCount;
      result.vodDataBean = res.data.vodDataBean;
    };

    return {
      result,
      getSearch,
      getSearchByKeyword,
      getSearchByPage,
    };
  },
  {
    persist: false,
  }
);
