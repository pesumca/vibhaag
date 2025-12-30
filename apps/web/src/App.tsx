import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { BarChart3, CalendarDays, Layers, LogOut, ShieldCheck, Users } from "lucide-react";

import { fetchMe, login, logout } from "./lib/api";
import AnalyticsPage from "./pages/AnalyticsPage";
import AttendancePage from "./pages/AttendancePage";
import DashboardPage from "./pages/DashboardPage";
import PeoplePage from "./pages/PeoplePage";
import SessionsPage from "./pages/SessionsPage";

const navItems = [
  { to: "/", label: "Overview", icon: BarChart3 },
  { to: "/attendance", label: "Attendance", icon: ShieldCheck },
  { to: "/sessions", label: "Timetable", icon: CalendarDays },
  { to: "/people", label: "People", icon: Users },
  { to: "/analytics", label: "Analytics", icon: Layers },
];

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("admin@vibhaag.dev");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-shell">
      <form className="login-card fade-in" onSubmit={handleSubmit}>
        <div>
          <h2>Welcome back</h2>
          <p>Sign in to track attendance, sessions, and analytics.</p>
        </div>
        <div className="notice">Seeded login: admin@vibhaag.dev / admin123</div>
        <label className="input">
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="input">
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error ? <div className="notice">{error}</div> : null}
        <button className="button" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export default function App() {
  const [userName, setUserName] = useState<string | null>(null);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    fetchMe()
      .then((user) => setUserName(user.name))
      .catch(() => setUserName(null))
      .finally(() => setBooting(false));
  }, []);

  const handleLogout = () => {
    logout();
    setUserName(null);
  };

  const mainContent = useMemo(() => {
    if (booting) {
      return <div className="login-shell">Loading...</div>;
    }
    if (!userName) {
      return <LoginScreen onSuccess={() => fetchMe().then((user) => setUserName(user.name))} />;
    }
    return (
      <div className="app-shell fade-in">
        <aside className="sidebar">
          <div>
            <h1>Vibhaag</h1>
            <p>{userName}</p>
          </div>
          <nav className="nav-group">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            ))}
          </nav>
          <button className="button secondary" onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </aside>
        <main className="main">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/sessions" element={<SessionsPage />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Routes>
        </main>
      </div>
    );
  }, [booting, userName]);

  return <BrowserRouter>{mainContent}</BrowserRouter>;
}
