import { redirect } from "react-router-dom";

export default function authLoader() {
  const token = localStorage.getItem("token");
  if (!token) throw redirect("/login");
  return null;
}
