import { useEffect, useState } from "react";

import { fetchAnalytics } from "../lib/api";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<{
    totalSessions: number;
    totalFaculty: number;
    last7Days: { totalRecords: number; checkedOut: number; attendanceRate: number };
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
    </div>
  );
}
