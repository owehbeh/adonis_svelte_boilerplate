import { prisma, PrismaSeederBase } from '@ioc:Adonis/Addons/Prisma'
import Hash from '@ioc:Adonis/Core/Hash'
import { Role } from '@prisma/client'
import { AppRoles } from 'App/Helpers/Permission/PermissionHelper'

export default class UserSeeder extends PrismaSeederBase {
  public static developmentOnly = false

  public async run() {
    const email = 'owehbeh@gmail.com'
    const hashedPassword = await Hash.make('bbs@QnVvJT32pMz')

    const org = await prisma.organization.upsert({
      where: {
        slug: 'ats',
      },
      update: {
        name: 'ATS',
        slug: 'ats',
      },
      create: {
        name: 'ATS',
        slug: 'ats',
      },
    })

    let appRoles = AppRoles(org.id)
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

    await prisma.user.upsert({
      where: {
        email: email,
      },
      update: {
        email,
        password: hashedPassword,
        organizationId: org.id,
        name: 'Omar',
        roleId: '1',
      },
      create: {
        email,
        password: hashedPassword,
        organizationId: org.id,
        name: 'Omar',
      },
    })

    console.log(`Database has been seeded. 🌱`)
  }
}
