<template>
  <section class="window-bar">
    <!-- WindowIcon -->
    <window-icon v-bind:path="icon" />
    <!-- WindowMenu slots -->
    <slot />
    <!-- Title -->
    <section class="window-title">{{ title }}</section>
    <!-- WindowControls -->
    <section class="window-controls">
      <window-control role="minimize" />
      <window-control role="maximize" />
      <window-control role="close" />
    </section>
    <!-- Window Resizer -->
    <section class="window-resizer" v-if="!isMaximize" />
  </section>
</template>

<script>
import WindowIcon from './WindowBar/WindowIcon.vue'
import WindowControl from './WindowBar/WindowControl.vue'
export default {
  name: 'window-bar',
  props: ['title', 'icon'],
  components: { WindowIcon, WindowControl },
  data () {
    return {
      isMaximize: false,
      style: {

      }
    }
  },
  methods: {
    doMaximize () {
      this.isMaximize = true
    },
    doUnmaximize () {
      this.isMaximize = false
    }
  }
}
</script>

<style scoped>
.window-bar {
  display: flex;
  flex-direction: row;
  height: 28px;
  user-select: none;
  border-bottom: 1px solid #eee;
  -webkit-app-region: drag;
}
.window-title {
  margin: 0 auto;
  padding: 5px;
  align-self: center;
  font-size: 14px;
}
.window-resizer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  -webkit-app-region: no-drag;
}
</style>
