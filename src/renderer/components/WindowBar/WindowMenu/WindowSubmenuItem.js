import Vue from 'vue'

export default Vue.component('window-submenu-item', {
  render (h) {
    this.$ctx = h

    return this.$ctx(
      'section',
      {},
      'This is WindowSubMenuItem'
    )
  }
})