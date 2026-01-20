import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { MentorContext } from "../context/MentorContext";
import Mentor from "../components/Mentor";

export default function MentorsPage() {
  const {  creditBalance } = useContext(AuthContext);
  const { mentorList, loadingMentors, getMentors } = useContext(MentorContext);

  useEffect(() => {
    getMentors();
  }, [getMentors]);

  if (loadingMentors) {
    return <div className="dashboard">Betöltés folyamatban...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <h2 className="card-title">Mentor Session Booking</h2>
        <p className="card-subtext">
          Book one‑on‑one sessions with expert mentors to accelerate your learning
        </p>

        <div className="stats-grid">
          <div className="stats-item">
            <div className="value">{creditBalance}</div>
            <div className="label">Credits Available</div>
          </div>

          <div className="stats-item">
            <div className="value">{mentorList?.length || 0}</div>
            <div className="label">Available Sessions</div>
          </div>
        </div>
      </div>

      {Array.isArray(mentorList) &&
        mentorList.map((mentor) => (
          <Mentor key={mentor.id} mentor={mentor} />
        ))}
    </div>
  );
}