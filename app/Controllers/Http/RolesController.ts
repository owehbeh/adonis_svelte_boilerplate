import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { getPermissions } from 'App/Helpers/Permission/PermissionHelper'

export default class RolesController {
  public async roleListView(ctx: HttpContextContract) {
    let roleList = await prisma.role.findMany({
      where: { organizationId: ctx.auth.user!.organizationId! },
      include: { organization: true, user: true },
    })
    return ctx.inertia.render('admin/role/list', { roleList })
  }

  public async roleSingleView(ctx: HttpContextContract) {
    let role = await prisma.role.findUnique({
      where: { id: ctx.request.params().id },
      include: { organization: true, user: true },
    })
    return ctx.inertia.render('admin/role/single', { role })
  }

  public async roleEditAddView(ctx: HttpContextContract) {
    var role
    var relations = {}
    const roleId: string = ctx.request.params().id
    if (roleId) {
      role = await prisma.role.findUnique({
        where: { id: roleId },
        include: { organization: true, user: true },
      })
    }
    relations['organizationList'] = await prisma.organization.findMany()
    relations['userList'] = await prisma.user.findMany()
    relations['permissionList'] = await getPermissions()

    return ctx.inertia.render('admin/role/editAdd', {
      role,
      relations,
    })
  }

  public async roleEditAdd(ctx: HttpContextContract) {
    var role
    const roleId: string = ctx.request.params().id
    let { name, createdAt, updatedAt, permissions, user } = ctx.request.body()
    if (user) user = user.split(',').map((x) => ({ id: x }))
    else user = []
    if (permissions) permissions = permissions.split(',')
    else permissions = []

    role = await prisma.role.upsert({
      where: { id: roleId || '' },
      update: {
        name,
        createdAt,
        updatedAt,
        permissions,
        organizationId: ctx.auth.user!.organizationId!,
        user: { set: [], connect: user },
      },
      create: {
        name,
        createdAt,
        updatedAt,
        permissions,
        organizationId: ctx.auth.user!.organizationId!,
        user: { connect: user },
      },
    })
    return ctx.response.redirect(`/admin/roles/${role.id || ''}`)
  }

  public async roleDelete(ctx: HttpContextContract) {
    await prisma.role.delete({
      where: { id: ctx.request.params().id },
    })
    return ctx.response.redirect('/admin/roles')
  }
}
