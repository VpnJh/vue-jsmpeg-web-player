<template>
  <div class="jsmpeg-player">
    <div class="jsmpeg-player-container">
      <!--屏幕 -->
      <canvas class="jsmpeg-player-canvas" id="jsmpeg-player-video"></canvas>
      <!--  遮罩层  -->
      <div class="jsmpeg-player-mask">
        <img src="" alt="">
      </div>
      <!--  暂停按键  -->
      <div class="jsmpeg-player-btn"></div>
      <!--  显示栏   -->
      <!-- video 状态栏   -->
      <div class="jsmpeg-player-status">
        <ul>
          <li>

          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "jsmpegPlayer",
  data(){
    return {
      player:null
    }
  },
  mounted() {

  },
  methods:{
    initPlayer(){

    }
  }

}
</script>

<style scoped lang="less">
.definedBox(@width:1920px) {
  width: @width;
  height: calc(@width / 1920 * 1080 );
}
.jsmpeg-player{
  &-container{
    position: relative;
  }
  &-canvas{
    display: block;
    background-color: #ccc;
    .definedBox(100%);
  }
  &-mask{
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,.3);
    height: 100%;
    width: 100%;
    &.active{
      display: block;
    }
  }
}
</style>
