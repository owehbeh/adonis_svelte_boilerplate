import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'

export default class SuperAdminController {
  public async organizationView(ctx: HttpContextContract) {
    let organizations = await prisma.organization.findMany()
    return ctx.inertia.render('admin/organization', { organizations })
  }
  public async usersView(ctx: HttpContextContract) {
    let users = await prisma.user.findMany({ include: { organization: true, supplier: true } })
    return ctx.inertia.render('admin/user', { users })
  }
}
