// import Api from './base.js'
import service from './intercept'
export function getTableApi (param) {
  return service.get('dataCenter/table/columns', param)
}
