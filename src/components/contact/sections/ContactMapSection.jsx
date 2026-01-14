import { Suspense, lazy } from 'react';

const LazyMapComponent = lazy(() => import('./LazyMapComponent'));

function MapLoader() {
  return (
    <div className="w-full h-[600px] bg-gray-200 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-500">Loading map...</p>
      </div>
    </div>
  );
}

export default function ContactMapSection() {
  return (
    <Suspense fallback={<MapLoader />}>
      <LazyMapComponent />
    </Suspense>
  );
}


