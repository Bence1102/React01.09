import React from "react";

export default function Mentor({ mentor }) {
  const sessionBooked = () => {
    console.log("Session booked:", mentor.id);
  };

  return (
    <div className="course-card">
      <h3 className="course-card-title">{mentor.name}</h3>

      <p className="course-card-desc">{mentor.description}</p>

      <div className="course-meta">
        <div className="meta-item">
          Expertise: {mentor.expertise}
        </div>

        <div className="meta-item">
          Date:{" "}
          {new Date(mentor.sessionDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>

        <div className="meta-item">
          Time:{" "}
          {new Date(mentor.sessionDate).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </div>

        <div className="meta-item">
          Duration: {mentor.durationMinutes} min
        </div>

        <div className="meta-item">
          Cost: {mentor.costCredits} credits
        </div>
      </div>

      <button
        className={`btn keret ${mentor.isAvailable ? "" : "inactive"}`}
        onClick={sessionBooked}
        disabled={!mentor.isAvailable}
      >
        {mentor.isAvailable ? "Book Session" : "Not Available"}
      </button>
    </div>
  );
}