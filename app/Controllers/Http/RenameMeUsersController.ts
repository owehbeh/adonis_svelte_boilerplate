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
    var organizationList
    var notesList
    var requestList
    var customerList
    var supplierList
    var itemList
    var roleList
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
      organizationList = await prisma.organization.findMany()
      notesList = await prisma.note.findMany()
      requestList = await prisma.request.findMany()
      customerList = await prisma.customer.findMany()
      supplierList = await prisma.supplier.findMany()
      itemList = await prisma.item.findMany()
      roleList = await prisma.role.findMany()
    }

    return ctx.inertia.render('user/editAdd', {
      user,
      organizationList,
      notesList,
      requestList,
      customerList,
      supplierList,
      itemList,
      roleList,
    })
  }

  public async userEditAdd(ctx: HttpContextContract) {
    var user
    const userId: string = ctx.request.params().id
    let { name, validated, notes, organization } = ctx.request.body()
    if (notes) notes = notes.split(',').map((n) => ({ id: n }))
    else notes = []

    var {
      organizationList,
      notesList,
      requestList,
      customerList,
      supplierList,
      itemList,
      roleList,
    } = await getAllRelationRecords()

    user = await prisma.user.upsert({
      where: { id: userId || '' },
      include: {
        notes: true,
        organization: true,
        request: true,
        customer: true,
        supplier: true,
        item: true,
        role: true,
      },
      update: {
        name,
        validated: validated ? true : false,
        notes: {
          set: [],
          connect: notes,
        },
      },
      create: {
        name,
        validated: validated ? true : false,
        email: 'owehbeh@gmail.com',
        password: '',
        notes: {
          connect: notes,
        },
      },
    })

    return ctx.response.redirect(`/users/${userId}`)
  }
}
async function getAllRelationRecords() {
  var organizationList = await prisma.organization.findMany()
  var notesList = await prisma.note.findMany()
  var requestList = await prisma.request.findMany()
  var customerList = await prisma.customer.findMany()
  var supplierList = await prisma.supplier.findMany()
  var itemList = await prisma.item.findMany()
  var roleList = await prisma.role.findMany()
  return {
    organizationList,
    notesList,
    requestList,
    customerList,
    supplierList,
    itemList,
    roleList,
  }
}
