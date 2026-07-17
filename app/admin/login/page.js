import { login } from "./actions";
import "../admin.css";

export const metadata = { title: "Log in — WASHERO Admin" };

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const hasError = params?.error === "1";

  return (
    <div className="login-shell">
      <form className="login-card" action={login}>
        <img src="/logo.png" alt="WASHERO" className="logo" style={{ height: "28px", marginBottom: "14px" }} />
        <p className="login-sub">Sign in to manage the site.</p>
        <div className="field">
          <label>Email</label>
          <input type="email" name="email" placeholder="you@washero.com" required autoFocus />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" name="password" placeholder="••••••••" required />
        </div>
        {hasError && <p className="login-error">Incorrect email or password. Try again.</p>}
        <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
          Log in
        </button>
      </form>
    </div>
  );
}
