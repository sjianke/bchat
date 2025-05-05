// src/core/container.ts
import { Constructor } from './types'

/**
 * 容器类，用于管理依赖注入
 *
 * 单例模式
 *
 * 注册服务
 * 解析服务
 * 清理容器
 *
 * @example
 * const container = Container.getInstance()
 * container.register('userService', new UserService())
 * const userService = container.resolve<UserService>('userService')
 */
export class Container {
  private static instance: Container
  private services: Map<string, any>
  private singletons: Map<string, any>

  private constructor() {
    this.services = new Map()
    this.singletons = new Map()
  }

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container()
    }
    return Container.instance
  }

  // 注册单例服务
  registerSingleton<T>(key: string, Service: Constructor<T>): void {
    if (!this.singletons.has(key)) {
      this.singletons.set(key, new Service())
    }
  }

  // 注册服务
  register(key: string, service: any): void {
    this.services.set(key, service)
  }

  // 解析服务
  resolve<T>(key: string): T {
    // 优先查找单例
    const singleton = this.singletons.get(key)
    if (singleton) return singleton

    const service = this.services.get(key)
    if (!service) {
      throw new Error(`Service ${key} not found`)
    }
    return service
  }

  // 清理容器
  clear(): void {
    this.services.clear()
    this.singletons.clear()
  }
}
