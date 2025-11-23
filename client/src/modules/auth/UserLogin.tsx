import { useState } from "react";
import { type UserLoginRequest, type UserLoginResponse } from "./types";
import { LOGIN_USER_API } from "../../apis/login";
import { useUserStore } from "../../stores/userStore";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState<UserLoginRequest>({
    email: "",
    password: "",
  });
  const setUser = useUserStore((state)=>state.setUser); 
  const navigate =useNavigate();
  // Generic input handler
  const handleInput =
    (key: keyof UserLoginRequest) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [key]: e.target.value });
    };

  // Triggered ONLY when the button is clicked
  const handleSubmit = async () => {
    const res = await LOGIN_USER_API(form) ;
    
    const userResponse : UserLoginResponse = {
      username  : res.data.username,
      password_hash : res.data.password_hash,
      phone_number : res.data.phone_number,
      user_type : res.data.user_type,
      id : res.data.id,
      is_verified  : res.data.is_verified,
      citizenship_no  : res.data.citizenship_no,
      created_at : res.data.created_at, 
       email : res.data.email

    }
    console.table(userResponse)
    setUser(userResponse);
    navigate('/dashboard')
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-blue-100">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-700 text-center">
          Election Login
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Login to access your election dashboard
        </p>

        {/* Form */}
        <form className="mt-8 space-y-5">

          <InputField
            label="Email"
            type="email"
            value={form.email}
            placeholder="example@mail.com"
            onChange={handleInput("email")}
          />

          <InputField
            label="Password"
            type="password"
            value={form.password}
            placeholder="Enter password"
            onChange={handleInput("password")}
          />

          {/* Button triggers handleSubmit */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold transition shadow-md hover:shadow-lg"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}

interface InputProps {
  label: string;
  type?: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputField({ label, type = "text", value, placeholder, onChange }: InputProps) {
  return (
    <div>
      <label className="block text-black font-semibold mb-1">{label}</label>
      <input
        type={type}
        value={value}
        required
        placeholder={placeholder}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg px-3 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
      />
    </div>
  );
}
