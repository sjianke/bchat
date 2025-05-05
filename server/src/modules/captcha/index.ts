import Router from '@koa/router'
import type { Container } from '@core/container'
import { CaptchaController } from './controller'
import CaptchaGenerator from '@utils/svgCaptcha'

export function registerCaptchaModule(
  parentRouter: Router,
  container: Container
) {
  const router = new Router({
    prefix: '/captcha',
  })

  const captchaGenerator = new CaptchaGenerator({
    size: 6, // 验证码的字符数
    width: 100, // 图片宽度
    height: 40, // 图片高度
    fontSize: 40, // 字符大小
    noise: 2, // 噪点数
    color: true, // 是否启用颜色
    background: '#cc9966', // 背景色
  })
  const captchaController = new CaptchaController(captchaGenerator)

  router.get('/', captchaController.getCaptcha.bind(captchaController))

  router.post(
    '/verify',
    captchaController.verifyCaptcha.bind(captchaController)
  )

  parentRouter.use(router.routes(), router.allowedMethods())
}
