import Vue from "vue";
import { Button, Layout, Icon, Menu, Table } from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Auth from "./directives/auth";

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Menu);
Vue.use(Table);
Vue.use(Auth);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
