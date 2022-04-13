import { PrismaClient } from '@prisma/client'
import Hash from '@ioc:Adonis/Core/Hash'

const prisma = new PrismaClient()

async function seed() {
  const email = 'owehbeh@gmail.com'
  const hashedPassword = await Hash.make('Q@p5QPTHDyMA4t3')

  const org = await prisma.organization.create({
    data: {
      name: 'ATS',
      slug: 'ats',
    },
  })

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      organizationId: org.id,
      name: 'OMAR',
    },
  })

  console.log(`Database has been seeded. 🌱`)
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
