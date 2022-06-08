import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FeedbackHelper from 'App/Helpers/FeedbackHelper'
import { prisma } from '@ioc:Adonis/Addons/Prisma'

export default class {{controller_name}} {
  public async {{ list_api_name }}(ctx: HttpContextContract) {
    try {
      let {{model_name}}List = await prisma.{{model_name}}.findMany({
        include: { {{model_relations}} },
      })
      return ctx.inertia.render('{{list_view_path}}', { {{model_name}}List })
    } catch (error) {
      return FeedbackHelper.handleError(ctx, error)
    }
  }

  public async {{single_api_name}}(ctx: HttpContextContract) {
    try {
      let {{model_name}} = await prisma.user.findUnique({ where: { id: ctx.request.all().id } })
      return ctx.inertia.render('{{single_view_path}}', { {{model_name}} })
    } catch (error) {
      return FeedbackHelper.handleError(ctx, error)
    }
  }
}
