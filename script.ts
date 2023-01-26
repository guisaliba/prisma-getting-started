import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // create() query will create a new record in the database
  const user = await prisma.user.create({
    data: {
      name: 'Guilherme',
      email: 'guilherme@prisma.io',
    },
  })
  console.log(user)
  // { id: 1, email: 'guilherme@prisma.io', name: 'Guilherme' }


  // findMany() query will retrieve all data inside the User model
  const users = await prisma.user.findMany()
  console.log(users)
  // [ { id: 1, email: 'guilherme@prisma.io', name: 'Guilherme' } ]


  // create() query will create a new record in the User model
  // it will also create an object in the Tweets model
  const user_two = await prisma.user.create({
    data: {
      name: 'Saliba',
      email: 'saliba@prisma.io',
      tweets: {
        create: {
          title: 'Hello World! This is my first tweet!',
        },
      },
    },
  })

  console.log(user_two)
  // { id: 2, email: 'saliba@prisma.io', name: 'Saliba' }


  // findMany() query again but this time using the include option
  // so Prisma knows we want this query to return tweets from our users
  const usersWithTweets = await prisma.user.findMany({
    include: {
      tweets: true,
    },
  })
  console.dir(usersWithTweets, { depth: null })
  //  [
  //   {
  //     id: 1,
  //     email: 'guilherme@prisma.io',
  //     name: 'Guilherme',
  //     tweets: []
  //   },
  //   {
  //     id: 2,
  //     email: 'saliba@prisma.io',
  //     name: 'Saliba',
  //     tweets: [
  //       {
  //         id: 1,
  //         title: 'Hello World! This is my first tweet!',
  //         content: null,
  //         published: false,
  //         authorId: 2
  //       }
  //     ]
  //   }
  // ]

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch((async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }))