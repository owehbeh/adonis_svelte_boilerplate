import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FeedbackHelper from 'App/Helpers/FeedbackHelper'
import { prisma } from '@ioc:Adonis/Addons/Prisma'

export default class RolesController {
  public async roleListView(ctx: HttpContextContract) {
    try {
      let roleList = await prisma.role.findMany({
        include: { User:true,  },
      })
      return ctx.inertia.render('role/list', { roleList })
    } catch (error) {
      return FeedbackHelper.handleError(ctx, error)
    }
  }

  public async roleSingleView(ctx: HttpContextContract) {
    try {
      let role = await prisma.role.findUnique({
      where: { id: ctx.request.params().id },
      include: { User:true,  }
    })
      return ctx.inertia.render('role/single', { role })
    } catch (error) {
      return FeedbackHelper.handleError(ctx, error)
    }
  }
}
