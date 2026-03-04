function GoalActivityLog({activity}){

return(

<div className="bg-white p-6 rounded-xl shadow">

<h2 className="font-semibold mb-3">
Activity Log
</h2>

{activity.map((a,i)=>(
<p key={i} className="text-sm">
{a.message}
</p>
))}

</div>

);

}

export default GoalActivityLog;