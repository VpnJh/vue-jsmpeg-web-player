<template>
  <div class="layout">
    <layout-header></layout-header>
    <div class="layout-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>

import LayoutHeader from './layoutHeader.vue'

export default {
  name: 'Layout',
  components: { LayoutHeader }
}
</script>
<style lang="less" scoped>
.layout {
  display: block;
  min-height: 100vh;
  margin: 0 auto;
  max-width: 375px;
  position: relative;

  &-content {
    padding-top: 48px;
    color: #323232;
    min-height: 100vh;
  }
}

</style>
