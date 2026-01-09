import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="page">
      <Navigation />
      <main className="paper">
        <Outlet />
      </main>
    </div>
  );
}
