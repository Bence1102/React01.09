import { useNavigate, useParams } from "react-router-dom";

export default function CourseDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div>
      <h1 className="page-title">CoursesDetails</h1>

      <div className="keret padding block">
        <button className="keret padding btn" onClick={() => navigate(-1)}>
          BACK TO COURSES
        </button>

        <h2 style={{ marginTop: 18 }}>REACT FUNDAMENTALS (ID: {id})</h2>
        <p className="muted">Itt jön majd a részletes oldal wireframe alapján.</p>

        <div className="grid2">
          <div className="keret padding box">CHAPTER PROGRESS (placeholder)</div>
          <div className="keret padding box">CREDIT PROGRESS (placeholder)</div>
        </div>

        <div className="keret padding box" style={{ marginTop: 12 }}>
          CHAPTER LIST (placeholder)
        </div>
      </div>
    </div>
  );
}
