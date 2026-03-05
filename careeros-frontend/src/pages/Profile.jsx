import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

function Profile() {

const [user,setUser] = useState(null);
const [goals,setGoals] = useState([]);

useEffect(()=>{

fetchProfile();

},[]);

const fetchProfile = async () => {

try{

const res = await api.get("/auth/profile");

setUser(res.data.user);
setGoals(res.data.goals);

}catch(err){

console.error(err);

}

};

if(!user){
return (
<Layout>
<div className="text-center p-10">
Loading profile...
</div>
</Layout>
);
}

const completed = goals.filter(g => g.progress === 100).length;

return(

<Layout>

<h1 className="text-3xl font-bold mb-6">
User Profile
</h1>

<div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

<p className="mb-2"><strong>Name:</strong> {user.name}</p>

<p className="mb-2"><strong>Email:</strong> {user.email}</p>

<p className="mb-2"><strong>Plan:</strong> {user.plan_type || "Free"}</p>

<p className="mb-2"><strong>Total Goals:</strong> {goals.length}</p>

<p className="mb-2"><strong>Completed Goals:</strong> {completed}</p>

</div>

</Layout>

);

}

export default Profile;