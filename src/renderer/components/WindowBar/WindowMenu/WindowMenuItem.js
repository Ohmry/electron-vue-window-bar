import Vue from 'vue'
import WindowMenuBase from './WindowMenuBase.js'
import WindowSubmenuContainer from './WindowSubmenuContainer.js'

const MENU_BACKGROUND_COLOR_PRIMARY = 'transparent'
const MENU_BACKGROUND_COLOR_MOUSEOVER = '#eeeeee'

/************************************************
 * Render Process
 ************************************************/
export default Vue.component('window-menu-item', {
  props: ['label', 'shortcut', 'click'],
  mixins: [WindowMenuBase],
  components: {
    WindowSubmenuContainer
  },
  render (h) {
    // Array of child components
    let children = []
    this.$ctx = h

    children.push(this.label)
    if (this.$slots.default && this.onSelected) {
      children.push(this.$ctx('window-submenu-container', {}, this.$slots.default))
    }

    // Render MenuItem
    return MenuItem(this, children)
  },
  created () {
    if (this.$parent.$options.name !== 'window-menu') {
      throw new Error('window-menu-item can be used only within window-menu')
    }
  },
  mounted () {

  },
  data () {
    return {
      onSubmenuSelected: '',
      style: {
        menu: {
          border: 0,
          outline: 0,
          backgroundColor: MENU_BACKGROUND_COLOR_PRIMARY,
          fontSize: '12px',
          height: '100%',
          padding: '0 7px',
          webkitAppRegion: 'no-drag'
        },
        submenuContainer: {
          position: 'absolute',
          top: '28px',
          left: '0px',
          border: '1px solid #e6e6e6',
          backgroundColor: '#f0f0f0',
          boxShadow: '1px 1px 1px #eee',
          padding: '5px 0',
          width: '200px',
          margin: '0 0 0 -7px'
        }
      }
    }
  },
  computed: {
    onMouseover () {
      return this.$parent._data.onMouseoverUid === this._uid
    },
    onSelected () {
      return this.$parent._data.onSelectedUid === this._uid
    },
    onShow () {
      return this.$parent.$options.name === 'window-menu'
        ? this.$parent.onShow
        : false
    }
  },
  watch: {
    onMouseover (newValue) {
      this.style.menu.backgroundColor = newValue
        ? MENU_BACKGROUND_COLOR_MOUSEOVER
        : MENU_BACKGROUND_COLOR_PRIMARY
    }
  },
  methods: {
    doMouseover () {
      return this.$parent.doMouseover(this._uid)
    },
    doMouseout () {
      return this.$parent.doMouseout()
    },
    doClick () {
      return this.$parent.doClick(this._uid)
    },
    doSubmenuSelected (uid) {
      this.onSubmenuSelected = uid
    }
  }
})

/**
 * Create MenuItem
 */
function MenuItem (component, children) {
  return component.$ctx(
    'button',
    {
      attrs: {
        class: 'window-menu-item'
      },
      style: {
        border: component._data.style.menu.border,
        outline: component._data.style.menu.outline,
        backgroundColor: component._data.style.menu.backgroundColor,
        fontSize: component._data.style.menu.fontSize,
        height: component._data.style.menu.height,
        padding: component._data.style.menu.padding,
        webkitAppRegion: component._data.style.menu.webkitAppRegion
      },
      on: {
        click (event) {
          if (component.click) component.click(component._uid)
          component.doClick()
        },
        mouseover (event) {
          component.doMouseover()
        },
        mouseout (event) {
          component.doMouseout()
        }
      }
    },
    children
  )
}
