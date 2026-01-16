import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const { user, loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
  }, []);

  const currentuser = user?.user 
    ? user
    : {
      user: { name: "Guest" },
      stats: { completedChapters: 5, enrolledCourses: 2 },
      recentActivity: Array.from({ length: 15 }).map((_, i) => ({
        timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
        creditsEarned: Math.floor(Math.random() * 5) + 1,
      })),
    };  

  const labels = [];
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    labels.push(d.toISOString().split("T")[0]);
  }

  const creditsByDate = {};
  currentuser.recentActivity?.forEach(item => {
    const date = item.timestamp.split("T")[0];
    creditsByDate[date] = (creditsByDate[date] || 0) + item.creditsEarned;
  });

  const data1 = {
    labels,
    datasets: [
      {
        label: "Credits",
        data: labels.map(date => creditsByDate[date] || 0),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const option1 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Credit progress (Last 30 days)" },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Credits" } },
      x: { title: { display: false } },
    },
  };

  const data2 = {
    labels: ["Completed chapters", "Enrolled Courses"],
    datasets: [
      {
        label: "# of Votes",
        data: [currentuser.stats.completedChapters, currentuser.stats.enrolledCourses],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 2,
      },
    ],
  };

  const option2 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Statisztikák" },
    },
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Üdvözöllek, {currentuser.user.name}!</h1>

      <div style={{ height: "clamp(250px, 40vh, 400px)", marginBottom: "2rem" }}>
        <Line options={option1} data={data1} />
      </div>

      <div style={{ height: "clamp(250px, 40vh, 400px)" }}>
        <Doughnut options={option2} data={data2} />
      </div>
    </div>
  );
}
