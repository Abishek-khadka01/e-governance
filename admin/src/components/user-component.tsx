import type { UserLoginResponse } from "../auth/types";

interface UserCardProps {
  user: UserLoginResponse;
  onAssignAdmin: (id: string) => void;
  onVerifyUser: (id: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onAssignAdmin, onVerifyUser }) => {
  return (
    <div className="w-80 rounded-xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
      
      {/* Username */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {user.username}
      </h2>

      <div className="space-y-2 text-gray-700 text-sm">
        <p><strong>Phone:</strong> {user.phone_number}</p>
        <p><strong>Email:</strong> {user.email || "N/A"}</p>
        <p><strong>User Type:</strong> {user.user_type || "N/A"}</p>
        <p><strong>Verified:</strong> {user.is_verified ? "Yes" : "No"}</p>
        <p><strong>Citizenship No:</strong> {user.citizenship_no || "N/A"}</p>
        <p>
          <strong>Created At:</strong>{" "}
          {user.created_at ? new Date(user.created_at).toLocaleString() : "N/A"}
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        
        {/* Show Assign Admin ONLY if not already admin */}
        {user.user_type !== "admin" && (
          <button
            onClick={() => onAssignAdmin(user.id)}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Assign Admin
          </button>
        )}

        {/* Show Verify User ONLY if not verified */}
        {!user.is_verified && (
          <button
            onClick={() => onVerifyUser(user.id)}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            Verify User
          </button>
        )}
      </div>
    </div>
  );
};
