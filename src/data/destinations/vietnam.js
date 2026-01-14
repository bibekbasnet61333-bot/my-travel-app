import { MapPin, Sun, Clock, Star, Plane, Home, Landmark, Waves, Mountain, Camera, UtensilsCrossed, Check } from 'lucide-react';

// Vietnam theme - using green/teal colors to match Ha Long Bay and natural landscapes
export const vietnamTheme = {
  destinationName: 'Vietnam',
  destinationId: 'vietnam',
  primaryColor: 'from-teal-600',
  secondaryColor: 'to-emerald-500',
  primaryGradientClass: 'from-teal-500 to-emerald-600',
  secondaryGradientClass: 'from-emerald-400 to-teal-500',
  overlayGradient: 'from-teal-900/70 via-emerald-900/60 to-green-900/70',
  scrollProgress: 'from-teal-600 via-emerald-500 to-green-600',
  heroImage: 'https://images.unsplash.com/photo-1528127269322-53996db866bd?q=80&w=2000&auto=format&fit=crop',
  heroSubtitle: "Experience the enchanting beauty of Vietnam - from Ha Long Bay's limestone karsts to the golden bridge of Ba Na Hills.",
  pageClass: 'from-teal-50/50 via-emerald-50/30 to-green-50/50',
  cardGradient: 'from-teal-500 to-emerald-500',
  accentColor: '#14b8a6',

  // Icon colors for itinerary
  iconColor: '#14b8a6',

  // Card border colors
  cardBorder: 'border-teal-100',

  // Tab colors
  tabActiveClass: 'bg-teal-500 text-white',
  tabInactiveClass: 'text-stone-600 hover:bg-teal-50',

  // Form colors
  formBgGradient: '#f0fdfa, #ecfdf5, #f0fdfa',
  borderColor: '#99f6e4',
  headingColor: '#0f766e',
  inputBorderColor: '#99f6e4',
  successBgGradient: '#f0fdfa, #ecfdf5, #f0fdfa',
};

// Vietnam hero stats
export const vietnamHeroStats = [
  { value: '9 Nights / 10 Days', label: 'Vietnam Tour Package', icon: Clock },
  { value: '5', label: 'Cities Visited', icon: MapPin },
  { value: '4-Star', label: 'Hotels', icon: Home },
  { value: 'Meals Included', label: 'As per program', icon: Sun },
];

// Vietnam highlights
export const vietnamHighlightsData = [
  {
    icon: Waves,
    title: 'Ha Long Bay Cruise',
    description: 'Overnight cruise through the stunning limestone karsts of Ha Long Bay, a UNESCO World Heritage Site.',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: Mountain,
    title: 'Ba Na Hills & Golden Bridge',
    description: 'Experience the famous Golden Bridge held by giant hands and enjoy panoramic views from the mountain peak.',
    color: 'from-emerald-500 to-green-500',
  },
  {
    icon: Landmark,
    title: 'Hanoi City Tour',
    description: 'Explore Tran Quoc Pagoda, Temple of Literature, St. Josephs Cathedral, and Hoan Kiem Lake.',
    color: 'from-teal-600 to-emerald-500',
  },
  {
    icon: Camera,
    title: 'Hoi An Ancient Town',
    description: 'Walk through the charming ancient town, visit Japanese Covered Bridge, and release floating lanterns.',
    color: 'from-cyan-500 to-teal-500',
  },
  {
    icon: Star,
    title: 'Phu Quoc Island',
    description: 'Relax on pristine beaches, explore VinWonder theme park, and visit the longest cable car in Southeast Asia.',
    color: 'from-blue-500 to-teal-500',
  },
  {
    icon: Sun,
    title: 'Ninh Binh Tam Coc',
    description: 'Explore the ancient capital of Hoa Lu and enjoy a scenic boat ride through limestone caves.',
    color: 'from-green-500 to-emerald-500',
  },
];

// Vietnam stats
export const vietnamStats = [
  { icon: MapPin, value: 'Hanoi, Ha Long, Da Nang, Hoi An, Phu Quoc', label: 'Destinations' },
  { icon: Clock, value: '10 Days', label: 'Duration' },
  { icon: Plane, value: 'All Flights Included', label: 'Transports' },
  { icon: Star, value: '4-Star Hotels', label: 'Accommodation' },
];

// Vietnam itinerary data - 9 Nights / 10 Days
export const vietnamItineraryData = [
  {
    day: 1,
    title: 'Ha Noi – Arrival – City Tour',
    content: `Upon arrival in Hanoi, you will be welcomed by the tour guide and start the city tour. Visit Tran Quoc Pagoda located on Golden Fish Island in West Lake. It is the oldest pagoda in Ha Noi built in the 6th century. Visit Temple of Literature constructed in 1070 to worship Confucius, which served as the first Royal National University in Vietnam.

Continue to St. Joseph's Cathedral, built by the French in 1887. Head towards the heart of Hanoi's Old Quarter, walking along the narrow alleys with railway tracks running through the area. Conclude by exploring Hoan Kiem Lake. Check-in at hotel and relax.

Note: Flight must arrive before 12 PM.

Overnight at hotel in Ha Noi.`
  },
  {
    day: 2,
    title: 'Ha Noi – Ninh Binh (Hoa Lu – Tam Coc) – Ha Noi',
    content: `Located in Ninh Binh province 100 km southeast of Hanoi, Hoa Lu and Tam Coc are two of the most picturesque spots in all the north. For 41 years, from 968 to 1009 CE, Hoa Lu was the ancient capital of Vietnam. Nearby Tam Coc is often referred to as "Ha Long among the rice paddies."

Tour Schedule: 08:00 - 08:30 am: Pick up from hotel, departure for Hoa Lu - Tam Coc. Visit Hoa Lu - the Ancient Royal capital of Vietnam. Visit Dinh King temple and Le King temple from the 10th century. Then go to Tam Coc (10 km from Hoa Lu). Board bamboo boat rowed by local people in Hoang Long River to visit three caves. Pass through limestone karst formations and witness local fisherfolk and village life along the river. Return to Ha Noi by car.

Overnight at hotel in Ha Noi.`
  },
  {
    day: 3,
    title: 'Ha Noi – Ha Long Bay – Overnight Cruise',
    content: `Breakfast at hotel then check-out. Around 8:00 am: Driver picks up from hotel and takes to Ha Long (approximately 2.5-hour drive). Arrive at Tuan Chau International Port and board cruise.

Welcome drink while being introduced to the itinerary and safety briefing. Enjoy lunch as the boat cruises towards the southeast of Ha Long Bay, passing Fighting Cock and Finger Islet. Visit Luon Cave by bamboo boat or kayaking. Continue to Titov Island for swimming or hiking to the top for panoramic views of the Bay.

Afternoon: Enjoy sunset on cruise. Join traditional Vietnamese cooking class on sundeck. Evening: Dinner under the stars with squid fishing activity.

Overnight on Cruise.`
  },
  {
    day: 4,
    title: 'Ha Long Bay - Ha Noi - Flight to Da Nang',
    content: `Warm up with Tai Chi lesson on the sundeck as the sun rises on Ha Long Bay. 07:00 am: Light breakfast at restaurant. Visit Sung Sot Cave, one of the biggest caves in Ha Long Bay with beautiful stalactites. About 9:30 am: Check-out and return to Tuan Chau Island. Brunch served at restaurant. Disembark at Tuan Chau Marina.

Driver takes you to Noi Bai airport in Ha Noi. Flight to Da Nang (must depart after 6 PM). Upon arrival in Da Nang, welcomed by driver and transferred to hotel.

Overnight at hotel in Da Nang.`
  },
  {
    day: 5,
    title: 'Da Nang - Ba Na Hills - Golden Bridge',
    content: `Around 8:30 am: Car and tour guide pick up at hotel lobby. Reach Ba Na Hills (Sun World) via Cable Car. Visit the Golden Bridge held by two giant hands, considered as god's hand supporting the Vietnamese bridge. Enjoy panoramic views of Da Nang city with beautiful coastlines.

Continue to French Village with classical French architecture, peak of Chua Mountain, Linh Chua Linh Tu Temple and Tru Vu Tea Shop. Watch Carnival Performance Show. Join Fantasy Park - one of the largest indoor games zones in Vietnam with Dinosaur Park, 5D/4D/3D cinemas, and over 90 free games.

Return by cable car and bus to hotel.

Overnight at hotel in Da Nang.`
  },
  {
    day: 6,
    title: 'Da Nang – Marble Mountain – Cam Thanh - Hoi An',
    content: `In the afternoon, tour guide picks up at hotel. Transfer to Marble Mountains - a cluster of five marble and limestone mountains located about 12km southeast of Da Nang. Explore beautiful pagodas, network of caves, stone stairs, and enjoy views from the top.

Visit Non-Nuoc Stone Carving Village at the foot of the Marble Mountains where local sculptors create marble products. Transfer to Cam Thanh coconut village for basket boat ride around the coconut forest. Learn about daily life of Vietnamese fishermen. Make natural ornaments from coconut leaves. Join basket boat race with traditional music.

Transfer to Hoi An Ancient Town. Visit Hoi An Market, Historical House, Phuc Kien Chinese Assembly Hall, Japanese covered bridge and Art Craft Manufacturing. Then ride a small boat to pray and release flower lantern on the river.

Overnight at hotel in Da Nang.`
  },
  {
    day: 7,
    title: 'Da Nang - Flight to Phu Quoc - Kiss of The Sea Show',
    content: `Free time for shopping or exploring before transfer to Da Nang airport for flight to Phu Quoc city. Room available until 12 PM. Upon arrival in Phu Quoc city, welcomed by driver and transferred to hotel (check-in time: 2 PM).

Evening: Enjoy Kiss of The Sea Show (if time permits).

Overnight at hotel in Phu Quoc.`
  },
  {
    day: 8,
    title: 'Phu Quoc - 4 Islands by Speed Boat and Cable Car',
    content: `Around 8:30 am: Car picks up at hotel and departs for An Thoi port. Join speedboat for sightseeing tour of four famous islands south of Phu Quoc.

Xuong Island (Buom Island): Snorkeling to see amazing coral reefs. Gam Ghi Island: Continue snorkeling in the wilderness with the biggest coral reef. May Rut Trong Island: Beach relaxation, swim in turquoise water, sunbed, and photo opportunities. Enjoy lunch on the island.

Optional: Seawalker (own expense) - walk underwater on seafloor with air-breathing helmet. Aquatopia Water Park on Thom Island with over 20 theme games. Cable Car to Thom Island - the longest three-wire cable car in the world (25 minutes) with breathtaking views.

Overnight at hotel in Phu Quoc.`
  },
  {
    day: 9,
    title: 'Phu Quoc – Vin Safari – Vin Wonder',
    content: `Breakfast at hotel then driver takes you to Vin Safari - Vietnam's first safari park with wildlife in natural habitats. Observe animals, feed and interact with some species, and watch wildlife shows.

Take free electric bus to Vin Wonder - the largest amusement park in Phu Quoc. Adventure Zone with thrilling rides. Fantasy Land for children. Water Park with wave pools and lazy rivers. The aquarium with underwater tunnel surrounded by marine life.

Overnight at hotel in Phu Quoc.`
  },
  {
    day: 10,
    title: 'Phu Quoc – Departure',
    content: `Free time for shopping or exploring before transfer to Phu Quoc airport for flight home. Room available until 12 PM.

Conclusion of tour program.`
  }
];

// Vietnam inclusions
export const vietnamInclusionsData = [
  { icon: Home, title: 'Hotel Accommodation', description: 'Hotel as mentioned or similar (base on availability)' },
  { icon: Check, title: 'Private Transfer', description: 'Private transfer by air-conditioned vehicle as per program' },
  { icon: UtensilsCrossed, title: 'Meals', description: 'Meal plan as mentioned on the program' },
  { icon: Check, title: 'English Guide', description: 'Local English-speaking guide' },
  { icon: Check, title: 'Entrance Fees', description: 'All sightseeing entrance fees' },
  { icon: Check, title: 'Water Bottles', description: '2 bottles per pax per day during tour' },
  { icon: Check, title: 'Tipping', description: 'Compulsory tipping for guide and driver' },
  { icon: Check, title: 'Visa', description: 'Visa processing included' },
  { icon: Plane, title: 'Flights', description: 'International and domestic flights' }
];

// Vietnam exclusions
export const vietnamExclusionsData = [
  'Personal travel insurance',
  'Other personal expenses such as drinks, laundry, phone, etc.',
  'Early check-in or late check-out',
  'Seawalker and optional activities',
  'Any services not mentioned in inclusions'
];

// Vietnam FAQs
export const vietnamFAQs = [
  {
    question: 'Do I need a visa for Vietnam?',
    answer: 'Yes, most nationalities require a visa to enter Vietnam. The visa fee is included in our package. We will assist with the visa processing.',
  },
  {
    question: 'What is the best time to visit Vietnam?',
    answer: 'The best time to visit Vietnam is from November to April for the south (including Phu Quoc) and March to May for the north. Our tour is designed to provide the best experience based on weather conditions.',
  },
  {
    question: 'What should I pack for this tour?',
    answer: 'Pack light, breathable clothing, comfortable walking shoes, swimwear, sunscreen, insect repellent, and a light jacket for evenings. Dont forget your camera for the stunning landscapes!',
  },
  {
    question: 'Are flights included in the package?',
    answer: 'Yes, all international and domestic flights are included in the package, including Hanoi to Da Nang and Da Nang to Phu Quoc.',
  },
  {
    question: 'What are the hotel check-in/out times?',
    answer: 'Standard Hotel Check-in time: 2:00pm – 3:00 pm (local time). Standard Hotel Check-out time: 11:00 am-12 pm (local time). A supplement will be added if early check-in or late check-out is desired.',
  },
  {
    question: 'Is tipping included?',
    answer: 'Yes, compulsory tipping for guide and driver is included in the package.',
  }
];

// Vietnam policies
export const vietnamPolicies = {
  importantNotes: [
    'Flight must arrive in Hanoi before 12 PM on Day 1',
    'Flight from Ha Noi to Da Nang must depart after 6 PM on Day 4',
    'Standard Hotel Check in time: 2:00pm – 3:00 pm (local time)',
    'Standard Hotel Check out time: 11:00 am-12 pm (local time)',
    'Tours will be in private basis',
    'The timing of sightseeing points shall be fixed by local operators due to traffic and weather conditions',
    'Non-refundable for any cancellation that is made by clients',
    'Tour and price are subject to change without notice or in case of deduct number of pax in quoted group',
    'Small deviations in the tour program are sometimes necessary, depending on weather, road conditions, flight schedules and room availability'
  ],
  termsConditions: [
    'All hotel rooms are based on the lowest category of room or Run of House',
    'Upgrade is subject to availability & supplement charges will be applicable',
    'Overtime transfers and tour guides services to be charged on spot',
    'Our tour guide will inform and do the best suitable timing for clients'
  ],
  paymentConditions: [
    '50% advance payment upon confirmation',
    '50% balance to be paid 15 days prior to departure',
    'Full payment required for bookings made within 15 days of travel'
  ],
  cancellation: [
    'More than 30 days before departure: Full refund minus processing fees',
    '15-30 days before departure: 50% of tour cost retained',
    'Within 15 days of departure: No refund (airline tickets and hotels are non-refundable)',
    'No refund in case of no-show at any stage of the tour',
    'Visa fee once applied is non-refundable regardless of cancellation date'
  ]
};

// ==========================================
// KNOW BEFORE YOU GO DATA
// ==========================================
export const vietnamKnowBeforeYouGoData = {
  faqs: vietnamFAQs,
  policies: vietnamPolicies,
  visaRequirements: {
    title: "Requirements for Vietnam Visa",
    items: [
      "Valid passport with minimum 6 months validity beyond travel date",
      "At least one blank visa page in the passport",
      "Recent passport-sized photographs",
      "Visa fee included in package",
      "We will assist with visa processing"
    ]
  },
  packingTips: [
    "Light, breathable clothing",
    "Comfortable walking shoes",
    "Swimwear for beach and water activities",
    "Sunscreen and hat",
    "Insect repellent",
    "Light jacket for evenings",
    "Camera for stunning landscapes"
  ],
  healthAdvisories: [
    "No mandatory vaccinations required for Vietnam",
    "Drink bottled or boiled water",
    "Travel insurance highly recommended",
    "Carry basic first aid kit"
  ]
};

// ==========================================
// EXPORT ALL DATA
// ==========================================
export const vietnamDestinationData = {
  id: "vietnam",
  name: "Vietnam",
  country: "Vietnam",
  category: "international",
  theme: vietnamTheme,
  heroStats: vietnamHeroStats,
  highlights: vietnamHighlightsData,
  stats: vietnamStats,
  itinerary: vietnamItineraryData,
  inclusions: vietnamInclusionsData,
  exclusions: vietnamExclusionsData,
  faqs: vietnamFAQs,
  policies: vietnamPolicies,
  knowBeforeYouGo: vietnamKnowBeforeYouGoData,
  galleryImages: []
};

