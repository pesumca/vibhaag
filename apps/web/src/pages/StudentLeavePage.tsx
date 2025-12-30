import { useEffect, useState } from "react";

import { createLeaveRequest, fetchLeaveRequests, fetchStudentSchedule } from "../lib/api";

type Session = { _id: string; title: string };

type LeaveRequest = { _id: string; date: string; status: string; reason: string };

export default function StudentLeavePage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchStudentSchedule().then(setSessions).catch(() => setSessions([]));
    fetchLeaveRequests().then(setLeaveRequests).catch(() => setLeaveRequests([]));
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);
    try {
      await createLeaveRequest(sessionId, date, reason);
      const updated = await fetchLeaveRequests();
      setLeaveRequests(updated);
      setSessionId("");
      setDate("");
      setReason("");
      setMessage("Leave request submitted.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Request failed");
    }
  };

  return (
    <div className="grid">
      <div className="card">
        <div className="section-title">
          <h3>Request leave</h3>
        </div>
        <form onSubmit={handleSubmit} className="form-grid">
          <label className="input">
            Session
            <select value={sessionId} onChange={(event) => setSessionId(event.target.value)}>
              <option value="">Select session</option>
              {sessions.map((session) => (
                <option key={session._id} value={session._id}>
                  {session.title}
                </option>
              ))}
            </select>
          </label>
          <label className="input">
            Date
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          </label>
          <label className="input">
            Reason
            <input value={reason} onChange={(event) => setReason(event.target.value)} />
          </label>
          <button className="button" type="submit">
            Submit request
          </button>
        </form>
        {message ? <div className="notice">{message}</div> : null}
      </div>
      <div className="card">
        <div className="section-title">
          <h3>My requests</h3>
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((item) => (
                <tr key={item._id}>
                  <td>{item.date}</td>
                  <td>{item.status}</td>
                  <td>{item.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
