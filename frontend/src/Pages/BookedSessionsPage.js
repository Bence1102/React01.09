import BookedSession from "../components/BookedSession";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { usePolling } from "../hooks/usePolling";

export default function BookedSessionPage() {
  const navigate = useNavigate();
  const { loadUser, user, loading } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
  }, []);

  
  usePolling(() => {
    loadUser();
  }, 30000);

  
  const sessions = user?.sessions ?? user?.user?.sessions ?? [];

  if (loading || sessions.length === 0) {
    return <div>Betöltés folyamatban, vagy nincs felvett mentor...</div>;
  }

  return (
    <div>
      <button className="keret padding" onClick={() => navigate(-1)}>
        Back to Mentors
      </button>

      {sessions.map((s, i) => (
        <BookedSession session={s} key={i} />
      ))}
    </div>
  );
}