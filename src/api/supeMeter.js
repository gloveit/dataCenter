// import Api from './base.js'
import service from './intercept'
export function getMeterList (param) {
  return service.get('/abnormalMeter/meterNum', param)
}
export function getMeterHistoryDetails (param) {
  return service.post1('/abnormalMeter/meterHistory?meterNo=' + param)
}
