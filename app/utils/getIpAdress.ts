/**
 * @name utils/getIpAdress
 * @description 获取本地开发的局域网ip
 */
import os = require('os')
export default function getIpAdress():string {
  const interfaces = os.networkInterfaces()
  let address: string = ''
  Object.values(interfaces).forEach(iface => {
    iface.forEach(alias => {
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        address = alias.address
      }
    })
  })
  return address
}
