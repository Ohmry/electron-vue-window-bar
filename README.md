# Electron-Vue WindowBar Component

`WindowBar` is window-bar. window-bar has app-icon, window-menu, title and window-controls(minimize, maxizmie, close). so this compnents used on frameless window of electron-vue. you can get easily functions about window bar by this component. this library has WindowContainer also. `WindowContainer` is container to render contents what you provide to user.

> This project extends from [simulatedgreg/electron-vue](https://github.com/SimulatedGREG/electron-vue)

## Usage

Install library from [NPM repository](https://www.npmjs.com/package/@ohmry/electron-vue-window-bar)

```
npm install @ohmry/electron-vue-window-bar
```

Import WindowBar, WindowContainer Component. and declare them in App.vue as follow.

```javascript
// App.vue

<script>
import { WindowBar, WindowContainer } from '@ohmry/electron-vue-window-bar'

export default {
  name: 'electron-vue-window-bar-example',
  components: {
    WindowBar,
    WindowContainer
  }
}
</script>

<template>
  <div id="app">
    <window-bar
      title="application-title"
      icon="application-icon.svg"   // file path is /src/renderer/assets/
    >
    </window-bar>
    <window-container>
      Contents Area
    </window-container>
  </div>
</template>
```

### WindowBar
WindowBar Components has props as follow.
|Props|Description|
|---|---|
|title|Application title. it is located on center of windowbar.|
|icon|Application Icon, you can set only filename and file path is `/src/renderer/assets/`|

### WindowMenu
WindowMenu is window menu such as File, Edit etc. you can easily make menu as follow.
```javascript
// App.vue

<script>
import { 
  WindowBar,
  WindowContainer,
  WindowMenu,
  WindowMenuItem,
  WindowSubmenuItem
} from '@ohmry/electron-vue-window-bar'

export default {
  name: 'electron-vue-window-bar-example',
  components: {
    WindowBar,
    WindowContainer,
    WindowMenu,
    WindowMenuItem,
    WindowSubmenuItem
  },
  methods: {
    onClick () {
      console.log('New menu clicked')
    }
  }
}
</script>

<template>
  <div id="app">
    <window-bar
      title="application-title"
      icon="application-icon.svg"   // file path is /src/renderer/assets/
    >
      <window-menu>
        <window-menu-item
          label="File"
        >
          <window-submenu-item
            label="New"
            shortcut="Ctrl+N"
            v-bind:click="onClick"
          >
          </window-submenu-item>
        </window-menu-item>
        <window-menu-item
          label="Edit"
        >
        </window-menu-item>
        <window-menu-item
          label="View"
        >
        </window-menu-item>
      </window-menu>
    </window-bar>
    <window-container>
      Contents Area
    </window-container>
  </div>
</template>
```