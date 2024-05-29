import http from "@/utils/request";

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