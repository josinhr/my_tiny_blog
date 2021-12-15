import {
  Link,
  LinksFunction,
  LoaderFunction,
  Outlet,
  useLoaderData,
} from "remix";

import { db } from "~/utils/db.server";
import stylesUrl from "~/styles/blogEntries.css";
import { BlogEntryFromDatabaseLoader } from "~/utils/types";
import { getUser } from "~/utils/session.server";
import { Entry } from "@prisma/client";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: stylesUrl,
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const blogEntryDatabase: Entry[] = await db.entry.findMany({
    // take: 5,
    orderBy: { createdAt: "desc" },
  });
  const user = await getUser(request);

  const data: BlogEntryFromDatabaseLoader = {
    entries: blogEntryDatabase,
    user: user,
  };
  return data;
};

export default function BlogEntriesRoute() {
  const data = useLoaderData<BlogEntryFromDatabaseLoader>();
  return (
    <div>
      <header className="entries-header">
        <div className="home-link">
          <Link to="/" title="entries" aria-label="Entries">
            <h1>My tiny blog entries ✍</h1>
          </Link>
        </div>
        {data.user ? (
          <div className="user-info">
            <span>{`Hi ${data.user.username}`}</span>
            <form action="/logout" method="post">
              <button type="submit" className="button">
                Logout
              </button>
            </form>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </header>

      <hr className="rounded" />
      <h2>
        Remix <span>blog entries!</span>
      </h2>
      <div className="content">
        <div className="sidebar">
          <nav className="entriesList">
            <ul>
              {data.entries.map((entry) => (
                <li key={entry.title}>
                  <Link to={entry.id}>{entry.title}</Link>
                </li>
              ))}
              <li className="addLi">
                <Link to="newEntry">New entry</Link>
              </li>
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
