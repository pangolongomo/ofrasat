import { PrismaClient, BranchType } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create superadmin user
  const hashedPassword = await bcrypt.hash('buxrif-cudda9-ravsAc', 12)
  
  const superadmin = await prisma.user.upsert({
    where: { email: 'pangolongomo@gmail.com' },
    update: {},
    create: {
      name: 'Ghislain',
      email: 'pangolongomo@gmail.com',
      password: hashedPassword,
      role: 'SUPERADMIN'
    }
  })

  // Create branches
  const branches = [
    { 
      name: 'OFRASAT Consulting', 
      type: 'CONSULTING' as BranchType, 
      slug: 'consulting',
      description: 'Cabinet de consultance spécialisé dans l\'ingénierie numérique et le conseil stratégique'
    },
    { 
      name: 'OFRASAT Finance', 
      type: 'FINANCE' as BranchType, 
      slug: 'finance',
      description: 'Institution financière engagée dans l\'accompagnement des particuliers et entrepreneurs'
    },
    { 
      name: 'OFRASAT Communication', 
      type: 'COMMUNICATION' as BranchType, 
      slug: 'communication',
      description: 'Cabinet de communication global spécialisé dans le conseil stratégique et la production audiovisuelle'
    }
  ]

  for (const branch of branches) {
    await prisma.branch.upsert({
      where: { type: branch.type },
      update: {},
      create: branch
    })
  }

  // Create company info
  const companyInfo = await prisma.companyInfo.findFirst()
  if (!companyInfo) {
    await prisma.companyInfo.create({
      data: {
        mission: 'Accompagner nos clients dans la réalisation de leurs projets complexes en offrant des solutions innovantes et durables.',
        vision: 'Devenir une compagnie leader en matière d\'ingénierie et d\'appui-conseil dans la mise en œuvre des missions complexes gouvernementales et privées.',
        values: 'Sérieux, Innovation, Fidélité, Excellence, Intégrité',
        address: 'Kinshasa, République Démocratique du Congo',
        phone: '+243 840 736 765',
        email: 'contact@ofrasat.com',
        website: 'www.ofrasat.com'
      }
    })
  }

  console.log('Seeding completed')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })