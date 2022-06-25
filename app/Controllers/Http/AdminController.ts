import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { Exception } from '@adonisjs/core/build/standalone'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AdminController {
  public async organizationView(ctx: HttpContextContract) {
    let organizations = await prisma.organization.findMany()
    return ctx.inertia.render('admin/organization', { organizations })
  }

  public async userEditAddView(ctx: HttpContextContract) {
    var user
    var relations = {}
    const userId: string = ctx.request.params().id
    if (userId) {
      user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          note: true,
          organization: true,
          request: true,
          customer: true,
          supplier: true,
          item: true,
          role: true,
        },
      })
      if (user.organizationId !== ctx.auth.user!.organizationId)
        throw new Exception('Different organization')
    }
    relations['roleList'] = await prisma.role.findMany()

    return ctx.inertia.render('admin/user/editAdd', {
      user,
      relations,
    })
  }

  public async userEditAdd(ctx: HttpContextContract) {
    var user
    const userId: string = ctx.request.params().id
    let { name, email, validated, password, role } = ctx.request.body()
    if (!userId && !password) throw new Exception('Must provide password')

    let data = {
      name,
      email,
      validated: validated ? true : false,
      superAdmin: false,
      roleId: role,
    }
    if (password) {
      password = await Hash.make(password)
      data['password'] = password
    }

    user = await prisma.user.upsert({
      where: { id: userId || '' },
      update: data,
      create: {
        name,
        email,
        validated: validated ? true : false,
        password,
        superAdmin: false,
        organizationId: ctx.auth.user!.organizationId,
        roleId: role,
      },
    })
    return ctx.response.redirect(`/admin/users/${user.id || ''}`)
  }

  public async userSingleView(ctx: HttpContextContract) {
    let user = await prisma.user.findUnique({
      where: { id: ctx.request.params().id },
      include: {
        note: true,
        organization: true,
        request: true,
        customer: true,
        supplier: true,
        item: true,
        role: true,
      },
    })
    return ctx.inertia.render('admin/user/single', { user })
  }

  public async userListView(ctx: HttpContextContract) {
    let userList = await prisma.user.findMany({
      where: { organizationId: ctx.auth.user!.organizationId },
      include: {
        note: true,
        organization: true,
        request: true,
        customer: true,
        supplier: true,
        item: true,
        role: true,
      },
    })
    return ctx.inertia.render('admin/user/list', { userList })
  }

  public async userDelete(ctx: HttpContextContract) {
    await prisma.user.delete({
      where: { id: ctx.request.params().id },
    })
    return ctx.response.redirect('/admin/users')
  }
}
