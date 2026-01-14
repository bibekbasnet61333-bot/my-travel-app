// Japan Destination Data
// All Japan-specific content: itinerary, highlights, stats, etc.

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
  History,
  Train,
  TreePine,
  Sparkles
} from 'lucide-react';

// ==========================================
// THEME CONFIGURATION
// ==========================================
export const japanTheme = {
  // Theme colors (Cherry blossom pink/coral tones)
  primaryGradientClass: 'from-pink-600 to-rose-600',
  secondaryGradientClass: 'from-pink-500 to-rose-500',
  overlayGradient: 'from-rose-900/85 via-pink-900/80 to-rose-900/75',
  backgroundGradient: 'from-pink-50/30 via-rose-50/20 to-pink-50/30',
  titleGradient: 'linear-gradient(to right, #db2777, #fb7185, #f43f5e)',
  accentColor: '#db2777',

  // Icon colors for itinerary
  iconColor: '#db2777',

  // Card border colors
  cardBorder: 'border-rose-100',

  // Tab colors
  tabActiveClass: 'bg-pink-500 text-white',
  tabInactiveClass: 'text-stone-600 hover:bg-pink-50',

  // Form colors
  formBgGradient: "#fdf2f8, #ffe4e6, #fce7f3",
  borderColor: "#fecdd3",
  headingColor: "#9f1239",
  inputBorderColor: "#fda4af",
  successBgGradient: "#fdf2f8, #ffe4e6, #fce7f3",

  // Hero section
  heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&h=1080&fit=crop',
  heroSubtitle: "Experience the Land of the Rising Sun - from Tokyo's neon lights to Kyoto's ancient temples and Mount Fuji's majestic peaks.",

  // Page-level classes
  pageClass: 'from-pink-50/50 via-rose-50/30 to-pink-50/50',
  scrollProgress: 'from-pink-600 to-rose-600',

  // Destination ID for forms
  destinationId: 'japan',
  destinationName: 'Japan'
};

// ==========================================
// HERO SECTION DATA
// ==========================================
export const japanHeroStats = [
  { icon: Train, value: "7 Nights / 8 Days", label: "Japan Tour" },
  { icon: Camera, value: "17M+", label: "Annual Visitors" },
  { icon: Landmark, value: "25+", label: "UNESCO World Heritage Sites" },
  { icon: MapPin, value: "9.3/10", label: "Safety Rating" }
];

// ==========================================
// ABOUT SECTION DATA
// ==========================================
export const japanStats = [
  { icon: TreePine, value: "377K km²", label: "Total Area" },
  { icon: Utensils, value: "8", label: "Regional Cuisines" },
  { icon: Landmark, value: "47", label: "Prefectures" },
  { icon: Building2, value: "125M+", label: "Population" }
];

// Highlights for about section
export const japanHighlightsData = [
  {
    title: "Tokyo Skytree",
    description: "Ascend Japan's tallest tower for breathtaking panoramic views of the sprawling metropolis and on clear days, see Mount Fuji.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
    badge: "Iconic",
    color: "from-pink-500 to-rose-500",
    icon: Landmark
  },
  {
    title: "Mount Fuji",
    description: "Witness Japan's iconic sacred volcano and UNESCO World Heritage site, an unforgettable symbol of natural beauty.",
    image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&h=300&fit=crop",
    badge: "Natural",
    color: "from-blue-500 to-cyan-500",
    icon: Mountain
  },
  {
    title: "Hakone Ropeway",
    description: "Soar above volcanic landscapes and enjoy spectacular views of Mount Fuji and the surrounding mountains.",
    image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400&h=300&fit=crop",
    badge: "Adventure",
    color: "from-green-500 to-emerald-500",
    icon: Train
  },
  {
    title: "Traditional Onsen",
    description: "Experience authentic Japanese hot springs in the scenic Hakone region for ultimate relaxation.",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop",
    badge: "Wellness",
    color: "from-cyan-500 to-blue-500",
    icon: Waves
  },
  {
    title: "Osaka Aquarium Kaiyukan",
    description: "Explore one of the largest public aquariums in the world, featuring diverse marine life of the Pacific Rim.",
    image: "https://images.unsplash.com/photo-1549344336-a1d929e94df6?w=400&h=300&fit=crop",
    badge: "Family",
    color: "from-purple-500 to-pink-500",
    icon: Ship
  },
  {
    title: "Osaka Castle",
    description: "Visit the magnificent feudal fortress that played a pivotal role in Japan's unification during the 16th century.",
    image: "https://images.unsplash.com/photo-1576675466969-38eeae4b41f6?w=400&h=300&fit=crop",
    badge: "Historical",
    color: "from-amber-500 to-orange-500",
    icon: History
  }
];

// ==========================================
// DETAILED ITINERARY DATA - 7 Nights / 8 Days
// ==========================================
export const japanItineraryData = [
  {
    day: 1,
    title: "Arrival in Narita (Tokyo)",
    content: `Upon arrival at Narita International Airport, the group will be met and greeted by a professional guide at the airport exit lobby. After assistance with arrival formalities, transfer to the hotel will be arranged. Check-in will be available from 3:00 PM. The remainder of the day will be free for rest and relaxation after the long journey. Vehicle service will be provided for airport transfer only.`
  },
  {
    day: 2,
    title: "Tokyo City Tour",
    content: `After breakfast at the hotel, depart in the morning for a guided city tour of Tokyo. The day begins with a visit to the historic Asakusa Senso-ji Temple, followed by access to the Tokyo Skytree Observation Deck for panoramic city views. The tour continues to Odaiba, including a stop at The Gundam Base Tokyo. Later, enjoy free time in the vibrant Shibuya and Shinjuku areas for sightseeing, shopping, or exploring local dining options at your own pace. Return to the hotel in the evening. Vehicle usage will be limited to 11 hours.`
  },
  {
    day: 3,
    title: "Tokyo Free Day",
    content: `After breakfast, the entire day will be at leisure. Guests may explore Tokyo independently, enjoy optional tours, shopping, cultural experiences, or relax at their own pace. No coach service will be provided on this day.`
  },
  {
    day: 4,
    title: "Hakone & Mount Fuji Area",
    content: `Following an early breakfast, depart for the Hakone and Mount Fuji region. Enjoy a scenic Hakone sightseeing cruise, followed by a one-way ride on the Hakone Ropeway offering spectacular views of the surrounding landscapes. Visit Owakudani Valley, where lunch will be on your own. Continue to the Fuji area with a visit to Iyashi no Sato, a traditional village showcasing rural Japanese culture, and Oshino Hakkai, known for its crystal-clear spring water and views of Mount Fuji. In the evening, enjoy dinner at the hotel and experience a traditional Japanese onsen. Vehicle usage will be limited to 11 hours.`
  },
  {
    day: 5,
    title: "Fuji Area to Osaka (By Shinkansen)",
    content: `After breakfast, transfer to Mishima Station to board the Shinkansen (bullet train) to Osaka. Enjoy a smooth and fast journey to Shin-Osaka Station. Upon arrival, transfer to the hotel for luggage drop-off. The remainder of the day will be free for leisure, with lunch and dinner at your own arrangement. Vehicle usage will be limited to 11 hours.`
  },
  {
    day: 6,
    title: "Osaka City Tour",
    content: `After breakfast, depart for a guided tour of Osaka. Visit the famous Osaka Aquarium Kaiyukan and explore the Tempozan area. Lunch will be at your own expense. Later, stop at Osaka Castle for a photo opportunity, followed by sightseeing and shopping at Shinsaibashi and Dotonbori, known for their lively streets, food culture, and shopping arcades. Return to the hotel in the evening. Dinner will be on your own.`
  },
  {
    day: 7,
    title: "Osaka Free Day",
    content: `After breakfast, enjoy a full day at leisure in Osaka. Guests may explore the city independently, join optional tours, visit nearby cities such as Kyoto or Nara, or enjoy shopping and local cuisine.`
  },
  {
    day: 8,
    title: "Departure from Kansai International Airport",
    content: `After breakfast, check out from the hotel and transfer to Kansai International Airport for departure, marking the end of the tour services.`
  }
];

// ==========================================
// INCLUSIONS AND EXCLUSIONS
// ==========================================
export const japanInclusionsData = [
  { icon: Home, title: "3-Star Accommodation", description: "3 nights Tokyo + 1 night Fuji area + 3 nights Osaka" },
  { icon: UtensilsCrossed, title: "Daily Breakfast", description: "Daily breakfast at the hotel (BB basis)" },
  { icon: Ticket, title: "All Entrance Fees", description: "All entrance fees to listed attractions" },
  { icon: Car, title: "Private Transportation", description: "Private transportation throughout including airport transfers" },
  { icon: Train, title: "Shinkansen Ticket", description: "Bullet train ticket from Mishima to Shin-Osaka" },
  { icon: Ship, title: "Hakone Cruise", description: "Scenic sightseeing cruise in Hakone" },
  { icon: Train, title: "Hakone Ropeway", description: "One-way ropeway ride with mountain views" },
  { icon: UserCheck, title: "Professional Guide", description: "English-speaking guides at each destination" },
  { icon: Sparkles, title: "Onsen Experience", description: "Traditional Japanese hot spring experience" },
  { icon: Ticket, title: "Japan Visa", description: "Japan tourist visa processing included" }
];

export const japanExclusionsData = [
  "International airfare (quoted separately, subject to availability)",
  "Lunch and dinner throughout the tour (except where specified)",
  "Tips for guides and drivers (approx. USD 5 per person per night)",
  "Personal medical expenses",
  "Shopping and personal expenses",
  "Optional tours and activities not mentioned in itinerary",
  "Travel insurance (highly recommended)",
  "Japan Rail Pass (if not included in package)",
  "Early check-in or late check-out charges",
  "Any services not mentioned in inclusions"
];

// ==========================================
// JAPAN-SPECIFIC FAQ DATA
// ==========================================
export const japanFAQs = [
  {
    question: "Do I need a visa to visit Japan?",
    answer: "Citizens of many countries including Nepal can apply for a Japan tourist visa. The visa processing takes approximately 5-7 working days. Required documents include valid passport, completed application form, recent photographs, flight itinerary, hotel reservations, and proof of financial means. Our package includes visa processing assistance."
  },
  {
    question: "What is the best time to visit Japan?",
    answer: "Japan offers distinct seasonal attractions. Spring (March-May) is famous for cherry blossoms, with peak bloom typically in late March to early April. Summer (June-August) is hot and humid but features festivals. Autumn (September-November) offers stunning fall foliage. Winter (December-February) brings snow festivals and ski opportunities. February is ideal for our tour as it offers a unique winter experience."
  },
  {
    question: "Is it safe to travel in Japan?",
    answer: "Japan is one of the safest countries in the world with extremely low crime rates. It is generally safe for travelers, including solo travelers. The country has excellent public transportation, clean streets, and friendly locals. Standard precautions for personal belongings are always advisable."
  },
  {
    question: "What should I pack for Japan in February?",
    answer: "February in Japan is winter, so pack warm clothing including a winter jacket, sweaters, thermal wear, and waterproof shoes. Bring gloves, scarves, and a hat. Indoor heating is common, so layered clothing is recommended. Don't forget a universal power adapter (Japan uses Type A/B outlets, 100V)."
  },
  {
    question: "How do I get around in Japan?",
    answer: "Japan has an excellent transportation network. The Shinkansen (bullet train) connects major cities quickly and comfortably. Local trains, subways, and buses are reliable. The JR Pass is available for tourists and offers unlimited travel on JR lines. Our package includes the Shinkansen ticket for the Fuji to Osaka leg."
  },
  {
    question: "What currency should I bring?",
    answer: "The official currency is the Japanese Yen (JPY). It's recommended to exchange some currency before your trip or withdraw from ATMs in Japan. Credit cards are accepted in hotels, department stores, and major restaurants, but cash is essential for smaller establishments, convenience stores, and temples. 1 USD approximately equals 150-155 JPY."
  },
  {
    question: "What is the dress code in Japan?",
    answer: "Japan is generally casual but neat. When visiting temples and shrines, modest clothing is appreciated. Some traditional restaurants may have dress codes. In winter, warm layered clothing is essential. Onsen (hot springs) require swimwear or are typically nude (separate by gender)."
  },
  {
    question: "Is tipping expected in Japan?",
    answer: "Tipping is not customary in Japan and may even be considered rude in some situations. Excellent service is expected as the norm. If you want to show appreciation, a simple 'arigato gozaimasu' (thank you very much) is more appropriate than tipping."
  },
  {
    question: "What language is spoken in Japan?",
    answer: "Japanese is the official language. English is limited outside major tourist areas, hotels, and restaurants. Learning basic Japanese phrases like 'Konnichiwa' (Hello), 'Arigato' (Thank you), and 'Eigo wo hanasemasu ka?' (Do you speak English?) will be helpful. Many signs in major tourist areas have English translations."
  },
  {
    question: "What is Japanese food like?",
    answer: "Japanese cuisine is known for its freshness, presentation, and balance of flavors. Popular dishes include sushi, ramen, tempura, udon, and yakitori. Each region has its specialties. Tokyo has more Michelin-starred restaurants than any other city. Be adventurous but note that some dishes may be an acquired taste."
  },
  {
    question: "How do I stay connected in Japan?",
    answer: "You can purchase a pocket WiFi device or SIM card at airports for affordable data and calls. Major providers include SoftBank, NTT Docomo, and KDDI. Free Wi-Fi is available in many hotels, cafes, and convenience stores. Download offline maps and translation apps before your trip."
  },
  {
    question: "What electrical outlets are used in Japan?",
    answer: "Japan uses Type A and Type B electrical outlets with 100V at 60Hz. The standard is similar to the US (Type A/B). Most hotels have universal outlets. Bring a universal adapter if your devices use different plug types. The voltage is lower than in some countries, so check if your devices are dual voltage."
  }
];

// ==========================================
// JAPAN-SPECIFIC POLICIES
// ==========================================
export const japanPolicies = {
  importantNotes: [
    "Rates are valid for the mentioned travel dates only (Feb 1st week 2026)",
    "Quotation does not guarantee availability; confirmation required at booking",
    "Surcharges may apply during Japanese National Holidays (Coming of Age Day in early January)",
    "Final pricing depends on travel date confirmation and hotel availability",
    "Shinkansen tickets are subject to availability at time of booking",
    "Peak season supplements may apply"
  ],
  checkInOut: {
    checkin: "15:00 hrs",
    checkout: "10:00 hrs",
    note: "Early check-in/late check-out subject to hotel availability and additional charges"
  },
  paymentConditions: [
    "50% advance payment upon confirmation",
    "50% balance to be paid 30 days prior to departure",
    "Full payment required for bookings made within 30 days of travel"
  ],
  cancellation: [
    "More than 45 days before departure: Full refund minus processing fees",
    "30-45 days before departure: 25% of tour cost retained",
    "15-30 days before departure: 50% of tour cost retained",
    "Within 15 days of departure: No refund (flights and hotels are non-refundable)",
    "No refund in case of no-show at any stage of the tour",
    "Booking modification fee of USD 75 applies for date changes"
  ]
};

// ==========================================
// KNOW BEFORE YOU GO DATA
// ==========================================
export const japanKnowBeforeYouGoData = {
  faqs: japanFAQs,
  policies: japanPolicies,
  visaRequirements: {
    title: "Requirements for Japan Tourist Visa",
    items: [
      "Valid passport with at least 6 months validity beyond your intended stay",
      "At least one blank visa page in the passport",
      "Recent passport-sized photographs (4.5cm x 4.5cm) with white background",
      "Completed visa application form",
      "Proof of onward/return flight ticket",
      "Proof of hotel reservation for entire stay",
      "Proof of sufficient funds (bank statement for last 3 months)",
      "Travel insurance certificate",
      "Letter from employer or business registration (for self-employed)"
    ]
  },
  packingTips: [
    "Warm winter clothing (layers recommended)",
    "Winter jacket, gloves, scarf, and hat",
    "Comfortable walking shoes (snow/ice may be present)",
    "Universal power adapter (Type A/B)",
    "Reusable shopping bag (plastic bags are being phased out)",
    "Pocket WiFi or SIM card for connectivity",
    "Traditional感冒薬 (cold medicine) - just in case",
    "Cash (JPY) for small establishments"
  ],
  healthAdvisories: [
    "No mandatory vaccinations required for Japan",
    "Tap water is safe to drink in most areas",
    "Carry basic first aid kit for common ailments",
    "Travel insurance is highly recommended covering medical emergencies",
    "Pharmacies (药店/薬局 - Yakkyoku) are widely available",
    "Emergency number: 110 for police, 119 for fire/ambulance"
  ]
};

// ==========================================
// EXPORT ALL DATA
// ==========================================
export const japanDestinationData = {
  id: "japan",
  name: "Japan",
  country: "Japan",
  category: "international",
  theme: japanTheme,
  heroStats: japanHeroStats,
  highlights: japanHighlightsData,
  stats: japanStats,
  itinerary: japanItineraryData,
  inclusions: japanInclusionsData,
  exclusions: japanExclusionsData,
  faqs: japanFAQs,
  policies: japanPolicies,
  knowBeforeYouGo: japanKnowBeforeYouGoData,
  galleryImages: []
};

// ==========================================
// ACCOMMODATION DATA
// ==========================================
export const japanAccommodationData = {
  tokyo: {
    name: "T-Mark City Hotel Tokyo Omori or Shinjuku Granbell Hotel or Similar",
    nights: 3,
    rating: "3 Star",
    location: "Tokyo"
  },
  fuji: {
    name: "Fujisan Garden Hotel or Fuji Zakura Hotel or Similar",
    nights: 1,
    rating: "3 Star",
    location: "Fuji Area"
  },
  osaka: {
    name: "Sarasa Hotel Sinsaibashi or Dotonbori Crystal Exe Hotel or Similar",
    nights: 3,
    rating: "3 Star",
    location: "Osaka"
  }
};

