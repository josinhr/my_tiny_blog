import { Link, LinksFunction } from "remix";
import stylesUrl from "../styles/index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Index() {
  return (
    <div>
      <h1>
        Remix <span>Tiny Blog!</span>
      </h1>
      <hr className="rounded" />
      <div className="buttonContainer">
        <nav>
          <Link to="blogEntries">Go to my entries</Link>
        </nav>
      </div>
    </div>
  );
}
