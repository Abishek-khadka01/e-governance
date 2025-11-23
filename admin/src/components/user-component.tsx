import type { UserLoginResponse } from "../auth/types";

interface UserCardProps {
  user: UserLoginResponse;
  onAssignAdmin: (id: string) => void;
  onVerifyUser: (id: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onAssignAdmin, onVerifyUser }) => {
  return (

    <div className="border border-gray-300 rounded-lg p-6 mb-4 w-80 shadow-sm">
      <div className="mb-2"><strong>ID:</strong> {user.id}</div>
      <div className="mb-2"><strong>Username:</strong> {user.username}</div>
      <div className="mb-2"><strong>Phone:</strong> {user.phone_number}</div>
      <div className="mb-2"><strong>Email:</strong> {user.email || "N/A"}</div>
      <div className="mb-2">
        <strong>Created At:</strong> {user.created_at ? new Date(user.created_at).toLocaleString() : "N/A"}
      </div>
      <div className="mb-2"><strong>User Type:</strong> {user.user_type || "N/A"}</div>
      <div className="mb-2"><strong>Verified:</strong> {user.is_verified ? "Yes" : "No"}</div>
      <div className="mb-4"><strong>Citizenship No:</strong> {user.citizenship_no || "N/A"}</div>

      <div className="flex gap-2">
        <button
          onClick={() => onAssignAdmin(user.id)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Assign Admin
        </button>

        {!user.is_verified && (
          <button
            onClick={() => onVerifyUser(user.id)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Verify User
          </button>
        )}
      </div>
    </div>

    
  );
};


