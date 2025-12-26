import React, { useState, useEffect, useRef } from 'react';
import { 
  Hammer, 
  Shield, 
  Ruler, 
  Phone, 
  Menu, 
  X, 
  Users, 
  Clock, 
  ChevronDown, 
  MapPin,
  HardHat,
  Home,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ExternalLink,
  Globe
} from 'lucide-react';
import { Metric, Service, HomeService, Project, FaqItem, Testimonial } from './types';

/* --- CONSTANTS --- */
// Since the logo is in the public folder, Vite serves it at the root path
const BRAND_LOGO_URL = '/logo.png';

/* --- TYPES --- */
type Language = 'en' | 'gu';

/* --- CUSTOM ICONS --- */

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

/* --- DATA --- */

const METRICS_EN: Metric[] = [
  { id: 1, label: 'Years Experience', value: 25, suffix: '+' }, 
  { id: 2, label: 'Projects Completed', value: 850, suffix: '+' },
  { id: 3, label: 'Builder Partners', value: 40, suffix: '+' },
  { id: 4, label: 'Cities Served', value: 5, suffix: '' },
];

const FAQS_EN: FaqItem[] = [
  { q: "What materials do you work with?", a: "We specialize in Mild Steel (MS), Stainless Steel (SS) 202 & 304, Cast Iron, and Wrought Iron." },
  { q: "Do you provide site visits?", a: "Yes. For builders, we do free site surveys to estimate bulk requirements." },
  { q: "What is your lead time?", a: "We prioritize deadlines. A typical 50-unit railing project can start delivery within 14 days." },
  { q: "Do you handle installation?", a: "Absolutely. Our quote includes fabrication, transport, and on-site installation by our team." },
];

const PROJECT_GALLERY_EN: Project[] = [
  { 
    id: 1, type: 'builder', category: 'Healthcare', title: 'BT Savani Hospital', location: 'Rajkot',
    thumbnail: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/other%20residence%20and%20industrial%20fabrication%20works/IMG-20240715-WA0034.jpg',
    media: [
      { type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/other%20residence%20and%20industrial%20fabrication%20works/IMG-20240715-WA0034.jpg', caption: 'Structural Framework' },
      { type: 'video', url: 'https://youtube.com/shorts/IuK6misntww', thumbnail: 'https://img.youtube.com/vi/IuK6misntww/0.jpg' }
    ]
  },
  {
    id: 12, type: 'home', category: 'Specialty', title: "Malani's Lighthouse", location: 'Race Course Road',
    thumbnail: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/1/IMG-20240715-WA0042.jpg',
    media: [{ type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/1/IMG-20240715-WA0042.jpg' }]
  },
  { 
    id: 2, type: 'home', category: 'Exterior', title: 'Farm House Elevation', location: 'Jamnagar Highway',
    thumbnail: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/farm%20house/IMG-20240715-WA0074.jpg',
    media: [{ type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/farm%20house/IMG-20240715-WA0074.jpg' }]
  },
  { 
    id: 4, type: 'home', category: 'Gates', title: 'Custom Metal Gates', location: 'Amin Marg',
    thumbnail: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/metal%20gate/IMG-20240715-WA0066.jpg',
    media: [{ type: 'image', url: 'https://raw.githubusercontent.com/Cybertron728/fabrication/main/images/metal%20gate/IMG-20240715-WA0066.jpg' }]
  }
];

const STATIC_TEXT = {
  en: {
    nav: { services: "Services", portfolio: "Portfolio", testimonials: "Testimonials", contact: "Contact", quote: "Get Quote" },
    hero: { since: "Since 1998", title: "Forging Strength.\nBuilding Trust.", desc: "Premium metal fabrication for Rajkot's finest builders and residences. Structural integrity meets artisan craft.", btn_visit: "Book Site Visit", btn_projects: "View Projects" },
    sections: { expertise_title: "Our Expertise", expertise_sub: "What We Do", builders_title: "For Builders", builders_sub: "Industrial & Commercial", home_title: "For Homeowners", home_sub: "Residential & Decor", custom_title: "Custom Request?", custom_desc: "If it's metal, we can build it.", custom_btn: "Contact Us", projects_title: "Featured Projects", projects_sub: "Our Work", watch_youtube: "Watch Video", testimonials_title: "Client Stories", testimonials_sub: "Testimonials", faq_title: "Common Questions", faq_sub: "FAQ" },
    footer: { desc: "Delivering structural excellence since 1998. Your partner for heavy fabrication and aesthetic metal works.", contact_title: "Contact", address_title: "Workshop", address: <>Street no.14 Nilkanth Park, Pushkardham Main Road, Rajkot</>, call_label: "Call Us", working_label: "Hours", working_days: <>Mon - Sat: 9 AM - 8 PM</>, closed_day: "Wed: Closed", links_title: "Links", links: ['Home', 'Services', 'Portfolio', 'Testimonials', 'Contact'], copyright: "BFW - Balaji Fabrication. All rights reserved." }
  },
  gu: {
    nav: { services: "સેવાઓ", portfolio: "પ્રોજેક્ટ્સ", testimonials: "અનુભવ", contact: "સંપર્ક", quote: "ભાવ જાણો" },
    hero: { since: "1998 થી", title: "મજબૂતીનું સર્જન.\nવિશ્વાસનું બંધન.", desc: "રાજકોટમાં બિલ્ડરો અને પ્રીમિયમ ઘરો માટે શ્રેષ્ઠ ફેબ્રિકેશન કામ.", btn_visit: "વિઝિટ બુક કરો", btn_projects: "પ્રોજેક્ટ્સ જુઓ" },
    sections: { expertise_title: "અમારી નિપુણતા", expertise_sub: "અમારી સેવાઓ", builders_title: "બિલ્ડરો માટે", builders_sub: "કોમર્શિયલ કામ", home_title: "ઘર માટે", home_sub: "ડેકોરેટિવ કામ", custom_title: "ખાસ પસંદગી?", custom_desc: "અમે તમારી કલ્પના મુજબનું કામ કરી આપીએ છીએ.", custom_btn: "સંપર્ક", projects_title: "અમારા પ્રોજેક્ટ્સ", projects_sub: "અમારું કામ", watch_youtube: "વીડિયો જુઓ", testimonials_title: "ગ્રાહક પ્રતિસાદ", testimonials_sub: "ટેસ્ટિમોનિયલ્સ", faq_title: "સામાન્ય પ્રશ્નો", faq_sub: "FAQ" },
    footer: { desc: "1998 થી ફેબ્રિકેશન ક્ષેત્રે અગ્રેસર.", contact_title: "સંપર્ક", address_title: "સરનામું", address: <>શેરી નં. ૧૪, નીલકંઠ પાર્ક, પુષ્કરધામ રોડ, રાજકોટ</>, call_label: "ફોન કરો", working_label: "સમય", working_days: <>સોમ - શનિ: 9 AM - 8 PM</>, closed_day: "બુધવારે રજા રહેશે", links_title: "લિંક્સ", links: ['હોમ', 'સેવાઓ', 'પ્રોજેક્ટ્સ', 'અનુભવ', 'સંપર્ક'], copyright: "BFW - બાલાજી ફેબ્રિકેશન. સર્વાધિકાર સુરક્ષિત." }
  }
};

/* --- COMPONENTS --- */

const AnimatedMetric: React.FC<Metric & { inView: boolean }> = ({ value, label, suffix, inView }) => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    let startTime: number | null = null;
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      setCurrent(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value, inView]);
  return (
    <div className="text-center">
      <p className="text-3xl font-black text-white">{current.toLocaleString()}{suffix}</p>
      <p className="text-xs text-slate-400 uppercase tracking-widest">{label}</p>
    </div>
  );
};

const SectionTitle: React.FC<{ title: string; subtitle: string; dark?: boolean }> = ({ title, subtitle, dark }) => (
  <div className="text-center mb-12">
    <div className="flex items-center justify-center gap-2 mb-2">
      <GadaIcon className={`w-5 h-5 ${dark ? 'text-orange-500' : 'text-orange-600'}`} />
      <span className={`font-bold uppercase tracking-widest text-sm ${dark ? 'text-orange-400' : 'text-orange-600'}`}>{subtitle}</span>
      <GadaIcon className={`w-5 h-5 transform scale-x-[-1] ${dark ? 'text-orange-500' : 'text-orange-600'}`} />
    </div>
    <h2 className={`text-3xl md:text-4xl font-black ${dark ? 'text-white' : 'text-slate-800'}`}>{title}</h2>
    <div className="h-1 w-20 bg-orange-600 mx-auto mt-4 rounded-full"></div>
  </div>
);

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [statsInView, setStatsInView] = useState(false);
  const [logoError, setLogoError] = useState(false);
  
  const statsRef = useRef<HTMLDivElement>(null);
  const t = STATIC_TEXT[language];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setStatsInView(true); }, { threshold: 0.1 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-100 selection:text-orange-900 ${language === 'gu' ? 'font-gujarati' : 'font-poppins'}`}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
             <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                {!logoError ? (
                  <img src={BRAND_LOGO_URL} alt="BFW" className="h-10 w-auto object-contain" onError={() => setLogoError(true)} />
                ) : (
                  <div className="flex items-center gap-2">
                     <div className="bg-orange-600 text-white p-2 rounded-lg"><GadaIcon className="w-6 h-6" /></div>
                     <span className="text-2xl font-black tracking-tighter">BFW</span>
                  </div>
                )}
             </div>

            <div className="hidden md:flex items-center gap-8">
                {['services', 'portfolio', 'testimonials', 'contact'].map((key) => (
                    <button key={key} onClick={() => scrollToSection(key)} className="text-sm font-bold uppercase tracking-widest text-slate-600 hover:text-orange-600 transition-colors">
                        {t.nav[key as keyof typeof t.nav]}
                    </button>
                ))}
                <button onClick={() => setLanguage(l => l === 'en' ? 'gu' : 'en')} className="flex items-center gap-1 text-slate-600 hover:text-orange-600 font-bold border-l pl-8 ml-2">
                    <Globe size={18} /><span>{language === 'en' ? 'GU' : 'EN'}</span>
                </button>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative bg-slate-950 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
             <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-20" alt="Welding" />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center md:text-left">
            <div className="max-w-3xl">
                <span className="inline-block bg-orange-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded mb-6">{t.hero.since}</span>
                <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 whitespace-pre-line">{t.hero.title}</h1>
                <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">{t.hero.desc}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <button onClick={() => scrollToSection('contact')} className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded font-bold text-lg shadow-xl transition-all active:scale-95">{t.hero.btn_visit}</button>
                    <button onClick={() => scrollToSection('portfolio')} className="bg-white/10 border border-white/20 px-8 py-4 rounded font-bold text-lg hover:bg-white/20 transition-all">{t.hero.btn_projects}</button>
                </div>
            </div>
        </div>
      </header>

      {/* Stats */}
      <section ref={statsRef} className="py-12 bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {METRICS_EN.map((m) => <AnimatedMetric key={m.id} {...m} inView={statsInView} />)}
        </div>
      </section>

      {/* Portfolio Grid */}
      <section id="portfolio" className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
            <SectionTitle title={t.sections.projects_title} subtitle={t.sections.projects_sub} dark />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
                {PROJECT_GALLERY_EN.map((project) => (
                    <div key={project.id} className="group relative aspect-square bg-slate-900 rounded overflow-hidden cursor-pointer" onClick={() => setActiveProject(project)}>
                        <img src={project.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={project.title} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end">
                            <span className="text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-1">{project.category}</span>
                            <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">{project.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-4">
            <SectionTitle title={t.sections.expertise_title} subtitle={t.sections.expertise_sub} />
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div className="p-8 bg-slate-50 rounded-xl border border-slate-100">
                    <HardHat className="text-orange-600 mb-6" size={40} />
                    <h3 className="text-2xl font-black mb-4">{t.sections.builders_title}</h3>
                    <p className="text-slate-500 leading-relaxed mb-6">{t.sections.builders_sub}</p>
                    <ul className="space-y-3">
                        {['Apartment Railings', 'Structural Frames', 'Safety Doors', 'Industrial Grills'].map(item => (
                            <li key={item} className="flex items-center gap-2 text-sm font-bold text-slate-700"><Shield size={14} className="text-orange-500" /> {item}</li>
                        ))}
                    </ul>
                </div>
                <div className="p-8 bg-orange-600 text-white rounded-xl shadow-2xl">
                    <Home className="mb-6" size={40} />
                    <h3 className="text-2xl font-black mb-4">{t.sections.home_title}</h3>
                    <p className="text-orange-100 leading-relaxed mb-6">{t.sections.home_sub}</p>
                    <button onClick={() => scrollToSection('contact')} className="bg-white text-orange-600 px-6 py-2 rounded font-black text-xs uppercase tracking-widest hover:bg-orange-50 transition-colors">Start Custom Project</button>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-950 text-white pt-20 pb-10">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-12 border-b border-slate-900 pb-20">
            <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                    <div className="bg-orange-600 text-white p-2 rounded-lg"><GadaIcon className="w-5 h-5" /></div>
                    <span className="text-2xl font-black tracking-tighter">BFW FABRICATION</span>
                </div>
                <p className="text-slate-400 max-w-md leading-relaxed mb-8">{t.footer.desc}</p>
                <div className="flex gap-4">
                    <a href="https://wa.me/918200460691" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-5 py-2 rounded text-sm font-bold transition-colors">
                        <WhatsAppIcon className="w-4 h-4" /> WhatsApp
                    </a>
                    <a href="tel:+919374126727" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-5 py-2 rounded text-sm font-bold transition-colors">
                        <Phone size={16} /> +91 93741 26727
                    </a>
                </div>
            </div>
            <div>
                <h4 className="font-black text-xs uppercase tracking-[0.2em] text-orange-500 mb-6">{t.footer.links_title}</h4>
                <ul className="space-y-4">
                    {t.footer.links.map((link, i) => (
                        <li key={link}><button onClick={() => scrollToSection(['home', 'services', 'portfolio', 'testimonials', 'contact'][i])} className="text-slate-400 hover:text-white transition-colors">{link}</button></li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className="font-black text-xs uppercase tracking-[0.2em] text-orange-500 mb-6">{t.footer.address_title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{t.footer.address}</p>
                <p className="text-white font-bold text-sm">{t.footer.working_days}</p>
                <p className="text-red-500 text-xs font-bold mt-1">{t.footer.closed_day}</p>
            </div>
        </div>
        <p className="text-center text-slate-600 text-xs mt-10 tracking-widest uppercase">{t.footer.copyright}</p>
      </footer>
    </div>
  );
};

export default App;
