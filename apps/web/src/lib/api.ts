import type { AuthResponse } from "@vibhaag/shared";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export async function apiFetch<T>(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("vibhaag-token");
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error ?? "Request failed");
  }
  return (await res.json()) as T;
}

export async function login(email: string, password: string) {
  const data = await apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem("vibhaag-token", data.token);
  return data.user;
}

export function logout() {
  localStorage.removeItem("vibhaag-token");
}

export async function fetchMe() {
  return apiFetch<{ id: string; name: string; email: string; role: string }>("/auth/me");
}

export async function fetchAnalytics() {
  return apiFetch<{
    totalSessions: number;
    totalFaculty: number;
    totalStudents: number;
    last7Days: { totalRecords: number; checkedOut: number; attendanceRate: number };
    signals: { pendingLeaves: number; feedbackAvg: number };
  }>("/analytics/overview");
}

export async function fetchSessions() {
  return apiFetch<Array<{ _id: string; title: string; dayOfWeek: number; startTime: string; endTime: string }>>(
    "/sessions"
  );
}

export async function fetchAttendance(from?: string, to?: string) {
  const params = new URLSearchParams();
  if (from) params.set("from", from);
  if (to) params.set("to", to);
  const query = params.toString() ? `?${params.toString()}` : "";
  return apiFetch<
    Array<{ _id: string; date: string; status: string; checkInAt: string | null; durationMinutes: number | null }>
  >(`/attendance/me${query}`);
}

export async function fetchAnnouncements() {
  return apiFetch<
    Array<{ _id: string; title: string; body: string; audience: string; createdAt: string }>
  >("/announcements");
}

export async function createAnnouncement(payload: {
  title: string;
  body: string;
  audience: "all" | "department" | "batch";
  audienceRef?: string;
}) {
  return apiFetch("/announcements", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchStudentSchedule() {
  return apiFetch<Array<{ _id: string; title: string; dayOfWeek: number; startTime: string; endTime: string }>>(
    "/student/schedule"
  );
}

export async function fetchStudentAttendance() {
  return apiFetch<
    Array<{ _id: string; date: string; status: string; checkInAt: string | null }>
  >("/student/attendance");
}

export async function studentCheckIn(sessionId: string) {
  return apiFetch("/student/attendance/check-in", {
    method: "POST",
    body: JSON.stringify({ sessionId }),
  });
}

export async function createLeaveRequest(sessionId: string, date: string, reason: string) {
  return apiFetch("/leave-requests", {
    method: "POST",
    body: JSON.stringify({ sessionId, date, reason }),
  });
}

export async function fetchLeaveRequests() {
  return apiFetch<Array<{ _id: string; date: string; status: string; reason: string }>>("/leave-requests");
}

export async function updateLeaveRequest(id: string, status: "approved" | "denied") {
  return apiFetch(`/leave-requests/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function submitFeedback(sessionId: string, rating: number, comment?: string) {
  return apiFetch("/feedback", {
    method: "POST",
    body: JSON.stringify({ sessionId, rating, comment }),
  });
}

export async function fetchFeedback() {
  return apiFetch<Array<{ _id: string; rating: number; comment: string | null; createdAt: string }>>("/feedback");
}

export async function fetchDepartments() {
  return apiFetch<Array<{ _id: string; name: string; code: string }>>("/departments");
}

export async function fetchBatches() {
  return apiFetch<Array<{ _id: string; name: string; year: number }>>("/batches");
}

export async function checkIn(sessionId: string) {
  return apiFetch("/attendance/check-in", {
    method: "POST",
    body: JSON.stringify({ sessionId }),
  });
}

export async function checkOut(attendanceId: string) {
  return apiFetch("/attendance/check-out", {
    method: "POST",
    body: JSON.stringify({ attendanceId }),
  });
}
