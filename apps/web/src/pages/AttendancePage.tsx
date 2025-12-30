import { useEffect, useState } from "react";

import { checkIn, fetchAttendance, fetchSessions } from "../lib/api";

type Session = { _id: string; title: string; dayOfWeek: number; startTime: string; endTime: string };

export default function AttendancePage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [attendance, setAttendance] = useState<
    Array<{ _id: string; date: string; status: string; checkInAt: string | null }>
  >([]);

  useEffect(() => {
    fetchSessions().then(setSessions).catch(() => setSessions([]));
    fetchAttendance().then(setAttendance).catch(() => setAttendance([]));
  }, []);

  const handleCheckIn = async (sessionId: string) => {
    await checkIn(sessionId);
    const updated = await fetchAttendance();
    setAttendance(updated);
  };

  return (
    <div className="grid">
      <div className="card">
        <div className="section-title">
          <h3>Today’s sessions</h3>
          <button className="button secondary">Auto-assign</button>
        </div>
        <p>Tap to check in for your upcoming sessions.</p>
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
          <h3>Recent attendance</h3>
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
