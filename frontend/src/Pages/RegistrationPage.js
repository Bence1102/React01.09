import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Login.css";
import { AuthContext } from "../context/AuthContext";

export default function RegistrationPage() {
  const { register, serverError, loading } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const fieldName = e.target.name; 
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  }

  function validate() {
    const newErrors = {};

    if (form.name.trim() === "") {
      newErrors.name = "A név kötelező";
    }

    if (form.email.trim() === "") {
      newErrors.email = "Az email kötelező";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Érvénytelen email";
    }

    if (form.password === "") {
      newErrors.password = "A jelszó kötelező";
    } else if (form.password.length < 6) {
      newErrors.password = "Minimum 6 karakter";
    }

    if (form.cpassword === "") {
      newErrors.cpassword = "Jelszó megerősítés kötelező";
    } else if (form.cpassword !== form.password) {
      newErrors.cpassword = "A két jelszó nem egyezik";
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return; 

    
    register({
      name: form.name,
      email: form.email,
      password: form.password,
      cpassword: form.cpassword,
    });
  }

  return (
    <div className="login-container">
      <div className="auth-card">
        <h1 className="auth-title">Regisztráció</h1>
        <p className="auth-subtitle">Hozd létre a fiókodat.</p>

        {serverError && <div className="alert-error">{serverError}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Név</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Név"
            />
            {errors.name && (
              <div className="field-error">{errors.name}</div>
            )}
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
            />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div className="input-group">
            <label>Jelszó</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Jelszó"
            />
            {errors.password && (
              <div className="field-error">{errors.password}</div>
            )}
          </div>

          <div className="input-group">
            <label>Jelszó megerősítése</label>
            <input
              name="cpassword"
              type="password"
              value={form.cpassword}
              onChange={handleChange}
              placeholder="Jelszó megerősítése"
            />
            {errors.cpassword && (
              <div className="field-error">{errors.cpassword}</div>
            )}
          </div>

          <button disabled={loading} type="submit">
            {loading ? "Loading..." : "Register"}
          </button>
        </form>

        <div className="auth-footer">
          Van már fiókod? <Link to="/login">Bejelentkezés</Link>
        </div>
      </div>
    </div>
  );
}
