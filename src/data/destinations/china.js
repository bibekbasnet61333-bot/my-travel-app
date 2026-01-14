import {
  Building2,
  Mountain,
  Ship,
  Camera,
  MapPin,
  Utensils,
  Landmark,
  TowerControl,
  Factory,
  Tent,
  Check,
  Home,
  UtensilsCrossed,
  Ticket,
  Car,
  Train,
  Plane,
  UserCheck
} from 'lucide-react';

// China Destination Data
// All China-specific content: itinerary, highlights, stats, etc.

// ==========================================
// THEME CONFIGURATION - Copy this structure for new destinations
// ==========================================
export const chinaTheme = {
  // Theme colors (Tailwind classes for className usage)
  // Using lighter orange-red gradient for better text contrast and visibility
  primaryGradientClass: 'from-orange-500 to-red-500',
  secondaryGradientClass: 'from-red-500 to-orange-600',
  overlayGradient: 'from-red-900/85 via-amber-900/80 to-orange-900/75',
  backgroundGradient: 'from-orange-50/30 via-red-50/20 to-amber-50/30',
  titleGradient: 'linear-gradient(to right, #f97316, #ef4444, #ea580c)',
  accentColor: '#ea580c',

  // Icon colors for itinerary
  iconColor: '#ea580c',

  // Card border colors
  cardBorder: 'border-orange-100',

  // Tab colors
  tabActiveClass: 'bg-red-500 text-white',
  tabInactiveClass: 'text-stone-600 hover:bg-red-50',

  // Form colors - Orange-Red theme (lighter for better contrast)
  formBgGradient: '#fff7ed, #ffedd5, #fed7aa',
  borderColor: '#fed7aa',
  headingColor: '#c2410c',
  inputBorderColor: '#fed7aa',
  successBgGradient: '#fff7ed, #ffedd5, #fed7aa',

  // Hero section
  heroImage: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1920&h=1080&fit=crop',
  heroSubtitle: 'Experience the wonders of ancient dynasties and modern marvels - from the Great Wall\'s majestic peaks to Shanghai\'s dazzling skyline.',

// Page-level classes
  pageClass: 'from-orange-50/50 via-red-50/30 to-amber-50/50',
  scrollProgress: 'from-orange-600 via-red-500 to-amber-600',

  // Destination ID for forms
  destinationId: 'china',
  destinationName: 'China'
};

// ==========================================
// HERO SECTION DATA
// ==========================================
export const chinaHeroStats = [
  { icon: Landmark, value: "7 Nights / 8 Days", label: "China Tour" },
  { icon: Camera, value: "20M+", label: "Annual Visitors" },
  { icon: Landmark, value: "100+", label: "UNESCO Sites" },
  { icon: MapPin, value: "9.7/10", label: "Safety Rating" }
];

// ==========================================
// ABOUT SECTION DATA
// ==========================================
export const chinaStats = [
  { icon: Mountain, value: "9.6M km²", label: "Total Area" },
  { icon: Utensils, value: "8", label: "Cuisines" },
  { icon: Landmark, value: "50+", label: "Major Cities" },
  { icon: Building2, value: "1.4B+", label: "Population" }
];

// Highlights for about section
export const chinaHighlightsData = [
  {
    title: "Great Wall of China",
    description: "Walk along the world's most iconic wall, stretching over 13,000 miles through stunning mountain landscapes.",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=300&fit=crop",
    badge: "Iconic",
    color: "from-amber-500 to-yellow-500",
    icon: TowerControl
  },
  {
    title: "Forbidden City",
    description: "Explore the imperial palace in Beijing, home to 24 emperors and over 900 buildings.",
    image: "https://images.unsplash.com/photo-1584453949956-9f6d26e1435e?w=400&h=300&fit=crop",
    badge: "Historical",
    color: "from-red-500 to-orange-500",
    icon: Landmark
  },
  {
    title: "Terracotta Warriors",
    description: "Discover the ancient army of 8,000+ clay soldiers guarding Emperor Qin Shi Huang's tomb.",
    image: "https://images.unsplash.com/photo-1599623626674-1444f0657a66?w=400&h=300&fit=crop",
    badge: "Ancient",
    color: "from-purple-500 to-pink-500",
    icon: Tent
  },
  {
    title: "Li River & Guilin",
    description: "Cruise through breathtaking karst mountains and scenic landscapes in Southern China.",
    image: "https://images.unsplash.com/photo-1548586196-aa5803b77379?w=400&h=300&fit=crop",
    badge: "Natural",
    color: "from-green-500 to-emerald-500",
    icon: Ship
  },
  {
    title: "Shanghai Skyline",
    description: "Experience the modern metropolis with the world's busiest container port and stunning architecture.",
    image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=400&h=300&fit=crop",
    badge: "Modern",
    color: "from-blue-500 to-cyan-500",
    icon: Factory
  },
  {
    title: "Chinese Cuisine",
    description: "Savor diverse regional cuisines from Sichuan's spicy dishes to Cantonese dim sum.",
    image: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=400&h=300&fit=crop",
    badge: "Culinary",
    color: "from-orange-500 to-red-500",
    icon: Utensils
  }
];

// ==========================================
// DETAILED ITINERARY DATA - 7 Nights / 8 Days
// Kunming - Shanghai - Beijing
// ==========================================
export const chinaItineraryData = [
  {
    day: 1,
    title: "Arrival in Kunming",
    content: `Departure for Kunming at 16:35, arrival at Kunming Changshui International Airport at approximately 22:00. Meet local representative and transfer to 4-star hotel for check-in. Evening at leisure. Overnight stay in Kunming.`
  },
  {
    day: 2,
    title: "Kunming Sightseeing & Transfer to Shanghai",
    content: `After breakfast, visit Dianchi Lake, a scenic freshwater lake renowned for its tranquil environment and picturesque views. In the afternoon, explore Guandu Ancient Town, offering insight into traditional Chinese culture and heritage.

At 16:00, transfer to airport for 17:00 flight to Shanghai. Arrival at Shanghai Pudong International Airport at 20:10. Transfer to hotel for check-in. Overnight accommodation in Shanghai.`
  },
  {
    day: 3,
    title: "Shanghai City Tour",
    content: `Guided city tour begins with visit to Jade Buddha Temple, renowned for its sacred jade statues and architectural elegance. Walk through the French Concession, known for historic buildings and European-style streets.

In the afternoon, explore Shanghai Old Town, stroll along Nanjing Road—one of the world's busiest shopping streets—and visit the serene Yu Garden. Evening visit to The Bund (North) for impressive views of Shanghai's skyline. Return to hotel for overnight stay.`
  },
  {
    day: 4,
    title: "Leisure Day in Shanghai",
    content: `After breakfast, entire day free for personal activities. Enjoy leisure time, shopping, cultural exploration, or relaxation at own pace. Overnight stay in Shanghai.`
  },
  {
    day: 5,
    title: "Shanghai to Beijing (High-Speed Bullet Train)",
    content: `After breakfast, enjoy a relaxed morning. In the afternoon, transfer to railway station for scenic journey on China's high-speed bullet train to Beijing (approximately 4.5 – 5 hours).

Upon arrival in Beijing, welcome and transfer to hotel for check-in. Evening free for rest or optional local exploration. Overnight stay in Beijing.`
  },
  {
    day: 6,
    title: "Beijing City Tour",
    content: `Guided exploration begins with visit to the historic Forbidden City, the former imperial palace of Chinese emperors. Visit Tiananmen Square, a site of great historical and political significance.

In the afternoon, visit the magnificent Temple of Heaven, where emperors once prayed for prosperity and good harvests. Conclude with visit to Wangfujing Street, a popular shopping and dining area. Return to hotel for overnight stay.`
  },
  {
    day: 7,
    title: "Great Wall & Olympic Park Tour",
    content: `After breakfast, proceed to visit the Great Wall of China (Badaling or Mutianyu Section)—one of the world's most iconic landmarks.

In the afternoon, visit Olympic Park for photo stop at the Bird's Nest Stadium and the Water Cube, built for the 2008 Beijing Olympic Games. Return to hotel for rest and overnight stay in Beijing.`
  },
  {
    day: 8,
    title: "Departure from Beijing",
    content: `Transfer to Beijing International Airport for onward journey. Conclusion of the tour program.`
  }
];

// ==========================================
// INCLUSIONS AND EXCLUSIONS
// ==========================================
export const chinaInclusionsData = [
  { icon: Ticket, title: "All Entrance Fees", description: "All entrance fees to the listed attractions" },
  { icon: Car, title: "Private Transportation", description: "Private transportation throughout the trip, including airport and hotel transfers" },
  { icon: Train, title: "High-Speed Bullet Train", description: "High-speed bullet train ticket (second-class soft seat)" },
  { icon: Plane, title: "Flights", description: "Domestic and international airfare" },
  { icon: Home, title: "4-Star Accommodation", description: "4-star hotel accommodation on twin-sharing basis" },
  { icon: UtensilsCrossed, title: "Daily Breakfast", description: "Daily breakfast at the hotel" },
  { icon: UserCheck, title: "Professional Guide", description: "English-speaking professional guide" }
];

export const chinaExclusionsData = [
  "Lunch and dinner",
  "Tips for guides and drivers (approx. USD 3 per person per night)",
  "Personal medical expenses",
  "Shopping and personal expenses",
  "Any services not specifically mentioned in the inclusions"
];

// ==========================================
// CHINA-SPECIFIC FAQ DATA
// ==========================================
export const chinaFAQs = [
  {
    question: "Do I need a visa to visit China?",
    answer: "Yes, most nationalities require a tourist visa to visit China. Indian passport holders can apply for a visa on arrival at Kathmandu embassy. We can assist you with the visa application process. Please apply at least 30 days before your travel date."
  },
  {
    question: "What is the best time to visit China?",
    answer: "The best time to visit China is during spring (April-May) and autumn (September-October) when the weather is pleasant across most regions. Avoid the Chinese New Year period (January-February) and National Day (October 1st week) as these are peak travel seasons with higher prices and crowds."
  },
  {
    question: "Is it safe to travel in China?",
    answer: "China is generally a very safe destination for tourists. The crime rate against tourists is low, and the country has excellent public safety. However, as with any destination, standard precautions for personal belongings and travel safety should be followed."
  },
  {
    question: "What should I pack for China?",
    answer: "Pack comfortable walking shoes as you'll be exploring many historical sites. Bring modest clothing for visiting temples and religious sites. Pack for varied weather as temperatures can differ between cities. Don't forget your camera, power adapter (China uses Type A/B/I plugs), and any necessary medications."
  },
  {
    question: "How do I get around in China?",
    answer: "China has an excellent transportation network including high-speed trains (the fastest way to travel between cities), modern metro systems in major cities, taxis, and ride-hailing apps like Didi. Your tour package includes all necessary transfers and transportation."
  },
  {
    question: "What currency should I bring?",
    answer: "The official currency is the Chinese Yuan (CNY/RMB). It's recommended to exchange some currency before your trip or withdraw from ATMs in China. Major credit cards are accepted in hotels, upscale restaurants, and shopping malls, but cash is essential for smaller establishments and markets."
  },
  {
    question: "Is internet available in China?",
    answer: "Internet access is available in most hotels, restaurants, and cafes. However, popular Western websites and apps like Google, Facebook, WhatsApp, and YouTube are blocked in China. We recommend downloading a VPN before your trip if you need access to these services."
  },
  {
    question: "What language is spoken in China?",
    answer: "Mandarin Chinese is the official language. English is not widely spoken outside major tourist areas, hotels, and attractions. Having a translation app or phrasebook can be helpful. Your tour guide will be English-speaking and can assist with communication."
  },
  {
    question: "What is the food like in China?",
    answer: "Chinese cuisine is diverse and varies by region. In Shanghai, you'll find soups, dumplings, and savory-sweet dishes. Beijing is famous for Peking Duck. Food in tourist areas often caters to international tastes. Tap water is not safe to drink; stick to bottled water."
  },
  {
    question: "How do I stay connected with family back home?",
    answer: "You can purchase a local SIM card at airports for data and local calls. WeChat is the most popular app for communication in China. For international calls, consider getting an international roaming plan from your home provider or use Wi-Fi calling through apps like WeChat or WhatsApp (with VPN)."
  },
  {
    question: "What are the payment methods in China?",
    answer: "Mobile payments through Alipay and WeChat Pay are the dominant payment methods in China. Cash is still accepted but becoming less common. It's advisable to carry some cash for small purchases and markets. Credit cards are accepted in larger establishments."
  },
  {
    question: "Are there any cultural etiquette tips I should know?",
    answer: "When visiting temples, dress modestly and remove shoes when required. Avoid discussing sensitive political topics. Tipping is not customary in China. It's polite to accept and offer items with both hands. Public displays of affection are generally frowned upon."
  }
];

// ==========================================
// CHINA-SPECIFIC POLICIES
// ==========================================
export const chinaPolicies = {
  importantNotes: [
    "SASA Tours & Travels Pvt. Ltd. presents a carefully curated 7 nights and 8 days tour program",
    "Covers three of China's most iconic cities: Kunming, Shanghai, and Beijing",
    "Includes comfortable 4-star accommodation, private transportation, and guided sightseeing",
    "High-speed rail travel ensures a safe, comfortable, and memorable travel experience",
    "Final pricing depends on travel date confirmation and hotel availability",
    "High-speed train seats are subject to availability at time of booking"
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
    "Within 15 days of departure: No refund (airline tickets and hotels are non-refundable)",
    "No refund in case of no-show at any stage of the tour",
    "Visa fee once applied is non-refundable regardless of cancellation date"
  ],
  visaRequirements: {
    title: "Requirements for China Tourist Visa",
    items: [
      "Valid passport with a minimum validity of 7 months beyond the intended stay in China",
      "At least one blank visa page in the passport",
      "Recent passport-sized photographs with a white background",
      "Full face must be clearly visible",
      "No makeup, no spectacles (glasses) or contact lenses",
      "No cap or headwear",
      "Proof of financial capacity - Bank statements for the last 4 months",
      "A minimum closing balance of NPR 200,000 or equivalent"
    ]
  }
};

// ==========================================
// KNOW BEFORE YOU GO DATA
// ==========================================
export const chinaKnowBeforeYouGoData = {
  faqs: chinaFAQs,
  policies: chinaPolicies,
  visaRequirements: {
    title: "Requirements for China Tourist Visa",
    items: [
      "Valid passport with a minimum validity of 7 months beyond the intended stay in China",
      "At least one blank visa page in the passport",
      "Recent passport-sized photographs with a white background",
      "Full face must be clearly visible",
      "No makeup, no spectacles, no cap or headwear",
      "Proof of financial capacity - Bank statements for the last 4 months",
      "A minimum closing balance of NPR 200,000 or equivalent"
    ]
  },
  packingTips: [
    "Comfortable walking shoes for historical sites",
    "Modest clothing for temple visits",
    "Power adapter (China uses Type A/B/I plugs)",
    "Sunscreen and hat",
    "Personal medications",
    "Cash in Chinese Yuan for small purchases"
  ],
  healthAdvisories: [
    "No mandatory vaccinations required for China",
    "Drink only bottled or boiled water",
    "Avoid street food if you have sensitive stomach",
    "Carry basic first aid kit",
    "Travel insurance is highly recommended"
  ]
};

// ==========================================
// EXPORT ALL DATA
// ==========================================
export const chinaDestinationData = {
  id: "china",
  name: "China",
  country: "China",
  category: "international",
  theme: chinaTheme,
  heroStats: chinaHeroStats,
  highlights: chinaHighlightsData,
  stats: chinaStats,
  itinerary: chinaItineraryData,
  inclusions: chinaInclusionsData,
  exclusions: chinaExclusionsData,
  faqs: chinaFAQs,
  policies: chinaPolicies,
  knowBeforeYouGo: chinaKnowBeforeYouGoData,
  galleryImages: []
};

