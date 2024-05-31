import http from "@/utils/request";

export const getIndexAPI = () => {
  return http({
    method: "get",
    url: "/home/get",
  });
};

export const getWeekAPI = () => {
  return http({
    method: "get",
    url: "/week/get",
  });
};