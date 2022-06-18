import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'

export default class RenameMeUsersController {
  public async userListView(ctx: HttpContextContract) {
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
    return ctx.inertia.render('user/list', { userList })
  }

  public async userSingleView(ctx: HttpContextContract) {
    let user = await prisma.user.findUnique({
      where: { id: ctx.request.params().id },
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
    return ctx.inertia.render('user/single', { user })
  }

  public async userEditAddView(ctx: HttpContextContract) {
    let user
    const userId = ctx.request.params().id
    if (userId)
      user = await prisma.user.findUnique({
        where: { id: userId },
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
    return ctx.inertia.render('user/editAdd', { user })
  }
}
