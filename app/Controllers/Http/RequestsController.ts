import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FeedbackHelper from 'App/Helpers/FeedbackHelper'

export default class RequestsController {
  public async indexView(ctx: HttpContextContract) {
    try {
      return ctx.inertia.render('request/index')
    } catch (error) {
      return FeedbackHelper.handleError(ctx, error)
    }
  }
}
