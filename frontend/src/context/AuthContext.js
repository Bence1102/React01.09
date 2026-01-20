import { createContext, useEffect, useState } from "react";
import myAxios, { getAuthHeaders } from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  function hibakezeles(error) {
    const status = error?.response?.status;

    if (status === 400) {
      setServerError("Hibás kérés (400). Ellenőrizd az adatokat.");
    } else if (status === 401) {
      setServerError("Hibás email vagy jelszó!");
    } else if (status === 403) {
      setServerError("Nincs jogosultságod ehhez (403).");
    } else if (status === 404) {
      setServerError("A kért erőforrás nem található (404).");
    } else if (status === 422) {
      setServerError("Validációs hiba (422).");
    } else if (status === 500) {
      setServerError("Szerverhiba (500).");
    } else {
      setServerError("Ismeretlen hiba történt.");
    }
  }

  function loadUser() {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      setLoading(false);
      setUser(null);
      setToken(null);
      return;
    }

    setToken(savedToken);
    setLoading(true);
    setServerError("");

    myAxios
      .get("/users/me", { headers: getAuthHeaders() })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
        
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }

  function login(data) {
    setLoading(true);
    setServerError("");

    myAxios
      .post("/users/login", data)
      .then((res) => {
        
        if (!res.data?.token) {
          setServerError("Nem sikerült belépni: hiányzó token a válaszban.");
          return;
        }

        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);

        
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        console.log(err);
        hibakezeles(err);
      })
      .finally(() => setLoading(false));
  }

  function register(data) {
    setLoading(true);
    setServerError("");

    myAxios
      .post("/users/register", data)
      .then(() => {
       
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log(err);
            console.log("Backend error:", err.response?.data || err.message);
        hibakezeles(err);
      })
      .finally(() => setLoading(false));
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        serverError,
        login,
        register,
        logout,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
