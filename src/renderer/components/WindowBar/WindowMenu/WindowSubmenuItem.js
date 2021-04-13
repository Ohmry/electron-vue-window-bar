import Vue from "vue";

export default Vue.component("window-submenu-item", {
  props: ["label", "shortcut"],
  render(h) {
    let children = [];
    this.$ctx = h;

    // Adding Label
    // children.push(this.label)
    // children.push('TEST')
    children.push(Label(this));

    if (this.shortcut) {
      // Adding Shortcut label
      children.push(Shortcut(this));
    } else if (this.$slots.defaults) {
      // Adding Submenu when component has submenu
      children.push(this.$slots.defaults);
    }

    return SubmenuItem(this, children)
  },
  data () {
    return {
      style: {
        button: {
          backgroundColor: 'transparent',
          cursor: 'arrow'
        }
      }
    }
  }
});

function SubmenuItem(component, children) {
  return component.$ctx(
    'button',
    {
      attrs: {
        class: 'window-submenu-item'
      },
      style: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        outline: 0,
        border: 0,
        backgroundColor: component._data.style.button.backgroundColor,
        fontSize: "12px",
        padding: "5px 10px 5px 10px",
        cursor: component._data.style.button.cursor
      },
      on: {
        mouseover (event) {
          component._data.style.button.backgroundColor = 'white'
          component._data.style.button.cursor = 'pointer'
        },
        mouseout (event) {
          component._data.style.button.backgroundColor = 'transparent'
          component._data.style.button.cursor = 'arrow'
        }
      }
    },
    children
  )
}

function Label(component) {
  return component.$ctx("span", {}, component.label);
}

function Shortcut(component) {
  return component.$ctx("span", {
    style: {
      color: '#888888',
      PointerEvent: 'none'
    }
  }, component.shortcut);
}
