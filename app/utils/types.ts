import { Entry, User } from "@prisma/client";

export type BlogEntryFromDatabaseLoader = {
  user: User | null;
  entries: Entry[];
};

export type ActionData = {
  formError?: string;
  fieldErrors?: {
    title: string | undefined;
    subtitle: string | undefined;
    content: string | undefined;
  };
  fields?: {
    title: string;
    subtitle: string;
    content: string;
  };
};
