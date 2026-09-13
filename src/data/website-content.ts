
import { siteConfig } from '@/config/site';
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
      title: 'Appointment Request',
      description: 'Contact the lab to ask about appointment options',
      color: 'accent-teal',
    },
    {
      icon: Home,
      title: 'Sample Collection',
      description: 'Home collection can be requested through the appointment desk',
      color: 'accent-blue',
    },
    {
      icon: Microscope,
      title: 'Lab Analysis',
      description: "Samples handled according to the lab's documented process",
      color: 'accent-emerald',
    },
    {
      icon: FileCheck,
      title: 'Report Assistance',
      description: 'Contact the lab through configured channels for report assistance',
      color: 'accent-purple',
    },
  ],
  features: [
    'Documented laboratory process',
    'Clinical review available on request',
    'Current estimate',
    'Affordable pricing',
    'Home sample collection',
    'Report assistance',
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
      title: 'Report assistance',
      description: 'Receive report assistance through the configured lab workflow',
      color: 'accent-emerald',
    },
  ]
};

export const hero = {
  trustIndicators: [
    {
      icon: Clock,
      title: 'Current scope',
      subtitle: 'Confirm with the lab',
      color: 'accent-emerald'
    },
    {
      icon: Shield,
      title: 'Documented process',
      subtitle: 'Review on request',
      color: 'accent-blue'
    },
    {
      icon: Users,
      title: 'Lab contact',
      subtitle: 'Ask for current details',
      color: 'accent-purple'
    }
  ]
};

export const footer = {
  description: `${siteConfig.name} provides patient-focused diagnostic testing and home sample collection in ${siteConfig.location.city}.`,
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
    address: siteConfig.location.address,
    phone: siteConfig.contact.phone,
    emergencyPhone: siteConfig.contact.emergencyPhone,
    whatsapp: siteConfig.contact.whatsapp,
    email: siteConfig.contact.email,
    mapsLink: siteConfig.location.mapsUrl,
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d218.94865952338844!2d76.26119347664967!3d28.59441983972724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39128f006f7356b7%3A0x7cfffa574a7089ec!2sSAWARIYA%20DIAGNOSTIC%20LAB!5e0!3m2!1sen!2sin!4v1786996989470!5m2!1sen!2sin"
  }
};

export const services = {
  list: [
    {
      title: 'Clinical Pathology',
      description: 'Blood, fluid & cytology examination; confirm current scope with the lab.',
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
      description: 'Kidney (KFT), Liver (LFT), Lipid profile & electrolyte panels; confirm current scope with the lab.',
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
      description: 'Culture, antibiotic sensitivity, fungal stains & infectious disease testing; confirm current scope with the lab.',
      icon: Dna,
      theme: {
        badge: 'bg-green-50 text-green-900 border-green-200/80',
        iconBg: 'bg-green-50 text-green-800 border-green-200/80 group-hover:bg-[#0A6E5C] group-hover:text-white',
        border: 'hover:border-green-300 hover:shadow-[0_12px_28px_rgba(10,110,92,0.08)]',
        accentBar: 'bg-[#0A6E5C]',
      }
    },
    {
      title: 'Hematology & Coagulation',
      description: 'Complete CBC 5-part differential, ESR, PT-INR & blood disorder screening.',
      icon: FileCheck,
      theme: {
        badge: 'bg-[#F4EEEA] text-[#7A4B2A] border-[#D7C7B8]',
        iconBg: 'bg-[#F4EEEA] text-[#7A4B2A] border-[#D7C7B8] group-hover:bg-[#581C87] group-hover:text-white',
        border: 'hover:border-[#C5AA95] hover:shadow-[0_12px_28px_rgba(88,28,135,0.08)]',
        accentBar: 'bg-[#581C87]',
      }
    },
    {
      title: 'Hormone & Thyroid Profiles',
      description: 'Chemiluminescence T3, T4, TSH, fertility panels & endocrine biomarkers.',
      icon: Stethoscope,
      theme: {
        badge: 'bg-blue-50 text-blue-900 border-blue-200/80',
        iconBg: 'bg-blue-50 text-blue-800 border-blue-200/80 group-hover:bg-[#0D5C75] group-hover:text-white',
        border: 'hover:border-blue-300 hover:shadow-[0_12px_28px_rgba(13,92,117,0.08)]',
        accentBar: 'bg-[#0D5C75]',
      }
    },
    {
      title: 'Cardiovascular Risk Panels',
      description: 'High-sensitivity Troponin, Lipid fractions, Apolipoprotein & Homocysteine.',
      icon: Heart,
      theme: {
        badge: 'bg-[#FFF9F3] text-[#7A4B2A] border-[#D7C7B8]',
        iconBg: 'bg-[#FFF9F3] text-[#7A4B2A] border-[#D7C7B8] group-hover:bg-[#B45309] group-hover:text-white',
        border: 'hover:border-[#C5AA95] hover:shadow-[0_12px_28px_rgba(180,83,9,0.08)]',
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
      title: 'Priority Diagnostic Requests',
      description: 'Priority requests are handled subject to current lab capacity and confirmation.',
      icon: Sparkles,
      theme: {
        badge: 'bg-gradient-to-r from-teal-50 to-emerald-50 text-green-900 border-green-200/80',
        iconBg: 'bg-green-50 text-green-800 border-green-200/80 group-hover:bg-gradient-to-r group-hover:from-[#072448] group-hover:to-[#0A6E5C] group-hover:text-white',
        border: 'hover:border-emerald-400 hover:shadow-[0_12px_28px_rgba(10,110,92,0.12)]',
        accentBar: 'bg-gradient-to-r from-[#0A3663] to-[#0A6E5C]',
      }
    },
  ]
};

export const homeCollection = {
  title: "Home Collection Service",
  subtitle: "Request home collection through the appointment desk; timing and service availability require confirmation.",
  features: [
    "Timing subject to confirmation",
    "Collection process to be confirmed",
    "Arrival subject to confirmation",
    "Report assistance"
  ]
};
