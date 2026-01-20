import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "../css/courses.css";
import { AuthContext } from "../context/AuthContext";
import { CoursesContext } from "../context/CourseContext";

export default function CourseDetailsPage() {
  const { selectedCourse, getCourseById, loading, completeChapter } =
    useContext(CoursesContext);
  const { loadUser } = useContext(AuthContext);
  const { state } = useLocation();
  const navigate = useNavigate();
  const course = state?.course;

  const [sumOfCompletedCredits, setSumOfCompletedCredits] = useState(0);
  const [countOfCompletedChapters, setCountOfCompletedChapters] = useState(0);
  const [countOfChapters, setCountOfChapters] = useState(0);
  const [sumOfCredits, setSumOfCredits] = useState(0);

  useEffect(() => {
    if (course?.id) {
      getCourseById(course.id);
    }
  }, [course.id]);

  useEffect(() => {
    if (selectedCourse?.course) {
      calculatingProgress();
    }
  }, [selectedCourse]);

  function calculatingProgress() {
    const totalChapters = selectedCourse.course.chapters.length;
    let completedChapters = 0;
    let totalCredits = 0;
    let completedCredits = 0;

    selectedCourse.course.chapters.forEach((ch) => {
      totalCredits += ch.credits || 0;
      if (ch.isCompleted) {
        completedChapters += 1;
        completedCredits += ch.credits;
      }
    });
    setCountOfChapters(totalChapters);
    setCountOfCompletedChapters(completedChapters);
    setSumOfCredits(totalCredits);
    setSumOfCompletedCredits(completedCredits);
  }

  function markAsComleted(chapterId, isCompleted) {
    if (!isCompleted) {
      completeChapter(selectedCourse.course.id, chapterId)
        .then(() => {
          loadUser();
          getCourseById(selectedCourse.course.id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  if (loading || !selectedCourse || !selectedCourse.course) {
    return <div>Az oldal betöltés alatt</div>;
  }

  return (
    <div className="padding courseone">
      <div className="keret">
        <button className="keret padding" onClick={() => navigate(-1)}>
          Back to course
        </button>
        <h1>{selectedCourse.course.title}</h1>
        <p>{selectedCourse.course.description}</p>
        <p>{selectedCourse.course.difficulty}</p>

        <div className="progress">
          <div className="chapter-progress keret">
            <h3>Chapter progress</h3>
            <div className="progress-container">
              <div
                className="progressbar"
                style={{
                  background: "grey",
                  width: `${countOfChapters === 0
                      ? 0
                      : (countOfCompletedChapters / countOfChapters) * 100
                    }%`,
                }}
              ></div>
            </div>
            <p>
              {countOfCompletedChapters} of {countOfChapters} chapters completed
              (
              {countOfChapters === 0
                ? 0
                : (
                  (countOfCompletedChapters / countOfChapters) *
                  100
                ).toFixed(2)}{" "}
              %)
            </p>
          </div>

          <div className="credit-progress keret">
            <h3>Credit progress</h3>
            <div className="progress-container">
              <div
                className="progressbar"
                style={{
                  background: "grey",
                  width: `${sumOfCredits === 0
                      ? 0
                      : (sumOfCompletedCredits / sumOfCredits) * 100
                    }%`,
                }}
              ></div>
            </div>
            <p>
              {sumOfCompletedCredits} of {sumOfCredits} credits earned (
              {sumOfCredits === 0
                ? 0
                : (
                  (sumOfCompletedCredits / sumOfCredits) *
                  100
                ).toFixed(2)}{" "}
              %)
            </p>
          </div>
        </div>
      </div>

      {selectedCourse.course.chapters.map((ch, i) => (
        <div className="keret chapter" key={ch.id}>
          <h2 className="nagy alahuzas">
            Chapter {i + 1}: {ch.title}
          </h2>
          <p>{ch.description}</p>
          <div className="keret nagy szelesseg padding">
            {ch.credits} credits
          </div>
          <button className="inactive" style={{ background: "lightGray" }}>
            View chapter
          </button>
          <button
            className={`chapter-btn ${ch.isCompleted ? "completed" : "incomplete"}`}
            onClick={() => {
              markAsComleted(ch.id, ch.isCompleted);
            }}
          >
            {ch.isCompleted ? "Chapter completed" : "Mark as Completed"}
          </button>
          <div>
            {ch.isCompleted ? (
              <button
                className="keret linkedin"
                onClick={() => {
                }}
              >
                Share achievement in LinkedIn
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}

      <div id="linkedin-share-root">LinkedIn widget</div>
    </div>
  );
}