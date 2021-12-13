import { LoaderFunction, useLoaderData } from "remix";
import { db } from "~/utils/db.server";
import { BlogEntryFromDatabase } from "~/utils/types";

export const loader: LoaderFunction = async ({ params }) => {
  return db.entry.findUnique({
    where: { id: params.entryId },
  });
};

export default function BlogEntriesEntryId() {
  const data = useLoaderData<BlogEntryFromDatabase>();

  return (
    <div className="entryDisplay">
      <h2>{data.title}</h2>
      <h3>{data.subtitle}</h3>
      <p>{data.content}</p>
    </div>
  );
}
