import React, { useState, useEffect, useRef } from 'react';
import { 
  Hammer, 
  Shield, 
  Ruler, 
  Phone, 
  Menu, 
  X, 
  CheckCircle, 
  Users, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  MapPin,
  HardHat,
  Home,
  ArrowRight,
  User,
  Play,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ExternalLink,
  Globe
} from 'lucide-react';
import { Metric, Service, HomeService, Project, FaqItem, Testimonial } from './types';

/* --- CONSTANTS --- */
const BRAND_LOGO_URL = 'https://placeholder.com/bfw-logo.png'; // REPLACE THIS WITH YOUR PNG LOGO PATH

/* --- TYPES --- */
type Language = 'en' | 'gu';

/* --- CUSTOM ICONS --- */

// A stylized Gada (Mace) icon representing Strength (Used for Section Headers)
const GadaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C13.1 2 14 2.9 14 4V12C16.8 12.4 19 14.8 19 17.8C19 21.1 16.3 23.8 13 23.8C9.7 23.8 7 21.1 7 17.8C7 14.8 9.2 12.4 12 12V4C12 2.9 12.9 2 14 2H12ZM13 14C10.8 14 9 15.8 9 18C9 20.2 10.8 22 13 22C15.2 22 17 20.2 17 18C17 15.8 15.2 14 13 14Z" />
    <rect x="11" y="2" width="4" height="10" rx="1" />
  </svg>
);

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

/* --- UTILS --- */

const getYouTubeId = (url: string) => {
  const regExp = /^.*(?:youtu.be\/|v\/|e\/|u\/\w\/|embed\/|v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[1]?.length === 11) ? match[1] : null;
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};

/* --- DATA CONSTANTS (ENGLISH) --- */

const METRICS_EN: Metric[] = [
  { id: 1, label: 'Years Experience', value: 25, suffix: '+' }, 
  { id: 2, label: 'Projects Completed', value: 850, suffix: '+' },
  { id: 3, label: 'Builder Partners', value: 40, suffix: '+' },
  { id: 4, label: 'Cities Served', value: 5, suffix: '' },
];

const BUILDER_SERVICES_EN: Service[] = [
  {
    title: "Apartment Railings",
    desc: "Bulk production of SS and MS railings for high-rise apartments with uniform finish.",
    icon: <Ruler className="w-6 h-6" />
  },
  {
    title: "Structural Frames",
    desc: "Heavy-duty I-beam and channel fabrication for commercial structures and elevation.",
    icon: <Hammer className="w-6 h-6" />
  },
  {
    title: "Full Flat Fabrication", 
    desc: "Comprehensive metal works for apartment interiors and exteriors, including safety doors, grills, and partitions.", 
    icon: <Shield className="w-6 h-6" />
  },
  {
    title: "Site Fabrication",
    desc: "On-site welding teams equipped with advanced tools and extensive safety gear for seamless assembly.", 
    icon: <HardHat className="w-6 h-6" />
  }
];

const HOME_SERVICES_EN: HomeService[] = [
  { title: "Designer Gates", desc: "Laser cut and cast iron gates for robust home security." },
  { title: "Safety Grills", desc: "Aesthetic window grills that don't compromise on light." },
  { title: "Staircases", desc: "Spiral and straight metal staircases for duplex homes." },
];

const FAQS_EN: FaqItem[] = [
  { q: "What materials do you work with?", a: "We specialize in Mild Steel (MS), Stainless Steel (SS) 202 & 304, Cast Iron, and Wrought Iron." },
  { q: "Do you provide site visits?", a: "Yes. For builders, we do free site surveys to estimate bulk requirements. For homeowners, a nominal fee may apply which is adjusted in the final bill." },
  { q: "What is your lead time for builders?", a: "We prioritize builder deadlines. A typical 50-unit railing project can be delivered in phases starting from week 2." },
  { q: "Do you handle installation?", a: "Absolutely. Our quote includes end-to-end fabrication, transport, and on-site installation by our skilled team." },
  { q: "Do you take urgent orders?", a: "Yes, we have a dedicated 'Rapid Response' team for urgent fabrication needs." },
];

const TESTIMONIALS_EN: Testimonial[] = [
  { 
    name: "Ramesh Patel", 
    role: "Contractor, Sunrise Builders", 
    text: "BFW is the most reliable partner we've found. Their strength and timeline discipline is unmatched."
  },
  { 
    name: "Suresh Reddy", 
    role: "Site Engineer", 
    text: "Quality of welding and finishing is superior. They passed our structural audit without a single remark."
  },
  { 
    name: "Anjali Mehta", 
    role: "Home Owner", 
    text: "Beautiful gate design and very strong build quality. Highly recommended."
  },
];

const PROJECT_GALLERY_EN: Project[] = [
  { 
    id: 1, 
    type: 'builder', 
    category: 'Healthcare', 
    title: 'BT Savani Hospital', 
    location: 'Rajkot',
    thumbnail: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/other%20residence%20and%20industrial%20fabrication%20works/IMG-20240715-WA0034.jpg',
    media: [
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/other%20residence%20and%20industrial%20fabrication%20works/IMG-20240715-WA0034.jpg', caption: 'Structural Framework' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/other%20residence%20and%20industrial%20fabrication%20works/IMG-20240715-WA0035.jpg', caption: 'Heavy Duty Welding' },
      { type: 'video', url: 'https://youtube.com/shorts/IuK6misntww', thumbnail: 'https://img.youtube.com/vi/IuK6misntww/0.jpg', caption: 'Kidney Hospital Work 1' },
      { type: 'video', url: 'https://youtube.com/shorts/CXo6xsl41xw', thumbnail: 'https://img.youtube.com/vi/CXo6xsl41xw/0.jpg', caption: 'Kidney Hospital Work 2' }
    ]
  },
  {
    id: 12,
    type: 'home',
    category: 'Specialty',
    title: "Malani's Lighthouse Project",
    location: 'Race Course Road',
    thumbnail: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/1/IMG-20240715-WA0042.jpg',
    media: [
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/1/IMG-20240715-WA0042.jpg', caption: 'Exterior View' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/1/IMG-20240715-WA0044.jpg', caption: 'Detailing Work' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/1/Black%20Coloured.jpg', caption: 'Black Finish' },
      { type: 'video', url: 'https://youtube.com/shorts/BMvXezLZbSI', thumbnail: 'https://img.youtube.com/vi/BMvXezLZbSI/0.jpg', caption: 'Lighthouse Project View' }
    ]
  },
  { 
    id: 2, 
    type: 'home', 
    category: 'Exterior', 
    title: 'Farm House Elevation', 
    location: 'Jamnagar Highway',
    thumbnail: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/farm%20house/IMG-20240715-WA0074.jpg',
    media: [
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/farm%20house/IMG-20240715-WA0074.jpg', caption: 'Farm House Entrance' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/farm%20house/IMG-20240715-WA0077.jpg', caption: 'Perimeter Fencing' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/farm%20house/IMG-20240715-WA0078.jpg', caption: 'Structural Shades' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/farm%20house/IMG-20240715-WA0079.jpg', caption: 'Detail View' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/farm%20house/IMG-20240715-WA0080.jpg', caption: 'Side Elevation' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/farm%20house/IMG-20240715-WA0081.jpg', caption: 'Roof Structure' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/farm%20house/IMG-20240715-WA0082.jpg', caption: 'Wide Angle View' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/farm%20house/IMG-20240715-WA0083.jpg', caption: 'Finishing Touches' }
    ]
  },
  { 
    id: 3, 
    type: 'home', 
    category: 'Decoration', 
    title: 'Gazebo and Elevation Work', 
    location: 'Kalavad Road',
    thumbnail: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/gajiba%20and%20elevation/IMG-20240715-WA0069.jpg',
    media: [
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/gajiba%20and%20elevation/IMG-20240715-WA0069.jpg', caption: 'Gazebo Structure' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/gajiba%20and%20elevation/IMG-20240715-WA0070.jpg', caption: 'Elevation Framework' }
    ]
  },
  { 
    id: 4, 
    type: 'home', 
    category: 'Gates', 
    title: 'Custom Metal Gates', 
    location: 'Amin Marg',
    thumbnail: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/metal%20gate/IMG-20240715-WA0066.jpg',
    media: [
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/metal%20gate/IMG-20240715-WA0066.jpg', caption: 'Main Gate Design' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/metal%20gate/IMG-20240715-WA0067.jpg', caption: 'Laser Cut Details' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/metal%20gate/IMG-20240715-WA0092.jpg', caption: 'Installation View' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/metal%20gate/IMG-20241021-WA0009.jpg', caption: 'Completed Gate' },
      { type: 'video', url: 'https://youtube.com/shorts/lYG9EOUF2mM', thumbnail: 'https://img.youtube.com/vi/lYG9EOUF2mM/0.jpg', caption: 'Barricade Fabrication' }
    ]
  },
  { 
    id: 5, 
    type: 'builder', 
    category: 'Staircase', 
    title: 'Metal Staircase Fabrication', 
    location: 'Industrial Area',
    thumbnail: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/metal%20stairs/Stairs.jpg',
    media: [
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/metal%20stairs/Stairs.jpg', caption: 'Heavy Duty Staircase' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/metal%20stairs/Stairs2.jpg', caption: 'Side Profile' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/metal%20stairs/Stairs3.jpg', caption: 'Safety Railings' }
    ]
  },
  { 
    id: 6, 
    type: 'builder', 
    category: 'Industrial', 
    title: 'MS Flooring', 
    location: 'Metoda GIDC',
    thumbnail: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/ms%20floor/IMG-20240715-WA0015.jpg',
    media: [
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/ms%20floor/IMG-20240715-WA0015.jpg', caption: 'Mezzanine Flooring' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/ms%20floor/IMG-20240715-WA0016.jpg', caption: 'Support Structure' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/ms%20floor/IMG-20240715-WA0019.jpg', caption: 'Fabrication Process' },
      { type: 'video', url: 'https://youtube.com/shorts/ltweJynOREA', thumbnail: 'https://img.youtube.com/vi/ltweJynOREA/0.jpg', caption: 'MS Flooring Overview' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=KLG2BAjJuNg', thumbnail: 'https://img.youtube.com/vi/KLG2BAjJuNg/0.jpg', caption: 'Heavy Duty Floor Structure' },
      { type: 'video', url: 'https://youtu.be/wRHQbEXIjEw', thumbnail: 'https://img.youtube.com/vi/wRHQbEXIjEw/0.jpg', caption: 'On-site Welding Process' }
    ]
  },
  {
    id: 7,
    type: 'home',
    category: 'Roofing',
    title: 'Outdoor Safety Roofing', 
    location: 'University Road',
    thumbnail: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/roof%20and%20shades/IMG-20240715-WA0053.jpg',
    media: [
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/roof%20and%20shades/IMG-20240715-WA0053.jpg', caption: 'Terrace Roofing' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/roof%20and%20shades/IMG-20240715-WA0054.jpg', caption: 'Shade Structure' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/roof%20and%20shades/IMG-20240715-WA0056.jpg', caption: 'Installation' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/roof%20and%20shades/Transparent%20Patru.jpg', caption: 'Transparent Sheet' }
    ]
  },
  {
    id: 8,
    type: 'builder',
    category: 'Roofing',
    title: 'Roofing and Shade Structures',
    location: 'Shapar-Veraval',
    thumbnail: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/roof%20and%20shades/Krushna%20Patra%20on%20Plant.jpg',
    media: [
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/roof%20and%20shades/Krushna%20Patra%20on%20Plant.jpg', caption: 'Industrial Shed' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/roof%20and%20shades/Patra.jpg', caption: 'Roofing Sheets' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/roof%20and%20shades/Patra2.jpg', caption: 'Sheet Installation' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/roof%20and%20shades/IMG-20240715-WA0060.jpg', caption: 'Large Scale Roofing' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/roof%20and%20shades/IMG-20240715-WA0068.jpg', caption: 'Structural Supports' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/roof%20and%20shades/IMG-20240715-WA0073.jpg', caption: 'Side View' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/roof%20and%20shades/IMG-20240715-WA0075.jpg', caption: 'Exterior View' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/roof%20and%20shades/IMG-20240715-WA0076.jpg', caption: 'Finished Shed' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/roof%20and%20shades/IMG-20240715-WA0058.jpg', caption: 'Completed Roof' }
    ]
  },
  {
    id: 9,
    type: 'builder',
    category: 'Solar',
    title: 'Solar Roofing Solutions',
    location: 'Raiya Road',
    thumbnail: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/solar/Solar.jpg',
    media: [
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/solar/Solar.jpg', caption: 'Solar Structure Overview' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/solar/IMG-20240715-WA0032.jpg', caption: 'Mounting Frames' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/solar/IMG-20240715-WA0051.jpg', caption: 'Panel Installation' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/solar/IMG-20240715-WA0052.jpg', caption: 'Structural Alignment' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/solar/IMG-20240715-WA0063.jpg', caption: 'Finished Solar Roof' }
    ]
  },
  {
    id: 10,
    type: 'builder',
    category: 'Industrial',
    title: 'Industrial Heavy Fabrication',
    location: 'Lodhika GIDC',
    thumbnail: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/other%20residence%20and%20industrial%20fabrication%20works/IMG-20240715-WA0036.jpg',
    media: [
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/other%20residence%20and%20industrial%20fabrication%20works/IMG-20240715-WA0036.jpg', caption: 'Heavy Columns' },
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/other%20residence%20and%20industrial%20fabrication%20works/IMG-20240715-WA0037.jpg', caption: 'Truss Assembly' }
    ]
  },
  {
    id: 11,
    type: 'home',
    category: 'Residential',
    title: 'Residential Fabrication Project',
    location: '150ft Ring Road',
    thumbnail: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/other%20residence%20and%20industrial%20fabrication%20works/IMG-20240715-WA0085.jpg',
    media: [
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/other%20residence%20and%20industrial%20fabrication%20works/IMG-20240715-WA0085.jpg', caption: 'Residential Work' }
    ]
  }
];

/* --- DATA CONSTANTS (GUJARATI) --- */

const METRICS_GU: Metric[] = [
  { id: 1, label: 'વર્ષોનો અનુભવ', value: 25, suffix: '+' }, 
  { id: 2, label: 'પ્રોજેક્ટ્સ પૂર્ણ', value: 850, suffix: '+' },
  { id: 3, label: 'બિલ્ડર પાર્ટનર્સ', value: 40, suffix: '+' },
  { id: 4, label: 'શહેરોમાં સેવા', value: 5, suffix: '' },
];

const BUILDER_SERVICES_GU: Service[] = [
  {
    title: "એપાર્ટમેન્ટ રેલિંગ્સ",
    desc: "હાઈ-રાઈઝ એપાર્ટમેન્ટ માટે SS અને MS રેલિંગ્સનું જથ્થાબંધ ઉત્પાદન.",
    icon: <Ruler className="w-6 h-6" />
  },
  {
    title: "સ્ટ્રક્ચરલ ફ્રેમ્સ",
    desc: "કોમર્શિયલ સ્ટ્રક્ચર અને એલિવેશન માટે હેવી-ડ્યુટી I-બીમ અને ચેનલ ફેબ્રિકેશન.",
    icon: <Hammer className="w-6 h-6" />
  },
  {
    title: "ફ્લેટ ફેબ્રિકેશન", 
    desc: "એપાર્ટમેન્ટ ઈન્ટીરીયર અને એક્સટીરીયર માટે મેટલ કામ, જેમાં સેફ્ટી ડોર, ગ્રિલ અને પાર્ટીશન શામેલ છે.", 
    icon: <Shield className="w-6 h-6" />
  },
  {
    title: "સાઇટ ફેબ્રિકેશન",
    desc: "સીમલેસ એસેમ્બલી માટે આધુનિક સાધનો અને સુરક્ષા ગિયર સાથે ઓન-સાઇટ વેલ્ડિંગ ટીમ.", 
    icon: <HardHat className="w-6 h-6" />
  }
];

const HOME_SERVICES_GU: HomeService[] = [
  { title: "ડિઝાઇનર ગેટ્સ", desc: "ઘરની સુરક્ષા માટે લેસર કટ અને કાસ્ટ આયર્ન ગેટ્સ." },
  { title: "સેફ્ટી ગ્રિલ્સ", desc: "આકર્ષક વિન્ડો ગ્રિલ્સ જે પ્રકાશને અવરોધતી નથી." },
  { title: "સીડી (Staircases)", desc: "ડુપ્લેક્સ ઘરો માટે સ્પ સર્પાકાર અને સીધી મેટલ સીડી." },
];

const FAQS_GU: FaqItem[] = [
  { q: "તમે કયા મટિરિયલ્સ વાપરો છો?", a: "અમે માઈલ્ડ સ્ટીલ (MS), સ્ટેનલેસ સ્ટીલ (SS) 202 અને 304, કાસ્ટ આયર્ન અને રોટ આયર્નમાં કામ કરીએ છીએ." },
  { q: "શું તમે સાઈટ વિઝિટ કરો છો?", a: "હા. બિલ્ડરો માટે અમે મફત સાઈટ સર્વે કરીએ છીએ. ઘરમાલિકો માટે નોમિનલ ચાર્જ હોઈ શકે જે બિલમાં બાદ કરવામાં આવે છે." },
  { q: "બિલ્ડરો માટે કેટલો સમય લાગે છે?", a: "અમે બિલ્ડરની ડેડલાઈનને પ્રાથમિકતા આપીએ છીએ. 50-યુનિટ રેલિંગ પ્રોજેક્ટ બીજા અઠવાડિયાથી તબક્કાવાર આપી શકાય છે." },
  { q: "શું તમે ઇન્સ્ટોલેશન કરો છો?", a: "ચોક્કસ. અમારા ક્વોટમાં ફેબ્રિકેશન, ટ્રાન્સપોર્ટ અને અમારી કુશળ ટીમ દ્વારા ઇન્સ્ટોલેશન શામેલ છે." },
  { q: "શું તમે અર્જન્ટ ઓર્ડર લો છો?", a: "હા, અર્જન્ટ ફેબ્રિકેશન જરૂરિયાતો માટે અમારી પાસે 'રેપિડ રિસ્પોન્સ' ટીમ છે." },
];

const TESTIMONIALS_GU: Testimonial[] = [
  { 
    name: "રમેશ પટેલ", 
    role: "કોન્ટ્રાક્ટર, સનરાઈઝ બિલ્ડર્સ", 
    text: "BFW સૌથી ભરોસાપાત્ર પાર્ટનર છે. તેમની મજબૂતી અને સમયપાલન અજોડ છે."
  },
  { 
    name: "સુરેશ રેડ્ડી", 
    role: "સાઇટ એન્જિનિયર", 
    text: "વેલ્ડિંગ અને ફિનિશિંગની ગુણવત્તા શ્રેષ્ઠ છે. તેમણે સ્ટ્રક્ચરલ ઓડિટમાં એક પણ રીમાર્ક વિના પાસ કર્યું."
  },
  { 
    name: "અંજલિ મહેતા", 
    role: "ઘર માલિક", 
    text: "સુંદર ગેટ ડિઝાઇન અને ખૂબ મજબૂત બિલ્ડ ક્વોલિટી. ખૂબ આગ્રહણીય."
  },
];

const PROJECT_GALLERY_GU: Project[] = PROJECT_GALLERY_EN.map(p => {
  if (p.id === 2) return { ...p, title: 'Farm House Elevation' };
  return p;
});

/* --- STATIC UI TEXT --- */

const STATIC_TEXT = {
  en: {
    nav: {
      services: "Services",
      portfolio: "Portfolio",
      testimonials: "Testimonials",
      contact: "Contact",
      quote: "Get Quote"
    },
    hero: {
      since: "Since 1998",
      title: "Forging Strength.\nBuilding Trust.",
      desc: "Premium metal fabrication services for commercial builders and premium residences in Rajkot. We turn heavy metal into structural art.",
      btn_visit: "Book Site Visit",
      btn_projects: "View Projects"
    },
    sections: {
      expertise_title: "Our Expertise",
      expertise_sub: "What We Do",
      builders_title: "For Builders",
      builders_sub: "Industrial & Commercial",
      home_title: "For Homeowners",
      home_sub: "Residential & Decor",
      custom_title: "Custom Request?",
      custom_desc: "We can fabricate anything from metal.",
      custom_btn: "Contact Us",
      projects_title: "Featured Projects",
      projects_sub: "Our Work",
      watch_youtube: "Watch on YouTube",
      testimonials_title: "Client Stories",
      testimonials_sub: "Testimonials",
      faq_title: "Common Questions",
      faq_sub: "FAQ"
    },
    footer: {
      desc: "Delivering strength and precision in metal fabrication since 1998. Your trusted partner for heavy structural and decorative metal works.",
      contact_title: "Contact Us",
      address_title: "Workshop Address",
      address: <>Street no.14 Nilkanth Park,<br/>Pushkardham Main Road, Opp. Govt. Vegetable Market,<br/>Rajkot - 360005</>,
      call_label: "Call Us (9 AM - 8 PM)",
      working_label: "Working Hours",
      working_days: <>Mon, Tue, Thu - Sat:<br/>9:00 AM - 8:00 PM</>,
      closed_day: "Wed: Closed",
      links_title: "Quick Links",
      links: ['Home', 'Services', 'Portfolio', 'Testimonials', 'Contact'],
      copyright: "BFW - Balaji Fabrication. All rights reserved."
    }
  },
  gu: {
    nav: {
      services: "સેવાઓ",
      portfolio: "પ્રોજેક્ટ્સ",
      testimonials: "ગ્રાહકોનો અનુભવ",
      contact: "સંપર્ક",
      quote: "ભાવ જાણો"
    },
    hero: {
      since: "1998 થી કાર્યરત", 
      title: "મજબૂતીનું સર્જન.\nવિશ્વાસનું બંધન.",
      desc: "રાજકોટમાં બિલ્ડરો અને પ્રીમિયમ ઘરો માટે શ્રેષ્ઠ ફેબ્રિકેશન કામ. અમે લોખંડને કલાત્મક અને મજબૂત આકાર આપીએ છીએ.", 
      btn_visit: "સાઇટ વિઝિટ બુક કરો",
      btn_projects: "અમારા પ્રોજેક્ટ્સ જુઓ"
    },
    sections: {
      expertise_title: "અમારી નિપુણતા",
      expertise_sub: "અમારી સેવાઓ", 
      builders_title: "બિલ્ડરો માટે",
      builders_sub: "ઈન્ડસ્ટ્રિયલ અને કોમર્શિયલ", 
      home_title: "ઘર માટે", 
      home_sub: "રેસિડેન્શિયલ અને ડેકોર",
      custom_title: "તમારી વિશેષ પસંદગી?", 
      custom_desc: "અમે તમારી કલ્પના મુજબનું અજોડ ફેબ્રિકેશન કરી આપીએ છીએ.", 
      custom_btn: "સંપર્ક કરો",
      projects_title: "અમારા પ્રોજેક્ટ્સ", 
      projects_sub: "અમારું કામ",
      watch_youtube: "YouTube પર જુઓ",
      testimonials_title: "ગ્રાહકોનો અનુભવ", 
      testimonials_sub: "ટેસ્ટિમોનિયલ્સ",
      faq_title: "સામાન્ય પ્રશ્નો",
      faq_sub: "FAQ"
    },
    footer: {
      desc: "1998 થી ફેબ્રિકેશન ક્ષેત્રે અગ્રેસર. હેવી સ્ટ્રક્ચરલ અને ડેકોરેટિવ કામ માટે રાજકોટનું સૌથી વિશ્વાસપાત્ર નામ (BFW).", 
      contact_title: "સંપર્ક",
      address_title: "વર્કશોપનું સરનામું",
      address: <>શેરી નં. ૧૪, નીલકંઠ પાર્ક,<br/>પુષ્કરધામ મેઈન રોડ, સરકારી શાકભાજી માર્કેટ સામે,<br/>રાજકોટ - ૩૬૦૦૦૫</>,
      call_label: "ફોન કરો (9 AM - 8 PM)",
      working_label: "સમય",
      working_days: <>સોમ, મંગળ, ગુરુ - શનિ:<br/>9:00 AM - 8:00 PM</>,
      closed_day: "બુધવારે રજા રહેશે", 
      links_title: "ક્વિક લિંક્સ",
      links: ['હોમ', 'સેવાઓ', 'પ્રોજેક્ટ્સ', 'ગ્રાહકોનો અનુભવ', 'સંપર્ક'],
      copyright: "BFW (બી.એફ.ડબલ્યુ.) ફેબ્રિકેશન. સર્વાધિકાર સુરક્ષિત."
    }
  }
};

/* --- COMPONENTS --- */

interface AnimatedMetricProps {
  value: number;
  label: string;
  suffix: string;
  inView: boolean;
}

const AnimatedMetric: React.FC<AnimatedMetricProps> = ({ value, label, suffix, inView }) => {
  const [currentValue, setCurrentValue] = useState(0);
  
  useEffect(() => {
    if (!inView) return;

    let startTimestamp: number | null = null;
    const duration = 2000;
    let animationId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setCurrentValue(Math.floor(easeProgress * value));
      
      if (progress < 1) {
        animationId = window.requestAnimationFrame(step);
      } else {
        // Ensure accurate final value
        setCurrentValue(value);
      }
    };
    
    animationId = window.requestAnimationFrame(step);
    
    return () => {
      window.cancelAnimationFrame(animationId);
    };
  }, [value, inView]);

  return (
    <div className="text-center">
      <p className="text-2xl font-black text-white">
        {currentValue.toLocaleString()}
        {currentValue === value && suffix}
      </p>
      <p className="text-sm text-slate-400 uppercase tracking-wide">{label}</p>
    </div>
  );
};

interface SectionTitleProps {
  title: string;
  subtitle: string;
  centered?: boolean;
  dark?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, centered = true, dark = false }) => (
  <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
    <div className={`flex items-center ${centered ? 'justify-center' : 'justify-start'} gap-2 mb-2`}>
      {centered && <GadaIcon className={`w-6 h-6 ${dark ? 'text-orange-500' : 'text-orange-600'}`} />}
      <span className={`font-bold uppercase tracking-wider ${dark ? 'text-orange-400' : 'text-orange-600'}`}>
        {subtitle}
      </span>
      {centered && <GadaIcon className={`w-6 h-6 ${dark ? 'text-orange-500' : 'text-orange-600'} transform scale-x-[-1]`} />}
    </div>
    <h2 className={`text-3xl md:text-4xl font-extrabold ${dark ? 'text-white' : 'text-slate-800'}`}>
      {title}
    </h2>
    <div className={`h-1 w-24 bg-orange-500 mt-4 ${centered ? 'mx-auto' : ''} rounded-full`}></div>
  </div>
);

/* --- PROJECT MODAL COMPONENT --- */

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  t: any; // Translation object for modal specific text
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, t }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentMedia = project.media[currentIndex];

  const nextMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % project.media.length);
  };

  const prevMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + project.media.length) % project.media.length);
  };

  const youTubeId = currentMedia.type === 'video' ? getYouTubeId(currentMedia.url) : null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4" onClick={onClose}>
      
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-orange-500 transition-colors z-[70] p-2 bg-black/50 rounded-full"
      >
        <X size={32} />
      </button>

      {/* Main Content Container */}
      <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        
        {/* Media Viewer */}
        <div className="relative w-full flex items-center justify-center bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
          {currentMedia.type === 'video' && youTubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${youTubeId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`}
              title="YouTube video player"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : currentMedia.type === 'video' ? (
            <video 
              src={currentMedia.url} 
              controls 
              autoPlay 
              className="w-full h-full object-contain"
              poster={currentMedia.thumbnail}
            />
          ) : (
            <img 
              src={currentMedia.url} 
              alt={project.title} 
              className="w-full h-full object-contain"
            />
          )}

          {/* Navigation Arrows (Only if multiple items) */}
          {project.media.length > 1 && (
            <>
              <button 
                onClick={prevMedia}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-orange-600 transition-colors z-[70]"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextMedia}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-orange-600 transition-colors z-[70]"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {/* Info & Thumbnails Bar */}
        <div className="w-full mt-4 flex flex-col md:flex-row justify-between items-start text-white gap-4">
          <div>
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <div className="flex flex-wrap gap-2 items-center">
                <p className="text-orange-400 text-sm uppercase tracking-wide">{project.location} • {project.category}</p>
                {currentMedia.type === 'video' && (
                    <a 
                        href={currentMedia.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white text-xs flex items-center gap-1 border border-slate-600 rounded px-2 py-0.5 transition-colors"
                    >
                        <span>{t.watch_youtube}</span>
                        <ExternalLink size={10} />
                    </a>
                )}
            </div>
            {currentMedia.caption && <p className="text-slate-400 text-sm mt-1 italic">{currentMedia.caption}</p>}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-slate-500">{currentIndex + 1} / {project.media.length}</span>
          </div>
        </div>

        {/* Thumbnails Scroller (if > 1) */}
        {project.media.length > 1 && (
          <div className="w-full mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide justify-center">
            {project.media.map((item, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentIndex(idx)}
                className={`flex-shrink-0 w-20 h-16 rounded overflow-hidden border-2 transition-all ${idx === currentIndex ? 'border-orange-500 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
              >
                <img 
                  src={item.thumbnail || item.url} 
                  alt="thumb" 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [statsInView, setStatsInView] = useState(false);
  
  const statsRef = useRef<HTMLDivElement>(null);

  // Derived content based on language
  const t = STATIC_TEXT[language];
  const metrics = language === 'en' ? METRICS_EN : METRICS_GU;
  const builderServices = language === 'en' ? BUILDER_SERVICES_EN : BUILDER_SERVICES_GU;
  const homeServices = language === 'en' ? HOME_SERVICES_EN : HOME_SERVICES_GU;
  const projects = language === 'en' ? PROJECT_GALLERY_EN : PROJECT_GALLERY_GU;
  const faqs = language === 'en' ? FAQS_EN : FAQS_GU;
  const testimonials = language === 'en' ? TESTIMONIALS_EN : TESTIMONIALS_GU;

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'gu' : 'en');
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 ${language === 'gu' ? 'font-gujarati' : 'font-poppins'}`}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
            {/* Logo area - LINE 425 */}
             <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                <img 
                  src={BRAND_LOGO_URL} 
                  alt="BFW Logo" 
                  className="h-12 w-auto object-contain" 
                  onError={(e) => {
                    // Fallback UI if logo image fails to load
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.parentElement?.querySelector('.fallback-logo');
                    if (fallback) fallback.classList.remove('hidden');
                  }}
                />
                {/* Fallback Branding if image is missing */}
                <div className="fallback-logo hidden flex items-center gap-2">
                   <div className="bg-orange-600 text-white p-2 rounded-lg">
                      <GadaIcon className="w-6 h-6" />
                   </div>
                   <div className="flex flex-col leading-none">
                      <span className="text-2xl font-black tracking-tighter text-slate-900">BFW</span>
                      <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">Fabrication</span>
                   </div>
                </div>
             </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
                {['services', 'portfolio', 'testimonials', 'contact'].map((key) => (
                    <button 
                        key={key}
                        onClick={() => scrollToSection(key)}
                        className="text-sm font-bold uppercase tracking-wide text-slate-600 hover:text-orange-600 transition-colors"
                    >
                        {t.nav[key as keyof typeof t.nav]}
                    </button>
                ))}
                
                {/* Language Switcher */}
                <button 
                    onClick={toggleLanguage}
                    className="flex items-center gap-1 text-slate-600 hover:text-orange-600 transition-colors font-semibold"
                >
                    <Globe size={18} />
                    <span>{language === 'en' ? 'GU' : 'EN'}</span>
                </button>

                <button 
                    onClick={() => scrollToSection('contact')}
                    className="bg-orange-600 text-white px-6 py-2.5 rounded-full font-bold uppercase text-sm tracking-wide hover:bg-orange-700 transition-all shadow-lg shadow-orange-200"
                >
                    {t.nav.quote}
                </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-4 md:hidden">
                 <button 
                    onClick={toggleLanguage}
                    className="flex items-center gap-1 text-slate-600 font-bold"
                >
                    <Globe size={20} />
                    <span>{language === 'en' ? 'GU' : 'EN'}</span>
                </button>
                <button 
                    className="text-slate-800"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 p-4 flex flex-col gap-4 shadow-xl">
                {['services', 'portfolio', 'testimonials', 'contact'].map((key) => (
                    <button 
                        key={key}
                        onClick={() => scrollToSection(key)}
                        className="text-left py-2 font-bold text-slate-700 border-b border-slate-100 last:border-0"
                    >
                        {t.nav[key as keyof typeof t.nav]}
                    </button>
                ))}
            </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative bg-slate-900 text-white py-24 md:py-32 overflow-hidden text-center md:text-left">
        <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/60 z-10"></div>
             {/* Background Image Placeholder */}
             <img 
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80" 
                alt="Welding Background" 
                className="w-full h-full object-cover opacity-40"
             />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto md:mx-0">
                <div className="flex justify-center md:justify-start mb-6">
                    <div className="inline-flex items-center gap-2 bg-orange-600/20 border border-orange-500/30 rounded-full px-4 py-1.5 backdrop-blur-sm">
                        <Shield className="w-4 h-4 text-orange-400 animate-pulse" />
                        <span className="text-orange-300 text-xs font-bold uppercase tracking-wider">{t.hero.since}</span>
                    </div>
                </div>
                <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 whitespace-pre-line">
                    {t.hero.title}
                </h1>
                <p className="text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed mx-auto md:mx-0">
                    {t.hero.desc}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <button 
                        onClick={() => scrollToSection('contact')}
                        className="bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-900/50"
                    >
                        <Phone size={20} />
                        {t.hero.btn_visit}
                    </button>
                    <button 
                        onClick={() => scrollToSection('portfolio')}
                        className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
                    >
                        {t.hero.btn_projects}
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
      </header>

      {/* Stats Section */}
      <section ref={statsRef} className="py-12 bg-slate-950 border-b border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                {metrics.map((metric) => (
                    <AnimatedMetric 
                        key={metric.id}
                        {...metric}
                        inView={statsInView}
                    />
                ))}
            </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
            <SectionTitle 
                title={t.sections.expertise_title} 
                subtitle={t.sections.expertise_sub} 
            />

            <div className="grid md:grid-cols-2 gap-12 mt-16">
                {/* Builder Services */}
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-blue-100 text-blue-700 rounded-lg">
                            <HardHat size={28} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900">{t.sections.builders_title}</h3>
                            <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">{t.sections.builders_sub}</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        {builderServices.map((service, idx) => (
                            <div key={idx} className="flex gap-4 p-4 hover:bg-white rounded-xl transition-colors duration-300">
                                <div className="mt-1 text-orange-600 bg-orange-50 p-2 rounded-lg h-fit">
                                    {service.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-800 mb-1">{service.title}</h4>
                                    <p className="text-slate-600 leading-relaxed text-sm">{service.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Home Services */}
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                     <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-green-100 text-green-700 rounded-lg">
                            <Home size={28} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900">{t.sections.home_title}</h3>
                            <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">{t.sections.home_sub}</p>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {homeServices.map((service, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-orange-200 transition-colors">
                                <h4 className="font-bold text-lg text-slate-800 mb-2">{service.title}</h4>
                                <p className="text-slate-600 text-sm">{service.desc}</p>
                            </div>
                        ))}
                        {/* Add extra card for CTA */}
                         <div className="bg-orange-600 p-6 rounded-xl shadow-lg flex flex-col justify-center items-center text-center text-white">
                            <h4 className="font-bold text-lg mb-2">{t.sections.custom_title}</h4>
                            <p className="text-orange-100 text-sm mb-4">{t.sections.custom_desc}</p>
                            <button onClick={() => scrollToSection('contact')} className="bg-white text-orange-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-50 transition-colors">
                                {t.sections.custom_btn}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
            <SectionTitle 
                title={t.sections.projects_title} 
                subtitle={t.sections.projects_sub} 
                dark
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {projects.map((project) => (
                    <div 
                        key={project.id}
                        className="group relative bg-slate-800 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-300"
                        onClick={() => setActiveProject(project)}
                    >
                        <div className="aspect-[4/3] w-full overflow-hidden">
                            <img 
                                src={project.thumbnail} 
                                alt={project.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                            
                            {/* Type Badge */}
                            <div className="absolute top-4 left-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                    project.type === 'builder' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
                                }`}>
                                    {project.type}
                                </span>
                            </div>

                            {/* Media Count Badge */}
                            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold">
                                <Users size={12} className="opacity-0 w-0" />
                                <span>{project.media.length}</span>
                                <Maximize2 size={12} />
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-6">
                            <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-1">
                                {project.category}
                            </p>
                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">
                                {project.title}
                            </h3>
                            <div className="flex items-center gap-1 text-slate-400 text-sm">
                                <MapPin size={14} />
                                {project.location}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-orange-50">
        <div className="container mx-auto px-4 md:px-6">
            <SectionTitle 
                title={t.sections.testimonials_title} 
                subtitle={t.sections.testimonials_sub} 
            />

            <div className="grid md:grid-cols-3 gap-8 mt-12">
                {testimonials.map((t, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100 flex flex-col">
                        <div className="mb-6 text-orange-500">
                             {[1,2,3,4,5].map(star => (
                                 <span key={star} className="text-xl">★</span>
                             ))}
                        </div>
                        <p className="text-slate-700 italic mb-6 flex-grow">"{t.text}"</p>
                        <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                            <div className={`w-12 h-12 rounded-full overflow-hidden flex items-center justify-center border border-slate-100 shadow-sm text-sm font-black ${
                              ['bg-orange-100 text-orange-700', 'bg-blue-100 text-blue-700', 'bg-green-100 text-green-700'][i % 3]
                            }`}>
                                {getInitials(t.name)}
                            </div>
                            <div>
                                <h5 className="font-bold text-slate-900">{t.name}</h5>
                                <p className="text-xs text-slate-500 uppercase font-medium">{t.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
             <SectionTitle 
                title={t.sections.faq_title} 
                subtitle={t.sections.faq_sub} 
            />
            
            <div className="space-y-4 mt-12">
                {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden hover:border-orange-300 transition-colors">
                        <details className="group">
                            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 bg-slate-50 text-slate-800">
                                <span>{faq.q}</span>
                                <span className="transition group-open:rotate-180">
                                    <ChevronDown />
                                </span>
                            </summary>
                            <div className="text-slate-600 p-6 pt-0 bg-slate-50 border-t border-slate-100">
                                {faq.a}
                            </div>
                        </details>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className="bg-slate-950 text-white pt-24 pb-8">
        <div className="container mx-auto px-4 md:px-6 mb-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Brand - LINE 628 */}
                <div>
                     <div className="flex items-center gap-2 mb-6">
                        <img 
                          src={BRAND_LOGO_URL} 
                          alt="BFW Logo" 
                          className="h-10 w-auto object-contain brightness-0 invert" 
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.parentElement?.querySelector('.fallback-footer-logo');
                            if (fallback) fallback.classList.remove('hidden');
                          }}
                        />
                        <div className="fallback-footer-logo hidden flex items-center gap-2">
                            <div className="bg-orange-600 text-white p-2 rounded-lg">
                                <GadaIcon className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-xl font-black tracking-tighter text-white">BFW</span>
                                <span className="text-sm font-bold text-orange-500 tracking-wider uppercase">Fabrication</span>
                            </div>
                        </div>
                     </div>
                     <p className="text-slate-400 leading-relaxed mb-6">
                        {t.footer.desc}
                     </p>
                </div>

                {/* Contact Info */}
                <div className="lg:col-span-2">
                    <h4 className="text-lg font-bold mb-6 text-white">{t.footer.contact_title}</h4>
                    <div className="grid sm:grid-cols-2 gap-6">
                         <div className="flex gap-4">
                            <div className="mt-1">
                                <MapPin className="text-orange-500" />
                            </div>
                            <div>
                                <h5 className="font-bold text-white mb-1">{t.footer.address_title}</h5>
                                <p className="text-slate-400 text-sm">
                                    {t.footer.address}
                                </p>
                            </div>
                         </div>
                         <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <Phone className="text-orange-500 mt-1" />
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm text-slate-400">{t.footer.call_label}</p>
                                    <a href="tel:+919374126727" className="block font-bold text-lg hover:text-orange-400 transition-colors leading-tight">
                                        +91 93741 26727
                                    </a>
                                    <a href="https://wa.me/918200460691" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-bold text-lg hover:text-green-500 transition-colors leading-tight">
                                        <WhatsAppIcon className="w-5 h-5 text-green-500" />
                                        <span>+91 82004 60691</span>
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Clock className="text-orange-500 mt-1" />
                                <div>
                                    <p className="text-sm text-slate-400">{t.footer.working_label}</p>
                                    <p className="font-bold text-white">{t.footer.working_days}</p>
                                    <p className="text-red-400 font-bold mt-1">{t.footer.closed_day}</p>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-bold mb-6 text-white">{t.footer.links_title}</h4>
                     <ul className="space-y-3">
                        {t.footer.links.map((link: string, idx: number) => (
                            <li key={idx}>
                                <button onClick={() => scrollToSection(['services', 'portfolio', 'testimonials', 'contact'][idx-1] || 'home')} className="text-slate-400 hover:text-orange-500 transition-colors">
                                    {link}
                                </button>
                            </li>
                        ))}
                     </ul>
                </div>
            </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 pt-8 border-t border-slate-900 text-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} {t.footer.copyright}</p>
        </div>
      </footer>

      {/* Project Modal */}
      {activeProject && (
        <ProjectModal 
            project={activeProject} 
            onClose={() => setActiveProject(null)}
            t={t.sections}
        />
      )}
    </div>
  );
};

export default App;