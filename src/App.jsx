import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ui/ErrorBoundary";

// Lazy load page components for better performance
const Home = lazy(() => import("./pages/home/home"));
const Destinations = lazy(() => import("./pages/Destinations"));
const China = lazy(() => import("./pages/china/China"));
const Thailand = lazy(() => import("./pages/thailand/Thailand"));
const Vietnam = lazy(() => import("./pages/vietnam/Vietnam"));
const Bali = lazy(() => import("./pages/bali/Bali"));
const Dubai = lazy(() => import("./pages/dubai/Dubai"));
const Australia = lazy(() => import("./pages/australia/Australia"));
const Turkey = lazy(() => import("./pages/turkey/Turkey"));
const Japan = lazy(() => import("./pages/japan/Japan"));
const About = lazy(() => import("./pages/about/About"));
const Contact = lazy(() => import("./pages/Contact_new"));
const Blogs = lazy(() => import("./pages/blogs/Blogs"));
const BlogDetail = lazy(() => import("./pages/blogs/BlogDetail"));
const Gallery = lazy(() => import("./pages/gallery/index"));
const GalleryDetailPage = lazy(() => import("./pages/gallery/GalleryDetailPage"));
const Packages = lazy(() => import("./pages/Packages"));
const PackageDetail = lazy(() => import("./pages/PackageDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const routeKey = location.pathname.split('/')[1] || 'home';

  return (
    <div className="app-root">
      <Navbar />
      <main className="main-content">
        <ErrorBoundary fallbackMessage="Something went wrong loading this page.">
          <Suspense fallback={<PageLoader />}>
            <Routes key={routeKey}>
              <Route path="/" element={<Home />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destinations/international/bali" element={<Bali />} />
              <Route path="/destinations/international/vietnam" element={<Vietnam />} />
              <Route path="/destinations/international/dubai" element={<Dubai />} />
              <Route path="/destinations/international/thailand" element={<Thailand />} />
              <Route path="/destinations/international/australia" element={<Australia />} />
              <Route path="/destinations/international/turkey" element={<Turkey />} />
              <Route path="/destinations/international/china" element={<China />} />
              <Route path="/destinations/international/japan" element={<Japan />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<BlogDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/gallery/:slug" element={<GalleryDetailPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/packages/:id" element={<PackageDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}

