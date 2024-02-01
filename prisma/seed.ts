import { PrismaClient, UserType } from '@prisma/client';
import { randomUUID } from 'crypto';
const prisma = new PrismaClient();
import * as bcrypt from 'bcrypt';

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL },
    update: {},
    create: {
      id: randomUUID(),
      email: process.env.ADMIN_EMAIL,
      name: 'admin',
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
      created_at: new Date(),
      updated_at: new Date(),
      type: UserType.ADMIN,
    },
  });
  console.log({ admin });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
