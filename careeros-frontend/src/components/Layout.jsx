import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Layout({ children }) {

  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

  }, [dark]);

  const handleLogout = () => {

    localStorage.removeItem("token");
    navigate("/login");

  };

  return (

    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition">

      {/* HEADER */}

      <header className="bg-slate-900 dark:bg-gray-950 text-white flex items-center justify-between px-4 py-3">

        <div className="flex items-center gap-3">

          <button
            className="md:hidden bg-blue-600 px-3 py-2 rounded"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>

          <h1 className="text-lg font-bold">
            CareerOS 🚀
          </h1>

        </div>

        {/* RIGHT SIDE BUTTONS */}

        <div className="flex items-center gap-3">

          {/* NOTIFICATION BELL */}

          <div className="relative">

            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="bg-gray-700 px-3 py-2 rounded hover:bg-gray-600"
            >
              🔔
            </button>

            {showNotifications && (

              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow-lg p-3">

                <p className="font-semibold mb-2">
                  Notifications
                </p>

                {notifications.length === 0 ? (

                  <p className="text-sm text-gray-500">
                    No notifications
                  </p>

                ) : (

                  notifications.map((n, i) => (

                    <p key={i} className="text-sm mb-1">
                      {n.message}
                    </p>

                  ))

                )}

              </div>

            )}

          </div>

          {/* DARK MODE */}

          <button
            onClick={() => setDark(!dark)}
            className="bg-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-600"
          >
            {dark ? "☀ Light" : "🌙 Dark"}
          </button>

          {/* LOGOUT */}

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>

        </div>

      </header>


      <div className="flex flex-1">

        {/* SIDEBAR */}

        <aside
          className={`bg-slate-900 dark:bg-gray-950 text-white w-64 p-5 space-y-6
          ${open ? "block" : "hidden"} md:block`}
        >

          <nav className="space-y-4">

            <Link
              to="/dashboard"
              className="block hover:text-blue-300"
            >
              Dashboard
            </Link>

            <Link
              to="/analytics"
              className="block hover:text-blue-300"
            >
              Analytics
            </Link>

            <Link
              to="/profile"
              className="block hover:text-blue-300"
            >
              Profile
            </Link>

          </nav>

        </aside>


        {/* CONTENT */}

        <main className="flex-1 px-4 py-6 md:p-6 text-gray-800 dark:text-gray-200">

          {children}

        </main>

      </div>

    </div>

  );

}

export default Layout;