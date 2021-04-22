import Vue from 'vue'
import WindowMenuContainerBase from './WindowMenuContainerBase.js'

const CONTAINER_WIDTH = 200

export default Vue.component('window-submenu-container', {
  mixins: [WindowMenuContainerBase],
  render (h) {
    return h(
      'section',
      {
        attrs: {
          class: 'window-submenu-container'
        },
        style: {
          display: this.style.display,
          position: this.style.position,
          top: this.style.top,
          left: this.style.left,
          border: this.style.border,
          backgroundColor: this.style.backgroundColor,
          boxShadow: this.style.boxShadow,
          padding: this.style.padding,
          width: this.style.width,
          margin: this.style.margin
        }
      },
      this.$slots.default
    )
  },
  create () {
    if (this.$parent.$options.name !== 'window-menu-item') {
      throw new Error(
        'window-submenu-container can be used only within window-menu-item'
      )
    }
  },
  mounted () {
    // menuLevel represents depth of menu.
    // menuLevel is 0, it is menu container of top menu. so this container left is 0, top is 28px.
    // and cause of top menu has padding 7px left side, container margin is 0 0 0 -7px.
    let menuLevel = this.getMenuLevel(this)
    this.style.left = menuLevel == 0 ? '' : menuLevel * CONTAINER_WIDTH + 'px'
    this.style.margin = menuLevel == 0 ? '0 0 0 -7px' : ''
    this.style.top =
      (menuLevel == 0 ? 28 : this.$parent.$el.offsetTop - 5) + 'px'

    if (menuLevel === 0) {
      this.style.display = 'block'
    } else {
      this.execInterval(250).then( () => { this.style.display = 'block' })
    }
  },
  data () {
    return {
      onSelectedUid: '',
      style: {
        display: 'none',
        position: 'absolute',
        top: '',
        border: '1px solid #e6e6e6',
        backgroundColor: '#f0f0f0',
        boxShadow: '1px 1px 1px #eee',
        padding: '5px 0',
        width: CONTAINER_WIDTH + 'px',
        margin: '',
        left: ''
      }
    }
  },
  methods: {
    doSelected (uid) {
      this.onSelectedUid = uid
    }
  }
})
