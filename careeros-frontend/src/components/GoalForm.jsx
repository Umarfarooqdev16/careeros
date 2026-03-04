import { useState } from "react";
import api from "../api/axios";

function GoalForm({ fetchGoals, logActivity }) {

const [title,setTitle] = useState("");
const [description,setDescription] = useState("");
const [deadline,setDeadline] = useState("");

const createGoal = async () => {

if(!title || !description) return;

try{

await api.post("/goals",{
title,
description,
deadline,
progress:0
});

setTitle("");
setDescription("");
setDeadline("");

fetchGoals();

logActivity("New goal created");

}catch(err){
console.error(err);
}

};

return (

<div className="bg-white p-6 rounded-xl shadow mb-8">

<h2 className="text-xl font-semibold mb-4">
Create Goal
</h2>

<input
type="text"
placeholder="Goal title"
className="border p-3 w-full mb-3 rounded"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<textarea
placeholder="Description"
className="border p-3 w-full mb-3 rounded"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<input
type="date"
className="border p-3 w-full mb-4 rounded"
value={deadline}
onChange={(e)=>setDeadline(e.target.value)}
/>

<button
onClick={createGoal}
className="bg-blue-600 text-white px-5 py-2 rounded"
>
Add Goal
</button>

</div>

);

}

export default GoalForm;