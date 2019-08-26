// import Api from './base.js'
import service from './intercept'
export function getMeterAbnormalNum (param) {
  return service.get('/abnormalMeter/typeExceptions', param)
}
export function getAbnormalList (param) {
  return service.get('/abnormalMeter/Exception', param)
}
export function getMeterAbnormalInfo (param) {
  return service.post1('/abnormalMeter/meterValue?meterNo=' + param)
}
export function getMeterAbnormalDatas (param) {
  return service.post1('/abnormalMeter/dataValue?' + param)
}
