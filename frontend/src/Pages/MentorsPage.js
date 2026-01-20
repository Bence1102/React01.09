import React, { useContext, useEffect } from "react";
import Mentor from "../components/Mentor";
import { MentorContext } from "../context/MentorContext";
import { AuthContext } from "../context/AuthContext";

export default function MentorsPage() {
  const { mentorList, getMentor } = useContext(MentorContext);
  const { user, loadUser, loading } = useContext(AuthContext);

  useEffect(() => {
    getMentor();
    loadUser();
  }, []);

  if (loading) {
    return (
      <>
        <div className="keret padding">
          <h1>Mentor Session Booking</h1>
          <p>Book one-on-one session...</p>
          <div className="keret padding" style={{ background: "lightblue" }}>
            <strong>Az oldal betöltés alatt!</strong>
          </div>
        </div>
        <div className="sessions keret padding">Az oldal betöltés alatt!</div>
      </>
    );
  }

  return (
    <>
      <div className="keret padding">
        <h1>Mentor Session Booking</h1>
        <p>Book one-on-one session...</p>
        <div className="keret padding" style={{ background: "darkgray" }}>
          <strong>
            Your Current Balance:{" "}
            {user.creditBalance ? user.creditBalance : 0} Credits
          </strong>
          <br />
          <span>
            Session are automaticly checked for confirmation every 30 seconds
          </span>
        </div>
      </div>
      <div className="sessions keret padding">
        <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Available Sessions</h2>
        <div className="mentor-grid">
          {mentorList.map((mentor) => (
            <Mentor key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </div>
    </>
  );
}