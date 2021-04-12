<template>
  <div class="display">
    <div class="editor">
      <VueEditor style="height: 100%" v-model="vueCode" />
      <a-button class="btn-run" type="primary" @click="code = vueCode"
        >Run</a-button
      >
    </div>
    <div class="divider"></div>
    <div class="render">
      <RenderVue :code="code" />
    </div>
  </div>
</template>

<script>
import RenderVue from "../../components/RenderVue";
import VueEditor from "../../components/VueEditor";
import { vueTpl } from "./tpl";
export default {
  components: {
    RenderVue,
    VueEditor,
  },
  data() {
    return {
      code: "",
      vueCode: vueTpl,
    };
  },
};
</script>

<style lang="less" scoped>
.display {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
}
.editor,
.render {
  flex: 1;
}
.editor {
  position: relative;
  .btn-run {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}
.divider {
  width: 10px;
}
</style>
