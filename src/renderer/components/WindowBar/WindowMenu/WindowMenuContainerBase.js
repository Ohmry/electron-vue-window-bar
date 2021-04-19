/**
 *  WindowMenuContainerBase
 * 
 *  It is used to create MenuContainer such as WindowSubmenuContainer.
 *  and is has common variables and methods to use from each components.
 * 
 *  Each components which has container role like 'WindowSubmenuContainer'
 *  these have to mix in it.
 * 
 *  Copyright 2021. ohmry. All rights reserved
 */
export default {
  methods: {
    getMenuLevel (component) {
      if (typeof component.$parent === undefined) return 0
      if (component.$parent.$options.name === 'window-menu') return 0
      
      let level = 0
      if (component.$parent.getMenuLevel) {
        level += component.$parent.getMenuLevel(component.$parent)
      }
      return level
    }
  }
}