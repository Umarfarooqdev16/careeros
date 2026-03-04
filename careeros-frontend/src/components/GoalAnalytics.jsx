function GoalAnalytics({goals}){

const completed=goals.filter(g=>g.progress===100).length;

return(

<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

<div className="bg-white p-4 rounded shadow">
<p>Total Goals</p>
<h2>{goals.length}</h2>
</div>

<div className="bg-white p-4 rounded shadow">
<p>Completed</p>
<h2>{completed}</h2>
</div>

<div className="bg-white p-4 rounded shadow">
<p>Weekly Goals</p>
<h2>{completed}</h2>
</div>

<div className="bg-white p-4 rounded shadow">
<p>Monthly Goals</p>
<h2>{completed}</h2>
</div>

</div>

);

}

export default GoalAnalytics;