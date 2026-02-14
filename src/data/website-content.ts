
import { 
  CalendarCheck, 
  Home, 
  Microscope, 
  FileCheck, 
  Clock, 
  Users, 
  Shield 
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
