import { useEffect, useState } from "react";

import { fetchStudentAttendance, fetchStudentSchedule, studentCheckIn } from "../lib/api";

type Session = { _id: string; title: string; startTime: string; endTime: string };

type Attendance = { _id: string; date: string; status: string; checkInAt: string | null };

export default function StudentAttendancePage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);

  useEffect(() => {
    fetchStudentSchedule().then(setSessions).catch(() => setSessions([]));
    fetchStudentAttendance().then(setAttendance).catch(() => setAttendance([]));
  }, []);

  const handleCheckIn = async (sessionId: string) => {
    await studentCheckIn(sessionId);
    const updated = await fetchStudentAttendance();
    setAttendance(updated);
  };

  return (
    <div className="grid">
      <div className="card">
        <div className="section-title">
          <h3>Check in</h3>
          <button className="button secondary">QR check</button>
        </div>
        <p>Check in for your next session.</p>
        <div className="grid">
          {sessions.map((session) => (
            <div className="card" key={session._id}>
              <h3>{session.title}</h3>
              <p>
                {session.startTime} - {session.endTime}
              </p>
              <button className="button" onClick={() => handleCheckIn(session._id)}>
                Check in
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="section-title">
          <h3>Recent check-ins</h3>
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>Check-in</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((row) => (
                <tr key={row._id}>
                  <td data-label="Date">{row.date}</td>
                  <td data-label="Status">{row.status}</td>
                  <td data-label="Check-in">{row.checkInAt ? new Date(row.checkInAt).toLocaleTimeString() : "--"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
