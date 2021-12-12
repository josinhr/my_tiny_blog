import blog_entries from "../posts/blog_entries.json";
import { BlogEntry } from "../app/utils/types";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getBlogEntries().map((entry) => {
      return db.entry.create({ data: entry });
    })
  );
}

seed();

function getBlogEntries(): BlogEntry[] {
  return blog_entries as BlogEntry[];
}
