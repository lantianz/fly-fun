import http from "@/utils/request";

export const getAnimeAPI = (params) => {
  return http({
    method: "get",
    url: "/details/get",
    params: params,
  });
};
