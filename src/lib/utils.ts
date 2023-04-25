export const setOverflow = (el, bottom) =>
  (el.style.overflow = bottom ? 'auto' : 'hidden')

export const requestAnimationFrame = (callback) => {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
      return window.setTimeout(callback, 1000 / 60)
    }
  }
  window.requestAnimationFrame(callback)
}

export const setBottom = (el, value) =>
  requestAnimationFrame(() => (el.style.bottom = `${value}px`))

export const setTransition = (el, open) =>
  (el.style.transition = open ? 'bottom 0.2s cubic-bezier(0, 0, 0.48, 1)' : '')

export const addEventListener = (type, listener, options) => {
  const { target, passive = false, capture = false } = options
  if (!target) return
  target.addEventListener(type, listener, {
    capture,
    passive,
  })
}
