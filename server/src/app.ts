import Koa from 'koa'
import mysql from 'mysql2/promise'
import bodyParser from '@koa/bodyparser'
import cors from '@koa/cors'
import session from 'koa-session'

import config from '@config'
import { createRouter } from '@routes'
import { Container } from '@core/container'

import { errorHandler } from '@middleware/errorHandler'
import { notFoundHandler } from '@middleware/notFoundHandler'

import BCryptHash from '@utils/bcryptHash'
import { JWTAuthenticator } from '@utils/jwtAuthenticator'

/** 应用类 */
export class Application {
  private app: Koa
  private container: Container

  constructor() {
    this.app = new Koa()
    this.app.keys = ['some secret']
    this.container = Container.getInstance()
    this.setupMiddleware()
    this.setupErrorHandling()
    this.setupContainer()
    this.setupRoutes()
  }

  /** 设置容器 */
  private setupContainer(): void {
    this.container.register('db', mysql.createPool(config.database))
    this.container.register('bcryptHash', new BCryptHash())
    this.container.register('jwtAuth', new JWTAuthenticator(config.jwt))
  }

  private setupMiddleware(): void {
    this.app.use(session(config.session, this.app))
    this.app.use(bodyParser())
    this.app.use(notFoundHandler())
    // this.app.use(cors())
  }

  /** 设置路由 */
  private setupRoutes(): void {
    const router = createRouter()
    this.app.use(router.routes())
    this.app.use(router.allowedMethods())
  }

  /** 设置错误处理 */
  private setupErrorHandling(): void {
    this.app.use(errorHandler())
    // this.app.on('error', (err, ctx) => {
    //   logger.error('Server Error', {
    //     error: err.message,
    //     stack: err.stack,
    //     url: ctx.url,
    //   })
    // })
  }

  /** 启动应用 */
  public start(): void {
    const port = config.port
    this.app.listen(port, () => {
      // logger.info(`Server started on port ${port}`)
      console.log(`Server started on port ${port}`)
    })
  }
}

// 创建应用
const app = new Application()
// 启动应用
app.start()
