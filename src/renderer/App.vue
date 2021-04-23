<template>
  <div id="app">
    <window-bar 
      title="WindowBar Title" 
      icon="vuejs-logo.svg">
      <window-menu>
        <window-menu-item label="File">
          <window-submenu-item label="New" shortcut="Ctrl+N" v-bind:click="doNewFile"/>
          <window-submenu-item label="Open" shortcut="Ctrl+O"/>
          <window-submenu-item label="Recent">
            <window-submenu-item label="Open recently file" shortcut="Ctrl+R" v-bind:click="doRecentFile"/>
            <window-submenu-item label="Open recently file" shortcut="Ctrl+R"/>
            <window-submenu-item label="Open recently file" shortcut="Ctrl+R"/>
            <window-submenu-item label="Open recently file" shortcut="Ctrl+R"/>
          </window-submenu-item>
          <window-submenu-item label="Recent">
            <window-submenu-item label="Open recently file2" shortcut="Ctrl+R"/>
            <window-submenu-item label="Open recently file2" shortcut="Ctrl+R"/>
            <window-submenu-item label="Open recently file2" shortcut="Ctrl+R"/>
            <window-submenu-item label="Open recently file2" shortcut="Ctrl+R"/>
          </window-submenu-item>
        </window-menu-item>
        <window-menu-item label="Edit">
          <!-- <window-submenu-item label="This is Edit" /> -->
        </window-menu-item>
        <window-menu-item label="View">
          <!-- <window-submenu-item label="This is View" /> -->
        </window-menu-item>
      </window-menu>
    </window-bar>
    <window-container>
      This is Container <br/>
      This is Container <br/>
      This is Container <br/>
      This is Container <br/>
      This is Container <br/>
      This is Container <br/>
      This is Container <br/>
      This is Container <br/>
      This is Container <br/>
    </window-container>
  </div>
</template>

<script>
import { WindowBar, WindowMenu, WindowContainer } from './components/index'
export default {
  name: "electron-vue-window-bar-example",
  components: {
    WindowBar,
    WindowMenu,
    WindowContainer
  },
  methods: {
    doNewFile (uid) {
      console.log('menu uid is ' + uid)
    },
    doRecentFile () {
      console.log('recent File')
    }
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
