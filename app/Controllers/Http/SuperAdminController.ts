import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FeedbackHelper from 'App/Helpers/FeedbackHelper'
import { prisma } from '@ioc:Adonis/Addons/Prisma'

export default class SuperAdminController {
  public async organizationView(ctx: HttpContextContract) {
    try {
      let organizations = await prisma.organization.findMany()
      return ctx.inertia.render('admin/organization', { organizations })
    } catch (error) {
      return FeedbackHelper.handleError(ctx, error)
    }
  }
  public async usersView(ctx: HttpContextContract) {
    try {
      let users = await prisma.user.findMany({ include: { organization: true, supplier: true } })
      return ctx.inertia.render('admin/user', { users })
    } catch (error) {
      return FeedbackHelper.handleError(ctx, error)
    }
  }
}
