import { useNavigate } from "react-router-dom";


function ErrorPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white text-center p-6">
        <h1 className="text-5xl font-bold text-[#197686]">Something Went Wrong</h1>
        <p className="text-lg mt-4 text-gray-300">
            We encountered an unexpected error. Please try again later.
        </p>
        <button
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-2 bg-[#197686] hover:bg-[#2a5057] text-white font-semibold rounded-lg shadow-md"
        >
            Navigate to Home Page
        </button>
    </div>
);
}

export default ErrorPage