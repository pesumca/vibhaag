import { useEffect, useMemo, useState } from "react";

import { fetchAnnouncements, fetchLeaveRequests, fetchStudentAttendance, fetchStudentSchedule } from "../lib/api";

type Session = { _id: string; title: string; dayOfWeek: number; startTime: string; endTime: string };

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function StudentHomePage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [announcements, setAnnouncements] = useState<Array<{ _id: string; title: string }>>([]);
  const [attendance, setAttendance] = useState<Array<{ _id: string; status: string }>>([]);
  const [leaveRequests, setLeaveRequests] = useState<Array<{ _id: string; status: string }>>([]);

  useEffect(() => {
    fetchStudentSchedule().then(setSessions).catch(() => setSessions([]));
    fetchAnnouncements().then(setAnnouncements).catch(() => setAnnouncements([]));
    fetchStudentAttendance().then(setAttendance).catch(() => setAttendance([]));
    fetchLeaveRequests().then(setLeaveRequests).catch(() => setLeaveRequests([]));
  }, []);

  const upcoming = useMemo(() => sessions.slice(0, 3), [sessions]);
  const attendanceRate = useMemo(() => {
    if (attendance.length === 0) return 0;
    const present = attendance.filter((row) => row.status === "present").length;
    return Math.round((present / attendance.length) * 100);
  }, [attendance]);

  const pendingLeaves = leaveRequests.filter((item) => item.status === "pending").length;

  return (
    <>
      <section className="hero">
        <div>
          <span className="badge">Student Hub</span>
          <h2>Your attendance and class updates in one feed.</h2>
          <p>Check in, request leave, and stay on top of announcements.</p>
        </div>
        <button className="button">Request leave</button>
      </section>

      <section className="grid">
        <div className="card">
          <h3>Attendance rate</h3>
          <div className="kpi">{attendanceRate}%</div>
          <p>Based on your recent check-ins.</p>
        </div>
        <div className="card">
          <h3>Pending leaves</h3>
          <div className="kpi">{pendingLeaves}</div>
          <p>Waiting on approval.</p>
        </div>
        <div className="card">
          <h3>Announcements</h3>
          <div className="kpi">{announcements.length}</div>
          <p>New updates for your cohort.</p>
        </div>
      </section>

      <section className="card">
        <div className="section-title">
          <h3>Upcoming sessions</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Session</th>
              <th>Day</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {upcoming.map((session) => (
              <tr key={session._id}>
                <td>{session.title}</td>
                <td>{days[session.dayOfWeek]}</td>
                <td>
                  {session.startTime} - {session.endTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
