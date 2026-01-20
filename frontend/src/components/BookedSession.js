export default function BookedSession({ session }) {
  const status = session.status?.toLowerCase();
  const statusLabel =
    status === "pending"
      ? "Pending Confirmation"
      : status === "confirmed"
      ? "Confirmed"
      : "Rejected";

  const statusClass =
    status === "pending"
      ? "badge intermediate"
      : status === "confirmed"
      ? "badge beginner"
      : "badge advanced";

  return (
    <div className="course-card">
      <h3 className="course-card-title">{session.mentorName}</h3>

      <div className="course-meta">
        <div className={statusClass}>{statusLabel}</div>

        <div className="meta-item">
          Date:{" "}
          {new Date(session.sessionDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>

        <div className="meta-item">
          Time:{" "}
          {new Date(session.sessionDate).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </div>

        <div className="meta-item">
          Cost: {session.creditsPaid} Credits
        </div>

        <div className="meta-item">
          Booked:{" "}
          {new Date(session.bookedAt).toLocaleDateString("en-GB")}
        </div>
      </div>
    </div>
  );
}