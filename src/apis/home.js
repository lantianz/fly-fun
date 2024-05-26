import http from "@/utils/http";

export const getIndexAPI = () => {
  return http({
    method: "get",
    url: "/api/home/get",
  });
};

export const getWeekAPI = () => {
  return http({
    method: "get",
    url: "/api/week/get",
  });
};

export const getSearchAPI = (params) => {
  return http({
    method: "get",
    url: "/api/search/get",
    params: params,
  });
};