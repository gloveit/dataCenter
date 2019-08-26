// import Api from './base.js'
import service from './intercept'
export function dataAjax (param) {
  return service.get('dataCenter/table/showTables', param)
}
