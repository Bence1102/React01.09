import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navigation() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="topbar">
      <div className="brand keret padding">SKILLSHARE ACADEMY</div>

      <nav className="nav">
        <NavLink className="navlink" to="/dashboard">DASHBOARD</NavLink>
        <NavLink className="navlink" to="/courses">COURSES</NavLink>
        <NavLink className="navlink" to="/mentors">MENTORS</NavLink>
      </nav>

      <div className="right">
        <div className="keret padding credits">
          {user?.creditBalance ?? "0"} CREDITS
        </div>

        <div className="welcome">
          Welcome, {user?.name ?? "Guest"}
        </div>

        <button className="keret padding btn" onClick={logout}>
          LOGOUT
        </button>
      </div>
    </div>
  );
}
