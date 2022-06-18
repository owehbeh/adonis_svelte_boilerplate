import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FeedbackHelper from 'App/Helpers/FeedbackHelper'
import { prisma } from '@ioc:Adonis/Addons/Prisma'

export default class NotesController {
  public async noteListView(ctx: HttpContextContract) {
    try {
      let noteList = await prisma.note.findMany({
        include: { request: true, item: true },
      })
      return ctx.inertia.render('note/list', { noteList })
    } catch (error) {
      return FeedbackHelper.handleError(ctx, error)
    }
  }

  public async noteSingleView(ctx: HttpContextContract) {
    try {
      let note = await prisma.note.findUnique({
        where: { id: ctx.request.params().id },
        include: { request: true, item: true },
      })
      return ctx.inertia.render('note/single', { note })
    } catch (error) {
      return FeedbackHelper.handleError(ctx, error)
    }
  }
}
