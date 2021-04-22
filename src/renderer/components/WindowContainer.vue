<script>
export default {
  name: 'window-container'
}
</script>

<template>
  <section class='window-container'>
    <slot />
  </section>
</template>

<style scoped>
.window-container {
  position: absolute;
  top: 28px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  padding: 10px;
}
</style>