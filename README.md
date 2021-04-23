# Electron-Vue WindowBar Component

`WindowBar` is creating window-bar. window-bar has app-icon, window-menu, title and window-controls(minimize, maxizmie, close). so this compnents used on frameless window of electron-vue. you can get easily functions about window bar by this component. this library has WindowContainer also. `WindowContainer` is container to render contents what you provide to user.

> This project extends from [simulatedgreg/electron-vue](https://github.com/SimulatedGREG/electron-vue)

## Usage

Install library from [NPM repository](https://www.npmjs.com/package/@ohmry/electron-vue-window-bar)

```
npm install @ohmry/electron-vue-window-bar
```

Import WindowBar, WindowContainer Component. and declare them in App.vue as follow.

```javascript
# App.vue

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
