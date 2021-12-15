import { Entry } from "@prisma/client";
import { LoaderFunction, useLoaderData, useParams } from "remix";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async ({ params }) => {
  return db.entry.findUnique({
    where: { id: params.entryId },
  });
};

export default function BlogEntriesEntryId() {
  const data = useLoaderData<Entry>();

  return (
    <div className="entryDisplay">
      <h2>{data.title}</h2>
      <h3>{data.subtitle}</h3>
      <p>{data.content}</p>
    </div>
  );
}

export function ErrorBoundary() {
  const { entryId } = useParams();
  return (
    <div className="error-container">{`There was an error loading entry by the id ${entryId}. Sorry.`}</div>
  );
}
