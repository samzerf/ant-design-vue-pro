<template>
  <div ref="editorWrap">
    <codemirror ref="vueEditor" :value="code" :options="opts" @input="onchange">
    </codemirror>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
// 引入模式
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/mode/vue/vue";
// 主题
import "codemirror/theme/monokai.css";
import "codemirror/addon/selection/active-line";

export default {
  props: {
    value: String,
    options: Object,
  },
  data() {
    return {
      code: "",
      opts: {
        tabSize: 2,
        styleActiveLine: true,
        lineNumbers: true,
        matchBrackets: true,
        lineWrapping: true,
        foldGutter: true,
        line: true,
        mode: "vue",
        theme: "monokai",
      },
    };
  },
  methods: {
    onchange(code) {
      this.code = code;
      this.$emit("input", code);
    },
    resize() {
      console.log("resize");
      this.$refs.vueEditor.codemirror.setSize("auto", "100%");
    },
  },
  created() {
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    addListener(this.$refs.editorWrap, this.resize);
    this.code = this.value;
    this.opts = Object.assign({}, this.opts, this.options);
  },
  beforeDestroy() {
    removeListener(this.$refs.editorWrap, this.resize);
  },
  watch: {
    value(v) {
      this.code = v;
    },
    options(opts) {
      this.opts = Object.assign({}, this.opts, opts);
    },
  },
  components: {
    codemirror,
  },
};
</script>
