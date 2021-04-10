import Vue from "vue";
import VueRouter from "vue-router";
import userRoutes from "./userRoutes";
import basicRoutes from "./basicRoutes";
import NotFound from "../views/404";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
Vue.use(VueRouter);

const routes = [
  ...userRoutes,
  ...basicRoutes,
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
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
