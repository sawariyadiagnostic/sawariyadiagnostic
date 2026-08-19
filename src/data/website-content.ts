
import { 
  CalendarCheck, 
  Home, 
  Microscope, 
  FileCheck, 
  Clock, 
  Users, 
  Shield,
  Activity,
  Heart,
  Dna,
  Stethoscope,
  Sparkles,
  Award
} from 'lucide-react';

export const navigation = {
  links: [
    { label: 'Tests', href: 'tests' },
    { label: 'About', href: 'about' },
    { label: 'Services', href: 'services' },
    { label: 'Our Team', href: 'team' },
    { label: 'Contact', href: 'contact' },
  ]
};

export const about = {
  journeySteps: [
    {
      icon: CalendarCheck,
      title: 'Book Online',
      description: 'Schedule your test online or call us anytime',
      color: 'accent-teal',
    },
    {
      icon: Home,
      title: 'Sample Collection',
      description: 'Our trained phlebotomist visits your home',
      color: 'accent-blue',
    },
    {
      icon: Microscope,
      title: 'Lab Analysis',
      description: 'Samples processed in our NABL certified lab',
      color: 'accent-emerald',
    },
    {
      icon: FileCheck,
      title: 'Get Reports',
      description: 'Receive results on WhatsApp & Email',
      color: 'accent-purple',
    },
  ],
  features: [
    'State-of-the-art equipment',
    'Experienced pathologists',
    'Quick turnaround time',
    'Affordable pricing',
    'Home sample collection',
    'Digital reports',
  ]
};

export const team = {
  members: [
    {
      name: 'Dr. Radhika Vashisth',
      role: 'Chief Pathologist',
      qualification: 'MBBS, MD (Pathology)',
      bio: 'Over 20 years of experience in clinical pathology and laboratory medicine.',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&auto=format',
    },
     {
      name: 'Dr. Ankit Sangwan',
      role: 'Microbiologist',
      qualification: 'MSc, PhD (Microbiology)',
      bio: 'Expert in infectious disease diagnostics and antimicrobial testing.',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&auto=format',
    },
    {
      name: 'Ms. Manisha Saini',
      role: 'Senior Medical Biochemist',
      qualification: 'MSc(Medical Biotechnology)',
      bio: 'Specialist in hormone analysis and metabolic disorders testing.',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&auto=format',
    },
  ]
};

export const contact = {
  infoCards: [
    {
      icon: FileCheck,
      title: 'Choose Your Tests',
      description: 'Select from our comprehensive test menu or health packages',
      color: 'accent-teal',
    },
    {
      icon: Home,
      title: 'Home or Lab Visit',
      description: 'Get sample collected at home or visit our nearest center',
      color: 'accent-blue',
    },
    {
      icon: Clock,
      title: 'Quick Reports',
      description: 'Receive accurate reports within 6-24 hours on WhatsApp',
      color: 'accent-emerald',
    },
  ]
};

export const hero = {
  trustIndicators: [
    {
      icon: Clock,
      title: 'Same Day',
      subtitle: 'Reports',
      color: 'accent-emerald'
    },
    {
      icon: Shield,
      title: '100% Accurate',
      subtitle: 'Results',
      color: 'accent-blue'
    },
    {
      icon: Users,
      title: '24/7 Support',
      subtitle: 'Available',
      color: 'accent-purple'
    }
  ]
};

export const footer = {
  description: "Sawariya Diagnostic is a premier NABL-accredited pathology lab in Charkhi Dadri, open 24*7 for accurate, timely, and trusted diagnostic services.",
  quickLinks: [
    { label: 'Home', href: 'hero' },
    { label: 'About Us', href: 'about' },
    { label: 'Services', href: 'services' },
    { label: 'Test Menu', href: 'tests' },
    { label: 'Contact & Map', href: 'contact' },
  ],
  services: [
    { label: 'Blood Testing', href: 'tests' },
    { label: 'Thyroid Profile', href: 'tests' },
    { label: 'Lipid Profile', href: 'tests' },
    { label: 'Diabetes Screening', href: 'tests' },
    { label: 'Home Collection', href: 'home-collection' },
  ],
  contact: {
    address: "Opposite R.S. Sangwan Hospital, Loharu Road, Charkhi Dadri, Haryana 127306",
    phone: "+91 99919 41207",
    emergencyPhone: "+91 70152 90782",
    whatsapp: "+91 99919 41207",
    email: "sawariyadiagnosticckd11@gmail.com",
    mapsLink: "https://maps.app.goo.gl/Kcxzwy1dq65FB6g8A",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d218.94865952338844!2d76.26119347664967!3d28.59441983972724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39128f006f7356b7%3A0x7cfffa574a7089ec!2sSAWARIYA%20DIAGNOSTIC%20LAB!5e0!3m2!1sen!2sin!4v1786996989470!5m2!1sen!2sin"
  }
};

export const services = {
  list: [
    {
      title: 'Clinical Pathology',
      description: 'Automated blood, fluid & cytology examination with multi-level QC calibration.',
      icon: Microscope,
      theme: {
        badge: 'bg-blue-50 text-blue-900 border-blue-200/80',
        iconBg: 'bg-blue-50 text-blue-800 border-blue-200/80 group-hover:bg-[#0A3663] group-hover:text-white',
        border: 'hover:border-blue-300 hover:shadow-[0_12px_28px_rgba(10,54,99,0.08)]',
        accentBar: 'bg-[#0A3663]',
      }
    },
    {
      title: 'Biochemistry & Metabolism',
      description: 'Kidney (KFT), Liver (LFT), Lipid profile & automated electrolyte panels.',
      icon: Activity,
      theme: {
        badge: 'bg-cyan-50 text-cyan-900 border-cyan-200/80',
        iconBg: 'bg-cyan-50 text-cyan-800 border-cyan-200/80 group-hover:bg-[#00A896] group-hover:text-white',
        border: 'hover:border-cyan-300 hover:shadow-[0_12px_28px_rgba(0,168,150,0.08)]',
        accentBar: 'bg-[#00A896]',
      }
    },
    {
      title: 'Microbiology & Cultures',
      description: 'Sterile culture, antibiotic sensitivity, fungal stains & infectious disease testing.',
      icon: Dna,
      theme: {
        badge: 'bg-emerald-50 text-emerald-900 border-emerald-200/80',
        iconBg: 'bg-emerald-50 text-emerald-800 border-emerald-200/80 group-hover:bg-[#0A6E5C] group-hover:text-white',
        border: 'hover:border-emerald-300 hover:shadow-[0_12px_28px_rgba(10,110,92,0.08)]',
        accentBar: 'bg-[#0A6E5C]',
      }
    },
    {
      title: 'Hematology & Coagulation',
      description: 'Complete CBC 5-part differential, ESR, PT-INR & blood disorder screening.',
      icon: FileCheck,
      theme: {
        badge: 'bg-purple-50 text-purple-900 border-purple-200/80',
        iconBg: 'bg-purple-50 text-purple-800 border-purple-200/80 group-hover:bg-[#581C87] group-hover:text-white',
        border: 'hover:border-purple-300 hover:shadow-[0_12px_28px_rgba(88,28,135,0.08)]',
        accentBar: 'bg-[#581C87]',
      }
    },
    {
      title: 'Hormone & Thyroid Profiles',
      description: 'Chemiluminescence T3, T4, TSH, fertility panels & endocrine biomarkers.',
      icon: Stethoscope,
      theme: {
        badge: 'bg-teal-50 text-teal-900 border-teal-200/80',
        iconBg: 'bg-teal-50 text-teal-800 border-teal-200/80 group-hover:bg-[#0D5C75] group-hover:text-white',
        border: 'hover:border-teal-300 hover:shadow-[0_12px_28px_rgba(13,92,117,0.08)]',
        accentBar: 'bg-[#0D5C75]',
      }
    },
    {
      title: 'Cardiovascular Risk Panels',
      description: 'High-sensitivity Troponin, Lipid fractions, Apolipoprotein & Homocysteine.',
      icon: Heart,
      theme: {
        badge: 'bg-amber-50 text-amber-900 border-amber-200/80',
        iconBg: 'bg-amber-50 text-amber-800 border-amber-200/80 group-hover:bg-[#B45309] group-hover:text-white',
        border: 'hover:border-amber-300 hover:shadow-[0_12px_28px_rgba(180,83,9,0.08)]',
        accentBar: 'bg-[#B45309]',
      }
    },
    {
      title: 'Immunology & Serology',
      description: 'Viral markers (HBsAg, HCV, HIV), Dengue NS1, Widal & autoimmune screening.',
      icon: Shield,
      theme: {
        badge: 'bg-rose-50 text-rose-900 border-rose-200/80',
        iconBg: 'bg-rose-50 text-rose-800 border-rose-200/80 group-hover:bg-[#831843] group-hover:text-white',
        border: 'hover:border-rose-300 hover:shadow-[0_12px_28px_rgba(131,24,67,0.08)]',
        accentBar: 'bg-[#831843]',
      }
    },
    {
      title: '24*7 Emergency Diagnostic Care',
      description: 'Immediate STAT turnaround for critical care, ICU referrals & trauma support.',
      icon: Sparkles,
      theme: {
        badge: 'bg-gradient-to-r from-teal-50 to-emerald-50 text-emerald-900 border-emerald-200/80',
        iconBg: 'bg-emerald-50 text-emerald-800 border-emerald-200/80 group-hover:bg-gradient-to-r group-hover:from-[#072448] group-hover:to-[#0A6E5C] group-hover:text-white',
        border: 'hover:border-emerald-400 hover:shadow-[0_12px_28px_rgba(10,110,92,0.12)]',
        accentBar: 'bg-gradient-to-r from-[#0A3663] to-[#0A6E5C]',
      }
    },
  ]
};

export const homeCollection = {
  title: "Home Collection Service",
  subtitle: "Get tested from the comfort of your home. Our trained phlebotomists ensure safe and hygienic sample collection.",
  features: [
    "Flexible Timing",
    "Hygienic Collection",
    "On-time Arrival",
    "Digital Reports"
  ]
};
