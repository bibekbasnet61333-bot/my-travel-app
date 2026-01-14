import { Link } from "react-router-dom";
import { Home, Map, ArrowLeft } from "lucide-react";
import ErrorBoundary from "../components/ui/ErrorBoundary";

export default function NotFound() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <ErrorBoundary fallbackMessage="Unable to load the page. Please try again.">
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            <span className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              404
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Oops! Page Not Found
            </h1>
            <p className="text-slate-600 text-lg">
              The page you are looking for does not exist or has been moved.
            </p>
          </div>

          <div className="mb-8 flex justify-center">
            <div className="w-48 h-48 bg-white rounded-full shadow-lg flex items-center justify-center">
              <Map className="w-24 h-24 text-blue-500" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            <Link
              to="/destinations"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-700 font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors duration-200"
            >
              <Map className="w-5 h-5" />
              Explore Destinations
            </Link>
          </div>

          <div className="mt-8">
            <button
              onClick={handleGoBack}
              className="text-slate-500 hover:text-blue-600 transition-colors duration-200 inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go back to previous page
            </button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
