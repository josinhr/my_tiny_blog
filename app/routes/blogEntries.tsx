import { LinksFunction, Outlet } from "remix";

import stylesUrl from "~/styles/blogEntries.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: stylesUrl,
    },
  ];
};

export default function BlogEntriesRoute() {
  return (
    <div>
      <h1>My tiny blog entries ✍</h1>
      <hr className="rounded" />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
