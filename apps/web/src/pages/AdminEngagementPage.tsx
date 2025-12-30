import { useEffect, useMemo, useState } from "react";

import {
  createAnnouncement,
  fetchAnnouncements,
  fetchBatches,
  fetchDepartments,
  fetchFeedback,
  fetchLeaveRequests,
  updateLeaveRequest,
} from "../lib/api";

export default function AdminEngagementPage() {
  const [announcements, setAnnouncements] = useState<
    Array<{ _id: string; title: string; body: string; audience: string }>
  >([]);
  const [leaveRequests, setLeaveRequests] = useState<
    Array<{ _id: string; date: string; status: string; reason: string }>
  >([]);
  const [feedback, setFeedback] = useState<Array<{ _id: string; rating: number; comment: string | null }>>([]);
  const [departments, setDepartments] = useState<Array<{ _id: string; name: string }>>([]);
  const [batches, setBatches] = useState<Array<{ _id: string; name: string }>>([]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState<"all" | "department" | "batch">("all");
  const [audienceRef, setAudienceRef] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchAnnouncements().then(setAnnouncements).catch(() => setAnnouncements([]));
    fetchLeaveRequests().then(setLeaveRequests).catch(() => setLeaveRequests([]));
    fetchFeedback().then(setFeedback).catch(() => setFeedback([]));
    fetchDepartments().then(setDepartments).catch(() => setDepartments([]));
    fetchBatches().then(setBatches).catch(() => setBatches([]));
  }, []);

  const audienceOptions = useMemo(() => {
    if (audience === "department") {
      return departments.map((item) => ({ value: item._id, label: item.name }));
    }
    if (audience === "batch") {
      return batches.map((item) => ({ value: item._id, label: item.name }));
    }
    return [];
  }, [audience, departments, batches]);

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);
    try {
      await createAnnouncement({
        title,
        body,
        audience,
        audienceRef: audience === "all" ? undefined : audienceRef,
      });
      const updated = await fetchAnnouncements();
      setAnnouncements(updated);
      setTitle("");
      setBody("");
      setAudience("all");
      setAudienceRef("");
      setMessage("Announcement published.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Publish failed");
    }
  };

  const handleDecision = async (id: string, status: "approved" | "denied") => {
    await updateLeaveRequest(id, status);
    const updated = await fetchLeaveRequests();
    setLeaveRequests(updated);
  };

  return (
    <div className="grid">
      <div className="card">
        <div className="section-title">
          <h3>Broadcast announcements</h3>
        </div>
        <form className="grid" onSubmit={handleCreate}>
          <label className="input">
            Title
            <input value={title} onChange={(event) => setTitle(event.target.value)} />
          </label>
          <label className="input">
            Message
            <input value={body} onChange={(event) => setBody(event.target.value)} />
          </label>
          <label className="input">
            Audience
            <select value={audience} onChange={(event) => setAudience(event.target.value as "all" | "department" | "batch")}
            >
              <option value="all">All campus</option>
              <option value="department">Department</option>
              <option value="batch">Batch</option>
            </select>
          </label>
          {audience !== "all" ? (
            <label className="input">
              Audience target
              <select value={audienceRef} onChange={(event) => setAudienceRef(event.target.value)}>
                <option value="">Select</option>
                {audienceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
          <button className="button" type="submit">
            Publish
          </button>
        </form>
        {message ? <div className="notice">{message}</div> : null}
      </div>

      <div className="card">
        <div className="section-title">
          <h3>Latest announcements</h3>
        </div>
        {announcements.map((item) => (
          <div className="card" key={item._id}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <p>Audience: {item.audience}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="section-title">
          <h3>Leave requests</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((item) => (
              <tr key={item._id}>
                <td>{item.date}</td>
                <td>{item.status}</td>
                <td>{item.reason}</td>
                <td>
                  <button className="button" onClick={() => handleDecision(item._id, "approved")}>
                    Approve
                  </button>
                  <button className="button secondary" onClick={() => handleDecision(item._id, "denied")}>
                    Deny
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="section-title">
          <h3>Student feedback</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Rating</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {feedback.map((item) => (
              <tr key={item._id}>
                <td>{item.rating}★</td>
                <td>{item.comment ?? "--"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
