import http from "@/utils/http";

export function getAnimeAPI(id) {
  return http({
    url: `/api/getAnime/${id}`,
  });
}
