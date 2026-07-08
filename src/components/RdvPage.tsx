import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Calendar as CalendarIcon, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  User, 
  Phone, 
  Mail, 
  MessageSquare, 
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Award
} from 'lucide-react';

interface RdvPageProps {
  onNavigate?: (page: 'accueil' | 'articles' | 'accompagnements' | 'ressources' | 'plan' | 'rdv') => void;
}

interface ServiceOption {
  id: string;
  title: string;
  duration: string;
  price: string;
  icon: string;
  description: string;
  target: string;
}

export function RdvPage({ onNavigate }: RdvPageProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<ServiceOption | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    childName: '',
    childAge: '',
    context: '',
    spiritualPreference: 'clinical', // clinical, christian, open
  });

  // Calendar State
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);

  const services: ServiceOption[] = [
    {
      id: 'guidance-parentale',
      title: 'Guidance Parentale Individuelle',
      duration: '60 min',
      price: 'Sur-mesure',
      icon: '🤝',
      description: 'Accompagnement ciblé pour décrypter les crises, poser des limites structurantes et restaurer la complicité au quotidien.',
      target: 'Parents de bébés, enfants ou adolescents'
    },
    {
      id: 'suivi-enfant',
      title: 'Suivi Psycho-Éducatif Enfant & Adolescent',
      duration: '45 min',
      price: 'Sur-mesure',
      icon: '🌸',
      description: 'Consultation d\'écoute active et d\'éveil pour aider l\'enfant à apprivoiser ses émotions (colères, angoisses, opposition).',
      target: 'Enfants de 2 à 18 ans'
    },
    {
      id: 'therapie-foyer',
      title: 'Consultation de Couple & Foyer',
      duration: '90 min',
      price: 'Sur-mesure',
      icon: '🏡',
      description: 'Médiation clinique pour rétablir une communication bienveillante, apaiser les conflits conjugaux et rebâtir le foyer.',
      target: 'Couples et familles'
    },
    {
      id: 'diagnostic-scolaire',
      title: 'Atelier / Collaboration Institutions',
      duration: 'Demi-journée',
      price: 'Sur devis',
      icon: '🏫',
      description: 'Intervention sur-mesure pour les écoles, crèches ou structures confessionnelles (Standard Divin Joyaux Précieux).',
      target: 'Écoles, Églises, Crèches, Orphelinats'
    }
  ];

  const timeSlots = [
    '09:00', '10:15', '11:30', '14:00', '15:15', '16:30', '17:45'
  ];

  // Generate days for calendar
  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of current month
    const firstDay = new Date(year, month, 1);
    // Last day of current month
    const lastDay = new Date(year, month + 1, 0);
    
    const days: Date[] = [];
    
    // Fill in days of the month
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d));
    }
    
    setDaysInMonth(days);
  }, [currentMonth]);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Determine if a day is in the past
  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Determine if day is Sunday (often closed or reserved)
  const isSunday = (date: Date) => {
    return date.getDay() === 0;
  };

  const formatDateFrench = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (service: ServiceOption) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleDateSelect = (date: Date) => {
    if (isPastDate(date) || isSunday(date)) return;
    setSelectedDate(date);
    setSelectedTime(null); // Reset selected time
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const nextToFormStep = () => {
    if (selectedDate && selectedTime) {
      setStep(3);
    }
  };

  const submitBooking = () => {
    if (!formData.fullName || !formData.phone || !formData.email) {
      alert('Veuillez remplir les informations obligatoires (Nom, Téléphone, Email).');
      return;
    }
    setStep(4);
  };

  // Generate prefilled WhatsApp message
  const getWhatsAppLink = () => {
    const serviceName = selectedService?.title || 'Consultation';
    const dateFormatted = formatDateFrench(selectedDate);
    const timeVal = selectedTime || '';
    const name = formData.fullName;
    const phoneNum = formData.phone;
    const childText = formData.childName 
      ? `concernant l'enfant ${formData.childName} (${formData.childAge} ans)` 
      : '';
    const spiritualText = formData.spiritualPreference === 'christian' 
      ? "avec une base de guidance chrétienne" 
      : formData.spiritualPreference === 'clinical' 
        ? "avec une base clinique de développement" 
        : "neutre";

    const text = `Bonjour Madame Lina NGUERELESSIO. Je souhaite confirmer ma demande de rendez-vous pour :\n\n🌟 *${serviceName}*\n📅 *Le ${dateFormatted}*\n⏰ *À ${timeVal}*\n\n*Informations client :*\n- Nom complet : ${name}\n- WhatsApp : ${phoneNum}\n- Préférence d'orientation : ${spiritualText}\n${childText ? `- Détail : ${childText}\n` : ''}\n*Contexte court :* ${formData.context || 'Aucun détail supplémentaire.'}\n\nMerci de me reconfirmer la disponibilité et les modalités de règlement.`;
    
    return `https://wa.me/237621479061?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto text-center font-friendly relative min-h-[80vh]">
      {/* Background magical glowing circles */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-mint/20 rounded-full filter blur-3xl opacity-40 -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-60 h-60 bg-coral/10 rounded-full filter blur-3xl opacity-30 -z-10 pointer-events-none" />

      {/* Title block */}
      <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-coral/10 text-coral text-xs font-bold uppercase tracking-wider mb-4 border border-coral/10"
        >
          <Sparkles size={12} className="animate-pulse" />
          <span>Planifier un instant précieux</span>
        </motion.div>

        <div className="relative inline-block">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-lead-green tracking-tight leading-tight"
          >
            Demande de Guidance <span className="text-coral underline decoration-[#ff9d00] decoration-wavy decoration-2">Parentale & Clinique</span>
          </motion.h1>
          {/* Floating spinning Teddy Bear */}
          <motion.div 
            className="absolute -top-12 -right-12 text-4xl hidden sm:block cursor-pointer select-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            whileHover={{ scale: 1.3 }}
          >
            🧸
          </motion.div>
          {/* Floating spinning Ticking Clock */}
          <motion.div 
            className="absolute -bottom-6 -left-12 text-4xl hidden sm:block cursor-pointer select-none"
            animate={{ rotate: [0, -15, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.3, rotate: 360 }}
          >
            ⏰
          </motion.div>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs sm:text-sm md:text-base text-lead-green/75 mt-4 max-w-2xl mx-auto font-medium leading-relaxed"
        >
          Prenez rendez-vous en ligne en 3 étapes simples. Lina NGUERELESSIO vous propose un accompagnement sur-mesure pour insuffler paix, harmonie et structure divine au sein de votre foyer.
        </motion.p>
      </div>

      {/* Progress Steps Header */}
      {step < 4 && (
        <div className="max-w-xl mx-auto mb-10 sm:mb-16 px-4">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-lead-green/10 -z-10" />
            
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center gap-1.5 bg-[#faf8f2] px-2 sm:px-4 z-10">
                <div 
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm border transition-all duration-300 ${
                    step >= s 
                      ? 'bg-lead-green text-white border-lead-green shadow-md scale-105' 
                      : 'bg-white text-lead-green/40 border-lead-green/10'
                  }`}
                >
                  {s}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  step >= s ? 'text-lead-green' : 'text-lead-green/40'
                }`}>
                  {s === 1 ? 'Service' : s === 2 ? 'Date & Heure' : 'Coordonnées'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main wizard wrapper */}
      <div className="max-w-4xl mx-auto bg-white border border-lead-green/10 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-12 shadow-sm relative">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: SERVICE SELECTION */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.4 }}
              className="text-left"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-lead-green mb-2 flex items-center gap-2">
                <span>🎯 Étape 1 :</span> Sélectionnez le type d'accompagnement
              </h2>
              <p className="text-xs sm:text-sm text-lead-green/70 mb-8 font-medium">
                Choisissez le format de consultation le plus adapté à votre besoin ou à la situation de votre foyer.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => handleServiceSelect(srv)}
                    className="group border border-lead-green/10 hover:border-coral p-6 sm:p-8 rounded-[2rem] bg-[#faf8f2]/30 hover:bg-white transition-all duration-300 cursor-pointer flex flex-col justify-between hover:shadow-md text-left relative overflow-hidden"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-3xl sm:text-4xl bg-white p-3 rounded-2xl shadow-xs border border-lead-green/5 group-hover:scale-110 transition-transform duration-300">
                          {srv.icon}
                        </div>
                        <span className="text-[10px] font-extrabold px-3 py-1 bg-mint/40 text-lead-green rounded-full uppercase tracking-wider">
                          {srv.duration}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-lead-green text-base sm:text-lg mb-2 group-hover:text-coral transition-colors">
                        {srv.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-lead-green/75 leading-relaxed mb-4 font-medium">
                        {srv.description}
                      </p>
                    </div>

                    <div className="border-t border-lead-green/5 pt-4 mt-2 flex justify-between items-center text-[11px] font-bold">
                      <span className="text-lead-green/50">Cible : <strong className="text-lead-green">{srv.target}</strong></span>
                      <span className="text-coral flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                        Continuer <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: DATE AND TIME SELECTION */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.4 }}
              className="text-left"
            >
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 text-xs font-bold text-lead-green/70 hover:text-coral transition-colors cursor-pointer"
                >
                  <ChevronLeft size={16} /> Retour au service
                </button>
                <span className="text-xs sm:text-sm font-extrabold text-coral bg-coral/10 px-3.5 py-1.5 rounded-full">
                  Service sélectionné : {selectedService?.title}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-lead-green mb-2 flex items-center gap-2">
                <span>📅 Étape 2 :</span> Choisissez la date & l'heure
              </h2>
              <p className="text-xs sm:text-sm text-lead-green/70 mb-8 font-medium">
                Veuillez indiquer un jour disponible (les lundis aux samedis) ainsi que le créneau horaire souhaité.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Visual Calendar */}
                <div className="lg:col-span-7 bg-[#faf8f2]/60 border border-lead-green/5 p-6 rounded-[2rem]">
                  <div className="flex justify-between items-center mb-6 font-bold text-lead-green">
                    <button 
                      onClick={handlePrevMonth}
                      className="p-2 bg-white border border-lead-green/10 rounded-full hover:text-coral transition-all cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="capitalize font-extrabold text-sm sm:text-base">
                      {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                    </span>
                    <button 
                      onClick={handleNextMonth}
                      className="p-2 bg-white border border-lead-green/10 rounded-full hover:text-coral transition-all cursor-pointer"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-2 mb-4 text-center text-[10px] font-extrabold text-lead-green/40 uppercase tracking-widest">
                    <span>Dim</span>
                    <span>Lun</span>
                    <span>Mar</span>
                    <span>Mer</span>
                    <span>Jeu</span>
                    <span>Ven</span>
                    <span>Sam</span>
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {/* Empty cells before the start of the month */}
                    {Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() }).map((_, idx) => (
                      <div key={`empty-${idx}`} />
                    ))}

                    {/* Active days in month */}
                    {daysInMonth.map((day, idx) => {
                      const isPast = isPastDate(day);
                      const isSun = isSunday(day);
                      const isSelected = selectedDate && selectedDate.toDateString() === day.toDateString();
                      const isDisabled = isPast || isSun;

                      return (
                        <button
                          key={`day-${idx}`}
                          disabled={isDisabled}
                          onClick={() => handleDateSelect(day)}
                          className={`aspect-square w-full rounded-xl sm:rounded-2xl flex flex-col items-center justify-center text-xs font-bold transition-all relative ${
                            isSelected
                              ? 'bg-lead-green text-white font-extrabold shadow-md scale-105'
                              : isDisabled
                                ? 'text-lead-green/20 bg-transparent cursor-not-allowed'
                                : 'bg-white hover:bg-mint/40 border border-lead-green/5 text-lead-green'
                          }`}
                        >
                          <span>{day.getDate()}</span>
                          {/* Indicator for today */}
                          {day.toDateString() === new Date().toDateString() && (
                            <span className={`w-1 h-1 rounded-full absolute bottom-1.5 ${isSelected ? 'bg-white' : 'bg-coral'}`} />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex gap-4 items-center justify-center text-[10px] font-bold text-lead-green/60">
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-sm bg-white border border-lead-green/10" />
                      <span>Disponible</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-sm bg-lead-green" />
                      <span>Sélectionné</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-sm bg-lead-green/5" />
                      <span>Fermé / Passé</span>
                    </div>
                  </div>
                </div>

                {/* Visual Time Picker */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full">
                  <div>
                    <h4 className="font-extrabold text-sm text-lead-green uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <Clock size={16} className="text-coral" /> Créneaux Disponibles
                    </h4>

                    {selectedDate ? (
                      <div className="grid grid-cols-2 gap-3">
                        {timeSlots.map((time) => {
                          const isSelected = selectedTime === time;
                          return (
                            <button
                              key={time}
                              onClick={() => handleTimeSelect(time)}
                              className={`py-3 px-4 rounded-xl text-xs font-extrabold tracking-wider transition-all cursor-pointer text-center border ${
                                isSelected
                                  ? 'bg-coral border-[#e05a47] text-white shadow-md scale-102'
                                  : 'bg-white border-lead-green/10 hover:border-lead-green/30 text-lead-green'
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center border border-dashed border-lead-green/15 rounded-2xl p-8 bg-[#faf8f2]/20 text-center text-lead-green/50">
                        <CalendarIcon size={32} className="mb-2 opacity-50 text-coral" />
                        <span className="text-xs font-bold leading-normal">Veuillez d'abord sélectionner un jour sur le calendrier.</span>
                      </div>
                    )}
                  </div>

                  {/* Summary Footer bar of step 2 */}
                  {selectedDate && selectedTime && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 p-5 bg-mint/20 border border-lead-green/5 rounded-2xl text-left"
                    >
                      <p className="text-[11px] font-extrabold text-lead-green/60 uppercase tracking-widest mb-1">Rendez-vous proposé :</p>
                      <p className="text-xs sm:text-sm font-extrabold text-lead-green">
                        📅 Le <span className="capitalize">{formatDateFrench(selectedDate)}</span> à ⏰ <span className="text-coral font-black">{selectedTime}</span>
                      </p>
                      
                      <button
                        onClick={nextToFormStep}
                        className="w-full mt-4 py-3.5 bg-lead-green text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-lead-green-dark shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        Continuer <ChevronRight size={14} />
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: CONTACT INFORMATION & INTAKE */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.4 }}
              className="text-left"
            >
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1 text-xs font-bold text-lead-green/70 hover:text-coral transition-colors cursor-pointer"
                >
                  <ChevronLeft size={16} /> Modifier la date et l'heure
                </button>
                <div className="text-right text-[10px] sm:text-xs font-bold text-lead-green/60">
                  <span className="capitalize font-black text-lead-green">{formatDateFrench(selectedDate)}</span> à <span className="text-coral font-black">{selectedTime}</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-lead-green mb-2 flex items-center gap-2">
                <span>👤 Étape 3 :</span> Vos coordonnées & informations
              </h2>
              <p className="text-xs sm:text-sm text-lead-green/70 mb-8 font-medium">
                Saisissez les informations de contact pour que nous puissions valider et préparer votre consultation clinique.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                {/* Left block : Personal info */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-extrabold text-lead-green uppercase tracking-wider flex items-center gap-1">
                      <User size={13} className="text-coral" /> Nom & Prénom du Parent <span className="text-coral">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Ex: Marie-Noëlle TCHOUPO"
                      className="w-full px-4 py-3 rounded-xl border border-lead-green/10 focus:border-coral outline-none bg-[#faf8f2]/30 focus:bg-white text-xs sm:text-sm text-lead-green font-semibold transition-all"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-extrabold text-lead-green uppercase tracking-wider flex items-center gap-1">
                      <Phone size={13} className="text-coral" /> Numéro WhatsApp (Requis) <span className="text-coral">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Ex: +237 621 47 90 61"
                      className="w-full px-4 py-3 rounded-xl border border-lead-green/10 focus:border-coral outline-none bg-[#faf8f2]/30 focus:bg-white text-xs sm:text-sm text-lead-green font-semibold transition-all"
                      required
                    />
                    <span className="text-[9px] text-lead-green/50 font-medium">Très important pour la mise en relation immédiate.</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-extrabold text-lead-green uppercase tracking-wider flex items-center gap-1">
                      <Mail size={13} className="text-coral" /> Adresse Email de contact <span className="text-coral">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Ex: marie@gmail.com"
                      className="w-full px-4 py-3 rounded-xl border border-lead-green/10 focus:border-coral outline-none bg-[#faf8f2]/30 focus:bg-white text-xs sm:text-sm text-lead-green font-semibold transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Right block : Family context & preference */}
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-extrabold text-lead-green uppercase tracking-wider">
                        Prénom de l'enfant (optionnel)
                      </label>
                      <input
                        type="text"
                        name="childName"
                        value={formData.childName}
                        onChange={handleInputChange}
                        placeholder="Ex: Noé"
                        className="w-full px-4 py-3 rounded-xl border border-lead-green/10 focus:border-coral outline-none bg-[#faf8f2]/30 focus:bg-white text-xs sm:text-sm text-lead-green font-semibold transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-extrabold text-lead-green uppercase tracking-wider">
                        Âge de l'enfant
                      </label>
                      <input
                        type="text"
                        name="childAge"
                        value={formData.childAge}
                        onChange={handleInputChange}
                        placeholder="Ex: 5 ans"
                        className="w-full px-4 py-3 rounded-xl border border-lead-green/10 focus:border-coral outline-none bg-[#faf8f2]/30 focus:bg-white text-xs sm:text-sm text-lead-green font-semibold transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-extrabold text-lead-green uppercase tracking-wider flex items-center gap-1">
                      <HelpCircle size={13} className="text-coral" /> Orientation d'accompagnement souhaitée
                    </label>
                    <select
                      name="spiritualPreference"
                      value={formData.spiritualPreference}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-lead-green/10 focus:border-coral outline-none bg-[#faf8f2]/30 focus:bg-white text-xs sm:text-sm text-lead-green font-semibold transition-all"
                    >
                      <option value="clinical">Approche Clinique Standard (Neurosciences & Psychologie du Développement)</option>
                      <option value="christian">Approche Clinique & Spirituelle (Selon le Standard Divin chrétien)</option>
                      <option value="open">Approche mixte libre ou neutre</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-extrabold text-lead-green uppercase tracking-wider flex items-center gap-1">
                      <MessageSquare size={13} className="text-coral" /> Présentation brève du problème
                    </label>
                    <textarea
                      name="context"
                      value={formData.context}
                      onChange={handleInputChange}
                      rows={2}
                      placeholder="Ex: Crises de colère répétées le soir, refus d'obéir et de dormir seul..."
                      className="w-full px-4 py-3 rounded-xl border border-lead-green/10 focus:border-coral outline-none bg-[#faf8f2]/30 focus:bg-white text-xs sm:text-sm text-lead-green font-semibold transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Action row step 3 */}
              <div className="mt-10 pt-6 border-t border-lead-green/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-[10px] sm:text-xs text-lead-green/60 font-medium flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-mint shrink-0" /> Les informations saisies restent strictement confidentielles sous secret clinique.
                </p>

                <button
                  onClick={submitBooking}
                  className="w-full sm:w-auto px-8 py-4 bg-coral text-white font-extrabold text-xs uppercase tracking-wider rounded-full hover:bg-lead-green shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 font-friendly"
                >
                  <CheckCircle size={14} /> Soumettre la demande ✦
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: CONFIRMATION & WHATSAPP REDIRECTION */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-6"
            >
              <div className="w-20 h-20 bg-mint/20 text-lead-green rounded-full flex items-center justify-center mx-auto mb-6 border border-lead-green/5">
                <CheckCircle size={44} className="text-[#1f4a38]" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-lead-green tracking-tight leading-snug mb-3 font-friendly">
                Demande de réservation enregistrée !
              </h2>
              <p className="text-xs sm:text-sm text-lead-green/75 max-w-2xl mx-auto leading-relaxed mb-8 font-medium">
                Votre créneau a été pré-réservé avec succès dans l'agenda de Lina. Pour sécuriser définitivement votre consultation et valider les modalités pratiques, veuillez envoyer la confirmation via WhatsApp d'un simple clic.
              </p>

              {/* Quick Summary Ticket card */}
              <div className="max-w-md mx-auto bg-[#faf8f2]/80 border border-lead-green/5 p-6 rounded-[2rem] text-left mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-coral/5 rounded-full filter blur-xl opacity-30 -z-10" />
                <span className="text-[9px] uppercase font-bold tracking-widest text-coral border border-coral/10 bg-coral/5 px-2.5 py-1 rounded-full inline-block mb-4">Ticket de pré-réservation</span>
                
                <h3 className="font-extrabold text-sm sm:text-base text-lead-green mb-3 leading-tight">
                  {selectedService?.title}
                </h3>

                <div className="flex flex-col gap-2 border-t border-lead-green/5 pt-3 text-xs text-lead-green/80 font-medium">
                  <div className="flex justify-between">
                    <span>📅 Date :</span>
                    <strong className="text-lead-green capitalize">{formatDateFrench(selectedDate)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>⏰ Heure :</span>
                    <strong className="text-lead-green">{selectedTime}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>👤 Client :</span>
                    <strong className="text-lead-green">{formData.fullName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>📞 WhatsApp :</span>
                    <strong className="text-lead-green">{formData.phone}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>📋 Orientation :</span>
                    <strong className="text-lead-green">
                      {formData.spiritualPreference === 'christian' ? 'Base chrétienne' : formData.spiritualPreference === 'clinical' ? 'Base clinique' : 'Standard'}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 max-w-md mx-auto items-center">
                {/* WHATSAPP CTA - Primary action */}
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#25D366] text-white font-extrabold text-sm uppercase tracking-wider rounded-full shadow-lg hover:bg-lead-green transition-all transform hover:-translate-y-0.5 duration-300 flex items-center justify-center gap-2.5 cursor-pointer font-friendly"
                >
                  <span className="text-xl">📲</span> Confirmer par WhatsApp (1 clic)
                </a>

                {/* Return home secondary button */}
                <button
                  onClick={() => onNavigate?.('accueil')}
                  className="text-xs font-bold text-lead-green/60 hover:text-coral transition-colors underline cursor-pointer"
                >
                  Retourner à la page d'accueil de l'éveil
                </button>
              </div>

              <div className="mt-12 max-w-xl mx-auto p-4 sm:p-6 bg-lead-green/5 border border-lead-green/5 rounded-2xl text-left flex items-start gap-3">
                <AlertCircle size={18} className="text-coral shrink-0 mt-0.5" />
                <div className="text-[10px] sm:text-xs text-lead-green/75 leading-relaxed font-medium">
                  <strong className="text-lead-green">Note importante :</strong> Les consultations se déroulent en visioconférence sécurisée (Zoom / WhatsApp Video) ou en présentiel à Douala (selon accord). Les instructions de règlement (Orange Money / MTN Mobile Money / Wave) vous seront transmises directement lors de la prise de contact WhatsApp.
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Trust Badges */}
      <div className="max-w-4xl mx-auto mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 font-friendly text-left border-t border-lead-green/5 pt-12">
        <div className="flex items-start gap-3.5 bg-white p-5 rounded-2xl border border-lead-green/5">
          <div className="p-2.5 bg-mint/20 text-lead-green rounded-xl shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-lead-green mb-1">Secret Professionnel</h4>
            <p className="text-[11px] text-lead-green/70 leading-normal font-medium">Échanges cliniques strictement protégés, garantissant une confidentialité absolue pour votre famille.</p>
          </div>
        </div>

        <div className="flex items-start gap-3.5 bg-white p-5 rounded-2xl border border-lead-green/5">
          <div className="p-2.5 bg-coral/10 text-coral rounded-xl shrink-0">
            <Award size={18} />
          </div>
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-lead-green mb-1">Rigueur Universitaire</h4>
            <p className="text-[11px] text-lead-green/70 leading-normal font-medium">Chaque clé s'appuie sur la psychologie du développement cognitif de l'enfant et les neurosciences cliniques.</p>
          </div>
        </div>

        <div className="flex items-start gap-3.5 bg-white p-5 rounded-2xl border border-lead-green/5">
          <div className="p-2.5 bg-[#ff9d00]/10 text-[#a16207] rounded-xl shrink-0">
            <Heart size={18} />
          </div>
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-lead-green mb-1">Soutien Sur-Mesure</h4>
            <p className="text-[11px] text-lead-green/70 leading-normal font-medium">Un dialogue adapté à votre rythme familial et orienté vers une mise en pratique sereine et efficace.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
