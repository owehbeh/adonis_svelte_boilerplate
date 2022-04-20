import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SuperAdmin {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    if (!ctx.auth.user?.superAdmin) return ctx.response.redirect('/')
    await next()
  }
}
