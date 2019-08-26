import GcBreadcrumb from './gc_breadcrumb.vue'

GcBreadcrumb.install = function (Vue) {
  Vue.component(GcBreadcrumb.name, GcBreadcrumb)
}

export default GcBreadcrumb
