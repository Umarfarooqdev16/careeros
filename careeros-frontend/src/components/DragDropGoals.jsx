import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import GoalCard from "./GoalCard";

function DragDropGoals({ goals = [], setGoals, updateProgress, deleteGoal }) {

const handleDragEnd = (result) => {

if (!result.destination) return;

const items = Array.from(goals);
const [reordered] = items.splice(result.source.index, 1);

items.splice(result.destination.index, 0, reordered);

setGoals(items);

};

return (

<DragDropContext onDragEnd={handleDragEnd}>

<Droppable droppableId="goals">

{(provided) => (
<div ref={provided.innerRef} {...provided.droppableProps}>

{Array.isArray(goals) && goals.map((goal, index) => (

<Draggable
key={goal._id || index}
draggableId={String(goal._id || index)}
index={index}
>

{(provided) => (
<div
ref={provided.innerRef}
{...provided.draggableProps}
{...provided.dragHandleProps}
>

<GoalCard
goal={goal}
updateProgress={updateProgress}
deleteGoal={deleteGoal}
/>

</div>
)}

</Draggable>

))}

{provided.placeholder}

</div>
)}

</Droppable>

</DragDropContext>

);

}

export default DragDropGoals;