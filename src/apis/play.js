import http from "@/utils/http";

export const getPlayAPI = (params) => {
  return http({
    method: "get",
    url: "/api/video/get",
    params: params,
  });
};
