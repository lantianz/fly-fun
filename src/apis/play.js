import http from "@/utils/request";

export const getPlayAPI = (params) => {
  return http({
    method: "get",
    url: "/api/video/get",
    params: params,
  });
};
