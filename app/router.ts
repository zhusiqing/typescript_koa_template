/**
 * @name router
 * @description 路由
 */
import Router from 'koa-router'
import fs from 'fs'
import path from 'path'

import { Api } from './controller/index'

// 读取404页面
let notFoundHtml = ''
const notFoundHtmlPath = path.join(__dirname, '../public/404.html')
fs.readFile(notFoundHtmlPath, (err, fileBuffer) => {
  if (err) {
    console.log('444', err)
    return false
  }
  notFoundHtml = fileBuffer.toString()
})

const router = new Router()
router.get('/', ctx => {
  ctx.body = 'my application'
})

const apiRouter = new Router()
apiRouter.prefix('/api')
apiRouter.get('/', Api.index)
apiRouter.get('/ip', Api.ip)
router.use(apiRouter.routes(), apiRouter.allowedMethods())

// 404处理页
router.all('*', ctx => {
  ctx.body = notFoundHtml
})

export default router
