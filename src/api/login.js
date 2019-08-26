// import Api from './base.js'
import service from './intercept'
export function Login (param) {
  return service.post('login', param)
}
export function GetRouterPermissions () {
  return service.get('config/sysmenu')
}
export function getPermissionsList () {
  return service.get('config/apppage')
}
