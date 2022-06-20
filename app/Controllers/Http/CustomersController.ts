import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'

export default class CustomersController {
  public async customerListView(ctx: HttpContextContract) {
    let customerList = await prisma.customer.findMany({
      include: { warehouses:true, Request:true,  },
    })
    return ctx.inertia.render('customer/list', { customerList })
  }

  public async customerSingleView(ctx: HttpContextContract) {
    let customer = await prisma.customer.findUnique({
      where: { id: ctx.request.params().id },
      include: { warehouses:true, Request:true,  }
    })
    return ctx.inertia.render('customer/single', { customer })
  }

  public async customerEditAddView(ctx: HttpContextContract) {
    var customer
    var relations = {}
    const customerId: string = ctx.request.params().id
    if (customerId) {
      customer = await prisma.customer.findUnique({
        where: { id: customerId },
        include: { warehouses:true, Request:true,  }
      })
      relations['warehousesList'] = await prisma.warehouses.findMany()
relations['RequestList'] = await prisma.Request.findMany()

    }
    return ctx.inertia.render('customer/editAdd', {
      customer,
      relations,
    })
  }

  public async customerEditAdd(ctx: HttpContextContract) {
    var customer
    const customerId: string = ctx.request.params().id
    let { name, createdAt, updatedAt, organization, createdBy, warehouses, Request,  } = ctx.request.body()
    if (warehouses) warehouses = warehouses.split(',').map((x) => ({ id: x }))
else warehouses = []
if (Request) Request = Request.split(',').map((x) => ({ id: x }))
else Request = []


    customer = await prisma.customer.upsert({
      where: { id: customerId || '' },
      update: {
        name,createdAt,updatedAt,warehouses: {set: [], connect: warehouses,},Request: {set: [], connect: Request,},
      },
      create: {
        name,createdAt,updatedAt,warehouses: {connect: warehouses,},Request: {connect: Request,},
      },
    })
    return ctx.response.redirect(`/customers/${ customerId}`)
  }

}
