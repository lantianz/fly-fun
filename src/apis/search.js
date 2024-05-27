import http from "@/utils/http";

export const getSearchAPI = (params) => {
  return http({
    method: "get",
    url: "/api/search/get",
    params: params,
  });
};
