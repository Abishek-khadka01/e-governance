import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-6">
      <div className="max-w-3xl mx-auto text-center">
        
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-blue-700 drop-shadow-sm">
          National E-Voting System
        </h1>

        <p className="mt-4 text-gray-700 text-lg max-w-xl mx-auto">
          Secure, transparent, and verified online voting platform for modern elections.
          Register now or log in to participate in the democratic process.
        </p>

        {/* Illustration / Banner */}
        <div className="mt-10 flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5538/5538045.png"
            alt="Voting Illustration"
            className="w-52 opacity-90"
          />
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="px-8 py-3 rounded-xl bg-blue-700 text-white font-semibold text-lg hover:bg-blue-800 transition shadow-md"
          >
            Register
          </Link>

          <Link
            to="/login"
            className="px-8 py-3 rounded-xl bg-white border border-blue-700 text-blue-700 font-semibold text-lg hover:bg-blue-50 transition shadow"
          >
            Login
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-16 text-gray-500 text-sm">
          © {new Date().getFullYear()} National Election Commission — E-Voting Initiative
        </p>
      </div>
    </div>
  );
}
