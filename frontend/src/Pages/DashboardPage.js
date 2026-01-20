import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../css/Dashboar.css";
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


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

export default function DashboardPage() {
  const { user, loadUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      await loadUser();
      setLoading(false);
    };

    fetchUser();

  }, []);
  if (loading || !user) {
    return <div>Loading...</div>;
  }

  
  const currentBalance = user.creditBalance || 0;
  const enrolledCoursesCount = user.enrolledCourses?.length || 0;
  let completedChaptersCount = 0;
  let totalCreditsEarned = 0;

  user.enrolledCourses?.forEach((course) => {
    course.chapters?.forEach((ch) => {
      totalCreditsEarned += ch.isCompleted ? ch.credits : 0;
      if (ch.isCompleted) completedChaptersCount++;
    });
  });

  const labels = [];
  for (let index = 0; index < 30; index++) {
    const d = new Date();
    d.setDate(d.getDate() - (29 - index));
    labels.push(d.toISOString().split("T")[0]);
  }


  const creditsByDate = {};
  if (user.recentActivity !== undefined) {
    user.recentActivity.forEach((item) => {
      const date = item.timestamp.split("T")[0];
      if (!creditsByDate[date]) {
        creditsByDate[date] = 0;
      }
      creditsByDate[date] += item.creditsEarned;
    });
  }


  const dataValues = labels.map((date) => creditsByDate[date] || 0);


  const data1 = {
    labels,
    datasets: [
      {
        labels: "Credits",
        data: dataValues,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const option1 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: true,
        text: "Credit progress (Last 30 days)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Credits",
        },
      },
      x: {
        title: {
          display: false,
          text: "Date",
        },
      },
    },
  };


  const data2 = {
    labels: ["Completed chapters", "Enrolled Courses"],
    datasets: [
      {
        label: "Stats",
        data: [completedChaptersCount, enrolledCoursesCount],
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
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Statisztikák",
      },
    },
  };





  return (
    <div style={{ padding: "1rem" }}>
      <h1>Üdvözöllek, {user.name || "Felhasználó"}!</h1>

      <div className="dashboard">
       
        <div className="dashboard-card">
          <h3 className="card-title">Current Balance</h3>
          <p className="card-value">{currentBalance} credits</p>
        </div>

        
        <div className="dashboard-card">
          <h3 className="card-title">Enrolled Courses</h3>
          <div className="stats-grid">
            <div className="stats-item">
              <p className="value">{enrolledCoursesCount}</p>
              <p className="label">Started</p>
            </div>
            <div className="stats-item">
              <p className="value">{completedChaptersCount}</p>
              <p className="label">Completed</p>
            </div>
          </div>
        </div>

       
        <div className="dashboard-card">
          <h3 className="card-title">Total Credits Earned</h3>
          <p className="card-value">{totalCreditsEarned}</p>
        </div>

       
      </div>



      <div style={{ height: "clamp(250px, 40vh, 400px)", marginBottom: "2rem" }}>
        <Line options={option1} data={data1} />
      </div>

      <div style={{ height: "clamp(250px, 40vh, 400px)" }}>
        <Doughnut options={option2} data={data2} />
      </div>
    </div>
  );
}
