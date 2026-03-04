import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function GoalCalendar({ goals }) {

return (

<div className="bg-white p-6 rounded-xl shadow mb-10 overflow-x-auto">

<h2 className="text-xl font-semibold mb-4">
Goals Calendar
</h2>

<Calendar />

</div>

);

}

export default GoalCalendar;