import Vue from "vue";
import VueRouter from "vue-router";
import userRoutes from "./userRoutes";
import basicRoutes from "./basicRoutes";
import NotFound from "../views/404";
import Forbidden from "../views/403";
import findLast from "lodash/findLast";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { check, isLogin } from "../utils/auth";
Vue.use(VueRouter);

const routes = [
  ...userRoutes,
  ...basicRoutes,
  {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: Forbidden,
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  const controlRoute = findLast(to.matched, (r) => r.meta.auth); // 找到最近的受控路由
  if (controlRoute && !check(controlRoute.meta.auth)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({ path: "/user/login" });
    } else if (to.path !== "/403") {
      next({ path: "/403" });
    }
    NProgress.done();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
