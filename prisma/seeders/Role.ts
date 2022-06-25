import { prisma, PrismaSeederBase } from '@ioc:Adonis/Addons/Prisma'
import { Role } from '@prisma/client'
import { AppRoles } from 'App/Helpers/Permission/PermissionHelper'

export default class RoleSeeder extends PrismaSeederBase {
  public static developmentOnly = false

  public async run() {
    let appRoles = await AppRoles('cl1xpaww8000000w97mzhx5fi')
    for (let i = 0; i < appRoles.length; i++) {
      const role: Role = appRoles[i]
      await prisma.role.upsert({
        where: {
          name: role.name,
        },
        update: {
          id: role.id,
          name: role.name,
          createdAt: role.createdAt,
          updatedAt: role.updatedAt,
          organizationId: role.organizationId,
          permissions: role.permissions!,
        },
        create: {
          id: role.id,
          name: role.name,
          createdAt: role.createdAt,
          updatedAt: role.updatedAt,
          organizationId: role.organizationId,
          permissions: role.permissions!,
        },
      })
    }

    console.log(`Roles database has been seeded. 🌱`)
  }
}
