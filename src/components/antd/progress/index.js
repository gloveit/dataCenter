import GcProgress from './gc_progress.vue'

GcProgress.install = function (Vue) {
  Vue.component(GcProgress.name, GcProgress)
}

export default GcProgress
