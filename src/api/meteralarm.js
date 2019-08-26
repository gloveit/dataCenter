import service from './intercept'

export function getMeterAlarmType (param) {
  return service.post1('/abnormalMeter/tableExceptionValue?' + param)
}
export function getMeterFailureRate (param) {
  return service.get('/abnormalMeter/MeterFailureRate', param)
}
