const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createUser(name, email, password) {
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      emailVerified: new Date(), // Set email as verified
    },
  });

  console.log(`User created: ${name}, ${email}, ${hashedPassword}`);
  return user;
}

async function createOrganizationWithUsers(userIds, organizationName) {
  const organization = await prisma.organization.create({
    data: {
      name: organizationName,
      subscriptionPlan: 'Business', // Set default subscription plan
      users: {
        create: userIds.map(userId => ({
          userId,
          role: 'Admin', // Set default role for all users
        })),
      },
    },
  });

  console.log(`Organization created: ${organizationName}`);
  return organization;
}

async function main() {
  try {
    const usersToAddManually = [
      { name: "User 1", email: "test@test.com", password: "test" },
      { name: "User 2", email: "test2@test.com", password: "test2"},
      { name: "User 3", email: "test3@test.com", password: "test3"},
      { name: "User 4", email: "test4@test.com", password: "test4"},
      { name: "User 5", email: "test5@test.com", password: "test5"},
      { name: "User 6", email: "test6@test.com", password: "test6"},
      { name: "User 7", email: "test7@test.com", password: "test7"},
    ];
    
    const createdUsers = [];

    for (const user of usersToAddManually) {
      const createdUser = await createUser(user.name, user.email, user.password);
      createdUsers.push(createdUser);
    }

    await createOrganizationWithUsers(createdUsers.map(user => user.id), 'Comunidad 5');
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();