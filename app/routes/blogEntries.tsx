import { Outlet } from "remix";

export default function JokesRoute(){
    return (
        <div>
            <h1>My tiny blog entries ✍</h1>
            <main>
                <Outlet />
            </main>
        </div>
    )
}