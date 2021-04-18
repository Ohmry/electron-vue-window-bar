export default {
  methods: {
    getMenuLevel (component) {
      if (typeof component.$parent === undefined) return 0
      if (component.$parent.$options.name === 'window-menu') return 0
      
      let level = 1
      if (component.$parent.getMenuLevel) {
        level += component.$parent.getMenuLevel(component.$parent)
      }
      return level
    }
  }
}