import { useState } from "react";
import { Link } from "react-router-dom";

function Layout({ children }) {

  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* HEADER */}
      <header className="bg-slate-900 text-white flex items-center justify-between px-4 py-3">

        <div className="flex items-center gap-3">

          <button
            className="md:hidden bg-blue-600 px-3 py-2 rounded"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>

          <h1 className="text-lg font-bold">CareerOS 🚀</h1>

        </div>

        <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>

      </header>

      <div className="flex flex-1">

        {/* SIDEBAR */}
        <aside
          className={`bg-slate-900 text-white w-64 p-5 space-y-6
          ${open ? "block" : "hidden"} md:block`}
        >

          <nav className="space-y-4">

            <Link to="/dashboard" className="block hover:text-blue-300">
              Dashboard
            </Link>

            <Link to="/analytics" className="block hover:text-blue-300">
              Analytics
            </Link>

          </nav>

        </aside>

        {/* CONTENT */}
        <main className="flex-1 px-4 py-6 md:p-6">
          {children}
        </main>

      </div>

    </div>
  );
}

export default Layout;