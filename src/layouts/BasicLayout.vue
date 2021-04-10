<template>
  <div>
    <a-layout style="min-height: 100vh">
      <a-layout-sider
        v-model="collapsed"
        :trigger="null"
        width="256px"
        collapsible
      >
        <div class="logo">Ant Design Vue Pro</div>
        <SiderMenu />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            @click="collapsed = !collapsed"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          />
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <!-- breadcrumb -->
          <!-- <div
            :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
          > -->
          <router-view></router-view>
          <!-- </div> -->
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import SiderMenu from "./SiderMenu";

export default {
  data() {
    return {
      collapsed: false,
    };
  },
  components: {
    Header,
    Footer,
    SiderMenu,
  },
};
</script>

<style scoped>
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
  transition: transform 0.2s;
}
.trigger:hover {
  transform: scale(1.1);
  color: #000;
  cursor: pointer;
}
.logo {
  height: 64px;
  line-height: 64px;
  text-align: center;
  overflow: hidden;
  color: #fff;
}
</style>
