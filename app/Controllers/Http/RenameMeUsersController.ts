import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FeedbackHelper from 'App/Helpers/FeedbackHelper'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { AppRoles } from 'App/Helpers/Permission/PermissionHelper'

export default class RenameMeUsersController {
  public async userListView(ctx: HttpContextContract) {
    try {
      let userList = await prisma.user.findMany({
        include: {
          notes: true,
          organization: true,
          request: true,
          customer: true,
          supplier: true,
          item: true,
          role: true,
        },
      })
      let appRoles = AppRoles(userList[0].organizationId!)

      return ctx.inertia.render('user/list', { userList })
    } catch (error) {
      return FeedbackHelper.handleError(ctx, error)
    }
  }

  public async userSingleView(ctx: HttpContextContract) {
    try {
      let user = await prisma.user.findUnique({ where: { id: ctx.request.all().id } })
      return ctx.inertia.render('user/single', { user })
    } catch (error) {
      return FeedbackHelper.handleError(ctx, error)
    }
  }
}
