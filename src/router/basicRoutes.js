const routes = [
  {
    path: "/",
    meta: { auth: ["user", "admin"] },
    component: () =>
      import(/* webpackChunkName: "basiclayout" */ "../layouts/BasicLayout"),
    children: [
      {
        path: "/",
        redirect: "/dashboard/analysis",
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "仪表盘" },
        component: { render: (h) => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () =>
              import(
                /* webpackChunkName: "analysis" */ "../views/Dashboard/Analysis"
              ),
          },
        ],
      },
      {
        path: "/table",
        name: "table",
        meta: { icon: "table", title: "表格" },
        component: () =>
          import(/* webpackChunkName: "table" */ "../views/Tables/Table"),
      },
      {
        path: "/form",
        name: "form",
        meta: { icon: "form", title: "表单", auth: ["admin"] },
        component: { render: (h) => h("router-view") },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: { title: "基础表单" },
            component: () =>
              import(/* webpackChunkName: "from" */ "../views/Forms/BasicForm"),
          },
          {
            path: "/form/step-form",
            name: "stepform",
            meta: { title: "分步表单" },
            hideChildrenMenu: true,
            component: () =>
              import(/* webpackChunkName: "from" */ "../views/Forms/StepForm"),
            children: [
              {
                path: "/form/step-form",
                redirect: "info",
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () =>
                  import(
                    /* webpackChunkName: "from" */ "../views/Forms/StepForm/Step1"
                  ),
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () =>
                  import(
                    /* webpackChunkName: "from" */ "../views/Forms/StepForm/Step2"
                  ),
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () =>
                  import(
                    /* webpackChunkName: "from" */ "../views/Forms/StepForm/Step3"
                  ),
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
