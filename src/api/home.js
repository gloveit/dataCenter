// import Api from './base.js'
import service from './intercept'
export function EditOk (param) {
  return service.post1('tile/updateTiles', param)
}
export function addTilesToFavorites (param) {
  return service.get('userCollection/addUserCollection', param)
}
export function deteleTilesFromFavorites (param) {
  return service.get('userCollection/deleteUserCollection', param)
}
