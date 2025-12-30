import { useEffect, useState } from "react";

import { fetchSessions } from "../lib/api";

type Session = { _id: string; title: string; dayOfWeek: number; startTime: string; endTime: string };

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    fetchSessions().then(setSessions).catch(() => setSessions([]));
  }, []);

  return (
    <div className="card">
      <div className="section-title">
        <h3>Timetable</h3>
        <button className="button">Add session</button>
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
          {sessions.map((session) => (
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
    </div>
  );
}
