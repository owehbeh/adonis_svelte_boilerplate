import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'

export default class RenameMeNotesController {
  public async noteListView(ctx: HttpContextContract) {
    let noteList = await prisma.note.findMany({
      include: { user:true, request:true, item:true, organization:true,  },
    })
    return ctx.inertia.render('note/list', { noteList })
  }

  public async noteSingleView(ctx: HttpContextContract) {
    let note = await prisma.note.findUnique({
      where: { id: ctx.request.params().id },
      include: { user:true, request:true, item:true, organization:true,  }
    })
    return ctx.inertia.render('note/single', { note })
  }

  public async noteEditAddView(ctx: HttpContextContract) {
    var note
    var relations = {}
    const noteId: string = ctx.request.params().id
    if (noteId) {
      note = await prisma.note.findUnique({
        where: { id: noteId },
        include: { user:true, request:true, item:true, organization:true,  }
      })
    }
    relations['userList'] = await prisma.user.findMany()
relations['requestList'] = await prisma.request.findMany()
relations['itemList'] = await prisma.item.findMany()
relations['organizationList'] = await prisma.organization.findMany()

    return ctx.inertia.render('note/editAdd', {
      note,
      relations,
    })
  }

  public async noteEditAdd(ctx: HttpContextContract) {
    var note
    const noteId: string = ctx.request.params().id
    let { title, body, createdAt, updatedAt, user, request, item, organization,  } = ctx.request.body()
    if (request) request = request.split(',').map((x) => ({ id: x }))
else request = []
if (item) item = item.split(',').map((x) => ({ id: x }))
else item = []


    note = await prisma.note.upsert({
      where: { id: noteId || '' },
      update: {
        title,body,createdAt,updatedAt,userId: user,
request: {set: [], connect: request,},item: {set: [], connect: item,},organizationId: organization,

      },
      create: {
        title,body,createdAt,updatedAt,userId: user,
request: {connect: request,},item: {connect: item,},organizationId: organization,

      },
    })
    return ctx.response.redirect(`/notes/${ note.id || ''}`)
  }

  public async noteDelete(ctx: HttpContextContract) {
    await prisma.note.delete({
      where: { id: ctx.request.params().id },
    })
    return ctx.response.redirect('/notes')
  }
}
