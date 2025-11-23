// AdminDashboard.tsx
import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const cards = [
    { name: "Users", link: "/users" },
    { name: "Parties", link: "/parties" },
    { name: "Elections", link: "/elections" },
    { name: "Votes", link: "/votes" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.name}
            className="p-6 bg-white rounded-lg shadow-md flex flex-col justify-between"
          >
            <h2 className="text-xl font-semibold text-gray-700">{card.name}</h2>
            <Link
              to={card.link}
              className="mt-4 inline-flex items-center justify-center px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              View &gt;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
