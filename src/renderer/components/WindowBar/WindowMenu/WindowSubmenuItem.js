import Vue from "vue";

const BUTTON_STYLE_BACKGROUND_COLOR_PRIMARY = "transparent";
const BUTTON_STYLE_BACKGROUND_COLOR_MOUSEOVER = "white";
const BUTTON_STYLE_CURSOR_PRIMARY = "arrow";
const BUTTON_STYLE_CURSOR_MOUSEOVER = "pointer";

const EXPAND_ARROW_SVG_PATH = "M7.8,3.8l26.6,26.5c0.3,0.3,0.3,0.8,0,1.2L7.8,58.1c-0.3,0.2-0.7,0.2-1.1,0l-3.4-3.5l23.2-23.1c0.2-0.3,0.2-0.8,0-1.2L3.3,7.3l3.4-3.5C7,3.5,7.4,3.5,7.8,3.8L7.8,3.8z";

export default Vue.component("window-submenu-item", {
  props: ["label", "shortcut", "click"],
  render(h) {
    let children = [];
    this.$ctx = h;

    // Adding Label
    children.push(Label(this));

    if (this.shortcut) {
      // Adding Shortcut label
      children.push(Shortcut(this));
    } else if (this.$slots.default) {
      // Adding Submenu when component has submenu
      //children.push(this.$slots.default);
      this.style.button.padding = '5px 10px'
      children.push(ExpandArrow(this))
      if(this.onSelected) {
        this.style.submenuContainer.top = (this.$el.offsetTop - 5) + 'px'
        children.push(SubmenuContainer(this, this.$slots.default))
      }
    }

    return SubmenuItem(this, children);
  },
  data() {
    return {
      onMouseover: false,
      onSelected: '',
      style: {
        button: {
          backgroundColor: BUTTON_STYLE_BACKGROUND_COLOR_PRIMARY,
          cursor: BUTTON_STYLE_CURSOR_PRIMARY,
          display: "flex",
          justifyContent: "space-between",
          alignItems: 'center',
          width: "100%",
          outline: 0,
          border: 0,
          fontSize: "12px",
          padding: "5px 25px 5px 10px",
        },
        submenuContainer: {
          position: 'absolute',
          left: '200px',
          border: '1px solid #e6e6e6',
          backgroundColor: '#f0f0f0',
          boxShadow: '1px 1px 1px #eee',
          padding: '5px 0',
          width: '200px',
          top: 0
        }
      },
    }
  },
  computed: {
    onSelected () {
      return this.$parent.onSelected == this._uid
    }
  },
  methods: {
    getIndex () {
      let level = 1
      if (this.$parent.getIndex) level += this.$parent.getIndex()
      return level
    },
    doMouseover () {
      console.log('index: ' + this.getIndex())
      if (this.getIndex() > 1) this.$parent.onSelected = this._uid
    }
  }
});

function SubmenuItem(component, children) {
  return component.$ctx(
    "button",
    {
      attrs: {
        class: "window-submenu-item",
      },
      style: {
        display: component._data.style.button.display,
        justifyContent: component._data.style.button.justifyContent,
        width: component._data.style.button.width,
        outline: component._data.style.button.outline,
        border: component._data.style.button.border,
        backgroundColor: component._data.style.button.backgroundColor,
        fontSize: component._data.style.button.fontSize,
        padding: component._data.style.button.padding,
        cursor: component._data.style.button.cursor,
        alignItems: component._data.style.button.alignItems
      },
      on: {
        click(event) {
          if (component.click) component.click(component._uid);
        },
        mouseover(event) {
          console.log(component.getIndex(), component.label)
          component._data.style.button.backgroundColor = BUTTON_STYLE_BACKGROUND_COLOR_MOUSEOVER;
          component._data.style.button.cursor = BUTTON_STYLE_CURSOR_MOUSEOVER;
          component._data.onMouseover = true
          component.doMouseover();
        },
        mouseout(event) {
          console.log('mouseout')
          component._data.style.button.backgroundColor = BUTTON_STYLE_BACKGROUND_COLOR_PRIMARY;
          component._data.style.button.cursor = BUTTON_STYLE_CURSOR_PRIMARY;
          component._data.onMouseover = false
        },
      },
    },
    children
  );
}

function Label(component) {
  return component.$ctx("span", {}, component.label);
}

function Shortcut(component) {
  return component.$ctx(
    "span",
    {
      style: {
        color: "#888888",
        PointerEvent: "none",
      },
    },
    component.shortcut
  );
}

function ExpandArrow (component) {
  return component.$ctx(
    'svg',
    {
      attrs: {
        "aria-hidden": 'true',
        version: '1.1',
        width: '10',
        height: '10',
        x: '0px',
        y: '0px',
        viewBox: '0 0 36.5 60.5',
        "enable-background": 'new 0 0 36.5 60.5'
      }
    },
    [
      component.$ctx('path', {
        attrs: {
          d: EXPAND_ARROW_SVG_PATH,
          fillRule: 'eveodd',
          clipRule: 'evenodd',
          fill: '#3e3e3E'
        }
      }, '')
    ]
  )
}

function SubmenuContainer (component, children) {
  return component.$ctx(
    'section',
    {
      style: {
        position: component._data.style.submenuContainer.position,
        backgroundColor: component._data.style.submenuContainer.backgroundColor,
        top: component._data.style.submenuContainer.top,
        left: component._data.style.submenuContainer.left,
        width: component._data.style.submenuContainer.width,
        border: component._data.style.submenuContainer.border,
        boxShadow: component._data.style.submenuContainer.boxShadow,
        padding: component._data.style.submenuContainer.padding
      }
    },
    children
  )
}