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
    var user
    var relations = {}
    const userId: string = ctx.request.params().id
    if (userId) {
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
    }
    relations['notesList'] = await prisma.note.findMany()
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
      notes,
      organization,
      request,
      customer,
      supplier,
      item,
      role,
    } = ctx.request.body()
    if (notes) notes = notes.split(',').map((x) => ({ id: x }))
    else notes = []
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
        notes: { set: [], connect: notes },
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
        notes: { connect: notes },
        organizationId: organization,
        request: { connect: request },
        customer: { connect: customer },
        supplier: { connect: supplier },
        item: { connect: item },
        roleId: role,
      },
    })
    return ctx.response.redirect(`/users/${userId}`)
  }
}
