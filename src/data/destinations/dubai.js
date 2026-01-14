// Dubai Destination Data
// All Dubai-specific content: itinerary, highlights, stats, etc.

import {
  Building2,
  Mountain,
  Ship,
  Camera,
  MapPin,
  Utensils,
  Landmark,
  Waves,
  Flower2,
  Check,
  Home,
  UtensilsCrossed,
  Ticket,
  Car,
  Bus,
  Plane,
  UserCheck,
  Star,
  Globe,
  Shield
} from 'lucide-react';

// ==========================================
// THEME CONFIGURATION - Dubai uses amber/stone/orange theme
// ==========================================
export const dubaiTheme = {
  // Theme colors (Tailwind classes for className usage)
  // Dubai: Amber, Yellow, Stone colors with Orange accents
  primaryGradientClass: 'from-amber-500 to-yellow-500',
  secondaryGradientClass: 'from-stone-600 to-stone-700',
  overlayGradient: 'from-slate-900/85 via-stone-900/80 to-amber-900/75',
  backgroundGradient: 'from-amber-50/30 via-stone-50/20 to-slate-50/30',
  titleGradient: 'linear-gradient(to right, #f59e0b, #fbbf24, #fcd34d)',
  accentColor: '#ea580c',

  // Icon colors for itinerary
  iconColor: '#ea580c',

  // Card border colors
  cardBorder: 'border-amber-100',

  // Tab colors
  tabActiveClass: 'bg-amber-600 text-white',
  tabInactiveClass: 'text-stone-600 hover:bg-amber-50',

  // Form colors - Amber/Yellow theme
  formBgGradient: '#fffbeb, #fef3c7, #fde68a',
  borderColor: '#fde68a',
  headingColor: '#b45309',
  inputBorderColor: '#fcd34d',
  successBgGradient: '#fffbeb, #fef3c7, #fde68a',

  // Hero section
  heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=1080&fit=crop',
  heroSubtitle: "Experience the magic of Dubai with our curated tours, luxury stays, and unforgettable adventures.",

  // Page-level classes
  pageClass: 'from-amber-50/50 via-stone-50/30 to-slate-50/50',
  scrollProgress: 'from-amber-600 via-orange-500 to-yellow-600',

  // Destination ID for forms
  destinationId: 'dubai',
  destinationName: 'Dubai'
};

// ==========================================
// HERO SECTION DATA
// ==========================================
export const dubaiHeroStats = [
  { icon: Building2, value: "828m", label: "Burj Khalifa Height" },
  { icon: Waves, value: "35%", label: "Desert Coverage" },
  { icon: Globe, value: "200+", label: "Nationalities" },
  { icon: Star, value: "5", label: "7-Star Hotels" }
];

// ==========================================
// ABOUT SECTION DATA
// ==========================================
export const dubaiStats = [
  { icon: Plane, value: "16M+", label: "Annual Visitors" },
  { icon: Star, value: "100+", label: "Luxury Hotels" },
  { icon: Shield, value: "9.8/10", label: "Safety Rating" },
  { icon: Camera, value: "50+", label: "Iconic Attractions" }
];

// Highlights for about section
export const dubaiHighlightsData = [
  {
    title: "Burj Khalifa Experience",
    description: "Ascend to the 124th floor of the world's tallest building for breathtaking panoramic views of Dubai that will leave you speechless.",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&h=300&fit=crop",
    badge: "Iconic",
    color: "from-amber-500 to-yellow-500",
    icon: Building2
  },
  {
    title: "Desert Safari Adventure",
    description: "Experience thrilling dune bashing, camel riding, henna art, and traditional BBQ dinner under the stars in the golden desert.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
    badge: "Adventure",
    color: "from-orange-500 to-red-500",
    icon: Mountain
  },
  {
    title: "Marina Dinner Cruise",
    description: "Romantic dinner cruise with international buffet, live entertainment, and stunning views of Dubai's illuminated skyline.",
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop",
    badge: "Romantic",
    color: "from-blue-500 to-teal-500",
    icon: Ship
  },
  {
    title: "Abu Dhabi City Tour",
    description: "Explore UAE's capital with architectural marvels, heritage sites, and the magnificent Corniche waterfront promenade.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    badge: "Cultural",
    color: "from-green-500 to-emerald-500",
    icon: Camera
  },
  {
    title: "Dubai City Highlights",
    description: "Discover Palm Jumeirah, Atlantis Resort, Jumeirah Mosque, and the vibrant Dubai Mall in one comprehensive tour.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop",
    badge: "Modern",
    color: "from-purple-500 to-pink-500",
    icon: MapPin
  },
  {
    title: "Global Village & Miracle Garden",
    description: "Explore the world's largest flower garden and cultural pavilions from 90+ countries with international cuisines.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    badge: "Unique",
    color: "from-rose-500 to-pink-500",
    icon: Flower2
  }
];

// ==========================================
// DETAILED ITINERARY DATA - 5 Nights / 6 Days
// ==========================================
export const dubaiItineraryData = [
  {
    day: 1,
    title: "Arrival in Dubai | Evening Marina Cruise Dinner",
    content: "Upon arrival at Dubai International Airport, you will be greeted by our representative and transferred to your hotel. After check-in and a brief rest, enjoy a relaxing Marina Dhow Cruise Dinner featuring international buffet, live entertainment, and breathtaking views of Dubai Marina's illuminated skyline. Overnight stay at the hotel."
  },
  {
    day: 2,
    title: "Half-Day Dubai City Tour | Burj Khalifa (124th Floor – Non-Prime Time)",
    content: "Begin your day with a guided half-day city tour, covering major attractions such as Jumeirah Mosque, Palm Jumeirah, Atlantis (Photo stop), Dubai Frame (Drive by), and the iconic Sheikh Zayed Road. In the afternoon, visit the world's tallest building—Burj Khalifa—and ascend to the 124th floor for spectacular panoramic views. Free time at Dubai Mall afterwards for shopping. Overnight stay at the hotel."
  },
  {
    day: 3,
    title: "Desert Safari with BBQ Dinner",
    content: "Morning free for leisure or optional activities. In the afternoon, proceed for an adventurous Desert Safari, which includes dune bashing, camel riding, henna art, sandboarding, traditional performances like Tanoura and Belly Dance, followed by a delicious BBQ buffet dinner at the desert camp. Overnight stay at the hotel."
  },
  {
    day: 4,
    title: "Full-Day Abu Dhabi City Tour",
    content: "Today, enjoy a full-day tour of the UAE's capital city—Abu Dhabi. Discover its architectural wonders including the stunning Corniche, Heritage Village, Marina Mall, and photo stops at Emirates Palace & Presidential Palace. Drive through Saadiyat Island & Yas Island, home of Ferrari World (outside view). After the tour, return to your hotel for overnight stay."
  },
  {
    day: 5,
    title: "Miracle Garden + Global Village",
    content: "After breakfast, visit the enchanting Dubai Miracle Garden, where millions of flowers are uniquely arranged into spectacular structures and designs. Later, explore Global Village, featuring cultural pavilions, international cuisines, live shows, shopping, and entertainment from over 90 countries. Return to your hotel and overnight stay."
  },
  {
    day: 6,
    title: "Departure",
    content: "After breakfast, check out from the hotel. You will be transferred to Dubai International Airport for your return flight with wonderful memories of your Dubai holiday."
  }
];

// ==========================================
// INCLUSIONS AND EXCLUSIONS
// ==========================================
export const dubaiInclusionsData = [
  { icon: Home, title: "Accommodation", description: "3★ Hotel accommodation for 5 nights with breakfast" },
  { icon: Car, title: "Airport Transfers", description: "Round-trip airport transfers in Dubai" },
  { icon: UserCheck, title: "Guided Tours", description: "Professional English-speaking tour guide throughout" },
  { icon: Camera, title: "Sightseeing", description: "All major attractions: Burj Khalifa, Desert Safari, Abu Dhabi Tour" },
  { icon: UtensilsCrossed, title: "Meals", description: "Daily breakfast + 2 special dinners (Marina Cruise & Desert BBQ)" },
  { icon: Ticket, title: "Entrance Tickets", description: "All entrance fees for mentioned attractions" },
  { icon: Bus, title: "Transportation", description: "AC vehicle for all transfers and sightseeing" },
  { icon: Plane, title: "24/7 Support", description: "Round-the-clock assistance from our team" }
];

export const dubaiExclusionsData = [
  "International airfare",
  "Dubai visa fees",
  "Personal expenses and shopping",
  "Optional activities and shows",
  "Travel insurance",
  "Tips and gratuities",
  "Additional meals not mentioned",
  "Camera fees at attractions"
];

// ==========================================
// DUBAI-SPECIFIC FAQ DATA
// ==========================================
export const dubaiFAQs = [
  {
    question: "What is included in the Dubai tour package?",
    answer: "Our comprehensive Dubai tour package includes 5 nights accommodation in a 4-star hotel with daily breakfast, one special dinner (Marina Dhow Cruise Dinner on Day 1), all airport transfers, half-day Dubai city tour, Burj Khalifa visit (124th floor), desert safari with BBQ dinner, full-day Abu Dhabi city tour, Miracle Garden and Global Village visits, all sightseeing tours, and professional English-speaking guide services."
  },
  {
    question: "Do I need a visa to visit Dubai?",
    answer: "Yes, most nationalities require a visa to visit the UAE. We can assist you with visa processing. Indian passport holders can get a visa on arrival at Dubai International Airport. Other nationalities may need to apply for a tourist visa in advance. Please check with our team for your specific nationality requirements."
  },
  {
    question: "What is the best time to visit Dubai?",
    answer: "The best time to visit Dubai is from November to April when the weather is pleasant (20-30°C/68-86°F). This period offers ideal conditions for sightseeing, outdoor activities, and beach visits. Dubai remains attractive year-round with many indoor attractions available during the summer months (May-October) when temperatures can reach 40-45°C."
  },
  {
    question: "Are meals included in the tour package?",
    answer: "Daily breakfast at the hotel and one special dinner (Marina Dhow Cruise Dinner on Day 1) are included. Lunch and other dinners are not included, allowing you to explore Dubai's diverse cuisine at your own pace. The desert safari includes a delicious BBQ dinner with traditional Arabic and international dishes."
  },
  {
    question: "What type of transportation is used during the tour?",
    answer: "We use comfortable, air-conditioned vehicles with Wi-Fi connectivity throughout the tour. For airport transfers and city tours, we use modern sedans, SUVs, or mini-coaches depending on group size. The desert safari uses specially equipped 4x4 vehicles for the dune bashing experience."
  },
  {
    question: "Can I customize the tour itinerary?",
    answer: "Yes, we offer flexible customization options. You can modify the tour pace, add extra attractions like Dubai Mall shopping, Ferrari World, or Palm Jumeirah visits, extend your stay, or adjust accommodation preferences. Our team will work with you to create a personalized experience that matches your interests and budget."
  },
  {
    question: "Is the tour suitable for families with children?",
    answer: "Absolutely! Our Dubai tour is family-friendly with carefully planned activities suitable for all ages. We can arrange child-friendly accommodations, modify itineraries for younger children, and ensure comfortable transportation. Many attractions like the Miracle Garden and Global Village are particularly enjoyable for families."
  },
  {
    question: "What should I pack for the Dubai tour?",
    answer: "Pack light, breathable clothing suitable for warm weather, comfortable walking shoes, swimwear for hotel pools, modest clothing for mosque visits, sunglasses, hat, sunscreen, and any personal medications. During winter months (November-February), bring a light jacket for cooler evenings. Formal attire is recommended for the Marina Cruise Dinner."
  },
  {
    question: "What is the official currency in Dubai?",
    answer: "The official currency of the UAE is the Dirham (AED/Dh). 1 USD approximately equals 3.67 AED. Credit and debit cards are widely accepted throughout Dubai. ATMs are readily available, and currency exchange services are conveniently located at airports, hotels, and shopping malls. We recommend carrying some cash for tips and small purchases."
  },
  {
    question: "What is the dress code in Dubai?",
    answer: "Dubai is a cosmopolitan city with a moderate dress code. While Western attire is widely accepted, we recommend modest clothing especially when visiting mosques, traditional neighborhoods, and government buildings. Swimwear is acceptable at beaches and pool areas but not in public spaces. Avoid revealing clothing in malls and public areas."
  },
  {
    question: "Can I consume alcohol in Dubai?",
    answer: "Alcohol is available in Dubai but with regulations. Non-Muslim tourists can purchase and consume alcohol in licensed venues such as hotel bars, restaurants, and clubs. You must be 21 years or older to consume alcohol. Public consumption is prohibited, and you cannot bring alcohol into the country. Drink responsibly and avoid public intoxication."
  },
  {
    question: "Is tipping expected in Dubai?",
    answer: "Tipping is appreciated but not mandatory in Dubai. Service charges are often included in restaurant bills (10-15%). It's customary to round up bills or leave 10-15% for good service at restaurants. For hotel staff, porters, and drivers, 10-20 AED per service is appreciated. Desert safari guides are also commonly tipped for exceptional service."
  },
  {
    question: "What languages are spoken in Dubai?",
    answer: "Arabic is the official language of the UAE, but English is widely spoken and used for business and tourism. You'll find that most signage is bilingual (Arabic and English), and almost everyone in the tourism and service industries speaks fluent English. Many residents also speak Hindi, Urdu, Tagalog, and other languages due to Dubai's diverse expatriate population."
  },
  {
    question: "How do I get a SIM card in Dubai?",
    answer: "Getting a SIM card in Dubai is easy and affordable. Upon arrival at Dubai International Airport, you can purchase SIM cards from major providers like etisalat and du at the arrivals area. You'll need your passport for registration. Tourist SIM cards typically offer data packages, local calls, and international calling credits."
  }
];

// ==========================================
// DUBAI-SPECIFIC POLICIES
// ==========================================
export const dubaiPolicies = {
  importantNotes: [
    "Rates are valid for the mentioned travel dates only",
    "Quotation does not guarantee availability; confirmation required at booking",
    "Hotels may apply surcharges during special events or exhibitions",
    "Final pricing depends on travel date confirmation and hotel availability",
    "SIC (Seat-In-Coach) basis for all tours and transfers unless specified"
  ],
  checkInOut: {
    checkin: "14:00 hrs",
    checkout: "12:00 hrs",
    note: "Early check-in/late check-out subject to hotel availability and additional charges"
  },
  paymentConditions: [
    "50% advance payment upon confirmation",
    "50% balance to be paid 7 days prior to departure",
    "Full payment required for bookings made within 7 days of travel"
  ],
  cancellation: [
    "More than 30 days before departure: Full refund minus processing fees",
    "15-30 days before departure: 50% of tour cost retained",
    "Within 15 days of departure: No refund for visa fee once applied and for tickets/hotels/tours as most are non-refundable",
    "No refund in case of no-show at any stage of the tour",
    "Airline tickets and hotels are non-refundable regardless of cancellation date"
  ]
};

// ==========================================
// KNOW BEFORE YOU GO DATA
// ==========================================
export const dubaiKnowBeforeYouGoData = {
  faqs: dubaiFAQs,
  policies: dubaiPolicies,
  visaRequirements: {
    title: "Requirements for Dubai Tourist Visa",
    items: [
      "Valid passport with a minimum validity of 6 months beyond the intended stay",
      "At least one blank visa page in the passport",
      "Recent passport-sized photographs with white background",
      "Proof of onward/return flight ticket",
      "Hotel reservation for entire stay in Dubai",
      "Proof of sufficient funds for the trip",
      "Completed visa application form"
    ]
  },
  packingTips: [
    "Light, breathable clothing suitable for warm weather",
    "Modest clothing for mosque visits",
    "Comfortable walking shoes",
    "Sunglasses, hat, and sunscreen",
    "Swimwear for hotel pools",
    "Power adapter (Dubai uses Type G plugs, similar to UK)",
    "Personal medications and basic first aid"
  ],
  healthAdvisories: [
    "No mandatory vaccinations required for Dubai",
    "Drink only bottled or filtered water",
    "Tap water is safe but bottled water is recommended",
    "Carry basic first aid kit",
    "Travel insurance is highly recommended",
    "Pharmacies are well-stocked but carry prescription medications"
  ]
};

// ==========================================
// EXPORT ALL DATA
// ==========================================
export const dubaiDestinationData = {
  id: "dubai",
  name: "Dubai",
  country: "UAE",
  category: "international",
  theme: dubaiTheme,
  heroStats: dubaiHeroStats,
  highlights: dubaiHighlightsData,
  stats: dubaiStats,
  itinerary: dubaiItineraryData,
  inclusions: dubaiInclusionsData,
  exclusions: dubaiExclusionsData,
  faqs: dubaiFAQs,
  policies: dubaiPolicies,
  knowBeforeYouGo: dubaiKnowBeforeYouGoData,
  galleryImages: []
};

