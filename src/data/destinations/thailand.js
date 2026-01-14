// Thailand Destination Data
// All Thailand-specific content: itinerary, highlights, stats, etc.

import {
  Building2,
  Mountain,
  Ship,
  Camera,
  MapPin,
  BookOpen,
  Utensils,
  Landmark,
  Waves,
  Check,
  Home,
  UtensilsCrossed,
  Ticket,
  Car,
  Bus,
  Plane,
  UserCheck,
  Sun,
  Palmtree,
  History
} from 'lucide-react';

// ==========================================
// THEME CONFIGURATION - Copy this structure for new destinations
// ==========================================
export const thailandTheme = {
  // Theme colors (Tailwind classes for className usage)
  primaryGradientClass: 'from-blue-600 to-cyan-600',
  secondaryGradientClass: 'from-blue-500 to-teal-500',
  overlayGradient: 'from-blue-900/85 via-cyan-900/80 to-teal-900/75',
  backgroundGradient: 'from-blue-50/30 via-cyan-50/20 to-teal-50/30',
  titleGradient: 'linear-gradient(to right, #2563eb, #06b6d4, #14b8a6)',
  accentColor: '#0891b2',

  // Icon colors for itinerary
  iconColor: '#0891b2',

  // Card border colors
  cardBorder: 'border-cyan-100',

  // Tab colors
  tabActiveClass: 'bg-blue-500 text-white',
  tabInactiveClass: 'text-stone-600 hover:bg-blue-50',

  // Form colors
  formBgGradient: "#e0f2fe, #ecfeff, #f0fdfa",
  borderColor: "#a5f3fc",
  headingColor: "#0c4a6e",
  inputBorderColor: "#bae6fd",
  successBgGradient: "#f0f9ff, #ecfeff, #f0fdfa",

  // Hero section
  heroImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1920&h=1080&fit=crop',
  heroSubtitle: "Experience the Land of Smiles - from Bangkok's grand palaces to Phi Phi Islands' pristine beaches.",

  // Page-level classes
  pageClass: 'from-blue-50/50 via-cyan-50/30 to-teal-50/50',
  scrollProgress: 'from-blue-600 to-stone-600',

  // Destination ID for forms
  destinationId: 'thailand',
  destinationName: 'Thailand'
};

// ==========================================
// HERO SECTION DATA
// ==========================================
export const thailandHeroStats = [
  { icon: Sun, value: "7 Nights / 8 Days", label: "Thailand Tour" },
  { icon: Camera, value: "38M+", label: "Annual Visitors" },
  { icon: Landmark, value: "40+", label: "UNESCO Sites" },
  { icon: MapPin, value: "9.2/10", label: "Safety Rating" }
];

// ==========================================
// ABOUT SECTION DATA
// ==========================================
export const thailandStats = [
  { icon: Palmtree, value: "513K km²", label: "Total Area" },
  { icon: Utensils, value: "4", label: "Regional Cuisines" },
  { icon: Landmark, value: "77", label: "Provinces" },
  { icon: Building2, value: "70M+", label: "Population" }
];

// Highlights for about section
export const thailandHighlightsData = [
  {
    title: "Grand Palace Bangkok",
    description: "Explore the magnificent royal palace in Bangkok, home to the revered Emerald Buddha temple and stunning Thai architecture.",
    image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=400&h=300&fit=crop",
    badge: "Iconic",
    color: "from-amber-500 to-yellow-500",
    icon: Landmark
  },
  {
    title: "Phi Phi Islands",
    description: "Discover the stunning limestone cliffs and crystal-clear waters of this tropical paradise made famous by Hollywood movies.",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&h=300&fit=crop",
    badge: "Natural",
    color: "from-cyan-500 to-blue-500",
    icon: Waves
  },
  {
    title: "Ayutthaya Historical Park",
    description: "Wander through the ancient ruins of Thailand's former capital, a UNESCO World Heritage Site with impressive Buddhist temples.",
    image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=400&h=300&fit=crop",
    badge: "Historical",
    color: "from-purple-500 to-pink-500",
    icon: History
  },
  {
    title: "Chiang Mai Temples",
    description: "Visit the ancient Lanna-style temples in Chiang Mai, including the stunning Doi Suthep temple atop a mountain.",
    image: "https://images.unsplash.com/photo-1548586196-aa5803b77379?w=400&h=300&fit=crop",
    badge: "Cultural",
    color: "from-orange-500 to-red-500",
    icon: Landmark
  },
  {
    title: "Thai Cuisine Experience",
    description: "Learn to cook authentic Thai dishes and explore bustling markets featuring exotic fruits, spices, and street food delights.",
    image: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=400&h=300&fit=crop",
    badge: "Culinary",
    color: "from-green-500 to-emerald-500",
    icon: Utensils
  },
  {
    title: "Phuket Beaches",
    description: "Relax on pristine beaches in Phuket, from the bustling Patong Beach to the serene Kata and Karon beaches.",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=300&fit=crop",
    badge: "Beach",
    color: "from-blue-500 to-cyan-500",
    icon: Sun
  }
];

// ==========================================
// DETAILED ITINERARY DATA - 7 Nights / 8 Days
// ==========================================
export const thailandItineraryData = [
  {
    day: 1,
    title: "Arrival in Bangkok",
    content: `The group will arrive at Suvarnabhumi International Airport, Bangkok. Upon arrival, travelers will be received by the local representative and transferred to the designated 4-star hotel for check-in. The remainder of the evening will be at leisure, followed by an overnight stay in Bangkok.`
  },
  {
    day: 2,
    title: "Bangkok City Tour",
    content: `After breakfast at the hotel, the day begins with a visit to the Grand Palace, home to the revered Emerald Buddha temple. In the afternoon, explore the iconic Wat Pho temple with its massive Reclining Buddha, and take a boat ride through the scenic Chao Phraya River. Evening free for shopping at Asiatique Riverfront or exploring local markets. Overnight in Bangkok.`
  },
  {
    day: 3,
    title: "Bangkok to Ayutthaya Day Trip",
    content: `Following breakfast, depart for Ayutthaya (approx. 2 hours), the ancient capital of the Kingdom of Siam. Visit the historical park featuring the famous Wat Mahathat with its Buddha head entwined in tree roots, Wat Phra Si Sanphet, and the giant bronze Buddha at Wat Phra Mongkhon Bophit. Return to Bangkok in the evening. Overnight in Bangkok.`
  },
  {
    day: 4,
    title: "Fly to Phuket",
    content: `After breakfast, transfer to Bangkok airport for your flight to Phuket. Upon arrival, check in at the resort and spend the afternoon at leisure. Enjoy the hotel facilities or explore the nearby beaches. Evening optional: Thai cooking class or traditional Thai massage. Overnight in Phuket.`
  },
  {
    day: 5,
    title: "Phi Phi Islands Tour",
    content: `Full-day excursion to the famous Phi Phi Islands by speedboat. Visit Maya Bay (made famous by The Beach movie), Viking Cave, Loh Samah Bay, and Monkey Beach. Enjoy snorkeling in crystal-clear waters and a beachside lunch. Return to Phuket in the evening. Overnight in Phuket.`
  },
  {
    day: 6,
    title: "Phuket Exploration",
    content: `After breakfast, visit the Big Buddha statue atop Nakkerd Hill, offering panoramic views of Phuket. Explore the historic Old Town with its Sino-Portuguese architecture, colorful shophouses, and local cafes. Afternoon free for beach activities or spa treatments. Evening optional: Simon Cabaret Show. Overnight in Phuket.`
  },
  {
    day: 7,
    title: "Phuket to Chiang Mai (Flight)",
    content: `Morning flight to Chiang Mai, the cultural capital of Northern Thailand. Afternoon check-in at hotel. Visit the iconic Doi Suthep Temple (Wat Phra That Doi Suthep) perched atop the mountain with stunning views of the city. Evening explore the famous Sunday Walking Street market for local handicrafts and street food. Overnight in Chiang Mai.`
  },
  {
    day: 8,
    title: "Departure from Chiang Mai",
    content: `Guests will be transferred to Chiang Mai International Airport for their onward journey, marking the conclusion of the tour program.`
  }
];

// ==========================================
// INCLUSIONS AND EXCLUSIONS
// ==========================================
export const thailandInclusionsData = [
  { icon: Home, title: "4-Star Accommodation", description: "3 nights Bangkok + 3 nights Phuket + 1 night Chiang Mai" },
  { icon: UtensilsCrossed, title: "Daily Breakfast", description: "Daily breakfast at the hotel" },
  { icon: Ticket, title: "All Entrance Fees", description: "All entrance fees to listed attractions" },
  { icon: Car, title: "Private Transportation", description: "Private transportation throughout including airport transfers" },
  { icon: Bus, title: "Day Trip Transport", description: "Air-conditioned vehicle for Ayutthaya tour" },
  { icon: Plane, title: "Domestic Flights", description: "Bangkok to Phuket and Phuket to Chiang Mai flights" },
  { icon: Ship, title: "Phi Phi Islands Tour", description: "Speedboat tour with lunch and snorkeling equipment" },
  { icon: UserCheck, title: "Professional Guide", description: "English-speaking guides at each destination" }
];

export const thailandExclusionsData = [
  "International airfare to and from Thailand",
  "Lunch and dinner throughout the tour (except where specified)",
  "Tips for guides and drivers (approx. USD 3 per person per night)",
  "Personal medical expenses",
  "Shopping and personal expenses",
  "Thailand Visa fees (available on arrival for many nationalities)",
  "Optional activities not mentioned in itinerary",
  "Travel insurance (highly recommended)"
];

// ==========================================
// THAILAND-SPECIFIC FAQ DATA
// ==========================================
export const thailandFAQs = [
  {
    question: "Do I need a visa to visit Thailand?",
    answer: "Many nationalities can enter Thailand visa-free for up to 30 days (tourist purpose). Citizens of India, China, and some other countries can apply for a Visa on Arrival at Thai airports. It's best to check with the Thai embassy in your country for the most current visa requirements."
  },
  {
    question: "What is the best time to visit Thailand?",
    answer: "The best time to visit Thailand is during the cool and dry season from November to February. This is peak tourist season with pleasant temperatures (20-30°C). The shoulder seasons of March-May (hot season) and June-October (rainy season) offer fewer crowds but higher temperatures or rainfall respectively."
  },
  {
    question: "Is it safe to travel in Thailand?",
    answer: "Thailand is generally a very safe destination for tourists. The crime rate against tourists is low, and the country has excellent public safety. However, as with any destination, standard precautions for personal belongings, especially in crowded areas and markets, should be followed."
  },
  {
    question: "What should I pack for Thailand?",
    answer: "Pack light, breathable cotton clothing suitable for hot weather. Bring modest clothing for visiting temples (cover shoulders and knees). Swimwear for beaches and hotels. Don't forget sunscreen, insect repellent, comfortable walking shoes, and any personal medications. An umbrella or raincoat is useful during rainy season."
  },
  {
    question: "How do I get around in Thailand?",
    answer: "Thailand has excellent transportation options. In cities, use tuk-tuks, taxis, or ride-hailing apps like Grab. For inter-city travel, use domestic flights, buses, or trains. For island hopping, ferries and speedboats are available. Your tour package includes all necessary transfers."
  },
  {
    question: "What currency should I bring?",
    answer: "The official currency is the Thai Baht (THB). It's recommended to exchange some currency before your trip or withdraw from ATMs in Thailand. 1 USD approximately equals 35-36 THB. Credit cards are accepted in hotels, restaurants, and shopping malls, but cash is essential for street markets and small shops."
  },
  {
    question: "What is the dress code in Thailand?",
    answer: "Thailand is generally casual but respectful. When visiting temples, dress modestly (cover shoulders and knees). Swimwear is acceptable at beaches and pools but not in public areas. Shoes must be removed when entering temples and some traditional houses. Avoid wearing shoes inside buildings."
  },
  {
    question: "Is tipping expected in Thailand?",
    answer: "Tipping is not traditionally expected in Thailand but is appreciated for good service. It's common to round up bills or leave 20-50 Baht at restaurants. Hotel staff, porters, and drivers usually appreciate tips of 20-50 Baht per service. Spa therapists are typically tipped 100-200 Baht."
  },
  {
    question: "What language is spoken in Thailand?",
    answer: "Thai is the official language. English is widely spoken in tourist areas, hotels, and restaurants. Learning a few basic Thai phrases like 'Sawadee Krap/Ka' (Hello) and 'Khop Khun Krap/Ka' (Thank you) will be appreciated by locals."
  },
  {
    question: "What is Thai food like?",
    answer: "Thai cuisine is famous for its balance of sweet, sour, salty, and spicy flavors. Popular dishes include Pad Thai, Green Curry, Tom Yum soup, and Mango Sticky Rice. Food is generally safe to eat in restaurants and hotels. Street food is part of the experience but choose busy, clean stalls."
  },
  {
    question: "How do I stay connected in Thailand?",
    answer: "You can purchase a tourist SIM card at airports for affordable data and calls. Major providers include AIS, DTAC, and TrueMove. Free Wi-Fi is available in most hotels, cafes, and restaurants. Download offline maps and translation apps before your trip."
  },
  {
    question: "What electrical outlets are used in Thailand?",
    answer: "Thailand uses Type A, B, C, and O electrical outlets with 220V at 50Hz. The standard is similar to the US (Type A/B) and Europe (Type C). Most hotels have universal outlets. Bring a universal adapter if your devices use different plug types."
  }
];

// ==========================================
// THAILAND-SPECIFIC POLICIES
// ==========================================
export const thailandPolicies = {
  importantNotes: [
    "Rates are valid for the mentioned travel dates only",
    "Quotation does not guarantee availability; confirmation required at booking",
    "Surcharges may apply during Thai New Year (April) and other festivals",
    "Final pricing depends on travel date confirmation and hotel availability",
    "Domestic flight tickets are subject to availability at time of booking",
    "Peak season supplements may apply for December-January period"
  ],
  checkInOut: {
    checkin: "14:00 hrs",
    checkout: "12:00 hrs",
    note: "Early check-in/late check-out subject to hotel availability and additional charges"
  },
  paymentConditions: [
    "50% advance payment upon confirmation",
    "50% balance to be paid 15 days prior to departure",
    "Full payment required for bookings made within 15 days of travel"
  ],
  cancellation: [
    "More than 30 days before departure: Full refund minus processing fees",
    "15-30 days before departure: 50% of tour cost retained",
    "Within 15 days of departure: No refund (flights and hotels are non-refundable)",
    "No refund in case of no-show at any stage of the tour",
    "Booking modification fee of USD 50 applies for date changes"
  ]
};

// ==========================================
// KNOW BEFORE YOU GO DATA
// ==========================================
export const thailandKnowBeforeYouGoData = {
  faqs: thailandFAQs,
  policies: thailandPolicies,
  visaRequirements: {
    title: "Requirements for Thailand Tourist Visa",
    items: [
      "Valid passport with at least 6 months validity beyond your intended stay",
      "At least one blank visa page in the passport",
      "Recent passport-sized photographs (2x2 inches) with white background",
      "Proof of onward/return flight ticket",
      "Proof of hotel reservation for entire stay",
      "Proof of sufficient funds (approximately 10,000 THB per person)",
      "Completed visa application form"
    ]
  },
  packingTips: [
    "Light, breathable clothing for hot weather",
    "Modest clothing for temple visits",
    "Sunscreen and hat",
    "Insect repellent",
    "Comfortable walking shoes",
    "Power adapter (Thailand uses Type A/B/C/O plugs)",
    "Raincoat or umbrella during rainy season"
  ],
  healthAdvisories: [
    "No mandatory vaccinations required for Thailand",
    "Drink only bottled or filtered water",
    "Be cautious with street food if you have sensitive stomach",
    "Carry basic first aid kit",
    "Travel insurance is highly recommended",
    "Consider travel insurance covering medical emergencies"
  ]
};

// ==========================================
// EXPORT ALL DATA
// ==========================================
export const thailandDestinationData = {
  id: "thailand",
  name: "Thailand",
  country: "Thailand",
  category: "international",
  theme: thailandTheme,
  heroStats: thailandHeroStats,
  highlights: thailandHighlightsData,
  stats: thailandStats,
  itinerary: thailandItineraryData,
  inclusions: thailandInclusionsData,
  exclusions: thailandExclusionsData,
  faqs: thailandFAQs,
  policies: thailandPolicies,
  knowBeforeYouGo: thailandKnowBeforeYouGoData,
  galleryImages: []
};

