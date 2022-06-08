import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { hasPermission } from 'App/Helpers/Permission/PermissionHelper'

export default class Permission {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>, permissions: string[]) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const canDo = await hasPermission(ctx.auth.user!, permissions)
    if (!canDo) {
      // FIXME RENDER A PAGE INSTEAD OF REDIRECT BACK
      // CAUSING TOO MANY REDIRECTS ERROR
      ctx.inertia.redirectBack()
      return
    }
    await next()
  }
}
