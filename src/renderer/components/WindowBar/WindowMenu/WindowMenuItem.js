import Vue from 'vue'

const MENU_BACKGROUND_COLOR_PRIMARY = 'transparent'
const MENU_BACKGROUND_COLOR_MOUSEOVER = '#eeeeee'

/************************************************
 * Render Process
 ************************************************/
export default Vue.component('window-menu-item', {
  props: ['label', 'shortcut', 'click'],
  render (h) {
    let children = []
    this.$ctx = h

    // Adding menu label, component.label
    children.push(this.label)

    // If menu has submenu, Adding submenu container too.
    if (this.$slots.default && this.onSelected) {
    // if (this.$slots.default) {
      children.push(SubmenuContainer(this, this.$slots.default))
    }

    // Render MenuItem
    return MenuItem(this, children)
  },
  data () {
    return {
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
      return this.$parent._data.onMouseover === this._uid
    },
    onSelected () {
      return this.$parent._data.onSelected === this._uid
    }
  },
  watch: {
    onMouseover (newValue) {
      this.style.menu.backgroundColor = newValue ? MENU_BACKGROUND_COLOR_MOUSEOVER : MENU_BACKGROUND_COLOR_PRIMARY
    }
  },
  methods: {
    doMouseover () {
      return this.$parent.doMouseover(this._uid)
    },
    doMouseout () {
      return this.$parent.doMouseout(this._uid)
    },
    doClick () {
      return this.$parent.doClick(this._uid)
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

/**
 * Create Submenu Container
 */
function SubmenuContainer (component, children) {
  return component.$ctx(
    'section',
    {
      attrs: {
        class: 'window-submenu-container'
      },
      style: {
        position: component._data.style.submenuContainer.position,
        top: component._data.style.submenuContainer.top,
        border: component._data.style.submenuContainer.border,
        backgroundColor: component._data.style.submenuContainer.backgroundColor,
        boxShadow: component._data.style.submenuContainer.boxShadow,
        padding: component._data.style.submenuContainer.padding,
        width: component._data.style.submenuContainer.width,
        margin: component._data.style.submenuContainer.margin
      }
    },
    children
  )
}
