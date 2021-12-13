import { Link, LinksFunction, useSearchParams } from "remix";
import stylesUrl from "~/styles/login.css";
export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: stylesUrl,
    },
  ];
};

export default function Login() {
  const [searchParams] = useSearchParams();

  return (
    <div className="loginContainer">
      <h1>Login</h1>
      <form method="post">
        <input
          type="hidden"
          name="redirectTo"
          value={searchParams.get("redirectTo") ?? undefined}
        />
        <fieldset>
          <legend className="sr-only">Login or Register?</legend>
          <label>
            <input type="radio" name="loginType" value="login" defaultChecked />{" "}
            Login
          </label>
          <label>
            <input type="radio" name="loginType" value="register" /> Register
          </label>
        </fieldset>
        <div className="inputContent">
          <div>
            <label htmlFor="username-input">Username</label>
            <input type="text" id="username-input" name="username" />
          </div>
          <div>
            <label htmlFor="password-input">Password</label>
            <input id="password-input" name="password" type="password" />
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </div>
      </form>
      <div className="links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogEntries">Blog</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
