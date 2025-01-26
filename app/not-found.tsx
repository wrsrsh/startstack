'use client'; // Mark this component as a Client Component

import { ArrowLeft, Home } from "lucide-react"; // Import icons
import { useRouter } from "next/navigation"; // Use Next.js router for navigation

export default function NotFound() {
  const router = useRouter(); // Access the Next.js router

  // Handler for going back to the previous page
  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back(); // Go back to the previous page
    } else {
      router.push("/"); // Fallback to home if no history exists
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
      {/* 404 Icon */}
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h1m0 0h1m-1 0V8m4 8h1v-4h-1m0 0h-1m1 0V8m4 8h1v-4h-1m0 0h-1m1 0V8M5.121 4.379A9.978 9.978 0 0112 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.978 9.978 0 01-6.879-2.379"
          />
        </svg>
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
        Page Not Found (404)
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 text-center">
        The page you are looking for might have been removed, renamed, or is temporarily unavailable.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        {/* Button to go back to the previous page */}
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back
        </button>

        {/* Button to return home */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
        >
          <Home className="w-5 h-5" />
          Return Home
        </button>
      </div>
    </div>
  );
}
