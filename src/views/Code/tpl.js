export const vueTpl = `<template>
<div class="wrap">
  <input v-model="message" />
  <div>{{ message }}</div>
</div>
</template>
<script>
  export default {
      data () {
          return {
              message: ''
          }
      }
  }
</script>
<style>
.wrap {
  color: red;
}
</style>
`;
