import { prisma, PrismaSeederBase } from '@ioc:Adonis/Addons/Prisma'
import Hash from '@ioc:Adonis/Core/Hash'

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

    await prisma.user.upsert({
      where: {
        email: email,
      },
      update: {
        email,
        password: hashedPassword,
        organizationId: org.id,
        name: 'Omar',
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
