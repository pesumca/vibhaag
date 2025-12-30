import { useEffect, useState } from "react";

import { createCourse, createSession, fetchBatches, fetchCourses, fetchDepartments, fetchSessions } from "../lib/api";

type Session = { _id: string; title: string; dayOfWeek: number; startTime: string; endTime: string };

type Course = { _id: string; name: string; code: string };

type Batch = { _id: string; name: string };

type Department = { _id: string; name: string };

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseDepartmentId, setCourseDepartmentId] = useState("");

  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [batchId, setBatchId] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("1");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchSessions().then(setSessions).catch(() => setSessions([]));
    fetchCourses().then(setCourses).catch(() => setCourses([]));
    fetchBatches().then(setBatches).catch(() => setBatches([]));
    fetchDepartments().then(setDepartments).catch(() => setDepartments([]));
  }, []);

  const refresh = async () => {
    const [sessionsData, coursesData] = await Promise.all([fetchSessions(), fetchCourses()]);
    setSessions(sessionsData);
    setCourses(coursesData);
  };

  const handleCourse = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);
    try {
      await createCourse(courseName, courseCode, courseDepartmentId);
      await refresh();
      setCourseName("");
      setCourseCode("");
      setCourseDepartmentId("");
      setMessage("Course created.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Course creation failed");
    }
  };

  const handleSession = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);
    try {
      await createSession({
        title,
        courseId,
        batchId,
        dayOfWeek: Number(dayOfWeek),
        startTime,
        endTime,
        room: room || undefined,
      });
      await refresh();
      setTitle("");
      setCourseId("");
      setBatchId("");
      setDayOfWeek("1");
      setStartTime("09:00");
      setEndTime("10:00");
      setRoom("");
      setMessage("Session created.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Session creation failed");
    }
  };

  return (
    <div className="grid">
      <div className="card">
        <div className="section-title">
          <h3>Create course</h3>
        </div>
        <form className="form-grid" onSubmit={handleCourse}>
          <label className="input">
            Course name
            <input value={courseName} onChange={(event) => setCourseName(event.target.value)} />
          </label>
          <label className="input">
            Course code
            <input value={courseCode} onChange={(event) => setCourseCode(event.target.value)} />
          </label>
          <label className="input">
            Department
            <select value={courseDepartmentId} onChange={(event) => setCourseDepartmentId(event.target.value)}>
              <option value="">Select department</option>
              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
            </select>
          </label>
          <button className="button" type="submit">
            Create course
          </button>
        </form>
      </div>

      <div className="card">
        <div className="section-title">
          <h3>Create session</h3>
        </div>
        <form className="form-grid" onSubmit={handleSession}>
          <label className="input">
            Title
            <input value={title} onChange={(event) => setTitle(event.target.value)} />
          </label>
          <label className="input">
            Course
            <select value={courseId} onChange={(event) => setCourseId(event.target.value)}>
              <option value="">Select course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
          </label>
          <label className="input">
            Batch
            <select value={batchId} onChange={(event) => setBatchId(event.target.value)}>
              <option value="">Select batch</option>
              {batches.map((batch) => (
                <option key={batch._id} value={batch._id}>
                  {batch.name}
                </option>
              ))}
            </select>
          </label>
          <label className="input">
            Day
            <select value={dayOfWeek} onChange={(event) => setDayOfWeek(event.target.value)}>
              {days.map((day, index) => (
                <option key={day} value={index}>
                  {day}
                </option>
              ))}
            </select>
          </label>
          <label className="input">
            Start time
            <input value={startTime} onChange={(event) => setStartTime(event.target.value)} />
          </label>
          <label className="input">
            End time
            <input value={endTime} onChange={(event) => setEndTime(event.target.value)} />
          </label>
          <label className="input">
            Room
            <input value={room} onChange={(event) => setRoom(event.target.value)} />
          </label>
          <button className="button" type="submit">
            Create session
          </button>
        </form>
        {message ? <div className="notice">{message}</div> : null}
      </div>

      <div className="card">
        <div className="section-title">
          <h3>Timetable</h3>
        </div>
        <div className="table-wrap">
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
      </div>
    </div>
  );
}
