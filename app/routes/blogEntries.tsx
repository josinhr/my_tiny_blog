import {
  Link,
  LinksFunction,
  LoaderFunction,
  Outlet,
  useLoaderData,
} from "remix";

import { db } from "~/utils/db.server";
import stylesUrl from "~/styles/blogEntries.css";
import { BlogEntry } from "../../prisma/model";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: stylesUrl,
    },
  ];
};

type BlogEntryFromDatabase = BlogEntry & {
  id: string;
};

export const loader: LoaderFunction = async () => {
  const data: BlogEntryFromDatabase[] = await db.entry.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });
  return data;
};

export default function BlogEntriesRoute() {
  const data = useLoaderData<BlogEntry[]>();
  return (
    <div>
      <h1>My tiny blog entries ✍</h1>
      <hr className="rounded" />
      <h2>
        Remix <span>blog entries!</span>
      </h2>
      <div className="content">
        <nav className="entriesList">
          <ul>
            {data.map((entry) => (
              <li key={entry.title}>
                <Link to={entry.title}>{entry.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
