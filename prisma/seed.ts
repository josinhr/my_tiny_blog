import blog_entries from "../posts/blog_entries.json";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

type BlogEntryFromJson = {
  title: string;
  subtitle: string;
  content: string;
};

async function seed() {
  const admin = await db.user.create({
    data: {
      username: "admin",
      // this is a hashed version of "twixrox"
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
  });

  await Promise.all(
    getBlogEntries().map((entry) => {
      return db.entry.create({ data: { bloggerId: admin.id, ...entry } });
    })
  );
}

seed();

function getBlogEntries(): BlogEntryFromJson[] {
  return blog_entries as BlogEntryFromJson[];
}
