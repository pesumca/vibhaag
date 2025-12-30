export default function PeoplePage() {
  return (
    <div className="grid">
      <div className="card">
        <h3>Faculty directory</h3>
        <p>Invite new faculty, assign them to departments, and track workload.</p>
        <button className="button">Invite faculty</button>
      </div>
      <div className="card">
        <h3>Department hubs</h3>
        <p>Map staff to departments, batch ownership, and shared spaces.</p>
        <button className="button secondary">Manage departments</button>
      </div>
      <div className="card">
        <h3>Workload balance</h3>
        <p>Track weekly teaching hours and allocate backup sessions.</p>
        <button className="button secondary">View distribution</button>
      </div>
    </div>
  );
}
