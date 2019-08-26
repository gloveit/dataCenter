import service from './intercept'

/**
 *  获取用气异常各个种类的总数
 * @param {*}
 *
 */
export function getGasAbnormalNum (param) {
  return service.get('/abnormalMeter/yqxwException', param)
}
/**
 * 获取用气异常历史
 * @param {*} param
 */
export function getPredictionHistory (param) {
  return service.post1('/abnormalMeter/gasPredictionHistory?' + param)
}
/**
 * 获取用气异常工商户
 * @param {*} param
 */
export function gasPredictionList (param) {
  return service.post1('/abnormalMeter/gasPredictionList?' + param)
}
/**
 *获取用气异常列表
 * @param {
 *     name: '用气异常的类别名，可以为空',
 *     page: '当前页数，number类型'
 *     num: '一页显示多少条, number'
 *   }
 */

export function getGasAbnormalList (param) {
  return service.get('/abnormalMeter/DetailsException', param)
}

/**
 * 用气异常详情页里面的各类异常具体的数量
 * @param {*} param
 * meterNo: 必传，string, 表具编号
 * startTime: 开始时间， 例： 2019-5-1 16：27：7
 * endTime: 结束时间
 * 所有的参数类似get请求拼接在url后面
 */
export function gasPredictionDetails (param) {
  return service.post1('/abnormalMeter/gasPredictionDetails?' + param)
}
