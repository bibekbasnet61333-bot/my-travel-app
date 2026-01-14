// Package data validation and utility functions
const validatePackage = (pkg) => {
  const errors = [];
  const requiredFields = ['id', 'name', 'category', 'duration', 'groupSize', 'difficulty', 'image', 'heroImage', 'shortDescription', 'longDescription'];
  const missingFields = requiredFields.filter(field => !pkg[field]);

  if (missingFields.length > 0) {
    errors.push(`Missing required fields: ${missingFields.join(', ')}`);
  }

  // Validate category
  const validCategories = ['cultural', 'luxury', 'wellness', 'adventure'];
  if (!validCategories.includes(pkg.category)) {
    errors.push(`Invalid category: ${pkg.category}. Valid categories: ${validCategories.join(', ')}`);
  }

  // Validate data types and formats
  if (pkg.id && typeof pkg.id !== 'string') {
    errors.push('Package ID must be a string');
  }

  if (pkg.duration && typeof pkg.duration !== 'string') {
    errors.push('Package duration must be a string');
  }

  if (pkg.groupSize && typeof pkg.groupSize !== 'string') {
    errors.push('Package groupSize must be a string');
  }

  if (pkg.difficulty && !['Easy', 'Moderate', 'Challenging'].includes(pkg.difficulty)) {
    errors.push('Package difficulty must be one of: Easy, Moderate, Challenging');
  }

  // Validate arrays
  if (pkg.highlights && !Array.isArray(pkg.highlights)) {
    errors.push('Package highlights must be an array');
  }

  if (pkg.inclusions && !Array.isArray(pkg.inclusions)) {
    errors.push('Package inclusions must be an array');
  }

  if (pkg.itinerary && !Array.isArray(pkg.itinerary)) {
    errors.push('Package itinerary must be an array');
  }

  if (pkg.testimonials && !Array.isArray(pkg.testimonials)) {
    errors.push('Package testimonials must be an array');
  }

  if (errors.length > 0) {
    const errorMessage = `Package ${pkg.id || 'unknown'} validation failed:\n${errors.map(error => `  - ${error}`).join('\n')}`;
    console.warn(errorMessage);
    return pkg; // Return anyway to prevent app crash
  }

  return pkg;
};

// Utility functions moved to packageService for better organization

// Create validated packages array
const rawPackages = [
  {
    id: "luxury-nepal-cultural-tour",
    name: "Luxury Nepal Cultural Tour",
    category: "cultural",
    duration: "8 Days / 7 Nights",
    groupSize: "2-12 people",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1400&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop",
    shortDescription: "An exquisite journey through Nepal's ancient heritage and spiritual landmarks.",
    longDescription: "Embark on a transformative luxury cultural tour through Nepal, where ancient traditions meet modern comfort. From the sacred temples of Kathmandu to the serene monasteries of the Kathmandu Valley, this meticulously crafted itinerary offers an intimate exploration of Nepal's rich cultural tapestry. Experience authentic ceremonies, traditional crafts, and the warm hospitality of local communities, all while enjoying premium accommodations and personalized service.",
    highlights: [
      "Private guided tours of UNESCO World Heritage sites",
      "Luxury boutique hotels with valley views",
      "Traditional Nepali cuisine prepared by master chefs",
      "Cultural performances and artisan workshops",
      "Helicopter transfers for breathtaking perspectives",
      "Personalized itinerary with flexible pacing"
    ],
    inclusions: [
      "7 nights luxury accommodation",
      "Private transportation throughout",
      "Expert cultural guides",
      "All meals with premium dining",
      "Entrance fees to all sites",
      "Cultural performance tickets",
      "24/7 concierge service"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu",
        description: "Welcome to Nepal with a private airport transfer and check-in to your luxury hotel. Evening cultural briefing and welcome dinner."
      },
      {
        day: 2,
        title: "Kathmandu Heritage Tour",
        description: "Private guided tour of Swayambhunath, Pashupatinath, and Boudhanath. Traditional lunch at a heritage restaurant."
      },
      {
        day: 3,
        title: "Bhaktapur & Patan Exploration",
        description: "Explore the medieval cities of Bhaktapur and Patan. Visit ancient palaces, temples, and traditional markets."
      },
      {
        day: 4,
        title: "Pokhara Scenic Journey",
        description: "Scenic drive to Pokhara with stops at scenic viewpoints. Boat ride on Phewa Lake and temple visits."
      },
      {
        day: 5,
        title: "Pokhara Cultural Immersion",
        description: "Tibetan refugee camp visit, Gurkha museum tour, and traditional craft demonstrations."
      },
      {
        day: 6,
        title: "Chitwan Wildlife Experience",
        description: "Transfer to Chitwan for jungle safari, elephant breeding center visit, and cultural performances."
      },
      {
        day: 7,
        title: "Chitwan Wildlife Activities",
        description: "Canoe ride, jungle walk, and bird watching. Farewell dinner with traditional Tharu dance."
      },
      {
        day: 8,
        title: "Departure",
        description: "Morning at leisure before private transfer to airport for your onward journey."
      }
    ],
    accommodation: {
      type: "Luxury Boutique Hotels",
      highlights: [
        "Valley-view rooms with modern amenities",
        "Spa facilities and wellness centers",
        "Traditional architecture with contemporary comfort",
        "Award-winning hospitality service"
      ]
    },
    testimonials: [
      {
        name: "Sarah Mitchell",
        location: "New York, USA",
        rating: 5,
        text: "An absolutely transformative experience. The attention to detail and cultural insights were exceptional."
      },
      {
        name: "David Chen",
        location: "Singapore",
        rating: 5,
        text: "The perfect blend of luxury and authentic cultural immersion. Highly recommended for discerning travelers."
      }
    ],
    trustSignals: {
      certifications: ["UNESCO Heritage Expert", "Luxury Travel Specialist"],
      awards: ["Best Cultural Tour 2023", "Excellence in Heritage Tourism"],
      partnerships: ["World Heritage Committee", "Nepal Tourism Board"]
    }
  },
  {
    id: "bali-spiritual-retreat",
    name: "Bali Spiritual Retreat",
    category: "wellness",
    duration: "7 Days / 6 Nights",
    groupSize: "2-8 people",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=1400&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=2000&auto=format&fit=crop",
    shortDescription: "Rejuvenate your soul in Bali's sacred temples and healing traditions.",
    longDescription: "Discover inner peace and spiritual awakening on this transformative Bali retreat. Nestled amidst lush rice terraces and ancient temples, this journey combines traditional Balinese healing practices with modern wellness techniques. From sunrise meditation at sacred sites to restorative yoga sessions overlooking the Indian Ocean, every moment is designed to nourish your body, mind, and spirit.",
    highlights: [
      "Daily meditation and yoga sessions",
      "Traditional Balinese healing ceremonies",
      "Sacred temple visits and blessings",
      "Organic farm-to-table cuisine",
      "Private villa accommodations",
      "Personal wellness consultations"
    ],
    inclusions: [
      "6 nights in luxury villas",
      "Daily yoga and meditation",
      "Traditional healing sessions",
      "Organic meals and juices",
      "Temple visits and ceremonies",
      "Transportation and guides",
      "Wellness journal and resources"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Sacred Welcome",
        description: "Warm welcome with traditional Balinese ceremony. Settle into your villa and enjoy a restorative welcome dinner."
      },
      {
        day: 2,
        title: "Ubud Spiritual Exploration",
        description: "Morning meditation at Tirta Empul temple. Visit sacred sites and experience traditional healing practices."
      },
      {
        day: 3,
        title: "Rice Terrace Retreat",
        description: "Guided walks through ancient rice terraces. Afternoon yoga session with ocean views."
      },
      {
        day: 4,
        title: "Wellness & Healing Day",
        description: "Full day of personalized wellness treatments, including traditional Balinese massage and healing ceremonies."
      },
      {
        day: 5,
        title: "Beach Sanctuary",
        description: "Transfer to coastal retreat. Sunset meditation and beach yoga sessions."
      },
      {
        day: 6,
        title: "Integration & Reflection",
        description: "Morning integration practices. Afternoon free for personal reflection and optional activities."
      },
      {
        day: 7,
        title: "Departure Blessings",
        description: "Final morning meditation and blessings before transfer to airport."
      }
    ],
    accommodation: {
      type: "Luxury Wellness Villas",
      highlights: [
        "Private infinity pools with ocean views",
        "Open-air yoga pavilions",
        "Organic gardens and herb sanctuaries",
        "24-hour wellness concierge"
      ]
    },
    testimonials: [
      {
        name: "Emma Thompson",
        location: "London, UK",
        rating: 5,
        text: "A truly transformative experience that renewed my spirit and brought deep inner peace."
      }
    ],
    trustSignals: {
      certifications: ["Wellness Tourism Certified", "Spiritual Retreat Specialist"],
      awards: ["Best Wellness Retreat 2023"],
      partnerships: ["International Yoga Alliance", "Traditional Healing Council"]
    }
  },
  {
    id: "thailand-luxury-discovery",
    name: "Thailand Luxury Discovery",
    category: "luxury",
    duration: "10 Days / 9 Nights",
    groupSize: "2-10 people",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1400&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2000&auto=format&fit=crop",
    shortDescription: "Indulge in Thailand's finest luxury experiences from Bangkok to Phuket.",
    longDescription: "Experience Thailand's most exquisite destinations through a lens of luxury and refinement. From the glittering spires of Bangkok's temples to the pristine beaches of Phuket, this journey combines cultural discovery with world-class hospitality. Private charters, Michelin-star dining, and exclusive experiences create unforgettable memories in the Land of Smiles.",
    highlights: [
      "Private yacht charters and helicopter transfers",
      "Michelin-star dining experiences",
      "Exclusive temple access and private ceremonies",
      "Luxury spa treatments with ancient techniques",
      "Personal shopping consultant services",
      "VIP access to cultural performances"
    ],
    inclusions: [
      "9 nights in 5-star luxury resorts",
      "Private transportation and charters",
      "Personal concierge and guides",
      "Fine dining experiences",
      "Spa treatments and wellness",
      "Cultural performances and events",
      "Luxury shopping experiences"
    ],
    itinerary: [
      {
        day: 1,
        title: "Bangkok Luxury Arrival",
        description: "Private jet arrival and luxury transfer. Check into Mandarin Oriental with river views."
      },
      {
        day: 2,
        title: "Royal Bangkok Experience",
        description: "Private tour of Grand Palace and temples. Exclusive lunch at royal kitchen."
      },
      {
        day: 3,
        title: "Ayutthaya Ancient Capitals",
        description: "Private boat and car transfer to Ayutthaya. Exclusive archaeological site access."
      },
      {
        day: 4,
        title: "Chiang Mai Cultural Immersion",
        description: "Private charter flight to Chiang Mai. Visit hill tribes and ancient temples."
      },
      {
        day: 5,
        title: "Golden Triangle Exploration",
        description: "Private expedition to Myanmar border. Meet local artisans and visit temples."
      },
      {
        day: 6,
        title: "Phuket Island Paradise",
        description: "Private jet transfer to Phuket. Check into Amanpuri resort."
      },
      {
        day: 7,
        title: "Andaman Sea Adventures",
        description: "Private yacht charter for island hopping and marine exploration."
      },
      {
        day: 8,
        title: "Phang Nga Bay Experience",
        description: "Private speedboat to Phang Nga Bay. Kayaking and limestone cave exploration."
      },
      {
        day: 9,
        title: "Phuket Leisure Day",
        description: "Full day at leisure with optional spa treatments and beach activities."
      },
      {
        day: 10,
        title: "Departure",
        description: "Morning at leisure before private transfer to Phuket International Airport."
      }
    ],
    accommodation: {
      type: "5-Star Luxury Resorts",
      highlights: [
        "Ocean-view villas and suites",
        "Private infinity pools",
        "24-hour butler service",
        "Award-winning spas and dining"
      ]
    },
    testimonials: [
      {
        name: "Michael Rodriguez",
        location: "Miami, USA",
        rating: 5,
        text: "Exceeded all expectations. The level of personalization and luxury was extraordinary."
      }
    ],
    trustSignals: {
      certifications: ["Luxury Travel Specialist", "Private Charter Certified"],
      awards: ["World's Best Luxury Tour 2023", "Excellence in Asian Tourism"],
      partnerships: ["Leading Hotels of the World", "Private Aviation Network"]
    }
  },
  {
    id: "vietnam-heritage-journey",
    name: "Vietnam Heritage Journey",
    category: "cultural",
    duration: "9 Days / 8 Nights",
    groupSize: "2-12 people",
    difficulty: "Moderate",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1400&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=2000&auto=format&fit=crop",
    shortDescription: "Journey through Vietnam's imperial history and coastal wonders.",
    longDescription: "Discover Vietnam's rich imperial heritage and stunning coastal landscapes on this carefully crafted journey. From the ancient imperial city of Hue to the marble mountains of Danang and the vibrant chaos of Ho Chi Minh City, experience the depth and diversity of Vietnamese culture through private tours, traditional performances, and authentic local experiences.",
    highlights: [
      "Private imperial city tours with royal access",
      "Traditional water puppet performances",
      "Halong Bay luxury cruise experience",
      "Central Highlands ethnic minority visits",
      "Hoi An ancient town exploration",
      "Mekong Delta boat journeys"
    ],
    inclusions: [
      "8 nights in boutique luxury hotels",
      "Private transportation throughout",
      "Expert cultural guides",
      "Traditional performances and shows",
      "Cruise and boat experiences",
      "Cultural workshops and visits",
      "Airport transfers and assistance"
    ],
    itinerary: [
      {
        day: 1,
        title: "Hanoi Arrival & Old Quarter",
        description: "Welcome to Vietnam with private transfer. Explore Hanoi's Old Quarter and Temple of Literature."
      },
      {
        day: 2,
        title: "Halong Bay Cruise",
        description: "Private transfer to Halong Bay. Luxury cruise with cave exploration and seafood dinner."
      },
      {
        day: 3,
        title: "Halong Bay Exploration",
        description: "Kayaking, fishing village visits, and Tai Chi sessions on board."
      },
      {
        day: 4,
        title: "Hue Imperial City",
        description: "Flight to Danang and transfer to Hue. Private tour of imperial city and tombs."
      },
      {
        day: 5,
        title: "Hoi An Ancient Town",
        description: "Explore UNESCO-listed Hoi An. Visit silk farms and traditional workshops."
      },
      {
        day: 6,
        title: "Central Highlands",
        description: "Journey to highlands for ethnic minority villages and coffee plantation tours."
      },
      {
        day: 7,
        title: "Ho Chi Minh City",
        description: "Flight to Saigon. Visit Cu Chi tunnels and War Remnants Museum."
      },
      {
        day: 8,
        title: "Mekong Delta Experience",
        description: "Day trip to Mekong Delta with boat journeys, floating markets, and homestays."
      },
      {
        day: 9,
        title: "Departure",
        description: "Morning at leisure before private transfer to Tan Son Nhat Airport."
      }
    ],
    accommodation: {
      type: "Boutique Luxury Hotels",
      highlights: [
        "Colonial architecture with modern amenities",
        "Riverside and garden views",
        "Traditional Vietnamese design elements",
        "Award-winning service excellence"
      ]
    },
    testimonials: [
      {
        name: "Jennifer Park",
        location: "Seoul, South Korea",
        rating: 5,
        text: "A beautifully crafted journey that captured the essence of Vietnam's rich heritage."
      }
    ],
    trustSignals: {
      certifications: ["Cultural Heritage Specialist", "Sustainable Tourism Certified"],
      awards: ["Best Heritage Tour 2023"],
      partnerships: ["Vietnam National Administration of Tourism", "UNESCO World Heritage"]
    }
  },
  {
    id: "dubai-luxury-experience",
    name: "Dubai Luxury Experience",
    category: "luxury",
    duration: "6 Days / 5 Nights",
    groupSize: "2-8 people",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1400&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop",
    shortDescription: "Experience Dubai's ultimate luxury from desert to metropolis.",
    longDescription: "Immerse yourself in Dubai's world of superlatives where luxury knows no bounds. From private desert safaris to Burj Khalifa experiences, helicopter tours, and yacht charters, this exclusive itinerary showcases the very best of Dubai's luxury offerings. Every detail is meticulously planned to ensure an unforgettable experience of opulence and adventure.",
    highlights: [
      "Private Burj Khalifa experience with exclusive access",
      "Luxury desert safari with private camp",
      "Helicopter tours over Palm Jumeirah",
      "Private yacht charter in Arabian Gulf",
      "VIP shopping experiences",
      "Exclusive dining at Michelin-starred restaurants"
    ],
    inclusions: [
      "5 nights at 7-star luxury hotels",
      "Private transportation and charters",
      "VIP access and exclusive experiences",
      "Fine dining and premium cuisine",
      "Personal concierge services",
      "Luxury shopping assistance",
      "Airport VIP services"
    ],
    itinerary: [
      {
        day: 1,
        title: "Luxury Arrival in Dubai",
        description: "VIP arrival services and private transfer to Burj Al Arab. Exclusive check-in experience."
      },
      {
        day: 2,
        title: "Dubai Icons & Luxury",
        description: "Private Burj Khalifa tour with exclusive access. Luxury shopping at Dubai Mall."
      },
      {
        day: 3,
        title: "Desert Luxury Safari",
        description: "Private helicopter transfer to desert. Luxury camp with fine dining and entertainment."
      },
      {
        day: 4,
        title: "Palm Jumeirah Experience",
        description: "Helicopter tour of Palm Jumeirah. Private beach club and yacht charter."
      },
      {
        day: 5,
        title: "Abu Dhabi Cultural Day",
        description: "Private transfer to Abu Dhabi. Exclusive access to Sheikh Zayed Grand Mosque."
      },
      {
        day: 6,
        title: "Departure",
        description: "Morning at leisure before VIP airport transfer and private jet services."
      }
    ],
    accommodation: {
      type: "7-Star Luxury Hotels",
      highlights: [
        "Private butler service 24/7",
        "Exclusive suites with panoramic views",
        "Personalized luxury amenities",
        "World-class dining and wellness"
      ]
    },
    testimonials: [
      {
        name: "Robert Kensington",
        location: "London, UK",
        rating: 5,
        text: "An extraordinary display of luxury and attention to detail. Dubai at its absolute finest."
      }
    ],
    trustSignals: {
      certifications: ["Ultra-Luxury Specialist", "Private Aviation Certified"],
      awards: ["World's Most Luxurious Tour 2023", "Dubai Tourism Excellence"],
      partnerships: ["Dubai Tourism", "Leading Luxury Hotels", "Private Jet Network"]
    }
  },
  {
    id: "australia-discovery-tour",
    name: "Australia Discovery Tour",
    category: "adventure",
    duration: "12 Days / 11 Nights",
    groupSize: "2-10 people",
    difficulty: "Moderate",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1400&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=2000&auto=format&fit=crop",
    shortDescription: "Explore Australia's diverse landscapes from coast to outback.",
    longDescription: "Embark on a comprehensive discovery of Australia's most iconic destinations. From the vibrant streets of Sydney and Melbourne to the ancient wonders of Uluru and the Great Barrier Reef, this journey showcases the continent's incredible diversity. Experience world-class wildlife, stunning natural wonders, and rich cultural heritage through carefully curated experiences.",
    highlights: [
      "Great Barrier Reef diving and snorkeling",
      "Uluru base walk and cultural tours",
      "Sydney Opera House private tour",
      "Daintree Rainforest exploration",
      "Kangaroo Island wildlife encounters",
      "Melbourne cultural experiences"
    ],
    inclusions: [
      "11 nights in premium accommodations",
      "Domestic flights and private transfers",
      "Expert naturalist and cultural guides",
      "Marine and wildlife experiences",
      "Cultural performances and tours",
      "Premium dining experiences",
      "Comprehensive travel insurance"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Sydney",
        description: "Welcome to Australia with private airport transfer. Check into luxury hotel overlooking Sydney Harbour."
      },
      {
        day: 2,
        title: "Sydney Exploration",
        description: "Private tour of Sydney Opera House and Harbour Bridge. Evening harbour dinner cruise."
      },
      {
        day: 3,
        title: "Blue Mountains Adventure",
        description: "Full day excursion to Blue Mountains. Scenic walks, cableway rides, and Aboriginal cultural experience."
      },
      {
        day: 4,
        title: "Great Barrier Reef",
        description: "Flight to Cairns. Luxury liveaboard experience with diving and snorkeling at Outer Reef."
      },
      {
        day: 5,
        title: "Daintree Rainforest",
        description: "Explore World Heritage-listed Daintree Rainforest. Wildlife spotting and Aboriginal cultural tours."
      },
      {
        day: 6,
        title: "Uluru Experience",
        description: "Flight to Ayers Rock. Private Uluru base walk and Kata Tjuta (The Olgas) exploration."
      },
      {
        day: 7,
        title: "Uluru Cultural Immersion",
        description: "Sunrise Uluru viewing, Aboriginal cultural performance, and dot painting workshop."
      },
      {
        day: 8,
        title: "Melbourne Discovery",
        description: "Flight to Melbourne. Private city tour including laneway exploration and cultural precincts."
      },
      {
        day: 9,
        title: "Great Ocean Road",
        description: "Scenic drive along Great Ocean Road. Visit Twelve Apostles and coastal villages."
      },
      {
        day: 10,
        title: "Kangaroo Island",
        description: "Ferry to Kangaroo Island. Wildlife encounters, seal watching, and gourmet food experiences."
      },
      {
        day: 11,
        title: "Melbourne Leisure",
        description: "Full day at leisure in Melbourne. Optional shopping, museums, or additional excursions."
      },
      {
        day: 12,
        title: "Departure",
        description: "Morning at leisure before private transfer to Melbourne Airport for international departure."
      }
    ],
    accommodation: {
      type: "Premium Hotels & Resorts",
      highlights: [
        "Harbour and city views",
        "Luxury eco-resorts in natural settings",
        "Award-winning dining experiences",
        "Spa and wellness facilities"
      ]
    },
    testimonials: [
      {
        name: "Dr. Amanda Foster",
        location: "Vancouver, Canada",
        rating: 5,
        text: "A meticulously planned journey that captured the true essence of Australia's natural wonders and cultural diversity."
      }
    ],
    trustSignals: {
      certifications: ["Ecotourism Certified", "Adventure Travel Specialist"],
      awards: ["Best Australian Tour 2023", "Sustainable Tourism Excellence"],
      partnerships: ["Australian Tourism Commission", "Indigenous Tourism Australia"]
    }
  }
];

// Validate and export packages
export const packages = rawPackages.map(validatePackage).filter(pkg => pkg !== null);

// Package categories for filtering
export const packageCategories = [
  { id: 'all', name: 'All Packages', count: packages.length },
  { id: 'cultural', name: 'Cultural Tours', count: packages.filter(p => p.category === 'cultural').length },
  { id: 'luxury', name: 'Luxury Experiences', count: packages.filter(p => p.category === 'luxury').length },
  { id: 'wellness', name: 'Wellness Retreats', count: packages.filter(p => p.category === 'wellness').length },
  { id: 'adventure', name: 'Adventure Tours', count: packages.filter(p => p.category === 'adventure').length }
];

