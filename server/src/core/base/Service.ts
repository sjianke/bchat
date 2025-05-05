import { BaseException } from '../exceptions'

/** 服务基类 */
export default abstract class BaseService<TModel> {
  protected model: TModel

  constructor(model: TModel) {
    this.model = model
  }

  protected async exec(action: () => Promise<any>) {
    try {
      return await action()
    } catch (error) {
      if (error instanceof BaseException) {
        throw error
      }
      throw new BaseException('Service Error', 500)
    }
  }
}
