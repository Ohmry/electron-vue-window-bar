<script>
/**
 * [ WindowMenu ]
 *
 * Copyright 2021.ohmry. All rights reserved.
 */
export default {
  name: 'window-menu',
  data () {
    return {
      onShow: false,
      onMouseoverUid: '',
      onSelectedUid: ''
    }
  },
  methods: {
    doClick (uid) {
      this.onShow = true
      this.onSelectedUid = uid
    },
    doMouseover (uid) {
      this.onMouseoverUid = uid
      if (this.onShow) this.onSelectedUid = uid
    },
    doMouseout () {
      if (!this.onShow) this.onMouseoverUid = ''
    },
    doFocusout () {
      setTimeout(() => {
        this.onShow = false
        this.onSelectedUid = ''
        this.onMouseoverUid = ''
      }, 100)
    }
  }
}
</script>

<template>
  <div class="window-menu" v-on:focusout="doFocusout">
    <slot />
  </div>
</template>

<style scoped>
.window-menu {
  height: 100%;
}
</style>
