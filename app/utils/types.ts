export type BlogEntry = {
  title: string;
  subtitle: string;
  content: string;
};

export type BlogEntryFromDatabase = BlogEntry & {
  id: string;
};
