import Router from '@koa/router'
import { Container } from '../container'

export interface ModuleOptions {
  prefix?: string
}

export abstract class BaseModule {
  protected router: Router
  protected container: Container
  protected options: ModuleOptions

  constructor(options: ModuleOptions = {}) {
    this.router = new Router({ prefix: options.prefix })
    this.container = Container.getInstance()
    this.options = options
  }

  /**
   * 注册模块的路由
   * @param router 主路由实例
   */
  public mount(router: Router): void {
    this.registerRoutes()
    router.use(this.router.routes(), this.router.allowedMethods())
  }

  /**
   * 初始化模块
   * 可以在这里进行一些模块级别的初始化操作
   */
  public async init(): Promise<void> {
    // 子类可以覆盖此方法以实现自定义初始化逻辑
  }

  /**
   * 注册路由
   * 必须由子类实现具体的路由注册逻辑
   */
  protected abstract registerRoutes(): void

  /**
   * 获取模块的路由实例
   */
  public getRouter(): Router {
    return this.router
  }

  /**
   * 获取模块的配置选项
   */
  public getOptions(): ModuleOptions {
    return this.options
  }
}
