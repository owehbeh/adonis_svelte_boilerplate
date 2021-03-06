import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import Hash from '@ioc:Adonis/Core/Hash'

export default class RenameMeUsersController {
  public async userListView(ctx: HttpContextContract) {
    let userList = await prisma.user.findMany({
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
    return ctx.inertia.render('user/list', { userList })
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
    return ctx.inertia.render('user/single', { user })
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
    }
    relations['noteList'] = await prisma.note.findMany()
    relations['organizationList'] = await prisma.organization.findMany()
    relations['requestList'] = await prisma.request.findMany()
    relations['customerList'] = await prisma.customer.findMany()
    relations['supplierList'] = await prisma.supplier.findMany()
    relations['itemList'] = await prisma.item.findMany()
    relations['roleList'] = await prisma.role.findMany()

    return ctx.inertia.render('user/editAdd', {
      user,
      relations,
    })
  }

  public async userEditAdd(ctx: HttpContextContract) {
    var user
    const userId: string = ctx.request.params().id
    let {
      name,
      email,
      createdAt,
      updatedAt,
      validated,
      password,
      rememberMeToken,
      superAdmin,
      note,
      organization,
      request,
      customer,
      supplier,
      item,
      role,
    } = ctx.request.body()
    if (note) note = note.split(',').map((x) => ({ id: x }))
    else note = []
    if (request) request = request.split(',').map((x) => ({ id: x }))
    else request = []
    if (customer) customer = customer.split(',').map((x) => ({ id: x }))
    else customer = []
    if (supplier) supplier = supplier.split(',').map((x) => ({ id: x }))
    else supplier = []
    if (item) item = item.split(',').map((x) => ({ id: x }))
    else item = []

    user = await prisma.user.upsert({
      where: { id: userId || '' },
      update: {
        name,
        email,
        createdAt,
        updatedAt,
        validated: validated ? true : false,
        password,
        rememberMeToken,
        superAdmin: superAdmin ? true : false,
        note: { set: [], connect: note },
        organizationId: organization,
        request: { set: [], connect: request },
        customer: { set: [], connect: customer },
        supplier: { set: [], connect: supplier },
        item: { set: [], connect: item },
        roleId: role,
      },
      create: {
        name,
        email,
        createdAt,
        updatedAt,
        validated: validated ? true : false,
        password,
        rememberMeToken,
        superAdmin: superAdmin ? true : false,
        note: { connect: note },
        organizationId: organization,
        request: { connect: request },
        customer: { connect: customer },
        supplier: { connect: supplier },
        item: { connect: item },
        roleId: role,
      },
    })
    return ctx.response.redirect(`/users/${user.id || ''}`)
  }

  public async userDelete(ctx: HttpContextContract) {
    await prisma.user.delete({
      where: { id: ctx.request.params().id },
    })
    return ctx.response.redirect('/users')
  }

  public async currentUserView(ctx: HttpContextContract) {
    return ctx.inertia.render('user/me')
  }

  public async currentUserEditView(ctx: HttpContextContract) {
    return ctx.inertia.render('user/meEdit')
  }

  public async currentUserEdit(ctx: HttpContextContract) {
    let { name, password } = ctx.request.body()
    let data = {
      name,
    }
    if (password) data['password'] = await Hash.make(password)
    await prisma.user.update({
      where: { id: ctx.auth.user!.id },
      data,
    })
    return ctx.response.redirect(`/users/me`)
  }
}
