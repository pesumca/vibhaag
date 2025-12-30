import { useEffect, useState } from "react";

import { fetchAnalytics } from "../lib/api";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<{
    totalSessions: number;
    totalFaculty: number;
    totalStudents: number;
    last7Days: { totalRecords: number; checkedOut: number; attendanceRate: number };
    signals: { pendingLeaves: number; feedbackAvg: number };
  } | null>(null);

  useEffect(() => {
    fetchAnalytics().then(setAnalytics).catch(() => setAnalytics(null));
  }, []);

  return (
    <div className="grid">
      <div className="card">
        <h3>Participation score</h3>
        <div className="kpi">{analytics?.last7Days.attendanceRate ?? 0}%</div>
        <p>Share completion rate across last 7 days.</p>
      </div>
      <div className="card">
        <h3>Checkouts processed</h3>
        <div className="kpi">{analytics?.last7Days.checkedOut ?? 0}</div>
        <p>Sessions successfully closed by faculty.</p>
      </div>
      <div className="card">
        <h3>Pending sessions</h3>
        <div className="kpi">{analytics ? analytics.totalSessions - analytics.last7Days.checkedOut : "--"}</div>
        <p>Estimated sessions without full checkout yet.</p>
      </div>
      <div className="card">
        <h3>Student headcount</h3>
        <div className="kpi">{analytics?.totalStudents ?? 0}</div>
        <p>Active student profiles in the system.</p>
      </div>
      <div className="card">
        <h3>Feedback average</h3>
        <div className="kpi">{analytics?.signals.feedbackAvg ?? 0}★</div>
        <p>Average session rating.</p>
      </div>
      <div className="card">
        <h3>Pending leaves</h3>
        <div className="kpi">{analytics?.signals.pendingLeaves ?? 0}</div>
        <p>Awaiting faculty approval.</p>
      </div>
    </div>
  );
}
