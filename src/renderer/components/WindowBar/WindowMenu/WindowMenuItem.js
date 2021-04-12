import Vue from 'vue'

const MENU_BACKGROUND_COLOR_PRIMARY = 'transparent'
const MENU_BACKGROUND_COLOR_MOUSEOVER = '#eeeeee'

/************************************************
 * Render Process
 ************************************************/
export default Vue.component('window-menu-item', {
  props: ['label', 'shortcut', 'click'],
  render (h) {
    let component = this
    let children = []
    
    children.push(this.label)
    // if slots exists
    if(this.$slots.default) {
      let container = h(
        'section', {}, 'This is submen-container'
      )
      children.push(container)
    }

    return h(
      'button',
      {
        attrs: {
          class: 'window-menu-item'
        },
        style: {
          border: this.style.border,
          outline: this.style.outline,
          backgroundColor: this.style.backgroundColor,
          fontSize: this.style.fontSize,
          height: this.style.height,
          padding: this.style.padding,
          webkitAppRegion: this.style.webkitAppRegion
        },
        on: {
          click (event) {
            if (component.click) component.click(component._uid)
            component.$parent.doClick(component._uid)
          },
          mouseover (event) {
            component.$parent.doMouseover(component._uid)
          },
          mouseout (event) {
            component.$parent.doMouseout(component._uid)
          }
        }
      },
      children
    )
  },
  data () {
    return {
      style: {
        border: 0,
        outline: 0,
        backgroundColor: MENU_BACKGROUND_COLOR_PRIMARY,
        fontSize: '12px',
        height: '100%',
        padding: '0 7px',
        webkitAppRegion: 'no-drag'
      }
    }
  },
  computed: {
    onMouseover () {
      return this.$parent._data.onMouseover === this._uid
    }
  },
  watch: {
    onMouseover (newValue) {
      this.style.backgroundColor = newValue ? MENU_BACKGROUND_COLOR_MOUSEOVER : MENU_BACKGROUND_COLOR_PRIMARY
    }
  }
})