import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'

export default class SuppliersController {
  public async supplierListView(ctx: HttpContextContract) {
    let supplierList = await prisma.supplier.findMany({
      include: { warehouses: true, item: true },
    })
    return ctx.inertia.render('supplier/list', { supplierList })
  }

  public async supplierSingleView(ctx: HttpContextContract) {
    let supplier = await prisma.supplier.findUnique({
      where: { id: ctx.request.params().id },
      include: { warehouses: true, item: true },
    })
    return ctx.inertia.render('supplier/single', { supplier })
  }

  public async supplierEditAddView(ctx: HttpContextContract) {
    var supplier
    var relations = {}
    const supplierId: string = ctx.request.params().id
    if (supplierId) {
      supplier = await prisma.supplier.findUnique({
        where: { id: supplierId },
        include: { warehouses: true, item: true },
      })
      relations['warehousesList'] = await prisma.warehouses.findMany()
      relations['itemList'] = await prisma.item.findMany()
    }
    return ctx.inertia.render('supplier/editAdd', {
      supplier,
      relations,
    })
  }

  public async supplierEditAdd(ctx: HttpContextContract) {
    var supplier
    const supplierId: string = ctx.request.params().id
    let { name, createdAt, updatedAt, organization, createdBy, warehouses, item } =
      ctx.request.body()
    if (warehouses) warehouses = warehouses.split(',').map((x) => ({ id: x }))
    else warehouses = []
    if (item) item = item.split(',').map((x) => ({ id: x }))
    else item = []

    supplier = await prisma.supplier.upsert({
      where: { id: supplierId || '' },
      update: {
        name,
        createdAt,
        updatedAt,
        warehouses: { set: [], connect: warehouses },
        item: { set: [], connect: item },
      },
      create: {
        name,
        createdAt,
        updatedAt,
        warehouses: { connect: warehouses },
        item: { connect: item },
      },
    })
    return ctx.response.redirect(`/suppliers/${supplierId}`)
  }
}
