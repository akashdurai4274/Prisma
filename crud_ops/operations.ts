import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface User {
  id?: number;
  name?: string;
  email?: string;
}

interface Article {
  title?: string;
  body?: string;
  authorId: number;
}

export async function createData(userData: User, articleData: Article) {
  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email!,
    },
  });

  const article = await prisma.article.create({
    data: {
      title: articleData.title!,
      body: articleData.body,
      author: {
        connect: {
          id: articleData.authorId,
        },
      },
    },
  });
}

export async function fetchUsers() {
  
  console.log(await prisma.user.findMany());
}

export async function fetchArticles() {
  console.log(await prisma.article.findMany());
}

export async function fetchAllData() {
  const users = await prisma.user.findMany({ include: { articles: true } });
  users.forEach((user) => {
    console.log(`${user.id}. ${user.name} , ${user.email}`),
      user.articles.forEach((a) =>
        console.log(`${a.id}. ${a.title}, ${a.body}`)
      );
  });
}

export async function updatePrismaUser(userData: User) {
  const user = await prisma.user.update({
    where: {
      id: userData.id,
    },
    data: {
      name: userData.name,
    },
  });
}

export async function deleteAllUsers(){
  await prisma.user.deleteMany();
  console.log("All users Deleted!!")
}

export async function deleteAllArticles() {
  await prisma.article.deleteMany();
  console.log("All Articles Deleted!!");
}

export async function deleteUser(id:number) {
  const user = await prisma.user.delete({
    where: {
      id:id
    }
  });
  console.log(`User ${user} Deleted!!`);
}


export async function deleteArticle(id: number) {
  const article = await prisma.article.delete({
    where: {
      id: id,
    },
  });
  console.log(`Article ${article} Deleted!!`);
}