import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage";
import Layout from "./Pages/Layout";

import DashboardPage from "./Pages/DashboardPage";
import CoursesPage from "./Pages/CoursesPage";
import CourseDetailsPage from "./Pages/CourseDetailsPage";
import MentorsPage from "./Pages/MentorsPage";

import { CoursesProvider } from "./context/CourseContext";
import { MentorProvider } from "./context/MentorContext";
import { AuthProvider } from "./context/AuthContext";

function ProtectedRoutes() {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export default function App() {
  return (
    <AuthProvider>
      <CoursesProvider>
        <MentorProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />

                <Route path="dashboard" element={<DashboardPage />} />

                <Route path="courses" element={<Outlet />}>
                  <Route index element={<CoursesPage />} />
                  <Route path=":id" element={<CourseDetailsPage />} />
                </Route>

                <Route path="mentors" element={<MentorsPage />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </MentorProvider>
      </CoursesProvider>
    </AuthProvider>
  );
}