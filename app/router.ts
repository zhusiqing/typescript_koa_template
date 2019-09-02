import Router from 'koa-router'
import fs from 'fs'
import path from 'path'

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
apiRouter.get('/', ctx => {
  ctx.body = '/11'
})
apiRouter.get('/ip', ctx => {
  const ip = ctx.ip.replace('::ffff:', '')
  ctx.body = `ip: ${ip}`
})
router.use(apiRouter.routes(), apiRouter.allowedMethods())
router.all('*', ctx => {
  ctx.body = notFoundHtml
})

export default router
