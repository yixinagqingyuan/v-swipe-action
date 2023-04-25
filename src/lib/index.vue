<template>
  <div class="box">
    <div class="list" v-swipe-action="action">
      <div class="darg">拖动区域</div>
      <div class="content1">
        <div class="content">好好学习</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
const action = reactive({
  hotRegion: '.darg',
  slide: '.content1',
  safeDistance: 0,
  initHeight: '200',
})
setTimeout(() => {
  action.safeDistance = 200
  // action.value = {
  //   hotRegion: '.darg',
  //   slide: '.content1',
  //   safeDistance: 200,
  //   initHeight: '200',
  // }
}, 2000)
</script>
<style scoped lang="scss">
.box {
  height: 100vh;
  position: relative;
  overflow: hidden;
  .list {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 1);
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    z-index: 10;
    padding: 0 19px;
    padding-top: 30px;
    // 解决ios 中由于vw vh 布局方式导致的边线裁剪问题
    margin: 0 1px;
    box-sizing: border-box;
    //transition: bottom 0.2s cubic-bezier(0, 0, 0.48, 1);

    #dataCollectionId {
      overflow: hidden;
      height: 100%;
      overscroll-behavior: none;
      -webkit-overflow-scrolling: touch;

      &::-webkit-scrollbar {
        display: none;
        width: 0;
        height: 0;
      }
    }
    .darg {
      font-size: 20px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      text-align: center;
      color: #000;
    }
    .content1 {
      overflow: auto;
      height: 100%;
      box-sizing: border-box;
    }
    .content {
      color: #000;
      font-size: 150px;
      height: 2000px;
    }
  }
}
</style>
