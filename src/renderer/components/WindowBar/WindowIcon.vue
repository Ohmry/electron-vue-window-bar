<template>
  <div class="window-icon">
    <img v-bind:src="this.iconPath" />
  </div>
</template>

<script>
export default {
  name: "window-icon",
  props: ["path"],
  computed: {
    iconPath () {
       return require("/src/renderer/assets/" + this.path)
    }
  }
}
</script>

<style scoped>
.window-icon > img {
  border: 0;
  outline: 0;
  background-color: transparent;
  padding: 4px 5px;
  width: 20px;
  height: 20px;
}
</style>