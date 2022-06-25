import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'

export default class RolesController {
  public async roleListView(ctx: HttpContextContract) {
    let roleList = await prisma.role.findMany({
      where: { organizationId: ctx.auth.user!.organizationId! },
      include: { organization: true, User: true },
    })
    return ctx.inertia.render('role/list', { roleList })
  }

  public async roleSingleView(ctx: HttpContextContract) {
    let role = await prisma.role.findUnique({
      where: { id: ctx.request.params().id },
      include: { organization: true, User: true },
    })
    return ctx.inertia.render('role/single', { role })
  }

  public async roleEditAddView(ctx: HttpContextContract) {
    var role
    var relations = {}
    const roleId: string = ctx.request.params().id
    if (roleId) {
      role = await prisma.role.findUnique({
        where: { id: roleId },
        include: { organization: true, User: true },
      })
    }
    relations['organizationList'] = await prisma.organization.findMany()
    relations['UserList'] = await prisma.user.findMany()

    return ctx.inertia.render('role/editAdd', {
      role,
      relations,
    })
  }

  public async roleEditAdd(ctx: HttpContextContract) {
    var role
    const roleId: string = ctx.request.params().id
    let { name, createdAt, updatedAt, permissions, User } = ctx.request.body()
    if (User) User = User.split(',').map((x) => ({ id: x }))
    else User = []

    role = await prisma.role.upsert({
      where: { id: roleId || '' },
      update: {
        name,
        createdAt,
        updatedAt,
        permissions,
        organizationId: ctx.auth.user!.organizationId!,
        User: { set: [], connect: User },
      },
      create: {
        name,
        createdAt,
        updatedAt,
        permissions,
        organizationId: ctx.auth.user!.organizationId!,
        User: { connect: User },
      },
    })
    return ctx.response.redirect(`/roles/${role.id || ''}`)
  }

  public async roleDelete(ctx: HttpContextContract) {
    await prisma.role.delete({
      where: { id: ctx.request.params().id },
    })
    return ctx.response.redirect('/roles')
  }
}
