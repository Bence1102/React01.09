import axios from "axios";

const myAxios = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "X-API-TOKEN": token,
    "Content-Type": "application/json",
  };
}

export default myAxios;
