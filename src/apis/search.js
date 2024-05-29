import http from "@/utils/request";

export const getSearchAPI = (params) => {
  return http({
    method: "get",
    url: "/api/search/get",
    params: params,
  });
};
