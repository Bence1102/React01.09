import React, { useContext } from "react";
import "../css/Mentor.css";
import { MentorContext } from "../context/MentorContext";
import { useNavigate } from "react-router";

export default function Mentor({ mentor }) {
  const { bookedSession } = useContext(MentorContext);
  const navigate = useNavigate();
console.log("Booking mentor ID:", mentor.id);
  function sessionBooked() {
    bookedSession(mentor.id)
      .then(() => navigate("/bookedsession"))
      .catch((error) => {
        if (error.response?.status === 403) {
          alert("Insufficient credits to book this session");
        } else {
          console.error(error);
        }
      });
  }

  if (!mentor) {
    return <div className="mentor-card">Loading...</div>;
  }

  return (
    <div className="mentor-card">
      <h3 className="mentor-title">{mentor.mentorName}</h3>

      <p className="mentor-desc">
        <strong>Expertise:</strong> {mentor.expertise}
      </p>

      <p className="mentor-desc">
        {mentor.experienceLevel} Developer with {mentor.yearsExperience ?? "?"} years experience
      </p>

      <div className="mentor-meta">
        <div className="mentor-meta-item">
          Date:{" "}
          {new Date(mentor.sessionDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>

        <div className="mentor-meta-item">
          Time:{" "}
          {new Date(mentor.sessionDate).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </div>

        <div className="mentor-meta-item">
          Duration: {mentor.durationMinutes} minutes
        </div>

        <div className="mentor-meta-item">
          Cost: {mentor.creditCost ?? mentor.cost ?? mentor.credits ?? "??"} credits
        </div>
      </div>

      {mentor.isAvailable ? (
        <button className="mentor-button" onClick={sessionBooked}>
          Book Session
        </button>
      ) : (
        <div className="mentor-badge">SESSION BOOKED</div>
      )}
    </div>
  );
}