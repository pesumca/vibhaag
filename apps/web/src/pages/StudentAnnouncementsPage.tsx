import { useEffect, useState } from "react";

import { fetchAnnouncements } from "../lib/api";

export default function StudentAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<
    Array<{ _id: string; title: string; body: string; createdAt: string }>
  >([]);

  useEffect(() => {
    fetchAnnouncements().then(setAnnouncements).catch(() => setAnnouncements([]));
  }, []);

  return (
    <div className="grid">
      {announcements.map((item) => (
        <div className="card" key={item._id}>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          <p>{new Date(item.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
