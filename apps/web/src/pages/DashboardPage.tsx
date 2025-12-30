import { useEffect, useState } from "react";

import { fetchAnalytics } from "../lib/api";

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<{
    totalSessions: number;
    totalFaculty: number;
    last7Days: { totalRecords: number; checkedOut: number; attendanceRate: number };
  } | null>(null);

  useEffect(() => {
    fetchAnalytics().then(setAnalytics).catch(() => setAnalytics(null));
  }, []);

  return (
    <>
      <section className="hero">
        <div>
          <span className="badge">Live campus</span>
          <h2>Attendance, insights, and timetable in one place.</h2>
          <p>Track daily participation, manage sessions, and spotlight faculty activity in real time.</p>
        </div>
        <button className="button">Create session</button>
      </section>

      <section className="grid">
        <div className="card">
          <h3>Total sessions</h3>
          <div className="kpi">{analytics?.totalSessions ?? "--"}</div>
          <p>Active timetable entries across departments.</p>
        </div>
        <div className="card">
          <h3>Faculty roster</h3>
          <div className="kpi">{analytics?.totalFaculty ?? "--"}</div>
          <p>Instructors with attendance access.</p>
        </div>
        <div className="card">
          <h3>7-day attendance</h3>
          <div className="kpi">{analytics?.last7Days.attendanceRate ?? 0}%</div>
          <p>{analytics?.last7Days.checkedOut ?? 0} checkouts completed.</p>
        </div>
      </section>
    </>
  );
}
