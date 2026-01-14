// Australia Destination Data
// All Australia-specific content: itinerary, highlights, stats, etc.

import {
  MapPin,
  Building,
  Clock,
  Sun,
  Mountain,
  Waves,
  Camera,
  UtensilsCrossed,
  Check,
  Plane,
  Palmtree,
  Gift,
  Timer,
  Star,
  Briefcase,
  Car,
  User,
  Info
} from 'lucide-react';

// ==========================================
// THEME CONFIGURATION - Australian Adventure Theme
// Deep Ocean Blue Theme - Distinctive from other destinations
// ==========================================
export const australiaTheme = {
  // Theme colors (Tailwind classes for className usage)
  primaryGradientClass: 'from-indigo-600 to-blue-600',
  secondaryGradientClass: 'from-blue-500 to-cyan-500',
  overlayGradient: 'from-indigo-900/85 via-blue-900/80 to-cyan-900/75',
  backgroundGradient: 'from-indigo-50/30 via-blue-50/20 to-cyan-50/30',
  titleGradient: 'linear-gradient(to right, #4f46e5, #0ea5e9, #06b6d4)',
  accentColor: '#0ea5e9',

  // Icon colors for itinerary
  iconColor: '#0ea5e9',

  // Card border colors
  cardBorder: 'border-blue-100',

  // Tab colors
  tabActiveClass: 'bg-indigo-500 text-white',
  tabInactiveClass: 'text-stone-600 hover:bg-blue-50',

  // Form colors
  formBgGradient: "#eef2ff, #dbeafe, #cffafe",
  borderColor: "#a5b4fc",
  headingColor: "#1e3a8a",

  // Hero section
  heroImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1920&h=1080&fit=crop',
  heroSubtitle: "Experience the magic of Melbourne, Gold Coast & Sydney on an unforgettable 10-day Australian adventure",

  // Page-level classes
  pageClass: 'from-indigo-50/50 via-blue-50/30 to-cyan-50/50',
  scrollProgress: 'from-indigo-600 via-blue-500 to-cyan-600',

  // Destination ID for forms
  destinationId: 'australia',
  destinationName: 'Australia'
};

// ==========================================
// HERO SECTION DATA
// ==========================================
export const australiaHeroStats = [
  { icon: Clock, value: "10 Days / 9 Nights", label: "Australia Tour Package" },
  { icon: MapPin, value: "3 Cities", label: "Melbourne, Gold Coast, Sydney" },
  { icon: Building, value: "3-Star", label: "Hotels" },
  { icon: UtensilsCrossed, value: "Daily Breakfast", label: "Meals Included" }
];

// ==========================================
// ABOUT SECTION DATA
// ==========================================
export const australiaStats = [
  { icon: MapPin, value: "Australia", label: "Land Down Under" },
  { icon: Star, value: "4.9/5", label: "Traveler Rating" },
  { icon: Sun, value: "Sunny", label: "Climate" },
  { icon: Camera, value: "11", label: "Sightseeing Tours" }
];

// Highlights for about section
export const australiaHighlightsData = [
  {
    title: "Melbourne City Tour",
    description: "Explore Federation Square, St. Patrick's Cathedral, and enjoy panoramic views from Melbourne Skydeck.",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=300&fit=crop",
    badge: "Cultural",
    color: "from-amber-500 to-orange-500",
    icon: Building
  },
  {
    title: "Great Ocean Road",
    description: "Drive along one of the world's most scenic coastal roads, seeing the Twelve Apostles and Loch Ard Gorge.",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=300&fit=crop",
    badge: "Scenic",
    color: "from-blue-500 to-cyan-500",
    icon: Mountain
  },
  {
    title: "Warner Bros. Movie World",
    description: "Experience thrilling rides, live shows, and family-friendly attractions at Gold Coast's famous theme park.",
    image: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=400&h=300&fit=crop",
    badge: "Adventure",
    color: "from-purple-500 to-pink-500",
    icon: Camera
  },
  {
    title: "Sea World",
    description: "Discover marine life exhibits, entertaining shows, and exciting rides at this iconic Gold Coast attraction.",
    image: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=400&h=300&fit=crop",
    badge: "Marine",
    color: "from-blue-500 to-indigo-500",
    icon: Waves
  },
  {
    title: "Sydney City Tour",
    description: "Hop-On Hop-Off tour covering Sydney Opera House, Bondi Beach, and Darling Harbour.",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=300&fit=crop",
    badge: "Iconic",
    color: "from-teal-500 to-cyan-500",
    icon: MapPin
  },
  {
    title: "Blue Mountains",
    description: "Optional tour to the Three Sisters, scenic viewpoints, and wildlife encounters near Sydney.",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=300&fit=crop",
    badge: "Nature",
    color: "from-green-500 to-emerald-500",
    icon: Mountain
  }
];

// ==========================================
// DETAILED ITINERARY DATA - 10 Days / 9 Nights
// ==========================================
export const australiaItineraryData = [
  {
    day: 1,
    title: "Arrival in Melbourne",
    content: `Upon arrival at Melbourne Airport, you will be greeted and transferred privately to your hotel. The remainder of the day is at leisure to relax after your journey or explore nearby cafes and attractions at your own pace.

Overnight stay in Melbourne.

Meals: Breakfast – Not Included`
  },
  {
    day: 2,
    title: "Melbourne City Tour",
    content: `After breakfast, proceed for a half-day guided city tour of Melbourne. Visit Federation Square, St. Patrick's Cathedral, and enjoy an external view of the Melbourne Cricket Ground (MCG). Later, experience breathtaking panoramic views from the Melbourne Skydeck. The afternoon is free for leisure.

Overnight stay in Melbourne.

Meals: Breakfast Included`
  },
  {
    day: 3,
    title: "Great Ocean Road Scenic Tour",
    content: `After breakfast, enjoy a full-day excursion along the spectacular Great Ocean Road. Witness the stunning coastal scenery, including Lorne, Apollo Bay, the famous Twelve Apostles, and Loch Ard Gorge. Return to Melbourne by evening.

Overnight stay in Melbourne.

Meals: Breakfast Included`
  },
  {
    day: 4,
    title: "Melbourne – Gold Coast",
    content: `After breakfast, transfer to Melbourne Airport for your onward flight to Brisbane/Gold Coast (flight not included). Upon arrival, check in at Mercure Gold Coast Resort. The rest of the day is free to relax or explore the beaches and local surroundings.

Overnight stay in Gold Coast.

Meals: Breakfast Included`
  },
  {
    day: 5,
    title: "Warner Bros. Movie World",
    content: `After breakfast, enjoy a fun-filled day at Warner Bros. Movie World. Experience thrilling rides, live shows, and family-friendly attractions. This world-famous theme park offers entertainment for all ages.

Overnight stay in Gold Coast.

Meals: Breakfast Included`
  },
  {
    day: 6,
    title: "Sea World",
    content: `After breakfast, visit Sea World, where you can enjoy marine life exhibits, entertaining shows, and exciting rides. The evening is free for leisure to explore the Gold Coast nightlife or relax at your hotel.

Overnight stay in Gold Coast.

Meals: Breakfast Included`
  },
  {
    day: 7,
    title: "Gold Coast – Sydney",
    content: `After breakfast, transfer to the airport for your flight to Sydney (flight not included). Upon arrival, private transfer to Holiday Inn Express Sydney. The rest of the day is free to explore Darling Harbour, shopping areas, or enjoy views of the Sydney Opera House.

Overnight stay in Sydney.

Meals: Breakfast Included`
  },
  {
    day: 8,
    title: "Sydney City Tour",
    content: `After breakfast, proceed for a Hop-On Hop-Off Sydney City Tour, covering major attractions such as the Sydney Opera House, Bondi Beach, and Darling Harbour. Enjoy the city at your own pace with the flexibility to hop on and off at various stops.

Overnight stay in Sydney.

Meals: Breakfast Included`
  },
  {
    day: 9,
    title: "Optional Blue Mountains Tour",
    content: `After breakfast, the day is free at leisure or you may opt for a full-day tour to the Blue Mountains, including visits to the Three Sisters, scenic viewpoints, and wildlife encounters (optional, at additional cost).

Overnight stay in Sydney.

Meals: Breakfast Included`
  },
  {
    day: 10,
    title: "Departure from Sydney",
    content: `After breakfast, check out from the hotel and transfer privately to Sydney Airport for your onward journey, concluding your memorable Australian holiday.

Meals: Breakfast Included`
  }
];

// ==========================================
// HOTELS DATA
// ==========================================
export const australiaHotelsData = [
  {
    city: "Melbourne",
    hotel: "Ibis Melbourne Central",
    rating: "3-Star",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    features: ["Central Location", "Daily Breakfast", "WiFi", "Air Conditioning"]
  },
  {
    city: "Gold Coast",
    hotel: "Mercure Gold Coast Resort",
    rating: "3-Star",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop",
    features: ["Pool", "Restaurant", "Spa", "Beach Access"]
  },
  {
    city: "Sydney",
    hotel: "Holiday Inn Express Sydney",
    rating: "3-Star",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
    features: ["Central Location", "Daily Breakfast", "WiFi", "Gym"]
  }
];

// ==========================================
// INCLUSIONS AND EXCLUSIONS
// ==========================================
export const australiaInclusionsData = [
  { icon: Building, title: "Accommodation", description: "9 nights in deluxe rooms on breakfast basis" },
  { icon: UtensilsCrossed, title: "Daily Breakfast", description: "Breakfast at hotels (except arrival day)" },
  { icon: Camera, title: "Sightseeing", description: "All tours as mentioned in itinerary" },
  { icon: Car, title: "Transfers", description: "Airport and intercity transfers as per itinerary" },
  { icon: Plane, title: "Flights", description: "International & domestic airfare included" },
  { icon: Briefcase, title: "Visa", description: "Australia visa fees included" },
  { icon: User, title: "Guide", description: "English-speaking guide for tours" },
  { icon: Gift, title: "Welcome Kit", description: "Travel essentials kit" },
  { icon: Timer, title: "24/7 Support", description: "Round-the-clock assistance" },
  { icon: Check, title: "All Taxes", description: "All applicable taxes included" }
];

export const australiaExclusionsData = [
  "Lunches and dinners",
  "Personal expenses such as drinks, laundry, phone calls",
  "Travel insurance (highly recommended)",
  "Optional tours and activities not mentioned in itinerary",
  "Early check-in or late check-out charges",
  "Anything not mentioned in inclusions"
];

// ==========================================
// AUSTRALIA-SPECIFIC FAQ DATA
// ==========================================
export const australiaFAQs = [
  {
    question: "Do I need a visa for Australia?",
    answer: "Yes, Indian citizens require a visa to visit Australia. The tourist visa (subclass 600) allows stays of up to 12 months. We assist with the complete visa application process.",
  },
  {
    question: "What is the best time to visit Australia?",
    answer: "Australia is a year-round destination. The best time to visit is during spring (September-November) and autumn (March-May) when the weather is pleasant across all regions. Summer (December-February) is peak season but can be hot in some areas.",
  },
  {
    question: "What should I pack for Australia?",
    answer: "Pack light, breathable clothing, swimwear, comfortable walking shoes, sunscreen, hat, sunglasses, and a light jacket for evenings. Don't forget your camera for capturing stunning landscapes!",
  },
  {
    question: "Is it safe to travel to Australia?",
    answer: "Australia is generally very safe for tourists. The local people are friendly and welcoming. Standard precautions for personal belongings should be taken, especially in crowded areas.",
  },
  {
    question: "What type of accommodation is provided?",
    answer: "The package includes 9 nights accommodation at 3-star hotels (Ibis Melbourne Central, Mercure Gold Coast Resort, Holiday Inn Express Sydney) on breakfast basis.",
  },
  {
    question: "Are domestic flights included?",
    answer: "Yes, domestic flights between Melbourne-Gold Coast-Sydney are included in the package. International flight from home country to Australia and back is also included.",
  },
  {
    question: "What sightseeing is included?",
    answer: "The package includes Melbourne city tour, Great Ocean Road tour, Warner Bros. Movie World, Sea World, and Hop-On Hop-Off Sydney City Tour. Blue Mountains tour is optional at additional cost.",
  },
  {
    question: "Are meals included?",
    answer: "Daily breakfast at hotels is included (except on arrival day). Lunches and dinners are not included and can be enjoyed at local restaurants.",
  },
  {
    question: "What is the currency in Australia?",
    answer: "The official currency is Australian Dollar (AUD). Credit cards are widely accepted, and ATMs are available throughout the country.",
  },
  {
    question: "What is the time difference?",
    answer: "Australia is 5.5-6.5 hours ahead of Nepal depending on the state (IST to AEST: +5:30 hours for most states).",
  }
];

// ==========================================
// AUSTRALIA-SPECIFIC POLICIES
// ==========================================
export const australiaPolicies = {
  importantNotes: [
    "No reservation of hotel and airline has been made till we receive confirmation",
    "Room is subject to availability at the time of booking",
    "Standard Hotel Check-in time: 14:00 hrs local time",
    "Standard Hotel Check-out time: 12:00 hrs local time",
    "Rates may change due to fuel surcharge or exchange rate fluctuations",
    "Rates will be re-proposed if any extreme changes occur",
    "Tour and price are subject to change without notice"
  ],
  termsConditions: [
    "All hotel rooms are based on lowest category or Run of House",
    "Hotel upgrade is subject to availability and supplement charges will be applicable",
    "Overtime transfers and tour guide services to be charged on spot",
    "Small deviations in the tour program may be necessary depending on weather and traffic conditions",
    "Domestic flights are included but subject to availability"
  ],
  bookingTerms: [
    "50% of the total package cost must be deposited as booking amount",
    "Full payment must be done once the package is confirmed",
    "All bookings are non-refundable once visa is applied and confirmation is done",
    "Up to 100% cancellation charge can be applied depending upon airlines"
  ],
  cancellation: [
    "More than 30 days before departure: Full refund minus processing fees",
    "15-30 days before departure: 50% of tour cost retained",
    "Within 15 days of departure: No refund (flights and hotels are non-refundable)",
    "No refund in case of no-show at any stage of the tour",
    "Visa fee once applied is non-refundable regardless of cancellation date"
  ]
};

// ==========================================
// KNOW BEFORE YOU GO DATA
// ==========================================
export const australiaKnowBeforeYouGoData = {
  faqs: australiaFAQs,
  policies: australiaPolicies,
  visaRequirements: {
    title: "Requirements for Australia Tourist Visa",
    items: [
      "Valid passport with minimum 6 months validity from travel date",
      "Recent passport-sized photographs",
      "Completed visa application form",
      "Bank statements for last 3 months",
      "Proof of employment or business",
      "Travel itinerary and hotel bookings",
      "Visa fee included in package - we assist with complete processing"
    ]
  },
  packingTips: [
    "Light, breathable cotton clothing",
    "Swimwear for Gold Coast beaches",
    "Sunscreen, hat, and sunglasses",
    "Comfortable walking shoes for tours",
    "Camera for stunning landscapes",
    "Power adapter (Australia uses Type I plug, 230V)",
    "Light jacket for evenings",
    "Reusable water bottle"
  ],
  healthAdvisories: [
    "No mandatory vaccinations required for Australia",
    "Drink bottled water for comfort",
    "Travel insurance highly recommended",
    "Carry basic first aid kit and any personal medications",
    "Australia has excellent healthcare facilities",
    "Sun protection is essential"
  ]
};

// ==========================================
// EXPORT ALL DATA
// ==========================================
export const australiaDestinationData = {
  id: "australia",
  name: "Australia",
  country: "Australia",
  category: "international",
  theme: australiaTheme,
  heroStats: australiaHeroStats,
  highlights: australiaHighlightsData,
  stats: australiaStats,
  itinerary: australiaItineraryData,
  hotels: australiaHotelsData,
  inclusions: australiaInclusionsData,
  exclusions: australiaExclusionsData,
  faqs: australiaFAQs,
  policies: australiaPolicies,
  knowBeforeYouGo: australiaKnowBeforeYouGoData,
  galleryImages: []
};

