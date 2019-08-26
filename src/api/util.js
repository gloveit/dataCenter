import service from './intercept'
/**
 *异常面板
 * @param {*} param
 * meter_no:表具编号
 * name： 异常类型
 * year： 查询的年份例如：2019
 */
export function getMeterAbnormalPanel (param) {
  return service.post1('/abnormalMeter/exceptionTime?' + param)
}
/**
 * 按条件查询异常List
 * @param {*} param
 * meter_no:表具编号
 * user_no:用户号
 * addr_des:地址描述
 * meter_model:表具型号
 * type:异常类型
 * startTime: 开始时间
 * endTime: 结束时间
 * page:页码
 * cnt: 每一页数
 */
export function getAbnormalList (param) {
  return service.get('/abnormalMeter/exceptionLists', param)
}
