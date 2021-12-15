import { ActionFunction, Link, LoaderFunction, redirect } from "remix";
import { logout } from "~/utils/session.server";

export const action: ActionFunction = async ({ request }) => {
  return logout(request);
};

export const loader: LoaderFunction = async () => {
  return redirect("/");
};

export default function LogoutRoute() {
  <Link to="new" className="button">
    Add your own
  </Link>;
}
