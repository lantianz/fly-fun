import http from "@/utils/http";

export const getAnimeAPI = (params) => {
  return http({
    method: "get",
    url: "/api/details/get",
    params: params,
  });
}
