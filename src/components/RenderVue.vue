<template>
  <div ref="render"></div>
</template>

<script>
import Vue from "vue";

function randomStr(len = 32) {
  const $chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  const maxPos = $chars.length;
  let str = "";
  for (let i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return str;
}

export default {
  name: "render",
  props: {
    code: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      tpl: "",
      js: "",
      css: "",
      id: randomStr(),
      component: null,
    };
  },
  watch: {
    code() {
      this.destroy();
      this.render();
    },
  },
  methods: {
    getSource(source, type) {
      const pattern = new RegExp(`<${type}[^>]*>`);
      let openingTag = source.match(pattern);
      if (!openingTag) {
        return "";
      } else {
        openingTag = openingTag[0];
      }
      return source.slice(
        source.indexOf(openingTag) + openingTag.length,
        source.lastIndexOf(`</${type}>`)
      );
    },
    splitCode() {
      const script = this.getSource(this.code, "script").replace(
        /export default/,
        "return "
      );
      const style = this.getSource(this.code, "style");
      const template =
        '<div id="app">' + this.getSource(this.code, "template") + "</div>";
      this.js = script;
      this.css = style;
      this.tpl = template;
    },
    render() {
      this.splitCode();
      if (this.tpl && this.js) {
        const options = new Function(this.js)();
        options.template = this.tpl;
        const Comp = Vue.extend(options);
        this.component = new Comp().$mount(); // 生成vue component实例
        this.$refs.render.appendChild(this.component.$el); // 挂载到dom上
        if (this.css) {
          // 处理css
          const style = document.createElement("style");
          style.id = this.id;
          style.type = "text/css";
          style.innerHTML = this.css;
          document.getElementsByTagName("head")[0].appendChild(style);
        }
      }
    },
    destroy() {
      const $target = document.getElementById(this.id);
      if ($target) {
        $target.parentNode.removeChild($target);
      }
      if (this.component) {
        this.$refs.render.removeChild(this.component.$el);
        this.component.$destroy();
        this.component = null;
      }
    },
  },
  mounted() {
    this.render();
  },
  beforeDestroy() {
    this.destroy();
  },
};
</script>
