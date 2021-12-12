export type BlogEntry = {
  title: string;
  subtitle: string;
  content: string;
};

export type BlogEntryFromDatabase = BlogEntry & {
  id: string;
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
