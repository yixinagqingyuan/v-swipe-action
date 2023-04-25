import AlloyFinger from 'alloyfinger'
import {
  setOverflow,
  setBottom,
  addEventListener,
  setTransition,
} from './utils'
export default {
  install(app) {
    let af = null
    let bottom = 0
    let minBottom = 0
    let height = 0
    let lastHeight = 0
    const setHeight = (el, value) => {
      height = document.body.clientHeight - (value?.safeDistance || 0)
      minBottom = -(height - (value?.initHeight || height / 2))
      bottom = minBottom
      lastHeight = bottom
      el.style.height = `${height}px`
      setBottom(el, bottom)
    }
    app.directive('swipe-action', {
      mounted(el, binding) {
        // 带滚动条的容器
        const slideTarget =
          (binding.value?.slide &&
            document.querySelector(binding.value.slide)) ||
          el
        setOverflow(slideTarget, false)
        // 设置默认高度
        setHeight(el, binding.value)
        // 设置动画
        setTransition(el, true)
        if (binding.value?.hotRegion) {
          const target = document.querySelector(binding.value.hotRegion)
          addEventListener(
            'click',
            () => {
              bottom >= 0 ? (bottom = minBottom) : (bottom = 0)
              setOverflow(slideTarget, bottom >= 0)
              setBottom(el, bottom)
              lastHeight = bottom
            },
            {
              target,
            },
          )
        }
        const isScroll = (target) => {
          setOverflow(slideTarget, bottom >= 0)
          const scrollHeight = slideTarget.scrollHeight
          const clientHeight = slideTarget.clientHeight
          const scrollTop = slideTarget.scrollTop
          if (
            slideTarget &&
            slideTarget.contains(target) &&
            scrollHeight != clientHeight &&
            bottom >= 0 &&
            scrollTop != 0
          ) {
            return true
          }
          return false
        }
        const pressMove = (event) => {
          if (isScroll(event.target)) return
          bottom += -event.deltaY
          bottom >= 0 && (bottom = 0)
          // 设置动画
          setTransition(el, false)
          setBottom(el, bottom)
        }
        const touchEnd = (event) => {
          if (isScroll(event.target)) return
          if (event.direction == 'Up') {
            bottom = 0
          } else if (event.direction == 'Down') {
            bottom = minBottom
          } else if (typeof event.direction == 'undefined') {
            bottom = lastHeight
          }
          // 设置动画
          setTransition(el, true)
          setBottom(el, bottom)
          lastHeight = bottom
        }
        af = new AlloyFinger(el, {
          pressMove,
          touchEnd,
          swipe: touchEnd,
        })
      },
      updated(el, binding) {
        if (binding.value.safeDistance) {
          setHeight(el, binding.value)
        }
      },
      unmounted() {
        af && af.destroy()
      },
    })
  },
}
