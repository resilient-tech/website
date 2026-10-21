import Vue from 'vue'

// adds `is-in` once an element scrolls into view; css does the animation
class RevealWatcher {
  constructor() {
    this.observer = new IntersectionObserver((entries) => this.onChange(entries), {
      rootMargin: '0px 0px -12% 0px',
    })
  }

  watch(el) {
    this.observer.observe(el)
  }

  unwatch(el) {
    this.observer.unobserve(el)
  }

  onChange(entries) {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add('is-in')
      this.unwatch(entry.target)
    }
  }
}

// server render only needs the name; hooks run in the browser
const watcher = process.client ? new RevealWatcher() : null

Vue.directive('reveal', {
  inserted: (el) => watcher.watch(el),
  unbind: (el) => watcher.unwatch(el),
})
