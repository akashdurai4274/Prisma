import { PrismaClient } from "@prisma/client";
import {
  createData,
  fetchArticles,
  fetchAllData,
  fetchUsers,
  updatePrismaUser,
  deleteUser,
  deleteAllUsers,
  deleteArticle,
} from "./crud_ops/operations";

const prisma = new PrismaClient();



const user = {
  name: "testuser2.com",
  email: "test2@gmail.com",
};

const article = {
  title: "Second Article Title",
  body: "Second Article Body",
  authorId: 2,
};

const updateUser = {
  id: 1,
  name:"Akash Durai"
}
async function main() {
  createData(user, article);
  updatePrismaUser(updateUser);
  fetchUsers();
  fetchArticles();
  fetchAllData();
  deleteUser(2);
  deleteArticle(2);
  deleteAllUsers();
  deleteAllUsers();
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
