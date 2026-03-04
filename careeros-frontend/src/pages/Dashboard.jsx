import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

import GoalForm from "../components/GoalForm";
import GoalAnalytics from "../components/GoalAnalytics";
import GoalCalendar from "../components/GoalCalendar";
import GoalExport from "../components/GoalExport";
import GoalActivityLog from "../components/GoalActivityLog";
import DragDropGoals from "../components/DragDropGoals";
import GoalCard from "../components/GoalCard";

function Dashboard() {

const [goals,setGoals] = useState([]);
const [activity,setActivity] = useState([]);
const [search,setSearch] = useState("");
const [filter,setFilter] = useState("all");
const [streak,setStreak] = useState(0);


// FETCH GOALS

const fetchGoals = async () => {
  try{
    const res = await api.get("/goals");
    setGoals(Array.isArray(res.data) ? res.data : []);
  }catch(err){
    console.error(err);
  }
};

useEffect(()=>{
  fetchGoals();
},[]);



// ACTIVITY LOG

const logActivity = (text) => {
setActivity(prev => [
  { message:text , time:new Date() },
  ...prev
]);
};



// PRODUCTIVITY STREAK

useEffect(()=>{

let completed = goals.filter(g => (g.progress || 0) === 100);

setStreak(completed.length);

},[goals]);



// SEARCH + FILTER

let filteredGoals = goals.filter(goal => {

let titleMatch = goal.title?.toLowerCase().includes(search.toLowerCase());

if(!titleMatch) return false;

if(filter === "completed") return (goal.progress || 0) === 100;

if(filter === "inprogress") return (goal.progress || 0) < 100;

return true;

});


const activeGoals = filteredGoals.filter(g => (g.progress || 0) < 100);
const completedGoals = filteredGoals.filter(g => (g.progress || 0) === 100);



// UPDATE PROGRESS

const updateProgress = async(id,progress)=>{

const safe = Math.max(0,Math.min(100,progress));

try{

await api.put(`/goals/${id}`,{progress:safe});

fetchGoals();

}catch(err){
console.error(err);
}

};



// DELETE GOAL

const deleteGoal = async(id)=>{

try{

await api.delete(`/goals/${id}`);

logActivity("Goal deleted");

fetchGoals();

}catch(err){
console.error(err);
}

};



return(

<Layout>

<h1 className="text-3xl font-bold mb-6">
Dashboard
</h1>



{/* PRODUCTIVITY STREAK */}

<div className="bg-orange-100 p-4 rounded mb-6 text-lg font-semibold">
🔥 Productivity Streak: {streak} goals completed
</div>



{/* ANALYTICS */}

<GoalAnalytics goals={goals} />



{/* SEARCH + FILTER */}

<div className="flex flex-col md:flex-row gap-4 mb-6">

<input
type="text"
placeholder="Search goals..."
className="border p-2 rounded w-full"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<select
className="border p-2 rounded"
value={filter}
onChange={(e)=>setFilter(e.target.value)}
>

<option value="all">All</option>
<option value="inprogress">In Progress</option>
<option value="completed">Completed</option>

</select>

</div>



{/* CREATE GOAL */}

<GoalForm fetchGoals={fetchGoals} logActivity={logActivity} />



{/* EXPORT */}

<GoalExport goals={goals} />



{/* ACTIVE GOALS */}

<h2 className="text-xl font-semibold mt-6 mb-3">
Active Goals
</h2>

<DragDropGoals
goals={activeGoals}
setGoals={setGoals}
updateProgress={updateProgress}
deleteGoal={deleteGoal}
/>



{/* COMPLETED GOALS */}

<h2 className="text-xl font-semibold mt-10 mb-3">
Completed Goals
</h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

{completedGoals.map(goal => (

<GoalCard
key={goal._id}
goal={goal}
updateProgress={updateProgress}
deleteGoal={deleteGoal}
/>

))}

</div>



{/* CALENDAR */}

<GoalCalendar goals={goals} />



{/* ACTIVITY LOG */}

<GoalActivityLog activity={activity} />


</Layout>

);

}

export default Dashboard;