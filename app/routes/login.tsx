import { LinksFunction } from "remix";
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
  return <></>;
}
