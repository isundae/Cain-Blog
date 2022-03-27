import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/tags",
        name: "tags",
        component: () => import("../views/tags/index.vue"),
      },
      {
        path: "/blogs/create",
        name: "blogs",
        component: () => import("../views/blog/blogCreate.vue"),
      },
      {
        path: "/blogs/update/:id",
        name: "blogsupdate",
        component: () => import("../views/blog/blogCreate.vue"),
      },
      {
        path: "/blogs/list",
        name: "blogslist",
        component: () => import("../views/blog/blogList.vue"),
      },
      {
        path: "/link/list",
        name: "link/list",
        component: () => import("../views/link/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
