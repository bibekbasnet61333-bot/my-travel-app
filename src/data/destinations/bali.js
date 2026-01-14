// Bali Destination Data
// All Bali-specific content: itinerary, highlights, stats, etc.

import {
  Waves,
  Mountain,
  Landmark,
  Camera,
  Sun,
  Home,
  UtensilsCrossed,
  Check,
  Plane,
  Palmtree,
  Building,
  Zap,
  Gift,
  Timer,
  MapPin,
  Star,
  Clock,
  Briefcase,
  Car,
  User
} from 'lucide-react';

// ==========================================
// THEME CONFIGURATION - Tropical Paradise Theme
// ==========================================
export const baliTheme = {
  // Theme colors (Tailwind classes for className usage)
  primaryGradientClass: 'from-emerald-600 to-teal-600',
  secondaryGradientClass: 'from-teal-500 to-cyan-500',
  overlayGradient: 'from-emerald-900/80 via-teal-900/70 to-cyan-900/65',
  backgroundGradient: 'from-emerald-50/30 via-teal-50/20 to-cyan-50/30',
  titleGradient: 'linear-gradient(to right, #059669, #14b8a6, #06b6d4)',
  accentColor: '#14b8a6',

  // Icon colors for itinerary
  iconColor: '#14b8a6',

  // Card border colors
  cardBorder: 'border-teal-100',

  // Tab colors
  tabActiveClass: 'bg-emerald-500 text-white',
  tabInactiveClass: 'text-stone-600 hover:bg-teal-50',

  // Form colors
  formBgGradient: "#ecfdf5, #ccfbf1, #f0fdfa",
  borderColor: "#99f6e4",
  headingColor: "#0f766e",
  inputBorderColor: "#99f6e4",
  successBgGradient: "#f0fdfa, #ccfbf1, #ecfdf5",

  // Hero section
  heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&h=1080&fit=crop',
  heroSubtitle: "Experience the enchanting beauty of Bali - from sacred temples and volcanic landscapes to pristine beaches and vibrant cultural experiences.",

  // Page-level classes
  pageClass: 'from-emerald-50/50 via-teal-50/30 to-cyan-50/50',
  scrollProgress: 'from-emerald-600 to-stone-600',

  // Destination ID for forms
  destinationId: 'bali',
  destinationName: 'Bali'
};

// ==========================================
// HERO SECTION DATA
// ==========================================
export const baliHeroStats = [
  { icon: Clock, value: "5 Nights / 6 Days", label: "Bali Tour Package" },
  { icon: MapPin, value: "7", label: "Major Attractions" },
  { icon: Home, value: "3-Star", label: "Hotels" },
  { icon: UtensilsCrossed, value: "Breakfast", label: "Meals Included" }
];

// ==========================================
// ABOUT SECTION DATA
// ==========================================
export const baliStats = [
  { icon: Waves, value: "Bali", label: "Island Paradise" },
  { icon: Building, value: "10,000+", label: "Temples" },
  { icon: Palmtree, value: "Tropical", label: "Climate" },
  { icon: Star, value: "4.8/5", label: "Traveler Rating" }
];

// Highlights for about section
export const baliHighlightsData = [
  {
    title: "Handara Gate",
    description: "Visit the iconic Handara Gate, one of Bali's most photographed spots symbolizing the gateway to serenity and peace.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop",
    badge: "Iconic",
    color: "from-emerald-500 to-teal-500",
    icon: Camera
  },
  {
    title: "Uluwatu Temple",
    description: "Explore the stunning cliffside temple overlooking the Indian Ocean, dedicated to the sea gods.",
    image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400&h=300&fit=crop",
    badge: "Cultural",
    color: "from-cyan-500 to-blue-500",
    icon: Building
  },
  {
    title: "Tanah Lot Temple",
    description: "Witness the majestic sea temple built on a rock formation, one of Bali's most sacred and picturesque temples.",
    image: "https://images.unsplash.com/photo-1559291001-693ae917830e?w=400&h=300&fit=crop",
    badge: "Heritage",
    color: "from-amber-500 to-orange-500",
    icon: Landmark
  },
  {
    title: "Kintamani Volcano",
    description: "Experience the breathtaking views of Mount Batur, an active volcano with stunning crater lake.",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
    badge: "Adventure",
    color: "from-red-500 to-orange-500",
    icon: Mountain
  },
  {
    title: "Watersports at Tanjung Benoa",
    description: "Enjoy thrilling water activities including parasailing, banana boat, jet ski and more at Tanjung Benoa Beach.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
    badge: "Adventure",
    color: "from-blue-500 to-cyan-500",
    icon: Zap
  },
  {
    title: "Jimbaran Bay Dinner",
    description: "Dine on delicious BBQ seafood right on the beach at Jimbaran Bay with stunning ocean views.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    badge: "Dining",
    color: "from-purple-500 to-pink-500",
    icon: UtensilsCrossed
  }
];

// ==========================================
// DETAILED ITINERARY DATA - 5 Nights / 6 Days
// ==========================================
export const baliItineraryData = [
  {
    day: 1,
    title: "Arrival in Bali - Check In",
    content: `Upon arrival at Ngurah Rai International Airport, complete immigration and customs formalities before meeting your guide in the arrival hall. You will then be transferred to your hotel for check-in. Take the rest of the day to relax and unwind after your journey. Enjoy the beautiful Balinese atmosphere at your hotel and prepare for the exciting days ahead.

Overnight at hotel in Bali.`
  },
  {
    day: 2,
    title: "Handara Gate - Ubud Palace - Market",
    content: `After breakfast, begin your scenic day with a visit to the Handara Gate, one of Bali's most iconic and photographed spots. Set against a lush green backdrop and surrounded by rolling hills, this traditional Balinese gate symbolizes the gateway to serenity and peace. It's a perfect place for capturing memorable Instagram-worthy photos.

Continue your journey to Ubud, the cultural heart of Bali. Visit the historic Ubud Palace, home to the royal family, and stroll through the Ubud Market, where you can shop for local crafts, handmade souvenirs, and traditional textiles.

Overnight at hotel in Bali.`
  },
  {
    day: 3,
    title: "Tanah Lot Temple - Watersports - Uluwatu - Jimbaran Dinner",
    content: `Begin the day with breakfast before heading out for a full day of adventure and sightseeing. Your first stop is Tanah Lot Temple, a majestic sea temple built on a rock formation in the 17th century. Known for its dramatic setting and stunning sunsets, it's one of the most sacred and picturesque temples in Bali.

Next, head via toll road to Tanjung Benoa Beach, famous for thrilling water sports. Enjoy one round each of parasailing or donut boat, banana boat, and jet ski— perfect for adventure lovers. Additional activities like snorkeling, sea walking, and fly fish are available at your own cost.

In the afternoon, visit Uluwatu Temple, a striking cliffside temple overlooking the Indian Ocean, dedicated to the sea gods. Watch out for the playful monkeys that roam the area. Conclude the day with a mouthwatering BBQ seafood dinner at Jimbaran Bay, where you'll dine right on the beach as the waves lap the shore.

Overnight at hotel in Bali.`
  },
  {
    day: 4,
    title: "Kintamani Volcano Tour",
    content: `Enjoy breakfast at the hotel and get ready for a full day tour to Kintamani. Visit the famous Mount Batur, an active volcano. En route, you may explore local coffee plantations, art villages like Mas and Celuk known for woodcarving and silver, and scenic rice terraces.

Enjoy the breathtaking views of the volcano and its crater lake. This is a perfect opportunity to capture stunning photographs of one of Bali's most dramatic landscapes.

Overnight at hotel in Bali.`
  },
  {
    day: 5,
    title: "Free Day at Leisure",
    content: `After breakfast, enjoy a free day at leisure to relax or explore Bali on your own. You can opt for a rejuvenating spa treatment, shop at nearby boutiques, enjoy beachside cafes, or simply unwind by your hotel's pool. This day offers you the flexibility to slow down, soak in the beauty of Bali, or add optional tours and activities of your choice.

A perfect way to reflect on your trip and experience Bali at your own pace.

Overnight at hotel in Bali.`
  },
  {
    day: 6,
    title: "Departure from Bali",
    content: `Enjoy your final breakfast in Bali and complete hotel check-out procedures. Please ensure all personal bills (like mini-bar, phone calls, meals, or laundry) are cleared in advance. Make sure your luggage is securely packed and labeled.

Your guide or driver will pick you up and transfer you to Ngurah Rai International Airport. Bid farewell to the enchanting island of Bali as you board your flight home or to your next destination with wonderful memories of your tropical getaway.

Conclusion of tour program.`
  }
];

// ==========================================
// INCLUSIONS AND EXCLUSIONS
// ==========================================
export const baliInclusionsData = [
  { icon: Plane, title: "Round Trip Air Ticket", description: "International flight to and from Bali" },
  { icon: Briefcase, title: "Bali Visa", description: "Visa processing included" },
  { icon: Home, title: "5 Nights Accommodation", description: "3-Star hotel in Bali with breakfast basis" },
  { icon: Camera, title: "Ubud Tour", description: "Ubud Palace, Market, and cultural sites" },
  { icon: Camera, title: "Handara Gate", description: "Iconic gate photo opportunity" },
  { icon: Landmark, title: "Tanah Lot Tour", description: "Sea temple visit" },
  { icon: Landmark, title: "Uluwatu Temple", description: "Cliffside temple visit" },
  { icon: Mountain, title: "Kintamani Tour", description: "Volcano and crater lake views" },
  { icon: Zap, title: "Watersports", description: "Parasailing, Banana Boat, Jet Ski" },
  { icon: UtensilsCrossed, title: "Jimbaran Dinner", description: "BBQ seafood dinner on the beach" },
  { icon: Plane, title: "Airport Transfers", description: "Meet and assist on arrival and departure" },
  { icon: Car, title: "AC Vehicle", description: "All tours and transfers in air-conditioned vehicle" },
  { icon: User, title: "English Guide", description: "Professional English-speaking guide" },
  { icon: Gift, title: "Water Bottle", description: "01 bottle of water during tour" },
  { icon: Check, title: "Entrance Fees", description: "All parking and entrance fees included" },
  { icon: Timer, title: "24/7 Assistance", description: "24 Hours assistance throughout the tour" },
  { icon: Check, title: "All Taxes", description: "All applicable taxes included" }
];

export const baliExclusionsData = [
  "Personal expenses such as drinks, laundry, phone calls",
  "Optional activities not mentioned in itinerary",
  "Travel insurance (highly recommended)",
  "Early check-in or late check-out charges",
  "Personal bills (mini-bar, spa, etc.)",
  "Any services not mentioned in inclusions"
];

// ==========================================
// BALI-SPECIFIC FAQ DATA
// ==========================================
export const baliFAQs = [
  {
    question: "Do I need a visa for Bali?",
    answer: "Yes, Indian citizens require a visa to visit Bali. The visa fee is included in our package. We will assist with the complete visa processing process.",
  },
  {
    question: "What are the visa requirements for Bali?",
    answer: "The required documents are: 1) One photo (35x45 mm) with white background, no glasses or contact lenses, no Tika 2) Original passport with minimum 6 months validity from travel date 3) Bank statement of last 3 months with minimum closing balance of 3 lakhs.",
  },
  {
    question: "What is the best time to visit Bali?",
    answer: "Bali is a year-round destination. The dry season (April to October) is considered the best time to visit with less rainfall and humidity. The monsoon season (November to March) offers fewer crowds and lower prices.",
  },
  {
    question: "What should I pack for Bali?",
    answer: "Pack light, breathable cotton clothing, swimwear, comfortable walking shoes, sunscreen, insect repellent, and modest clothing for temple visits. Don't forget your camera for capturing stunning views!",
  },
  {
    question: "Is it safe to travel to Bali?",
    answer: "Bali is generally very safe for tourists. The local people are friendly and welcoming. Standard precautions for personal belongings should be taken, especially in crowded areas.",
  },
  {
    question: "What type of accommodation is provided?",
    answer: "The package includes 5 nights accommodation at a 3-star hotel in Bali on breakfast basis. The hotel is selected for comfort, cleanliness, and convenient location.",
  },
  {
    question: "Are international flights included?",
    answer: "Yes, round trip international flights to and from Bali are included in the package. The airfare is based on current rates and subject to availability.",
  },
  {
    question: "What water sports activities are included?",
    answer: "The package includes one round each of parasailing (or donut boat), banana boat, and jet ski at Tanjung Benoa Beach. Additional activities like snorkeling, sea walking, and fly fish are available at your own cost.",
  },
  {
    question: "Is there a guide throughout the tour?",
    answer: "Yes, a professional English-speaking guide will accompany you throughout the tour for all the scheduled activities and sightseeing.",
  },
  {
    question: "What happens on the free day?",
    answer: "Day 5 is a free day for you to relax at the hotel, explore independently, enjoy spa treatments, shop, or simply unwind. You can also opt for additional optional tours at your own cost.",
  },
  {
    question: "What is included in the Bali tour package?",
    answer: "Our comprehensive Bali tour package includes 5 nights accommodation in a 3-star hotel with daily breakfast, all airport transfers, guided tours to major attractions including Handara Gate, Ubud Palace, Tanah Lot Temple, Uluwatu Temple, Kintamani Volcano, water sports at Tanjung Benoa, Jimbaran Bay dinner, professional English-speaking guide, entrance fees, and 24/7 assistance."
  },
  {
    question: "Are meals included in the tour package?",
    answer: "Daily breakfast at the hotel and one special dinner (Jimbaran Bay BBQ seafood dinner on Day 3) are included. Lunch and other dinners are not included, allowing you to explore Bali's diverse cuisine at your own pace. You can enjoy local Balinese dishes, seafood, and international cuisine at various restaurants."
  },
  {
    question: "What type of transportation is used during the tour?",
    answer: "We use comfortable, air-conditioned vehicles throughout the tour. For airport transfers and city tours, we use modern sedans, SUVs, or mini-coaches depending on group size. All vehicles are well-maintained and equipped with experienced drivers."
  },
  {
    question: "Can I customize the tour itinerary?",
    answer: "Yes, we offer flexible customization options. You can modify the tour pace, add extra attractions like additional temples or beach activities, extend your stay, or adjust accommodation preferences. Our team will work with you to create a personalized experience that matches your interests and budget."
  }
];

// ==========================================
// BALI-SPECIFIC POLICIES
// ==========================================
export const baliPolicies = {
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
export const baliKnowBeforeYouGoData = {
  faqs: baliFAQs,
  policies: baliPolicies,
  visaRequirements: {
    title: "Requirements for Bali Tourist Visa",
    items: [
      "1 Photo: 35x45 mm white background, no lens, specs, Tika",
      "Original Passport with minimum 6 months travel validity beyond travel date",
      "Bank statement of last 3 months with closing balance minimum 3 lakhs",
      "Passport copy and photographs as per embassy requirements",
      "Visa fee included in package - we assist with complete processing"
    ]
  },
  packingTips: [
    "Light, breathable cotton clothing",
    "Modest clothing for temple visits (cover shoulders and knees)",
    "Swimwear for beach and pool activities",
    "Sunscreen, hat, and sunglasses",
    "Insect repellent",
    "Comfortable walking shoes",
    "Camera for stunning landscapes",
    "Power adapter (Indonesia uses Type C and F plugs, 220V)"
  ],
  healthAdvisories: [
    "No mandatory vaccinations required for Bali",
    "Drink bottled or filtered water",
    "Travel insurance highly recommended",
    "Carry basic first aid kit and any personal medications",
    "Be cautious with street food if you have sensitive stomach"
  ]
};

// ==========================================
// EXPORT ALL DATA
// ==========================================
export const baliDestinationData = {
  id: "bali",
  name: "Bali",
  country: "Indonesia",
  category: "international",
  theme: baliTheme,
  heroStats: baliHeroStats,
  highlights: baliHighlightsData,
  stats: baliStats,
  itinerary: baliItineraryData,
  inclusions: baliInclusionsData,
  exclusions: baliExclusionsData,
  faqs: baliFAQs,
  policies: baliPolicies,
  knowBeforeYouGo: baliKnowBeforeYouGoData,
  galleryImages: []
};

