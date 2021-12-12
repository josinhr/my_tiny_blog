import { Link } from "remix";

export default function BlogEntriesRoute() {
  return (
    <div className="container">
      <div className="content">
        <h2>
          Remix <span>blog entries!</span>
        </h2>
        <nav className="entriesList">
          <ul>
            <li>
              <Link to="entry-1">First Entry</Link>
            </li>
            <li>
              <Link to="entry-2">Second Entry</Link>
            </li>
            <li>
              <Link to="entry-3">Third Entry</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
