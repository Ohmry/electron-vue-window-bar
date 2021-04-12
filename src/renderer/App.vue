<template>
  <div id="app">
    <window-bar 
      title="WindowBar Title" 
      icon="vuejs-logo.svg">
      <window-menu>
        <window-menu-item label="File">
          <window-menu-item label="New" />
        </window-menu-item>
        <window-menu-item label="Edit" />
        <window-menu-item label="View" />
      </window-menu>
    </window-bar>
  </div>
</template>

<script>
import { WindowBar, WindowMenu } from './components/index'
export default {
  name: "electron-vue-banner",
  components: {
    WindowBar,
    WindowMenu
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
