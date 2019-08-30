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

router.all('*', ctx => {
  console.log('111')
  ctx.body = notFoundHtml
})

const apiRouter = new Router()
apiRouter.prefix('/api')
apiRouter.get('/', ctx => {
  ctx.body = '/11'
})
apiRouter.get('/ip', ctx => {
  const ip = ctx.ip
  const ips = ctx.ips
  ctx.body = `ip: ${ip}
ips: ${ips}`
})
router.use(apiRouter.routes(), apiRouter.allowedMethods())

export default router
