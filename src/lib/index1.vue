<template>
  <div class="box">
    <div
      class="list"
      :style="{
        height: `${cardHeight}px`,
        bottom: `${computHeight - cardHeight}px`,
        transition: isdrag ? '' : 'bottom 0.2s cubic-bezier(0, 0, 0.48, 1)',
      }"
      ref="dragRef"
    >
      <div ref="vanListRef" class="content">好好学习</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useGesture } from './useGesture'
const dragRef = ref(null)
const vanListRef = ref(null)
// 初始化手势
const { computHeight, barHeight, scrollShow, toggle, cardHeight, isdrag } =
  useGesture(dragRef, vanListRef)
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
  }
}
</style>
