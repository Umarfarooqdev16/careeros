import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);

function GoalAnalytics({ goals }) {

const totalGoals = goals.length;

const completed = goals.filter(g => g.progress === 100).length;

const inProgress = goals.filter(g => g.progress < 100).length;

const completionRate =
totalGoals === 0 ? 0 : Math.round((completed / totalGoals) * 100);

const data = {

labels: ["Completed", "In Progress"],

datasets: [

{

label: "Goals",

data: [completed, inProgress],

backgroundColor: [

"rgba(34,197,94,0.8)",
"rgba(59,130,246,0.8)"

]

}

]

};

const options = {

responsive: true,
maintainAspectRatio: false,

plugins: {

legend: {
position: "top"
},

title: {
display: true,
text: "Goal Progress Overview"
}

}

};

return (

<div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow mb-8">

<h2 className="text-lg md:text-xl font-semibold mb-4">
Progress Analytics
</h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

<div className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-center">
<p className="text-sm">Total Goals</p>
<h2 className="text-xl md:text-2xl font-bold">{totalGoals}</h2>
</div>

<div className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-center">
<p className="text-sm">Completed</p>
<h2 className="text-xl md:text-2xl font-bold">{completed}</h2>
</div>

<div className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-center">
<p className="text-sm">In Progress</p>
<h2 className="text-xl md:text-2xl font-bold">{inProgress}</h2>
</div>

<div className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-center">
<p className="text-sm">Completion Rate</p>
<h2 className="text-xl md:text-2xl font-bold">{completionRate}%</h2>
</div>

</div>

<div className="w-full h-[250px] md:h-[300px]">

<Bar data={data} options={options} />

</div>

</div>

);

}

export default GoalAnalytics;