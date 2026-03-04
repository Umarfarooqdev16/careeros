function GoalExport({goals}){

const exportJSON=()=>{
const data=JSON.stringify(goals);
const blob=new Blob([data]);
const url=URL.createObjectURL(blob);

const a=document.createElement("a");
a.href=url;
a.download="goals.json";
a.click();
};

return(

<button
onClick={exportJSON}
className="bg-purple-500 text-white px-4 py-2 rounded mb-6"
>
Export Goals
</button>

);

}

export default GoalExport;