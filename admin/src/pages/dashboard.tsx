import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const cards = [
    { 
      name: "Users", 
      link: "/users",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      hoverColor: "hover:border-blue-300"
    },
    { 
      name: "Parties", 
      link: "/parties",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      hoverColor: "hover:border-purple-300"
    },
    { 
      name: "Candidates", 
      link: "/candidates",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      hoverColor: "hover:border-green-300"
    },
    { 
      name: "Elections", 
      link: "/elections",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      hoverColor: "hover:border-orange-300"
    },
    { 
      name: "Votes", 
      link: "/votes",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      hoverColor: "hover:border-red-300"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Admin Dashboard
              </h1>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                Manage your election system efficiently
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>


        {/* Section Title */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Quick Actions</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Access and manage different sections</p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          {cards.map((card) => (
            <Link
              key={card.name}
              to={card.link}
              className={`
                group relative overflow-hidden
                p-6 bg-white rounded-2xl border-2 border-gray-200 shadow-lg
                hover:shadow-2xl transition-all duration-300
                hover:-translate-y-2 ${card.hoverColor}
              `}
            >
              {/* Background Gradient Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${card.color} text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>

                {/* Card Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                  {card.name}
                </h3>

                {/* Action Button */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-800 transition-colors">
                    Manage
                  </span>
                  <div className={`p-2 rounded-full bg-gradient-to-br ${card.color} text-white group-hover:translate-x-1 transition-transform duration-300`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${card.color} opacity-10 rounded-bl-full`}></div>
            </Link>
          ))}
        </div>

        {/* Additional Info Section */}

      </div>
    // </div>
  );
};

export default AdminDashboard;