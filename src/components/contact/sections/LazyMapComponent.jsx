// Sasa Travel Office - Balaju, Kathmandu, Nepal
// Coordinates: 27.7172 N, 85.3243 E
const OFFICE_LOCATION = {
  lat: 27.7172,
  lng: 85.3243,
  address: 'Balaju-4, Kathmandu, Nepal',
};

// Static embed URL - prevents iframe reload on every render
const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.1827!2d85.3243!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1907dc5c583d%3A0x9325895f2f23c4d1!2sBalaju-4%2C%20Kathmandu%2C%20Nepal!5e0!3m2!1sen!2snp!4v1704067200000!5m2!1sen!2snp';

const googleMapsUrl = `https://maps.google.com/?q=${encodeURIComponent(
  OFFICE_LOCATION.address
)}`;

export default function LazyMapComponent() {
  return (
    <section className="py-0 bg-gray-100" aria-label="Office Location Map">
      <div className="w-full">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 py-8">
          Find Us Here
        </h2>

        <div className="w-full overflow-hidden">
          <iframe
            src={MAP_EMBED_URL}
            width="100%"
            height="600"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sasa Travel Office Location - Balaju, Kathmandu"
            className="w-full"
            aria-label={`Google Map showing ${OFFICE_LOCATION.address}`}
          />
        </div>

        {/* Address link */}
        <div className="flex justify-center py-6">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
            aria-label="Open location in Google Maps"
          >
            <span>{OFFICE_LOCATION.address}</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
