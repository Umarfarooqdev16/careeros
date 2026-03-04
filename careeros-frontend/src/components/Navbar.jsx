import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-slate-900 text-white p-4 flex justify-between items-center">

      <h1 className="text-xl font-bold">
        CareerOS
      </h1>

      <div className="flex gap-4">

        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {token && (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        )}

      </div>

    </div>
  );
}

export default Navbar;