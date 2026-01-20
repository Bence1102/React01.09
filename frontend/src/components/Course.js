import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CoursesContext } from "../context/CourseContext";

export default function Course({ course }) {
  const { enrollCourse } = useContext(CoursesContext);
  const navigate = useNavigate();

  function enroll() {
    if (!course.isEnrolled) {
      enrollCourse(course.id);
    }
    navigate(`/courses/${course.id}`, { state: { course } });
  }

  const totalCredits = course.credits
    ? course.credits
    : course.chapters
    ? course.chapters.reduce((sum, ch) => sum + (ch.credits || 0), 0)
    : 0;

  return (
    <div className="course-card">
      <div className="course-card-status">
        {course.isEnrolled ? "✔" : "📝"}
      </div>

      <img
        src={course.image || "/img/course/default.png"}
        className="course-card-img"
        alt={course.title}
      />

      <h3 className="course-card-title">{course.title}</h3>
      <p className="course-card-desc">{course.description}</p>

      <div className="course-meta">
        <span className={`badge ${course.difficulty}`}>
          {course.difficulty}
        </span>

        {course.chapters && (
          <span className="meta-item">
            Chapters: {course.chapters.length}
          </span>
        )}
      </div>

      <button
        className={course.isEnrolled ? "btn enrolled" : "btn"}
        onClick={enroll}
      >
        {course.isEnrolled ? "Continue Learning" : "Enroll Now"}
      </button>
    </div>
  );
}