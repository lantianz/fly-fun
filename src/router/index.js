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
          component: () => import("@/views/Home/index.vue"),
        },
        {
          path: "Anime/:path/:id",
          component: () => import("@/views/Anime/index.vue"),
        },
        {
          path: "More",
          component: () => import("@/views/More/index.vue"), //waiting
        },
        {
          path: "Play",
          component: () => import("@/views/Play/index.vue"), //doing
        },
      ],
    },
    {
      path: "/Search",
      component: () => import("@/views/Search/index.vue"), //waiting
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/404.vue"),
    },
  ],
});

export default router;
