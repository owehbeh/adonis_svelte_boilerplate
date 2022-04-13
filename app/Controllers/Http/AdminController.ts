import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FeedbackHelper from 'App/Helpers/FeedbackHelper'
import Env from '@ioc:Adonis/Core/Env'
import { Exception } from '@adonisjs/core/build/standalone'
import { NotificationTypeEnum } from 'Contracts/enums'
import Route from '@ioc:Adonis/Core/Route'

export default class AdminController {
  public async passwordView(ctx: HttpContextContract) {
    try {
      return ctx.inertia.render('admin/enter_password')
    } catch (error) {
      return FeedbackHelper.handleError(ctx, error)
    }
  }

  public async password(ctx: HttpContextContract) {
    try {
      const submittedPassword = ctx.request.all().password
      const envPassword = Env.get('ADMIN_PASSWORD')
      if (submittedPassword !== envPassword)
        throw new Exception('ACCESS DENIED', 3333, NotificationTypeEnum.critical)

      const organizationRoute = Route.builder().makeSigned('/admin/organization', {
        expiresIn: '30m',
      })
      return ctx.response.redirect(organizationRoute)
    } catch (error) {
      return FeedbackHelper.handleError(ctx, error)
    }
  }

  public async organizationView(ctx: HttpContextContract) {
    try {
      if (!ctx.request.hasValidSignature())
        throw new Exception('ORGANIZATION ACCESS DENIED', 3333, NotificationTypeEnum.critical)

      return ctx.inertia.render('admin/organization')
    } catch (error) {
      return FeedbackHelper.handleError(ctx, error)
    }
  }
}
