import { useState } from "react";
import api from "../api/axios";

function GoalForm({ fetchGoals, logActivity }) {

const [title,setTitle] = useState("");
const [description,setDescription] = useState("");
const [deadline,setDeadline] = useState("");
const [loading,setLoading] = useState(false);
const [message,setMessage] = useState("");
const [error,setError] = useState("");

const createGoal = async () => {

if(!title || !description) return;

setLoading(true);
setError("");
setMessage("");

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

setMessage("✅ Goal created successfully!");

fetchGoals();
logActivity("New goal created");

setTimeout(()=>setMessage(""),3000);

}catch(err){

if(err.response && err.response.data.message){
setError(err.response.data.message);
}else{
setError("Failed to create goal");
}

}

setLoading(false);

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
disabled={loading}
className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
>
{loading ? "Creating..." : "Add Goal"}
</button>

{/* SUCCESS MESSAGE */}

{message && (
<p className="mt-3 text-sm font-medium text-green-600">
{message}
</p>
)}

{/* ERROR MESSAGE */}

{error && (
<p className="mt-3 text-sm font-medium text-red-600">
❌ {error}
</p>
)}

</div>

);

}

export default GoalForm;