import { Map, Users, Phone, Leaf, TrendingUp, Mountain, Ship, Aperture, Building2,
  Star,
  Hammer,
  BookOpen,
  Heart,
  Sparkles,
  Sun,
  Waves,
  Gamepad2,
  GraduationCap,
  Globe,
  Bike,
  Tent,
  TreePine,
  Brain,
  PersonStanding,
  Award,
  Clock,
  MapPin,
  Shield,
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  FileText,
  Mail,
  Send,
  AlertCircle,
} from 'lucide-react';

// All icons consolidated for easy lookup - single source of truth
const ALL_ICONS = {
  // Why Choose Us
  ExpertLocalKnowledge: Map,
  PersonalizedService: Users,
  Support247: Phone,
  SustainableTourism: Leaf,

  // Service Categories
  AdventureTours: TrendingUp,
  CulturalExperiences: Building2,
  WellnessRetreats: Heart,
  FamilyHolidays: PersonStanding,

  // Adventure Tours
  Trekking: Mountain,
  MountainBiking: Bike,
  Rafting: Waves,
  Paragliding: Aperture,

  // Cultural Experiences
  TempleTours: Building2,
  FestivalParticipation: Star,
  LocalWorkshops: Hammer,
  HeritageSites: BookOpen,

  // Wellness Retreats
  YogaRetreats: Brain,
  MeditationCenters: Sparkles,
  SpaTreatments: Heart,
  NatureTherapy: TreePine,

  // Family Holidays
  FamilyPackages: Users,
  KidsActivities: Gamepad2,
  EducationalTours: GraduationCap,
  BeachResorts: Sun,

  // Additional icons
  Award: Award,
  Clock: Clock,
  MapPin: MapPin,
  Shield: Shield,
  Globe: Globe,
  Ship: Ship,
  Tent: Tent,

  // Contact & UI Icons
  CheckCircle: CheckCircle,
  XCircle: XCircle,
  ChevronRight: ChevronRight,
  ChevronLeft: ChevronLeft,
  MessageCircle: MessageCircle,
  FileText: FileText,
  Mail: Mail,
  Send: Send,
  AlertCircle: AlertCircle,
};

/**
 * Get an icon component by name
 * @param {string} iconName - The name of the icon to resolve
 * @param {string} [className="w-6 h-6"] - CSS classes for the icon
 * @returns {JSX.Element|null} The icon component or null if not found
 */
export const getIcon = (iconName, className = "w-6 h-6") => {
  const IconComponent = ALL_ICONS[iconName];
  if (!IconComponent) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Icon "${iconName}" not found in Icons.jsx`);
    }
    return null;
  }
  return <IconComponent className={className} />;
};

/**
 * Get icon component directly (for advanced use cases)
 * @param {string} iconName - The name of the icon
 * @returns {React.Component|null} The icon component or null if not found
 */
export const getIconComponent = (iconName) => {
  return ALL_ICONS[iconName] || null;
};

// Export individual icons for direct use when needed
export {
  Map,
  Users,
  Phone,
  Leaf,
  TrendingUp,
  Mountain,
  Ship,
  Aperture,
  Building2,
  Star,
  Hammer,
  BookOpen,
  Heart,
  Sparkles,
  Sun,
  Waves,
  Gamepad2,
  GraduationCap,
  Globe,
  Bike,
  Tent,
  TreePine,
  Brain,
  PersonStanding,
  Award,
  Clock,
  MapPin,
  Shield,
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  FileText,
  Mail,
  Send,
  AlertCircle,
};

export default getIcon;

