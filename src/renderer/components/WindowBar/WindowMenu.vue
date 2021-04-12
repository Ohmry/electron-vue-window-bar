<template>
  <div class="window-menu">
    <slot />
  </div>
</template>

<script>
export default {
  name: "window-menu",
  data () {
    return {
      onShow: false,
      onSelected: '',
      onMouseover: ''
    }
  },
  methods: {
    doClick (uid) {
      this.onShow = true
      this.onSelected = uid
    },
    doMouseover (uid) {
      this.onMouseover = uid
      if (this.onShow) this.onSelected = uid
    },
    doMouseout (uid) {
      if (!this.onShow) this.onMouseover = ''
    },
    doFocusout (event) {
      this.onShow = false
      this.onSelected = ''
      this.onMouseover = ''
    }
  }
}
</script>

<style scoped>
.window-menu {
  height: 100%;
}
</style>