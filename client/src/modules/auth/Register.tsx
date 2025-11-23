import { useState } from "react";
import { REGISTER_USER_API } from "../../apis/register";


enum DocumentType {
  CITIZENSHIP = "CITIZENSHIP",
  NATIONAL_ID = "NATIONAL_ID",
  PASSPORT = "PASSPORT",
}

interface UserRegisterRequest {
  username: string;
  phone_number: string;
  email: string;
  password: string;
  citizenship_no: string;
  document_type: DocumentType;
  documents: File[]; // File objects for upload
}


// Define the type for the feedback message state
type FeedbackMessage = {
  text: string;
  type: 'success' | 'error';
} | null;

export default function RegisterPage() {
  const [form, setForm] = useState<UserRegisterRequest>({
    username: "",
    phone_number: "",
    email: "",
    password: "",
    citizenship_no: "",
    document_type: DocumentType.CITIZENSHIP, // Default
    documents: [], // Array of File objects
  });
  
  const [message, setMessage] = useState<FeedbackMessage>(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- Input and Select Handlers ---
  const handleInput =
    (key: keyof UserRegisterRequest) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      // Clear message when user starts typing/changing
      if (message) setMessage(null); 
      
      const value =
        key === "document_type"
          ? (e.target.value as DocumentType) // Ensure enum type
          : e.target.value;
      setForm({ ...form, [key]: value });
    };

  // --- File Upload Handler (with improved validation feedback) ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(null); // Clear previous messages
    const files = Array.from(e.target.files || []);

    if (files.length > 2) {
      setMessage({ text: "You can upload a maximum of 2 PDF files.", type: 'error' });
      e.target.value = ''; 
      setForm({ ...form, documents: [] });
      return;
    }
    
    const invalid = files.some((file) => file.type !== "application/pdf");
    if (invalid) {
      setMessage({ text: "Only PDF files are allowed.", type: 'error' });
      e.target.value = '';
      setForm({ ...form, documents: [] });
      return;
    }
    
    setForm({ ...form, documents: files });

    if (files.length > 0) {
      setMessage({ text: `${files.length} PDF file(s) ready for upload.`, type: 'success' });
    } else {
      setMessage(null);
    }
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    setMessage(null);

    // Basic validation check (can be expanded)
    if (!form.username || !form.email || !form.password) {
      setMessage({ text: "Please fill out all required fields.", type: 'error' });
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await REGISTER_USER_API(form); 
      
      if (response && response.success) { 
        setMessage({ text: "Registration successful! You may now log in.", type: 'success' });
        // Optional: Reset form fields here: setForm(initialFormState);
      } else {
        const errorText = response?.message || "Registration failed. Please try again.";
        setMessage({ text: errorText, type: 'error' });
      }

    } catch (error) {
      console.error("Form Submission Error:", error);
      setMessage({ text: "Network error or server connection failed. Please check your internet.", type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // --- Render Component ---
  return (
  
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-blue-100 p-10">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
            Voter Registration
          </h1>
          <p className="text-gray-600 mt-2">
            Register to participate in the national election
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Feedback Message Area (Success/Error) */}
          {message && (
            <div 
              className={`p-3 rounded-lg font-medium text-center transition-all duration-300 ${
                message.type === 'success' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {message.text}
            </div>
          )}

          <InputField
            label="Username"
            value={form.username}
            placeholder="Enter your full name"
            onChange={handleInput("username")}
            disabled={isLoading}
          />
          <InputField
            label="Phone Number"
            value={form.phone_number}
            placeholder="98xxxxxxxx"
            onChange={handleInput("phone_number")}
            disabled={isLoading}
          />
          <InputField
            label="Email Address"
            value={form.email}
            type="email"
            placeholder="example@mail.com"
            onChange={handleInput("email")}
            disabled={isLoading}
          />
          <InputField
            label="Password"
            value={form.password}
            type="password"
            placeholder="Enter secure password"
            onChange={handleInput("password")}
            disabled={isLoading}
          />
          <InputField
            label="Citizenship Number"
            value={form.citizenship_no}
            placeholder="123-45-678"
            onChange={handleInput("citizenship_no")}
            disabled={isLoading}
          />

          {/* Document Type Select */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Document Type
            </label>
            <select
              value={form.document_type}
              onChange={handleInput("document_type")}
              className="w-full border border-gray-300 rounded-lg px-3 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-200 disabled:text-gray-500"
              disabled={isLoading}
            >
              <option value={DocumentType.CITIZENSHIP}>Citizenship</option>
              <option value={DocumentType.NATIONAL_ID}>National ID</option>
              <option value={DocumentType.PASSPORT}>Passport</option>
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Upload Documents (Max 2 | PDF Only)
            </label>
            <div className={`border border-dashed rounded-xl p-5 transition ${isLoading ? 'bg-gray-100 cursor-not-allowed border-gray-400' : 'border-blue-400 bg-blue-50 hover:bg-blue-100 cursor-pointer'}`}>
              <input
                type="file"
                accept="application/pdf"
                multiple
                onChange={handleFileChange}
                className="w-full text-sm text-gray-700"
                disabled={isLoading}
              />
            </div>
            {/* Conditional display for selected files, showing file count and name */}
            {form.documents.length > 0 && (
              <div className="text-sm mt-2 space-y-1">
                <p className="text-blue-600 font-medium">
                  Selected Files:
                </p>
                <ul className="list-disc list-inside text-gray-600 pl-4">
                    {form.documents.map((file, index) => (
                        <li key={index} className="truncate">{file.name}</li>
                    ))}
                </ul>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading} 
            className={`w-full py-3 text-white rounded-xl font-bold tracking-wide transition shadow-md ${
                isLoading 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-700 hover:bg-blue-800 hover:shadow-lg'
            }`}
          >
            {isLoading ? 'Registering...' : 'Register Now'}
          </button>
        </form>
      </div>
    </div>
  );
}

// --- InputField Component ---
interface FieldProps {
  label: string;
  type?: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

function InputField({ label, type = "text", value, placeholder, onChange, disabled = false }: FieldProps) {
  return (
    <div>
      <label className="block text-gray-700 font-semibold mb-1">{label}</label>
      <input
        type={type}
        value={value}
        required
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        // FIX: The background and text colors are explicitly defined for both enabled and disabled states.
        className={`w-full border rounded-lg px-3 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            disabled 
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300' 
                : 'bg-white border-gray-300'
        }`}
      />
    </div>
  );
}