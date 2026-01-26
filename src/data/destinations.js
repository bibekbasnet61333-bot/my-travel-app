// ============================================================================
// SASA Travel - Destinations Data
// Centralized data for all destination-related components
// ============================================================================

// Theme Colors (for reference across components)
// Primary: #0f4c5c (Deep Teal)
// Secondary: #0284c7 (Sky Blue)
// Accent: #0ea5e9 (Bright Sky Blue)

// ---------------------------------------------------------------------------
// Nepal Destinations (Local) - Curated data for home page section
// ---------------------------------------------------------------------------
export const nepalDestinations = [
  {
    id: 'everest-base-camp-trek',
    name: 'Everest Base Camp',
    country: 'Nepal',
    category: 'local',
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=2000&auto=format&fit=crop',
    description: 'Himalayan Adventure',
    duration: '14 Days / 13 Nights',
    price: 'From $1,299',
    atAGlance: { idealStay: '14 Days / 13 Nights' }
  },
  {
    id: 'annapurna-base-camp-trek',
    name: 'Annapurna Base Camp',
    country: 'Nepal',
    category: 'local',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop',
    description: 'Mountain Trekking',
    duration: '12 Days / 11 Nights',
    price: 'From $899',
    atAGlance: { idealStay: '12 Days / 11 Nights' }
  },
  {
    id: 'ghorepani-poon-hill-trek',
    name: 'Ghorepani Poon Hill',
    country: 'Nepal',
    category: 'local',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop',
    description: 'Scenic Trek',
    duration: '5 Days / 4 Nights',
    price: 'From $449',
    atAGlance: { idealStay: '5 Days / 4 Nights' }
  },
  {
    id: 'kathmandu-pokhara-chitwan',
    name: 'Kathmandu Pokhara Chitwan',
    country: 'Nepal',
    category: 'local',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop',
    description: 'Classic Nepal Tour',
    duration: '7 Days / 6 Nights',
    price: 'From $599',
    atAGlance: { idealStay: '7 Days / 6 Nights' }
  }
];

// ---------------------------------------------------------------------------
// Combo Countries - Multi-country journey packages
// ---------------------------------------------------------------------------
export const comboCountriesData = {
  europe: [
    {
      id: 'france-switzerland',
      name: 'France & Switzerland',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
      description: 'Experience the best of Paris and the Swiss Alps.',
      duration: '10 Days / 9 Nights',
      price: 'From $2,499',
      category: 'combo'
    },
    {
      id: 'italy-austria',
      name: 'Italy & Austria',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
      description: 'From Rome to Vienna, a journey through history.',
      duration: '12 Days / 11 Nights',
      price: 'From $2,799',
      category: 'combo'
    },
    {
      id: 'spain-portugal',
      name: 'Spain & Portugal',
      image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
      description: 'Sun, culture, and cuisine across Iberia.',
      duration: '9 Days / 8 Nights',
      price: 'From $2,199',
      category: 'combo'
    }
  ],
  asia: [
    {
      id: 'thailand-vietnam',
      name: 'Thailand & Vietnam',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
      description: 'Tropical adventures and vibrant cities.',
      duration: '11 Days / 10 Nights',
      price: 'From $1,899',
      category: 'combo'
    },
    {
      id: 'japan-south-korea',
      name: 'Japan & South Korea',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
      description: 'Tradition meets technology in East Asia.',
      duration: '13 Days / 12 Nights',
      price: 'From $3,299',
      category: 'combo'
    },
    {
      id: 'singapore-malaysia',
      name: 'Singapore & Malaysia',
      image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
      description: 'Modern cities and lush rainforests.',
      duration: '8 Days / 7 Nights',
      price: 'From $1,699',
      category: 'combo'
    }
  ]
};

// ---------------------------------------------------------------------------
// Hero Configuration - For DestinationsHero component
// ---------------------------------------------------------------------------
export const destinationsHeroConfig = {
  local: {
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=2000&auto=format&fit=crop',
    ],
    title: 'Nepal Destinations',
    subtitle: 'Discover your next adventure in Nepal',
  },
  international: {
    images: [
      '/src/assets/york.jpg',
      '/src/assets/tokyo.jpg',
      '/src/assets/paris_destination.jpg',
    ],
    title: 'International Destinations',
    subtitle: 'Explore the world with us',
  },
  combo: {
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=2000&q=80',
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=2000&q=80',
    ],
    title: 'Combo Countries',
    subtitle: 'Curated multi-country journeys',
  }
};

// ---------------------------------------------------------------------------
// All Destinations (Database)
// ---------------------------------------------------------------------------
export const destinations = [
  // International
  {
    id: "thailand",
    name: "Thailand",
    country: "Thailand",
    category: "international",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1400&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2000&auto=format&fit=crop",
    description: "Exotic temples, pristine beaches, and vibrant street life.",
    longDescription: "Thailand, the Land of Smiles, offers an enchanting blend of ancient temples, pristine beaches, bustling cities, and warm hospitality. From the golden temples of Bangkok to the crystal-clear waters of Phuket and the cultural richness of Chiang Mai, Thailand provides diverse experiences for every traveler. Discover floating markets, indulge in world-famous street food, relax on tropical beaches, or explore ancient ruins - Thailand has something magical for everyone.",
    highlights: [
      "Golden temples and ancient palaces in Bangkok",
      "Pristine beaches and islands of Phuket and Phi Phi",
      "Cultural heritage of Chiang Mai and northern hill tribes",
      "World-famous street food and culinary experiences",
      "Scuba diving and marine life in the Andaman Sea",
      "Elephant sanctuaries and wildlife conservation"
    ],
    experiences: [
      "Temple hopping in Bangkok's historic sites",
      "Island hopping in Phuket and Phi Phi Islands",
      "Street food tours in Bangkok and Chiang Mai",
      "Elephant experiences at ethical sanctuaries",
      "Scuba diving in coral reefs",
      "Traditional Thai cooking classes"
    ],
    atAGlance: {
      location: "Southeast Asia",
      idealStay: "7-14 days",
      bestTime: "November to February",
      experienceType: "Beach & Culture",
      gateway: "Suvarnabhumi Airport (BKK)"
    },
    whyVisit: [
      "Experience the perfect blend of beach and cultural attractions",
      "Enjoy world-class cuisine and street food culture",
      "Discover ancient temples and rich Buddhist heritage",
      "Relax on pristine beaches and tropical islands",
      "Experience warm Thai hospitality and friendly locals"
    ],
    thingsToDo: [
      {
        category: "Beach & Islands",
        description: "Relax on pristine beaches and explore tropical islands",
        icon: "🏖️"
      },
      {
        category: "Culture & Temples",
        description: "Visit ancient temples and experience Thai culture",
        icon: "🏛️"
      },
      {
        category: "Food & Cuisine",
        description: "Explore street food and traditional Thai cooking",
        icon: "🍜"
      },
      {
        category: "Adventure & Nature",
        description: "Diving, hiking, and wildlife experiences",
        icon: "🏔️"
      }
    ],
    experienceCategories: [
      {
        id: "beach-paradise",
        title: "Beach Paradise",
        description: "Pristine beaches and island hopping adventures",
        icon: "🏖️",
        microcopy: "Perfect for relaxation and water activities"
      },
      {
        id: "cultural-heritage",
        title: "Cultural Heritage",
        description: "Ancient temples and traditional experiences",
        icon: "🏛️",
        microcopy: "Ideal for history and culture enthusiasts"
      },
      {
        id: "culinary-journey",
        title: "Culinary Journey",
        description: "Street food tours and cooking classes",
        icon: "🍜",
        microcopy: "Great for food lovers and culinary explorers"
      },
      {
        id: "adventure-activities",
        title: "Adventure Activities",
        description: "Diving, hiking, and outdoor adventures",
        icon: "🏔️",
        microcopy: "Exciting for active travelers"
      }
    ],
    quickFacts: [
      { label: "Population", value: "70+ million" },
      { label: "Capital", value: "Bangkok" },
      { label: "Currency", value: "Thai Baht (THB)" },
      { label: "Language", value: "Thai, English" }
    ],
    travelerTips: [
      "Dress modestly when visiting temples",
      "Try street food from reputable vendors",
      "Respect the monarchy and royal family",
      "Stay hydrated in tropical climate",
      "Use reputable transport services"
    ],
    bestTimeDetails: {
      title: "Best Time to Visit Thailand",
      description: "Thailand offers year-round appeal with distinct seasons for different experiences.",
      seasons: [
        {
          season: "Cool Season (Nov-Feb)",
          description: "Pleasant weather (25-32°C), fewer crowds, clear skies",
          highlight: "Best for sightseeing and outdoor activities"
        },
        {
          season: "Hot Season (Mar-May)",
          description: "Warm weather (30-35°C), fewer tourists, beach activities",
          highlight: "Perfect for beach relaxation and water sports"
        }
      ]
    },
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bangkok",
        content: "Arrive in Bangkok and explore the vibrant capital. Visit the Grand Palace and Wat Phra Kaew, experience street food, and enjoy the bustling city life."
      },
      {
        day: 2,
        title: "Bangkok Temples & Culture",
        content: "Continue exploring Bangkok's temples including Wat Arun and Wat Pho. Visit floating markets and experience traditional Thai culture."
      },
      {
        day: 3,
        title: "Travel to Phuket",
        content: "Fly to Phuket and relax on beautiful beaches. Enjoy beach activities, visit Big Buddha, and experience island nightlife."
      },
      {
        day: 4,
        title: "Phang Nga Bay & Islands",
        content: "Take a boat tour to Phang Nga Bay, visit James Bond Island, and explore limestone karsts and hidden lagoons."
      },
      {
        day: 5,
        title: "Phi Phi Islands",
        content: "Travel to Phi Phi Islands for snorkeling, beach hopping, and marine life exploration in crystal-clear waters."
      },
      {
        day: 6,
        title: "Chiang Mai Experience",
        content: "Fly to Chiang Mai in northern Thailand. Visit ancient temples, explore night markets, and experience hill tribe culture."
      },
      {
        day: 7,
        title: "Departure",
        content: "Final morning in Chiang Mai before departing with unforgettable memories of Thailand's diverse beauty."
      }
    ]
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    category: "international",
    image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=1400&auto=format&fit=crop",
    description: "Modern city-state with stunning architecture, diverse cuisine, and lush gardens.",
  },
  {
    id: "malaysia",
    name: "Malaysia",
    country: "Malaysia",
    category: "international",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1400&auto=format&fit=crop",
    description: "Tropical paradise with diverse cultures, stunning beaches, and modern cities.",
  },
  {
    id: "vietnam",
    name: "Vietnam",
    country: "Vietnam",
    category: "international",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1400&auto=format&fit=crop",
    description: "Rich history, beautiful landscapes, and delicious cuisine from north to south.",
  },
  {
    id: "cambodia",
    name: "Cambodia",
    country: "Cambodia",
    category: "international",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1400&auto=format&fit=crop",
    description: "Ancient temples, vibrant culture, and pristine beaches.",
  },
  {
    id: "china",
    name: "China",
    country: "China",
    category: "international",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1400&auto=format&fit=crop",
    description: "Ancient civilization with modern cities, diverse landscapes, and rich traditions.",
  },
{
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    category: "international",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=1400&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=2000&auto=format&fit=crop",
    description: "Tropical paradise with beaches, temples, and rice terraces.",
    longDescription: "Bali, the 'Island of the Gods', is a tropical paradise that captivates travelers with its stunning natural beauty, rich cultural heritage, and spiritual traditions. From the iconic Handara Gate and sacred temples perched on cliff edges to the lush green rice terraces of Tegallalang and pristine beaches, Bali offers a perfect blend of adventure, relaxation, and cultural exploration. Whether you're seeking wellness retreats in Ubud, beach parties in Seminyak, or serene moments in ancient temples, Bali promises an unforgettable journey for every soul.",
    highlights: [
      "Handara Gate - Iconic Gates of Heaven photo opportunity",
      "Sacred Monkey Forest in Ubud",
      "Tegallalang Rice Terraces - UNESCO World Heritage site",
      "Tanah Lot Temple - Stunning sea temple at sunset",
      "Uluwatu Temple - Cliffside temple with kecak dance",
      "Kintamani Volcano - Breathtaking views of Mount Batur",
      "Tirta Empul Water Temple - Holy water spring temple",
      "Jimbaran Bay - Famous for seafood dinners at sunset"
    ],
    experiences: [
      "Rice terrace trekking in Ubud",
      "Traditional Balinese massage and spa treatments",
      "Yoga and meditation retreats",
      "Surfing lessons at Kuta Beach",
      "Balinese cooking classes",
      "Temple tours and blessings",
      "Waterfall chasing in the jungle",
      "Coffee plantation tours"
    ],
    atAGlance: {
      location: "Indonesia, Southeast Asia",
      idealStay: "7-10 days",
      bestTime: "April to October (dry season)",
      experienceType: "Beach & Culture",
      gateway: "Ngurah Rai International Airport (DPS)"
    },
    whyVisit: [
      "Experience the perfect blend of beach and cultural attractions",
      "Discover ancient temples and spiritual traditions",
      "Relax in world-class resorts and villas",
      "Explore stunning rice terraces and waterfalls",
      "Enjoy world-renowned spa and wellness treatments",
      "Experience vibrant nightlife and beach clubs"
    ],
    thingsToDo: [
      {
        category: "Culture & Temples",
        description: "Visit ancient temples and experience Balinese traditions",
        icon: "🕌"
      },
      {
        category: "Nature & Adventure",
        description: "Rice terraces, volcanoes, and waterfall adventures",
        icon: "🏔️"
      },
      {
        category: "Beach & Relaxation",
        description: "Relax on pristine beaches and enjoy spa treatments",
        icon: "🏖️"
      },
      {
        category: "Wellness & Yoga",
        description: "Yoga retreats and traditional healing practices",
        icon: "🧘"
      }
    ],
    experienceCategories: [
      {
        id: "cultural-discovery",
        title: "Cultural Discovery",
        description: "Temples, traditions, and spiritual experiences",
        icon: "🕌",
        microcopy: "Perfect for culture and spirituality enthusiasts"
      },
      {
        id: "nature-adventures",
        title: "Nature Adventures",
        description: "Rice terraces, volcanoes, and waterfalls",
        icon: "🏔️",
        microcopy: "Ideal for hikers and nature lovers"
      },
      {
        id: "beach-paradise",
        title: "Beach Paradise",
        description: "Relaxation and water activities",
        icon: "🏖️",
        microcopy: "Great for beach lovers and sun seekers"
      },
      {
        id: "wellness-retreats",
        title: "Wellness Retreats",
        description: "Yoga, spa, and spiritual healing",
        icon: "🧘",
        microcopy: "Perfect for relaxation and rejuvenation"
      }
    ],
    quickFacts: [
      { label: "Population", value: "4.3+ million" },
      { label: "Area", value: "5,780 km²" },
      { label: "Currency", value: "Indonesian Rupiah (IDR)" },
      { label: "Language", value: "Indonesian, Balinese, English" }
    ],
    travelerTips: [
      "Dress modestly when visiting temples (sarong provided)",
      "Respect local customs and religious practices",
      "Try local specialties like babi guling and lawar",
      "Bargain at markets but be respectful",
      "Stay hydrated and use reef-safe sunscreen",
      "Rent a scooter for flexible exploration"
    ],
    bestTimeDetails: {
      title: "Best Time to Visit Bali",
      description: "Bali offers year-round appeal with distinct dry and wet seasons.",
      seasons: [
        {
          season: "Dry Season (Apr-Oct)",
          description: "Sunny weather, lower humidity, ideal for activities (25-30°C)",
          highlight: "Best for sightseeing, trekking, and beach activities"
        },
        {
          season: "Wet Season (Nov-Mar)",
          description: "Rain showers, lush landscapes, fewer tourists (23-28°C)",
          highlight: "Perfect for wellness retreats and cultural experiences"
        }
      ]
    },
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bali - Check In",
        content: "Arrive at Ngurah Rai International Airport and transfer to your hotel in Ubud or Seminyak. Rest and acclimate to the island's tropical climate. Evening at leisure to explore local surroundings."
      },
      {
        day: 2,
        title: "Handara Gate & Ubud Exploration",
        content: "Start early for the iconic Handara Gate photo opportunity. Continue to Ubud for visits to the Sacred Monkey Forest, traditional art market, and Ubud Palace. Evening traditional dance performance."
      },
      {
        day: 3,
        title: "Rice Terraces & Temple Tour",
        content: "Visit the stunning Tegallalang Rice Terraces for sunrise views. Continue to Tirta Empul Holy Water Temple for a traditional blessing. Explore the artistic village of Mas with its woodcarvings."
      },
      {
        day: 4,
        title: "South Bali Beaches & Uluwatu",
        content: "Travel to South Bali and visit the dramatic Uluwatu Temple perched on cliff edges. Watch the famous kecak dance at sunset. Enjoy BBQ seafood dinner at Jimbaran Bay."
      },
      {
        day: 5,
        title: "Kintamani Volcano Tour",
        content: "Full day excursion to Kintamani with breathtaking views of Mount Batur volcano and crater lake. Visit coffee plantations and traditional villages. Afternoon at leisure for spa treatments."
      },
      {
        day: 6,
        title: "Free Day at Leisure",
        content: "Choose your own adventure - relaxing by the pool, surfing at Kuta Beach, shopping in Seminyak, or additional temple visits. Optional additional activities available."
      },
      {
        day: 7,
        title: "Departure",
        content: "Final morning for last-minute shopping or beach time before transferring to the airport for your departure flight."
      }
    ]
  },
  {
    id: "uk",
    name: "UK",
    country: "United Kingdom",
    category: "international",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1400&auto=format&fit=crop",
    description: "Historic castles, modern cities, and rich heritage.",
  },
  {
    id: "canada",
    name: "Canada",
    country: "Canada",
    category: "international",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1400&auto=format&fit=crop",
    description: "Vast wilderness, stunning nature, and cosmopolitan cities.",
  },
  {
    id: "usa",
    name: "USA",
    country: "United States",
    category: "international",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=1400&auto=format&fit=crop",
    description: "Diverse landscapes from coast to coast.",
  },
  {
    id: "australia",
    name: "Australia",
    country: "Australia",
    category: "international",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1400&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=2000&auto=format&fit=crop",
    description: "10 Days / 9 Nights through Melbourne, Gold Coast & Sydney.",
    longDescription: "Discover the magic of Australia as you journey through three of its most iconic destinations—Melbourne, Gold Coast, and Sydney. This thoughtfully designed itinerary offers a perfect blend of cultural exploration, scenic beauty, theme park adventures, and leisure time, ensuring an unforgettable Australian holiday experience.",
    highlights: [
      "Melbourne City Tour - Federation Square, MCG, and Skydeck",
      "Great Ocean Road - Twelve Apostles and Loch Ard Gorge",
      "Warner Bros. Movie World - Thrilling theme park rides",
      "Sea World - Marine life exhibits and shows",
      "Sydney City Tour - Opera House, Bondi Beach, Darling Harbour",
      "Optional Blue Mountains Tour - Three Sisters rock formation"
    ],
    experiences: [
      "Great Ocean Road scenic drive",
      "Theme park adventures at Movie World",
      "Marine life discovery at Sea World",
      "Hop-On Hop-Off Sydney exploration",
      "Harbor views and beach experiences"
    ],
    atAGlance: {
      location: "Australia (Melbourne, Gold Coast, Sydney)",
      idealStay: "10 Days / 9 Nights",
      bestTime: "September to November, March to May",
      experienceType: "City, Beach & Adventure",
      gateway: "Melbourne Airport (MEL)"
    },
    whyVisit: [
      "Experience three iconic Australian cities in one trip",
      "Drive along the spectacular Great Ocean Road",
      "Enjoy world-class theme parks and marine attractions",
      "See the iconic Sydney Opera House and Bondi Beach"
    ],
    thingsToDo: [
      {
        category: "City Exploration",
        description: "Discover Melbourne's culture and Sydney's iconic sights",
        icon: "🏙️"
      },
      {
        category: "Coastal Adventures",
        description: "Gold Coast beaches and theme park excitement",
        icon: "🏖️"
      },
      {
        category: "Scenic Drives",
        description: "Great Ocean Road and coastal scenery",
        icon: "🚗"
      }
    ],
    quickFacts: [
      { label: "Duration", value: "10 Days / 9 Nights" },
      { label: "Cities", value: "Melbourne, Gold Coast, Sydney" },
      { label: "Hotels", value: "3-Star Accommodation" },
      { label: "Meals", value: "Daily Breakfast" }
    ],
    travelerTips: [
      "Book theme park tickets in advance for best prices",
      "Carry sun protection as Australian sun is intense",
      "Bring comfortable walking shoes for city tours"
    ],
    bestTimeDetails: {
      title: "Best Time to Visit Australia",
      description: "Australia offers year-round appeal with different regions having optimal seasons.",
      seasons: [
        {
          season: "Spring (Sep-Nov)",
          description: "Pleasant weather, blooming gardens (15-25°C)",
          highlight: "Ideal for Great Ocean Road exploration"
        },
        {
          season: "Autumn (Mar-May)",
          description: "Mild temperatures (15-22°C)",
          highlight: "Perfect for outdoor activities"
        }
      ]
    },
    itinerary: [
      {
        day: 1,
        title: "Arrival in Melbourne",
        content: "Arrive at Melbourne Airport and transfer to hotel. Evening at leisure to explore nearby cafes and attractions."
      },
      {
        day: 2,
        title: "Melbourne City Tour",
        content: "Half-day guided tour visiting Federation Square, St. Patrick's Cathedral, MCG, and Melbourne Skydeck."
      },
      {
        day: 3,
        title: "Great Ocean Road",
        content: "Full-day scenic drive along the Great Ocean Road, seeing Twelve Apostles and Loch Ard Gorge."
      },
      {
        day: 4,
        title: "Melbourne – Gold Coast",
        content: "Fly to Gold Coast. Check in at Mercure Gold Coast Resort. Evening at leisure."
      },
      {
        day: 5,
        title: "Warner Bros. Movie World",
        content: "Fun-filled day at Warner Bros. Movie World with thrilling rides and live shows."
      },
      {
        day: 6,
        title: "Sea World",
        content: "Visit Sea World for marine life exhibits and entertaining shows."
      },
      {
        day: 7,
        title: "Gold Coast – Sydney",
        content: "Fly to Sydney, transfer to hotel. Explore Darling Harbour and enjoy Opera House views."
      },
      {
        day: 8,
        title: "Sydney City Tour",
        content: "Hop-On Hop-Off tour covering Opera House, Bondi Beach, and Darling Harbour."
      },
      {
        day: 9,
        title: "Optional Blue Mountains",
        content: "Day at leisure or optional Blue Mountains tour to Three Sisters."
      },
      {
        day: 10,
        title: "Departure from Sydney",
        content: "Check out and transfer to Sydney Airport for your onward journey."
      }
    ]
  },
  {
    id: "turkey",
    name: "Turkey",
    country: "Turkey",
    category: "international",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1400&auto=format&fit=crop",
    description: "Bridge between Europe and Asia with rich history, stunning coastlines, and vibrant culture.",
  },
  {
    id: "japan",
    name: "Japan",
    country: "Japan",
    category: "international",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1400&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop",
    description: "7 Nights / 8 Days - Tokyo, Hakone, Fuji & Osaka with Shinkansen experience and traditional onsen.",
    longDescription: "Discover the Land of the Rising Sun on this unforgettable journey through Japan. From Tokyo's futuristic skyline and ancient Asakusa Temple to the majestic Mount Fuji and the vibrant streets of Osaka, experience the perfect blend of tradition and modernity. Enjoy the famous Shinkansen bullet train, traditional hot springs, and world-renowned Japanese hospitality.",
    highlights: [
      "Tokyo Skytree Observation Deck with panoramic city views",
      "Historic Asakusa Senso-ji Temple",
      "Scenic Hakone cruise and ropeway with Mount Fuji views",
      "Traditional Japanese onsen experience",
      "Shinkansen bullet train journey from Fuji to Osaka",
      "Osaka Castle and vibrant Dotonbori district",
      "Mount Fuji viewing from Oshino Hakkai"
    ],
    experiences: [
      "Tokyo city tour with Asakusa and Shibuya",
      "Hakone hot spring experience",
      "Shinkansen bullet train ride",
      "Osaka food tour in Dotonbori",
      "Traditional ryokan stay near Mount Fuji"
    ],
    atAGlance: {
      location: "Japan (Tokyo, Hakone, Fuji, Osaka)",
      idealStay: "7 Nights / 8 Days",
      bestTime: "February 2026",
      experienceType: "Cultural & Adventure",
      gateway: "Narita International Airport (NRT)"
    },
    whyVisit: [
      "Experience the famous Shinkansen bullet train",
      "Visit ancient temples and modern skyscrapers",
      "Relax in traditional Japanese onsen",
      "See Mount Fuji, Japan's iconic peak",
      "Explore vibrant Osaka food culture"
    ],
    thingsToDo: [
      {
        category: "Culture & Temples",
        description: "Visit ancient temples and experience Japanese traditions",
        icon: "🏛️"
      },
      {
        category: "Nature & Views",
        description: "Mount Fuji, Hakone landscapes, and scenic views",
        icon: "🏔️"
      },
      {
        category: "City Exploration",
        description: "Tokyo's neon lights and Osaka's food scene",
        icon: "🏙️"
      },
      {
        category: "Unique Experiences",
        description: "Onsen, bullet train, and traditional culture",
        icon: "🚄"
      }
    ],
    experienceCategories: [
      {
        id: "culture-discovery",
        title: "Cultural Discovery",
        description: "Temples, traditions, and Japanese heritage",
        icon: "🏛️",
        microcopy: "Perfect for culture and history enthusiasts"
      },
      {
        id: "scenic-adventures",
        title: "Scenic Adventures",
        description: "Mount Fuji views and mountain landscapes",
        icon: "🏔️",
        microcopy: "Ideal for nature lovers and photographers"
      },
      {
        id: "urban-exploration",
        title: "Urban Exploration",
        description: "Tokyo's districts and Osaka's food culture",
        icon: "🏙️",
        microcopy: "Great for city explorers and foodies"
      },
      {
        id: "unique-experiences",
        title: "Unique Experiences",
        description: "Onsen, bullet train, and traditional stays",
        icon: "🚄",
        microcopy: "Exciting for travelers seeking authentic experiences"
      }
    ],
    quickFacts: [
      { label: "Duration", value: "7 Nights / 8 Days" },
      { label: "Cities", value: "Tokyo, Hakone, Fuji, Osaka" },
      { label: "Accommodation", value: "3-Star Hotels" },
      { label: "Meals", value: "Daily Breakfast" }
    ],
    travelerTips: [
      "Pack warm clothing for February weather",
      "Carry cash as Japan is still largely cash-based",
      "Learn basic Japanese phrases for navigation",
      "Respect local customs at temples and shrines",
      "Download offline maps for better navigation",
      "Bring a universal power adapter (Type A/B)"
    ],
    bestTimeDetails: {
      title: "Best Time to Visit Japan",
      description: "Japan offers distinct seasonal beauty throughout the year.",
      seasons: [
        {
          season: "Winter (Dec-Feb)",
          description: "Snow festivals, ski resorts, clear mountain views (0-10°C)",
          highlight: "Perfect for our February tour with winter scenery"
        },
        {
          season: "Spring (Mar-May)",
          description: "Cherry blossoms, pleasant weather (10-20°C)",
          highlight: "Famous for hanami (flower viewing) season"
        }
      ]
    },
    itinerary: [
      {
        day: 1,
        title: "Arrival in Narita (Tokyo)",
        content: "Upon arrival at Narita International Airport, meet the guide and transfer to hotel. Check-in from 3:00 PM. Evening at leisure."
      },
      {
        day: 2,
        title: "Tokyo City Tour",
        content: "Visit Asakusa Senso-ji Temple, Tokyo Skytree, Odaiba, and Gundam Base Tokyo. Free time in Shibuya and Shinjuku."
      },
      {
        day: 3,
        title: "Tokyo Free Day",
        content: "Explore Tokyo independently. No coach service provided. Optional activities available."
      },
      {
        day: 4,
        title: "Hakone & Mount Fuji Area",
        content: "Hakone sightseeing cruise, ropeway ride, Owakudani Valley, Iyashi no Sato village, Oshino Hakkai. Evening onsen experience."
      },
      {
        day: 5,
        title: "Fuji to Osaka (Shinkansen)",
        content: "Transfer to Mishima Station, board Shinkansen to Osaka. Evening at leisure."
      },
      {
        day: 6,
        title: "Osaka City Tour",
        content: "Visit Osaka Aquarium Kaiyukan, Osaka Castle, Shinsaibashi, and Dotonbori."
      },
      {
        day: 7,
        title: "Osaka Free Day",
        content: "Full day at leisure. Optional tours to Kyoto or Nara available."
      },
      {
        day: 8,
        title: "Departure from Kansai",
        content: "Check out and transfer to Kansai International Airport for departure."
      }
    ]
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    category: "international",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1400&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop",
    description: "Modern metropolis with luxury shopping, iconic architecture, and desert adventures.",
    longDescription: "Dubai is one of the world's most vibrant and futuristic destinations, celebrated for its iconic architecture, luxury lifestyle, cultural diversity, and thrilling attractions. Known for the towering Burj Khalifa, world-class shopping malls, golden desert landscapes, and pristine marina views, Dubai beautifully blends traditional Arabian heritage with modern innovation. Whether you seek adventure, relaxation, shopping, or cultural exploration, Dubai offers a memorable experience for every traveler.",
    highlights: [
      "Burj Khalifa (124th Floor) - Ascend to the world's tallest building for breathtaking panoramic views",
      "Desert Safari with BBQ - Thrilling dune bashing, camel riding, and traditional entertainment",
      "Abu Dhabi City Tour - Explore UAE's capital with stunning architecture and heritage",
      "Marina Cruise Dinner - Romantic dinner cruise with international buffet and live entertainment",
      "Miracle Garden - World's largest flower garden with spectacular floral displays",
      "Global Village - Cultural pavilions from 90+ countries with international cuisines",
      "Traditional Abra Rides - Experience traditional water taxis and heritage souks"
    ],
    experiences: [
      "Burj Khalifa observation deck experience",
      "Desert safari with dune bashing and BBQ dinner",
      "Marina dinner cruise with live entertainment",
      "Dubai Mall shopping and entertainment",
      "Traditional souk exploration",
      "Desert hot air balloon safari"
    ],
    atAGlance: {
      location: "United Arab Emirates",
      idealStay: "4-6 days",
      bestTime: "November to April",
      experienceType: "Luxury & Adventure",
      gateway: "Dubai International Airport (DXB)"
    },
    whyVisit: [
      "Experience world-class luxury and modern architecture",
      "Enjoy thrilling desert adventures and cultural experiences",
      "Shop at the world's largest malls and luxury brands",
      "Discover the perfect blend of tradition and innovation",
      "Access to premium dining, entertainment, and nightlife"
    ],
    thingsToDo: [
      {
        category: "Iconic Attractions",
        description: "Visit Burj Khalifa, Dubai Mall, and Palm Jumeirah",
        icon: "🏗️"
      },
      {
        category: "Desert Adventures",
        description: "Experience safari, camping, and traditional activities",
        icon: "🏜️"
      },
      {
        category: "Cultural Experiences",
        description: "Explore souks, museums, and heritage sites",
        icon: "🕌"
      },
      {
        category: "Luxury & Shopping",
        description: "World-class malls, dining, and entertainment",
        icon: "🛍️"
      }
    ],
    experienceCategories: [
      {
        id: "luxury-experiences",
        title: "Luxury Experiences",
        description: "Premium dining, shopping, and accommodation",
        icon: "💎",
        microcopy: "Perfect for luxury travelers seeking the finest"
      },
      {
        id: "desert-adventures",
        title: "Desert Adventures",
        description: "Thrilling safaris and traditional experiences",
        icon: "🏜️",
        microcopy: "Exciting for adventure seekers and families"
      },
      {
        id: "cultural-discovery",
        title: "Cultural Discovery",
        description: "Heritage sites, museums, and local traditions",
        icon: "🕌",
        microcopy: "Ideal for culture enthusiasts and history lovers"
      },
      {
        id: "modern-marvels",
        title: "Modern Marvels",
        description: "Iconic architecture and futuristic attractions",
        icon: "🏗️",
        microcopy: "Great for architecture fans and tech enthusiasts"
      }
    ],
    quickFacts: [
      { label: "Population", value: "3.5+ million" },
      { label: "Area", value: "4,114 km²" },
      { label: "Currency", value: "UAE Dirham (AED)" },
      { label: "Language", value: "Arabic, English" }
    ],
    travelerTips: [
      "Dress modestly when visiting religious sites and during Ramadan",
      "Stay hydrated due to the hot climate",
      "Use reputable taxi services or ride-sharing apps",
      "Carry cash for smaller establishments and souks",
      "Check weather conditions for outdoor activities"
    ],
    bestTimeDetails: {
      title: "Best Time to Visit Dubai",
      description: "Dubai offers year-round appeal, but the most comfortable seasons are winter and spring.",
      seasons: [
        {
          season: "Winter (Dec-Mar)",
          description: "Pleasant weather (20-30°C), fewer crowds, major events",
          highlight: "Best for outdoor activities and shopping"
        },
        {
          season: "Spring (Apr-May)",
          description: "Warm weather (25-35°C), blooming landscapes",
          highlight: "Perfect for desert safaris and cultural events"
        }
      ]
    },
    itinerary: [
      {
        day: 1,
        title: "Arrival & City Exploration",
        content: "Arrive in Dubai and begin your adventure with a city tour. Visit the iconic Burj Khalifa for breathtaking views, explore the Dubai Mall, and enjoy traditional Arabian hospitality at your luxury hotel."
      },
      {
        day: 2,
        title: "Desert Safari Experience",
        content: "Experience the thrill of a desert safari with dune bashing, camel riding, and traditional Bedouin entertainment. Enjoy a BBQ dinner under the stars and witness the stunning desert sunset."
      },
      {
        day: 3,
        title: "Cultural Heritage & Marina",
        content: "Discover Dubai's rich cultural heritage at the Dubai Museum and explore the vibrant Marina district. Enjoy a romantic dinner cruise along the Arabian Gulf with live entertainment."
      },
      {
        day: 4,
        title: "Abu Dhabi Day Trip",
        content: "Take a day trip to Abu Dhabi to visit the magnificent Sheikh Zayed Grand Mosque and explore the UAE's capital city with its stunning modern architecture and cultural landmarks."
      },
      {
        day: 5,
        title: "Adventure & Relaxation",
        content: "Choose from various activities - relax at pristine beaches, shop at luxury malls, or try thrilling water sports. Experience Dubai's world-class dining scene with international cuisine."
      },
      {
        day: 6,
        title: "Departure",
        content: "Spend your final morning shopping for souvenirs or relaxing at your hotel before departing Dubai with unforgettable memories of this modern desert oasis."
      }
    ]
  },
];