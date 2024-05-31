import http from "@/utils/request";

export const getSearchAPI = (params) => {
  return http({
    method: "get",
    url: "/search/get",
    params: params,
  });
};
