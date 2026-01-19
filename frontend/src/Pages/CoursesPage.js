import React, { useContext, useEffect } from "react";
import { CoursesContext } from "../context/CourseContext";
import CourseSearch from "../components/CourseSearch";
import Course from "../components/Course";
import "../css/courses.css";

export default function CoursesPage() {
  const { getCourses, filteredList, loading } = useContext(CoursesContext);

  useEffect(() => {
    getCourses();
  }, []);

  if (loading) {
    return <div>Az oldal betöltés alatt...</div>;
  }

  return (
    <>
      <CourseSearch />
      <div className="courses">
        {filteredList.map((course) => (
          <Course course={course} key={course.id} />
        ))}
      </div>
    </>
  );
}