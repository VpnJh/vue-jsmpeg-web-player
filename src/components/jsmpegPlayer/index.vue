<template>
  <div class="jsmpeg-player">
    <div class="jsmpeg-player-container">
      <!--屏幕 -->
      <canvas class="jsmpeg-player-canvas" id="jsmpeg-player-video"></canvas>
      <!--  遮罩层  -->
      <div class="jsmpeg-player-mask">
        <!--  暂停按键  -->
        <svg-icon :icon-class="playStatus===0?'stopScreenPlay':'stopScreenStop'" class-name="jsmpeg-player-mask-btn" />
      </div>
      <!-- video 状态栏   -->
      <div class="jsmpeg-player-status">
        <div class="jsmpeg-player-status-btns">
          <span class="jsmpeg-player-status-btn-item" v-if="playStatus===0">
            <svg-icon icon-class="play" class-name="jsmpeg-player-status-btn is-play-class" ></svg-icon>
          </span>
          <span class="jsmpeg-player-status-btn-item" v-if="playStatus===1">
            <svg-icon icon-class="stop" class-name="jsmpeg-player-status-btn" ></svg-icon>
          </span>
        </div>
        <ul class="jsmpeg-player-timer">
          <li class="jsmpeg-player-timer-item">
            00:00:00
          </li>
          <li class="jsmpeg-player-timer-item">
            &nbsp;&nbsp;/&nbsp;&nbsp;
          </li>
          <li class="jsmpeg-player-timer-item">
            00:00:40
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
      // 播放器
      player:null,
    //   状态 0 未播放  1 播放中
      playStatus:0
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
.definedBoxFlex(@alignItems:center,@justifyContent:flex-start){
  display: flex;
  align-items: @alignItems;
  justify-content: @justifyContent;
}
.jsmpeg-player{
  &-status{
    .definedBoxFlex();
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: linear-gradient(to top,rgba(0,0,0,.5),rgba(0,0,0,0)) ;
    min-height: 40px;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;

  //  状态栏 按钮
    &-btns{
      .definedBoxFlex();
      cursor: pointer;
      margin-right: 15px;

    }
    &-btn{
      font-size: 32px;
      color: #fff;
      &-item{
        .definedBoxFlex(center,center);
        padding-left: 7px;
        padding-right: 7px;
      }
      &.is-play-class{
        font-size: 22px;
      }
    }
  }
  &-timer{
    .definedBoxFlex();
    color: #fff;
  }
  &-container{
    position: relative;
  }
  &-canvas{
    display: block;
    .definedBox(100%);
  }
  &-mask{
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    &-btn{
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateY(-50%) translateX(-50%);
      font-size: 64px;
      color: rgba(0, 0, 0, 0.53);
      cursor: pointer;
    }
    &.active{
      display: block;
    }
  }
}
</style>
