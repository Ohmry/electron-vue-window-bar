import Vue from 'vue'

export default Vue.component('window-submenu-container', {
  render (h) {
    return h(
      'section',
      {
        attrs: {
          class: 'window-submenu-container'
        },
        style: {
          position: this.style.position,
          top: this.style.top,
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
      throw new Error('window-submenu-container can be used only within window-menu-item')
    }
  },
  data () {
    return {
      onSelectedUid: '',
      style: {
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
  },
  computed: {
    
  },
  methods: {
    doSelected(uid) {
      this.onSelectedUid = uid;
    }
  }
})