import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    name: "user",
    component: () =>
      import(/* webpackChunkName: "userlayout" */ "../layouts/UserLayout"),
    children: [
      {
        path: "",
        redirect: "login",
      },
      {
        path: "login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/User/Login"),
      },
      {
        path: "register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "register" */ "../views/User/Register"),
      },
    ],
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
