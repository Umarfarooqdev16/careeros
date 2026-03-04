import { useState } from "react";

function GoalCard({ goal, updateProgress, deleteGoal }) {

const [subtasks,setSubtasks] = useState(goal.subtasks || []);
const [newTask,setNewTask] = useState("");

/* STATUS */

const getStatus = () => {

if(goal.progress === 100) return "Completed";

if(goal.deadline){

const today = new Date();
const due = new Date(goal.deadline);

if(today > due) return "Overdue";

}

return "In Progress";

};

/* DAYS REMAINING */

const getDaysRemaining = () => {

if(!goal.deadline) return null;

const today = new Date();
const due = new Date(goal.deadline);

return Math.ceil((due - today)/(1000*60*60*24));

};

/* ADD SUBTASK */

const addSubtask = () => {

if(!newTask) return;

setSubtasks([...subtasks,{text:newTask,done:false}]);

setNewTask("");

};

/* TOGGLE SUBTASK */

const toggleSubtask = (index) => {

const updated = [...subtasks];

updated[index].done = !updated[index].done;

setSubtasks(updated);

};

/* SHARE GOAL */

const shareGoal = () => {

if(navigator.share){

navigator.share({
title:goal.title,
text:goal.description
});

}else{

alert("Sharing not supported in this browser");

}

};

const days = getDaysRemaining();
const status = getStatus();

return (

<div className="bg-white p-6 rounded-xl shadow-md">

{/* HEADER */}

<div className="flex justify-between items-center mb-2">

<h3 className="text-lg font-bold">
{goal.title}
</h3>

<span
className={`text-xs px-2 py-1 rounded 
${status==="Completed"?"bg-green-500":
status==="Overdue"?"bg-red-500":"bg-yellow-500"}
text-white`}
>
{status}
</span>

</div>

{/* DESCRIPTION */}

<p className="text-gray-600 mb-2">
{goal.description}
</p>

{/* DEADLINE */}

{goal.deadline && (

<p className="text-sm text-gray-500 mb-2">

Deadline: {new Date(goal.deadline).toLocaleDateString()}

</p>

)}

{/* COUNTDOWN */}

{days !== null && (

<p className="text-sm mb-3">

{days < 0
? "⚠ Deadline passed"
: `⏳ ${days} days remaining`}

</p>

)}

{/* PROGRESS BAR */}

<div className="w-full bg-gray-200 rounded-full h-2 mb-2">

<div
className="bg-blue-600 h-2 rounded-full"
style={{ width: `${goal.progress || 0}%` }}
></div>

</div>

<p className="text-sm mb-3">
Progress: {goal.progress || 0}%
</p>

{/* BUTTONS */}

<div className="flex flex-wrap gap-2 mb-4">

<button
className="bg-green-500 text-white px-3 py-1 rounded text-sm"
onClick={()=>updateProgress(goal.id,(goal.progress||0)+10)}
>
+10%
</button>

<button
className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
onClick={()=>updateProgress(goal.id,(goal.progress||0)-10)}
>
-10%
</button>

<button
className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
onClick={shareGoal}
>
Share
</button>

<button
onClick={()=>deleteGoal(goal.id)}
className="text-red-500 text-sm"
>
Delete
</button>

</div>

{/* SUBTASKS */}

<div>

<h4 className="font-semibold text-sm mb-2">
Subtasks
</h4>

{subtasks.map((task,index)=>(

<div key={index} className="flex items-center gap-2 text-sm mb-1">

<input
type="checkbox"
checked={task.done}
onChange={()=>toggleSubtask(index)}
/>

<span className={task.done ? "line-through":""}>
{task.text}
</span>

</div>

))}

<div className="flex flex-col sm:flex-row mt-2 gap-2">

<input
type="text"
placeholder="New subtask"
className="border p-2 text-sm flex-1 rounded"
value={newTask}
onChange={(e)=>setNewTask(e.target.value)}
/>

<button
onClick={addSubtask}
className="bg-blue-500 text-white px-3 py-2 text-sm rounded"
>
Add
</button>

</div>

</div>

</div>

);

}

export default GoalCard;
