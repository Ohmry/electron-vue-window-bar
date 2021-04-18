<template>
  <button
    ref="button"
    v-bind:aria-label="role"
    v-bind:title="title"
    v-bind:class="[defaultClass, mouseoverClass]"
    v-on:click="doClick"
  >
    <svg aria-hidden="true" version="1.1" width="10" height="10">
      <path v-bind:d="path" />
    </svg>
  </button>
</template>

<script>
import { remote } from 'electron'

const roles = ['maximize', 'minimize', 'close']
const SVG_CLOSE_PATH =
  'M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z'
const SVG_MAXIMIZE_PATH = 'M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z'
const SVG_MINIMIZE_PATH = 'M 0,5 10,5 10,6 0,6 Z'
const SVG_RESTORE_PATH =
  'm 2,1e-5 0,2 -2,0 0,8 8,0 0,-2 2,0 0,-8 z m 1,1 6,0 0,6 -1,0 0,-5 -5,0 z m -2,2 6,0 0,6 -6,0 z'

export default {
  name: 'window-control',
  props: ['role'],
  data () {
    return {
      onMouseover: false,
      window: null,
      windowMaximize: false
    }
  },
  computed: {
    title () {
      return this.role[0].toUpperCase() + this.role.substring(1)
    },
    defaultClass () {
      return 'window-control ' + this.role
    },
    mouseoverClass () {
      return this.onMouseover ? 'hover' : ''
    },
    path () {
      switch (this.role) {
        case 'minimize':
          return SVG_MINIMIZE_PATH
        case 'maximize':
          return this.windowMaximize ? SVG_RESTORE_PATH : SVG_MAXIMIZE_PATH
        case 'close':
          return SVG_CLOSE_PATH
      }
    },
    doClick () {
      this.onMouseover = false
      switch (this.role) {
        case 'minimize':
          return this.doMinimize
        case 'maximize':
          return this.windowMaximize ? this.doUnMaximize : this.doMaximize
        case 'close':
          return this.doClose
      }
    }
  },
  methods: {
    doMinimize () {
      remote.getCurrentWindow().minimize()
    },
    doMaximize () {
      remote.getCurrentWindow().maximize()
    },
    doUnMaximize () {
      remote.getCurrentWindow().unmaximize()
    },
    doClose () {
      remote.getCurrentWindow().close()
    }
  },
  mounted () {
    if (roles.indexOf(this.role) === -1)
      throw new Error('props "role" is not resolved.')

    //  Add EventListener
    //  if using :hover css, button's background color is not restore when window restored.
    //  so binding style with class into button using mouse event.
    this.$refs.button.addEventListener('mouseover', () => {
      this.onMouseover = true
    })
    this.$refs.button.addEventListener('mouseout', () => {
      this.onMouseover = false
    })

    this.window = remote.getCurrentWindow()

    if (this.role === 'maximize') {
      this.window.on('maximize', () => {
        this.windowMaximize = true
        if (this.$parent) this.$parent.doMaximize()
      })
      this.window.on('unmaximize', () => {
        this.windowMaximize = false
        if (this.$parent) this.$parent.doUnmaximize()
      })
    }
  }
}
</script>

<style scoped>
button {
  outline: 0;
  border: 0;
  background-color: transparent;
  padding: 0 10px;
  -webkit-app-region: no-drag;
  height: 28px;
}
button > svg {
  align-self: center;
}
button.hover {
  background-color: #ff9090;
  cursor: pointer;
}
button:active {
  background-color: #cacaca;
}
</style>
