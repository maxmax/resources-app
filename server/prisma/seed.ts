import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    resources: {
      create: [
        {
          title: 'Join the Prisma Slack',
          content: 'https://slack.prisma.io',
          priority: 1,
          status: 'In Progress',
          published: true,
          tasks: {
            create: [
              {
                title: 'Complete Slack registration',
                content: 'Follow the link and register',
                status: 'In Progress',
                priority: 2,
                start: new Date(),
                end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Example: 7 days from now
                author: { connect: { email: 'alice@prisma.io' } },
              },
            ],
          },
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch(async (e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
