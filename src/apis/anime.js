import http from "@/utils/request";

export const getAnimeAPI = (params) => {
  return http({
    method: "get",
    url: "/api/details/get",
    params: params,
  });
};
