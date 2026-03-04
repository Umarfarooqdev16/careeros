import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Analytics() {
  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {
    try {
      const res = await api.get("/goals");
      setGoals(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // Convert goals into chart data
  const data = goals.map((goal) => ({
    name: goal.title,
    progress: goal.progress || 0,
  }));

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Analytics
      </h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Goal Progress
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>

            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="progress"
              fill="#3b82f6"
              radius={[6, 6, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>
    </Layout>
  );
}

export default Analytics;