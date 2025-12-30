import { useEffect, useState } from "react";

import { fetchStudentSchedule, submitFeedback } from "../lib/api";

type Session = { _id: string; title: string };

export default function StudentFeedbackPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchStudentSchedule().then(setSessions).catch(() => setSessions([]));
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);
    try {
      await submitFeedback(sessionId, Number(rating), comment);
      setSessionId("");
      setRating("5");
      setComment("");
      setMessage("Feedback submitted. Thank you!");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Feedback failed");
    }
  };

  return (
    <div className="card">
      <div className="section-title">
        <h3>Session feedback</h3>
      </div>
      <form onSubmit={handleSubmit} className="grid">
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
          Rating
          <select value={rating} onChange={(event) => setRating(event.target.value)}>
            {["5", "4", "3", "2", "1"].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label className="input">
          Comment
          <input value={comment} onChange={(event) => setComment(event.target.value)} />
        </label>
        <button className="button" type="submit">
          Submit feedback
        </button>
      </form>
      {message ? <div className="notice">{message}</div> : null}
    </div>
  );
}
