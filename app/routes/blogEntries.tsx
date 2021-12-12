import {
  Link,
  LinksFunction,
  LoaderFunction,
  Outlet,
  useLoaderData,
} from "remix";

import { db } from "~/utils/db.server";
import stylesUrl from "~/styles/blogEntries.css";
import { BlogEntryFromDatabase } from "~/utils/types";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: stylesUrl,
    },
  ];
};

export const loader: LoaderFunction = async () => {
  const data: BlogEntryFromDatabase[] = await db.entry.findMany({
    // take: 5,
    orderBy: { createdAt: "desc" },
  });
  return data;
};

export default function BlogEntriesRoute() {
  const data = useLoaderData<BlogEntryFromDatabase[]>();
  return (
    <div>
      <h1>My tiny blog entries ✍</h1>
      <hr className="rounded" />
      <h2>
        Remix <span>blog entries!</span>
      </h2>
      <div className="content">
        <div className="sidebar">
          <nav className="entriesList">
            <ul>
              {data.map((entry) => (
                <li key={entry.title}>
                  <Link to={entry.id}>{entry.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <hr className="rounded" />
        </div>
        <div>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
