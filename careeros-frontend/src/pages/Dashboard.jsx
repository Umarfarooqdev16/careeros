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

const [badges,setBadges] = useState([]);
const [showBadge,setShowBadge] = useState(null);
const [notifications, setNotifications] = useState([]);


/* FETCH GOALS */

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


const addNotification = (message) => {

setNotifications(prev => [

{ message, time: new Date() },
...prev

]);

};


/* BADGE + STREAK LOGIC */

useEffect(()=>{

let completed = goals.filter(g => (g.progress || 0) === 100);

setStreak(completed.length);

let newBadges = [];

if(completed.length >= 1 && !badges.includes("first")){
newBadges.push("first");
setShowBadge("🏆 First Goal Completed");
}

if(completed.length >= 5 && !badges.includes("five")){
newBadges.push("five");
setShowBadge("🔥 5 Goals Completed");
}

if(completed.length >= 10 && !badges.includes("ten")){
newBadges.push("ten");
setShowBadge("🎯 10 Goals Completed");
}

if(newBadges.length > 0){
setBadges(prev => [...prev,...newBadges]);
}

},[goals]);


/* ACTIVITY LOG */

const logActivity = (text) => {

setActivity(prev => [

{message:text,time:new Date()},
...prev

]);

};


/* SEARCH + FILTER */

let filteredGoals = goals.filter(goal => {

let titleMatch = goal.title?.toLowerCase().includes(search.toLowerCase());

if(!titleMatch) return false;

if(filter === "completed") return (goal.progress || 0) === 100;

if(filter === "inprogress") return (goal.progress || 0) < 100;

return true;

});

const activeGoals = filteredGoals.filter(g => (g.progress || 0) < 100);
const completedGoals = filteredGoals.filter(g => (g.progress || 0) === 100);


/* UPDATE PROGRESS */

const updateProgress = async(id,progress)=>{

const safe = Math.max(0,Math.min(100,progress));

try{

await api.put(`/goals/${id}`,{progress:safe});

if(safe === 100){
addNotification("🎉 Goal completed!");
}

fetchGoals();

}catch(err){

console.error(err);

}

};


/* DELETE GOAL */

const deleteGoal = async (id) => {

  if (!id) {
    console.error("Delete failed: Goal ID is undefined");
    return;
  }

  try {

    await api.delete(`/goals/${id}`);

    logActivity("Goal deleted");
    addNotification("🗑 Goal deleted");

    fetchGoals();

  } catch (err) {
    console.error("Delete error:", err);
  }

};


return(

<Layout>

<div className="px-4 md:px-6">

{/* BADGE POPUP */}

{showBadge && (

<div className="bg-green-500 text-white p-4 rounded mb-4 shadow flex justify-between items-center">

<span>🎉 Badge Unlocked! {showBadge}</span>

<button
className="text-sm underline"
onClick={()=>setShowBadge(null)}
>
Dismiss
</button>

</div>

)}


{/* HEADER */}

<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-2">

<h1 className="text-3xl font-bold">
Dashboard
</h1>

<p className="text-gray-500 text-sm">
Track your career progress 🚀
</p>

</div>


{/* PRODUCTIVITY STREAK */}

<div className="bg-orange-100 p-3 md:p-4 rounded mb-6 text-base md:text-lg font-semibold">

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
fetchGoals={fetchGoals}
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
fetchGoals={fetchGoals}
/>

))}

</div>


{/* CALENDAR */}

<GoalCalendar goals={goals} />


{/* ACTIVITY LOG */}

<GoalActivityLog activity={activity} />

</div>

</Layout>

);

}

export default Dashboard;