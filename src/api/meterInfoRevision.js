import service from './intercept'

/**
 * 模糊查询归属信息
 * @param {*} param
 * name
 */
export function getMeterInfoAttribution (param) {
  return service.post1('/custAscription/getCustAscriptionsByName?' + param)
}
/**
 * 根据客户归属查看表具信息
 * @param {*} param
 * id
 */
export function getMeterInformationRevisionByid (param) {
  return service.post1(
    '/meterInformationRevision/getMeterInformationRevisionByid?' + param
  )
}
/**
 * 表具信息修改
 * @param {*} param
 * meter_no,meter_type1,meter_type2,opening_quantity,pressure_sensor_range
 * cust_industry1,cust_industry2,cust_industry3,tb_city1,tb_city2,tb_city3,tb_city4,address
 */
export function undateMeterInformationRevision (param) {
  return service.post1(
    '/meterInformationRevision/addMeterInformationRevision?' + param
  )
}
/**
 * 获取之后的客户行业根据前一级的industry
 * @param {*} param
 * pid
 */
export function allCustomerIndustrysByPid (param) {
  return service.post1('/customerIndustry/allCustomerIndustrysByPid?' + param)
}
/**
 * 获取第一级客户行业
 * @param {*} param
 *
 */
export function getFristCustomerIndustrys (param) {
  return service.get('/customerIndustry/allCustomerIndustrys', param)
}
/**
 * 获取之后的表具类型根据前一级id
 * @param {*} param
 * pid
 */
export function getMeterTypeByPid (param) {
  return service.post1('/meterType/getMeterTypeByPid?' + param)
}
/**
 * 获取第一级表具类型
 * @param {*} param
 */
export function getFristMeterTypes (param) {
  return service.get('/meterType/allMeterTypes', param)
}
/**
 * 获取之后的地址根据前一级city_id
 * @param {*} param
 * pid
 */
export function getAddressByPid (param) {
  return service.post1('/tbCity/allTbCityByPid?' + param)
}
/**
 * 获取第一级地址
 * @param {*} param
 */
export function getFristAddress (param) {
  return service.get('/tbCity/allTbCitys', param)
}
/**
 * 获取客户归属
 * @param {*} param
 */
export function getCustomerBelong (param) {
  return service.get('/custAscription/allCustAscriptions', param)
}
/**
 * 新增客户归属
 * @param {*} param
 * name
 */
export function addCustAscription (param) {
  return service.post1('/custAscription/addCustAscription?' + param)
}
