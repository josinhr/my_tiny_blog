import { Links, LinksFunction, LiveReload, Outlet, useCatch } from "remix";

import globalStylesUrl from "./styles/global.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: globalStylesUrl,
    },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>My tiny blog!</title>
        <Links />
      </head>
      <body>
        <Outlet />
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="error-container">
      <h1>App Error</h1>
      <pre>{error.message}</pre>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div className="error-container">
      <h1>
        {caught.status} {caught.statusText}
      </h1>
    </div>
  );
}
