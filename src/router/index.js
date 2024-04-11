import { createRouter, createWebHistory } from "vue-router";
import Middleware from "@/router/middleware";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("@/layout/index.vue"),
      meta: { requiresAuth: true },
      children:[
        {
            path: "/home",
            name: "index-home",
            component: () => import("@/components/cardNotes.vue"),
            // component: () => import("@/page/cardNotes.vue"),
            meta: { requiresAuth: true },
        },
        {
          path: "/trash",
          name: "index-trash",
          component: () => import("@/page/trash.vue"),
          // component: () => import("@/page/cardNotes.vue"),
          meta: { requiresAuth: true },
      },
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/page/login.vue"),
      meta: { requiresAuth: false }, // Assuming login does not require au thentication
    },
    {
      path: "/register/confirm",
      name: "Register",
      component: () => import("@/page/registerConfirm.vue"),
      meta: { requiresAuth: false }, // Assuming registration does not require authentication
    },
  ],
});

new Middleware(router);

export default router;
