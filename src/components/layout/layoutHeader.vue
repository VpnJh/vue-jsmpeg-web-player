<template>
  <div class="layout-header">
    <span class="layout-header-btn" @click="handleLink" v-if="$route.meta.isDetail">
      <svg-icon icon-class="left-arrow" class-name="left-arrow"></svg-icon>
    </span>
    <h1 class="layout-header-title">
      {{ $route.meta.title }}
    </h1>
  </div>
</template>
<script>

export default {
  name: 'LayoutHeader',
  data () {
    return {
      navs: [
        {
          text: 'Home',
          href: '/home'
        }, {
          text: 'Download',
          href: '/download'
        }
      ]
    }
  },
  methods: {
    handleLink () {
      if (this.$route.path === '/lists') {
        return
      }
      this.$router.replace('/lists')
    }
  }
}
</script>
<style lang="less" scoped>
.layout-header {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
  color: #fff;
  height: 48px;

  &-title {
    font-size: 16px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: 700;
    color: #323232;
    text-align: center;
    padding: 12px 48px;
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    height: 100%;
  }

  &-btn {
    position: absolute;
    left: 0;
    display: inline-flex;
    justify-content: center;
    width: 48px;
    height: 48px;
    align-items: center;
  }

  .svg-icon {
    width: 24px;
    height: 39px;
    color: #323232;
  }
}

</style>
