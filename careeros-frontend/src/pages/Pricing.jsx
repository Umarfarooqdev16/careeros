import Layout from "../components/Layout";

function Pricing(){

return(

<Layout>

<div className="px-6 py-10 max-w-5xl mx-auto">

<h1 className="text-3xl font-bold mb-10 text-center">
Pricing Plans
</h1>

<div className="grid md:grid-cols-2 gap-8">

{/* FREE PLAN */}

<div className="border rounded-xl p-6 shadow">

<h2 className="text-xl font-semibold mb-4">
Free Plan
</h2>

<ul className="space-y-2 mb-6">

<li>✔ 5 Goals</li>
<li>✔ Basic analytics</li>
<li>✔ Activity log</li>

</ul>

<p className="text-2xl font-bold mb-6">
$0
</p>

<button className="bg-gray-400 text-white px-5 py-2 rounded">
Current Plan
</button>

</div>


{/* PRO PLAN */}

<div className="border rounded-xl p-6 shadow-lg border-purple-500">

<h2 className="text-xl font-semibold mb-4">
Pro Plan
</h2>

<ul className="space-y-2 mb-6">

<li>✔ Unlimited goals</li>
<li>✔ Advanced analytics</li>
<li>✔ Export reports</li>
<li>✔ Priority support</li>

</ul>

<p className="text-2xl font-bold mb-6">
$5 / month
</p>

<button className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700">
Upgrade Now
</button>

</div>

</div>

</div>

</Layout>

);

}

export default Pricing;