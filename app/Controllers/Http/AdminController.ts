import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FeedbackHelper from 'App/Helpers/FeedbackHelper'
import { prisma } from '@ioc:Adonis/Addons/Prisma'

export default class AdminController {
  public async organizationView(ctx: HttpContextContract) {
    try {
      let organizations = await prisma.organization.findMany()
      return ctx.inertia.render('admin/organization', { organizations })
    } catch (error) {
      return FeedbackHelper.handleError(ctx, error)
    }
  }
}
