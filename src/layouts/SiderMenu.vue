<template>
  <div>
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      theme="dark"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="() => $router.push({ path: item.path })"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.key" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu";

export default {
  components: {
    SubMenu,
  },
  watch: {
    "$route.path": function (newVal, oldVal) {
      if (newVal === oldVal) {
        return;
      }
      this.selectedKeys = this.selectedKeysMap[newVal];
      this.openKeys = this.openKeysMap[newVal];
    },
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.openKeysMap[this.$route.parentKeys],
    };
  },
  methods: {
    getMenuData(routes, parentKeys = [], selectedKeys) {
      const menuData = [];
      if (!routes) {
        return menuData;
      }
      routes.forEach((item) => {
        if (item.name && !item.hideInMenu) {
          this.openKeysMap[item.path] = parentKeys;
          this.selectedKeysMap[item.path] = [selectedKeys || item.path];
          const newItem = { ...item };
          delete newItem.children;
          if (Array.isArray(item.children) && !item.hideChildrenMenu) {
            newItem.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path,
            ]);
          } else if (Array.isArray(item.children) && item.hideChildrenMenu) {
            this.getMenuData(
              item.children,
              selectedKeys ? parentKeys : [...parentKeys, item.path], // 有selectedKeys，表示菜单表现方式跟父级菜单一样
              selectedKeys || item.path
            );
          }
          menuData.push(newItem);
        } else if (
          !item.hideInMenu &&
          !item.hideChildrenMenu &&
          Array.isArray(item.children)
        ) {
          menuData.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          );
        }
      });
      return menuData;
    },
  },
};
</script>
