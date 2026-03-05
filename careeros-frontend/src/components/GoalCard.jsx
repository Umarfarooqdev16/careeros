import { useState } from "react";
import api from "../api/axios";

function GoalCard({ goal, updateProgress, deleteGoal, fetchGoals }) {

const [editMode,setEditMode] = useState(false);

const [title,setTitle] = useState(goal.title);
const [description,setDescription] = useState(goal.description);
const [deadline,setDeadline] = useState(goal.deadline || "");

const handleUpdate = async () => {

try{

await api.put(`/goals/${goal._id}`,{
title,
description,
deadline
});

setEditMode(false);
fetchGoals();

}catch(err){
alert("Failed to update goal");
}

};

const handleDelete = () => {

const confirmDelete = window.confirm(
"Are you sure you want to delete this goal?"
);

if(confirmDelete){
deleteGoal(goal._id);
}

};

const status = goal.progress === 100 ? "Completed" : "In Progress";

return(

<div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">

{/* EDIT MODE */}

{editMode ? (

<div>

<input
type="text"
className="border p-2 w-full mb-3 rounded"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<textarea
className="border p-2 w-full mb-3 rounded"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<input
type="date"
className="border p-2 w-full mb-4 rounded"
value={deadline}
onChange={(e)=>setDeadline(e.target.value)}
/>

<div className="flex gap-2">

<button
onClick={handleUpdate}
className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
>
Save
</button>

<button
onClick={()=>setEditMode(false)}
className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded"
>
Cancel
</button>

</div>

</div>

) : (

<div>

{/* TITLE + STATUS */}

<div className="flex justify-between items-center mb-2">

<h3 className="text-lg font-bold">
{goal.title}
</h3>

<span
className={`text-xs px-2 py-1 rounded text-white
${status==="Completed" ? "bg-green-500" : "bg-yellow-500"}`}
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


{/* PROGRESS BAR */}

<div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">

<div
className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
style={{ width: `${goal.progress || 0}%` }}
></div>

</div>

<p className="text-sm mb-4">
Progress: {goal.progress || 0}%
</p>


{/* BUTTONS */}

<div className="flex flex-wrap gap-2">

<button
className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
onClick={()=>updateProgress(goal._id,(goal.progress||0)+10)}
>
+10%
</button>

<button
className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
onClick={()=>updateProgress(goal._id,(goal.progress||0)-10)}
>
-10%
</button>

<button
className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
onClick={()=>setEditMode(true)}
>
Edit
</button>

<button
className="text-red-500 text-sm hover:underline"
onClick={handleDelete}
>
Delete
</button>

</div>

</div>

)}

</div>

);

}

export default GoalCard;