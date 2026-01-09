import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../css/Login.css";

export default function LoginPage() {
  const { login, serverError, loading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};
    if (!email) newErrors.email = "Email kötelező";
    if (!password) newErrors.password = "Jelszó kötelező";
    return newErrors;
  }

  function submit(e) {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }


    login({ email, password });
  }

  return (
    <div className="login-container">
      <div className="auth-card">
        <h1 className="auth-title">Bejelentkezés</h1>
        <p className="auth-subtitle">Lépj be a fiókoddal.</p>

        {serverError && <div className="alert-error">{serverError}</div>}

        <form onSubmit={submit}>
          <div className="input-group">
            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div className="input-group">
            <label>Jelszó</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            {errors.password && <div className="field-error">{errors.password}</div>}
          </div>

          <button disabled={loading} type="submit">
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          Nincs fiókod? <Link to="/register">Regisztráció</Link>
        </div>
      </div>
    </div>
  )
}
