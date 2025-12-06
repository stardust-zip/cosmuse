import { PrismaClient } from "@prisma/client";
const isTest = process.env.NODE_ENV === "test";
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: isTest ? "file:../src/test.db" : process.env.DATABASE_URL,
    },
  },
});
