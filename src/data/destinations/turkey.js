// Turkey Destination Data
// SASA TOURS AND TRAVELS - Istanbul Package

import {
  MapPin,
  Sun,
  Clock,
  Star,
  Plane,
  Home,
  Landmark,
  Waves,
  Camera,
  UtensilsCrossed,
  Check,
  Ship,
  History,
  Building2,
  Palmtree,
  Mountain,
  X
} from 'lucide-react';

// Turkey theme - Purple/Violet representing Ottoman architecture and majestic Istanbul skyline
export const turkeyTheme = {
  destinationName: 'Turkey',
  destinationId: 'turkey',
  primaryColor: 'from-violet-600',
  secondaryColor: 'to-purple-500',
  primaryGradientClass: 'from-violet-600 to-purple-600',
  secondaryGradientClass: 'from-violet-500 to-fuchsia-500',
  overlayGradient: 'from-violet-900/85 via-purple-900/80 to-fuchsia-900/75',
  scrollProgress: 'from-violet-600 to-purple-600',
  heroImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2000&auto=format&fit=crop',
  heroSubtitle: "Experience the magic of Istanbul - where East meets West. Explore ancient palaces, majestic mosques, and cruise the Bosphorus.",
  pageClass: 'from-violet-50/50 via-purple-50/30 to-fuchsia-50/50',
  cardGradient: 'from-violet-500 to-purple-500',
  accentColor: '#7c3aed',

  // Icon colors for itinerary
  iconColor: '#7c3aed',

  // Card border colors
  cardBorder: 'border-violet-100',

  // Tab colors
  tabActiveClass: 'bg-violet-500 text-white',
  tabInactiveClass: 'text-stone-600 hover:bg-violet-50',

  // Form colors
  formBgGradient: '#f5f3ff, #ede9fe, #faf5ff',
  borderColor: '#ddd6fe',
  headingColor: '#6d28d9',
  inputBorderColor: '#c4b5fd',
  successBgGradient: '#f5f3ff, #ede9fe, #faf5ff',
};

// Turkey hero stats
export const turkeyHeroStats = [
  { value: '5 Days / 4 Nights', label: 'Istanbul Package', icon: Clock },
  { value: '4-Star', label: 'Hotels', icon: Home },
  { value: '4', label: 'Sightseeing Tours', icon: Camera },
  { value: 'Meals', label: 'As per program', icon: UtensilsCrossed },
];

// Turkey itinerary data
export const turkeyItineraryData = [
  {
    day: 1,
    title: 'ARRIVAL - Istanbul',
    content: `The Private Transfer Will Start from Istanbul Airport to Your Hotel. It Will Take Around 1 Hr. 30 Min. According To Traffic. Have A Safe Journey.

Hotel Check In & Leisure Time

HOTEL OPTIONS:
- Dora Hotel Istanbul 4 Star (Option 1)
- Taksim Express Hotel 4 Star (Option 2)
- Metropolitan Taksim 4 Star (Option 3)`
  },
  {
    day: 2,
    title: 'OLD CITY TOUR & DINNER CRUISE',
    content: `Breakfast At The Hotel. Meet With Guide At Hotel Lobby. Pick Up From Hotel And Departure To Old City.

HIGHLIGHTS:
- Hagia Sophia (Outside Visit)
- Sultan Ahmed Mosque (Blue Mosque) (Outside Visit)
- Topkapi Palace (Outside Visit)
- Hippodrome
- Grand Bazaar (No Lunch)

End Of Tour, Drive Back To Hotel.

EVENING: DINNER CRUISE WITH SOFT DRINK
Meet With Guide At Hotel Lobby, Pick Up From Hotel And Departure To Harbor.

CRUISE HIGHLIGHTS:
- Sailing On Bosphorus
- Panoramic Tour Of Asia And Europe Continent
- Belly Dancer Show
- Turkish Folk Dances
- Dj Music Performance
- Dinner With Unlimited Soft Drinks

MENU:
- Cold Starters Plate
- Seasonal Salad
- Meatballs Or Grilled Chicken
- Turkish Desert Plate Or Fruit

End Of Tour, Drive Back To Hotel.`
  },
  {
    day: 3,
    title: 'PRINCES\' ISLAND TOUR',
    content: `Breakfast At The Hotel. Meet With Guide At Hotel Lobby. Pick Up From Hotel And Departure To Harbor.

HIGHLIGHTS:
- Sailing To Buyukada (Princes' Island)
- Passing Through Kinaliada, Burgazada, Heybeliada
- Lunch At The Local Restaurant
- Spare Time On Island With Marvelous Beauty

End Of Tour, Meet At The Harbor And Sailing To Istanbul. Drive Back To Hotel.`
  },
  {
    day: 4,
    title: 'DAILY BURSA TOUR',
    content: `Breakfast At The Hotel. Meet With Guide At Hotel Lobby. Pick Up From Hotel And Departure To Bursa (approximately 2 hours).

HIGHLIGHTS:
- Green Mosque & Tomb
- Inkaya Old Tree
- Uludag Mountain Cable Car
- Shopping Opportunities
- Lunch At Local Restaurant

End Of Tour, Drive Back To Istanbul Hotel.`
  },
  {
    day: 5,
    title: 'DEPARTURE',
    content: `Check Out from Hotel. Meet with Your Driver.

The Private Transfer Will Start from Your Hotel to Istanbul Airport. It Will Take Around 1 Hr. 30 Min. According To Traffic.

Have A Safe Flight!!!!`
  }
];

// Turkey highlights
export const turkeyHighlightsData = [
  {
    icon: Landmark,
    title: 'Hagia Sophia',
    description: 'Iconic Byzantine architectural masterpiece, a symbol of Istanbul\'s rich history.',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Waves,
    title: 'Bosphorus Cruise',
    description: 'Sail between Europe and Asia, witnessing stunning views of palaces and mosques.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: History,
    title: 'Topkapi Palace',
    description: 'The imperial residence of Ottoman sultans with magnificent courtyards and treasures.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Building2,
    title: 'Blue Mosque',
    description: 'The magnificent Sultan Ahmed Mosque with its iconic blue tiles and six minarets.',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Ship,
    title: 'Princes\' Islands',
    description: 'Peaceful car-free islands with Victorian-era houses and beautiful nature.',
    color: 'from-teal-500 to-emerald-500',
  },
  {
    icon: Mountain,
    title: 'Uludag Mountain',
    description: 'Cable car ride to the summit with panoramic views of the Sea of Marmara.',
    color: 'from-rose-500 to-pink-500',
  },
];

// Turkey inclusions
export const turkeyInclusionsData = [
  { icon: Check, text: 'Return airport transfers (Private basis)' },
  { icon: Check, text: 'Tours on SIC (Regular) basis' },
  { icon: Check, text: 'Transportation in air-conditioned, non-smoking luxury coach' },
  { icon: Check, text: 'Professional English speaking local guide' },
  { icon: Check, text: 'Entrance fees as mentioned in the itinerary' },
  { icon: Check, text: '4-Star hotel accommodation as detailed in itinerary' },
  { icon: Check, text: 'Meal plan as detailed in itinerary' },
  { icon: Check, text: 'Domestic & International flights' },
  { icon: Check, text: 'Turkey visas' },
];

// Turkey exclusions
export const turkeyExclusionsData = [
  { icon: X, text: 'Porterage at airports & hotels' },
  { icon: X, text: 'Any tips to driver & guide' },
  { icon: X, text: 'Personal expenses' },
  { icon: X, text: 'Travel insurance' },
];

// Turkey FAQs
export const turkeyFAQs = [
  {
    question: 'What is the best time to visit Istanbul?',
    answer: 'The best time to visit Istanbul is during spring (April-June) and autumn (September-November) when the weather is pleasant and tourist crowds are manageable.',
  },
  {
    question: 'Do I need a visa for Turkey?',
    answer: 'Most nationalities can obtain an e-visa online before travel. SASA TOURS assists with visa processing as part of the package.',
  },
  {
    question: 'Are the tours suitable for all ages?',
    answer: 'Yes, the tours are designed to be accessible. However, some walking is involved at historical sites. Please inform us of any mobility requirements.',
  },
  {
    question: 'What should I pack?',
    answer: 'Comfortable walking shoes, modest clothing for mosque visits, camera, and weather-appropriate clothing.',
  },
];

// Turkey policies
export const turkeyPolicies = [
  {
    title: 'Cancellation Policy',
    items: [
      'Any cancellation less than 15 days prior to arrival results in 50% payment of the entire booking',
      'Any cancellation less than 7 days prior to arrival, no-show or reduced stay results in 100% payment',
      'Full payment should be done before 15 days of arrival day',
    ],
  },
  {
    title: 'Important Notes',
    items: [
      'Topkapi Palace is closed every Tuesday',
      'Grand Bazaar is closed every Sunday',
      'SIC (Regular) Tours dates might change up to operation',
      'If guests miss the airport welcome sign and get taxi to Hotel, Transfer will be No Show',
    ],
  },
];

// Export all Turkey data
export const turkeyData = {
  theme: turkeyTheme,
  heroStats: turkeyHeroStats,
  itinerary: turkeyItineraryData,
  highlights: turkeyHighlightsData,
  inclusions: turkeyInclusionsData,
  exclusions: turkeyExclusionsData,
  faqs: turkeyFAQs,
  policies: turkeyPolicies,
  heroImage: turkeyTheme.heroImage,
  heroSubtitle: turkeyTheme.heroSubtitle,
  pageClass: turkeyTheme.pageClass,
};

export default turkeyData;

