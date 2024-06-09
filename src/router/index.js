import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/Layout/index.vue"),
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("@/views/Home/index.vue"),
        },
        {
          path: "Anime",
          name: "Anime",
          component: () => import("@/views/Anime/index.vue"),
        },
        {
          path: "More",
          name: "More",
          component: () => import("@/views/More/index.vue"), 
        },
        {
          path: "Play",
          name: "Play",
          component: () => import("@/views/Play/index.vue"),
        },
        {
          path: "Search",
          name: "Search",
          component: () => import("@/views/Search/index.vue"), 
        },
      ],
    },
    {
      path: "/mobile",
      component: () => import("@/views/mobile.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/404.vue"),
    },
  ],
});

export default router;
