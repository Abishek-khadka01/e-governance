// AdminDashboard.tsx
import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const cards = [
    { name: "Users", link: "/users" },
    { name: "Parties", link: "/parties" },
    { name: "Candidates", link: "/candidates" },
    { name: "Elections", link: "/elections" },
    { name: "Votes", link: "/votes" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold mb-10 text-gray-900 tracking-wide">
        Admin Dashboard
      </h1>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        {cards.map((card) => (
          <div
            key={card.name}
            className="
              p-6 bg-white rounded-xl border border-gray-200 shadow-md
              hover:shadow-xl transition-all duration-300
              hover:-translate-y-1
            "
          >
            {/* Card Title Box */}
            <div className="mb-6 p-3 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow">
              <h2 className="text-lg font-semibold">{card.name}</h2>
            </div>

            {/* View Button */}
            <Link
              to={card.link}
              className="
                w-full inline-block text-center
                px-4 py-2 rounded-lg
                bg-blue-600 text-white font-medium
                hover:bg-blue-700 transition-colors
              "
            >
              View →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
