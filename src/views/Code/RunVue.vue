<template>
  <div class="display">
    <div class="editor">
      <VueEditor v-model="vueCode" />
      <a-button type="primary" @click="code = vueCode">Run</a-button>
    </div>
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
</style>
