import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {

    e.preventDefault();

    try{

      await api.post("/auth/register",{
        name,
        email,
        password
      });

      alert("Registration successful");

      navigate("/");

    }catch(err){

      console.error(err);

      alert(
        err.response?.data?.message ||
        err.response?.data ||
        "Registration failed"
      );

    }

  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Name"
            className="border p-3 w-full mb-4 rounded"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-3 w-full mb-4 rounded"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-3 w-full mb-6 rounded"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-3 rounded hover:bg-blue-700"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>

      </div>

    </div>

  );

}

export default Register;