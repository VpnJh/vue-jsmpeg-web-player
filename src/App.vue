<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
    </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="less">
#app {
    display: block;
    height: 100%;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
