import http from "@/utils/request";

export const getSiftAPI = (params) => {
  return http({
    method: "get",
    url: "/classificationVodList/get",
    params: params,
  });
};
