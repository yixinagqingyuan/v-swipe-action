import AlloyFinger from 'alloyfinger'
import { ref, onUnmounted, onMounted, computed } from 'vue'
export const useGesture = (el, vanListRef) => {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
      return window.setTimeout(callback, 1000 / 60)
    }
  }
  let af: any = null
  // ios中百分比计算会有卡顿问题，兼容ios将百分比计算改为真实高度计算
  const listHeight = ref(0)
  // 页面总高度
  const pageHeight = ref(0)
  // 顶部状态栏高度
  const searchHeigth = ref(0)
  const barHeight = ref(0)
  // 是否在拖拽
  const isdrag = ref(false)
  const minHeight = computed(() => pageHeight.value / 2 - searchHeigth.value)
  const scrollShow = computed(() => listHeight.value >= pageHeight.value)
  const cardHeight = computed(() => {
    return pageHeight.value - searchHeigth.value
  })
  const computHeight = computed(() => {
    const height = listHeight.value - searchHeigth.value
    return height < minHeight.value
      ? minHeight.value
      : height >= cardHeight.value
      ? cardHeight.value
      : height
  })
  const isScroll = (target) => {
    const scrollHeight = vanListRef.value.$el.scrollHeight
    const clientHeight = vanListRef.value.$el.clientHeight
    const scrollTop = vanListRef.value.$el.scrollTop
    if (
      vanListRef.value &&
      vanListRef.value.$el.contains(target) &&
      scrollHeight != clientHeight &&
      listHeight.value >= pageHeight.value &&
      scrollTop != 0
    ) {
      return true
    }
    return false
  }

  const pressMove = (event) => {
    isdrag.value = true
    //if (isScroll(event.target)) return
    window.requestAnimationFrame(() => (listHeight.value += -event.deltaY))
  }

  const touchEnd = (event) => {
    // 点击事件也会触发swipe事件，所以需要判断一下只有他有滑动方向的时候处理
    //if (isScroll(event.target)) return
    isdrag.value = false
    if (event.direction == 'Up') {
      window.requestAnimationFrame(() => (listHeight.value = pageHeight.value))
    } else if (event.direction == 'Down') {
      window.requestAnimationFrame(
        () => (listHeight.value = pageHeight.value / 2),
      )
    } else if (typeof event.direction == 'undefined') {
      //当手势移动距离过小，就无法判断方向，此时需要根据距离判断方向
      if (listHeight.value >= (pageHeight.value / 4) * 3) {
        window.requestAnimationFrame(
          () => (listHeight.value = pageHeight.value),
        )
      } else {
        window.requestAnimationFrame(
          () => (listHeight.value = pageHeight.value / 2),
        )
      }
    }
  }
  const toggle = (e) => {
    setTimeout(() => {
      if (scrollShow.value) {
        listHeight.value = pageHeight.value / 2
      } else {
        listHeight.value = pageHeight.value
      }
    }, 50)
  }
  onMounted(() => {
    af = new AlloyFinger(el.value, {
      pressMove,
      touchEnd,
      swipe: touchEnd,
    })
    pageHeight.value = document.documentElement.clientHeight
    listHeight.value = pageHeight.value / 2
  })

  onUnmounted(() => {
    af.destroy()
  })

  return {
    barHeight,
    searchHeigth,
    computHeight,
    listHeight,
    scrollShow,
    toggle,
    cardHeight,
    isdrag,
  }
}
