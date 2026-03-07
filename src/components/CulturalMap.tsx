import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Utensils, Palette, User, X, ChevronRight, Sparkles, Star } from 'lucide-react';
import { HandwrittenNote } from './HandwrittenNote';

const regionData: Record<string, any> = {
  'Rajasthan': {
    crafts: ['Blue Pottery', 'Meenakari Jewelry', 'Hand-block Printing'],
    foods: ['Ghevar', 'Dal Baati Churma', 'Ker Sangri'],
    artisans: ['Ananya Sharma', 'Priya Das'],
    description: 'The Land of Kings, known for its vibrant colors and desert heritage.',
    color: '#E67E22',
    note: 'The desert blooms in cobalt blue here.'
  },
  'Karnataka': {
    crafts: ['Mysore Silk', 'Channapatna Toys', 'Sandalwood Carving'],
    foods: ['Mysore Pak', 'Bisi Bele Bath', 'Dharwad Pedha'],
    artisans: ['Lakshmi Devi', 'Suresh Gowda'],
    description: 'A blend of ancient empires and modern innovation, rich in silk and sandalwood.',
    color: '#6B1D1D',
    note: 'Scent of sandalwood in every breeze.'
  },
  'Uttar Pradesh': {
    crafts: ['Banarasi Silk', 'Chikan Embroidery', 'Teak Wood Carving'],
    foods: ['Petha', 'Lucknowi Kebabs', 'Banarasi Paan'],
    artisans: ['Rajesh Kumar', 'Vikram Singh'],
    description: 'The heartland of India, home to the Taj Mahal and spiritual Varanasi.',
    color: '#F39C12',
    note: 'Where spirituality meets fine silk.'
  },
  'Gujarat': {
    crafts: ['Patola Silk', 'Kutch Embroidery', 'Lippan Art'],
    foods: ['Dhokla', 'Thepla', 'Khandvi'],
    artisans: ['Savitaben', 'Arjun Bhai'],
    description: 'A coastal state with a rich mercantile history and intricate textile traditions.',
    color: '#D4145A',
    note: 'Colors as bright as the Rann of Kutch.'
  },
  'West Bengal': {
    crafts: ['Kantha Stitch', 'Terracotta Art', 'Jamdani Silk'],
    foods: ['Rosogolla', 'Sandesh', 'Darjeeling Tea'],
    artisans: ['Arjun Das', 'Tenzing Norgay'],
    description: 'The cultural capital, famous for its literature, art, and sweets.',
    color: '#8B2E2E',
    note: 'Sweetness in every word and art.'
  },
  'Maharashtra': {
    crafts: ['Paithani Sarees', 'Warli Painting', 'Kolhapuri Chappals'],
    foods: ['Vada Pav', 'Puran Poli', 'Misal Pav'],
    artisans: ['Malvika Gupta', 'Rahul Kulkarni'],
    description: 'The Gateway of India, a powerhouse of culture, commerce, and cinema.',
    color: '#3498DB',
    note: 'Where the sea meets the Sahyadris.'
  },
  'Odisha': {
    crafts: ['Pattachitra', 'Silver Filigree', 'Sambalpuri Silk'],
    foods: ['Chenna Poda', 'Dalma', 'Rasabali'],
    artisans: ['Bijay Das', 'Sangita Mohanty'],
    description: 'Soul of Incredible India, known for its ancient temples and pristine beaches.',
    color: '#1ABC9C',
    note: 'Divine art in every silver thread.'
  },
  'Tamil Nadu': {
    crafts: ['Kanjeevaram Silk', 'Tanjore Paintings', 'Brass Lamps'],
    foods: ['Dosa', 'Filter Coffee', 'Idli'],
    artisans: ['Meenakshi Amma', 'Arumugam Pillai'],
    description: 'Land of majestic temples and timeless classical arts.',
    color: '#9B59B6',
    note: 'Silk as radiant as the morning sun.'
  },
  'Punjab': {
    crafts: ['Phulkari Embroidery', 'Wood Carving', 'Jutti Making'],
    foods: ['Makki di Roti', 'Sarson da Saag', 'Butter Chicken'],
    artisans: ['Gurpreet Singh', 'Harpreet Kaur'],
    description: 'The land of five rivers, synonymous with energy and hospitality.',
    color: '#F1C40F',
    note: 'A vibrant celebration of life.'
  },
  'Kerala': {
    crafts: ['Kasavu Sarees', 'Coir Products', 'Nettur Petti'],
    foods: ['Sadhya', 'Appam', 'Puttu'],
    artisans: ['Ravi Varma', 'Bindu Madhavan'],
    description: "God's Own Country, famous for its backwaters and spice-scented air.",
    color: '#2ECC71',
    note: 'Spices, silk, and serene backwaters.'
  },
  'Jammu & Kashmir': {
    crafts: ['Pashmina Shawls', 'Walnut Wood Carving', 'Papier-mâché'],
    foods: ['Roganjosh', 'Kahwa', 'Dum Aloo'],
    artisans: ['Zeba Bakhtiar', 'Bashir Ahmed'],
    description: 'The crown of India, a paradise of snow-capped mountains and alpine lakes.',
    color: '#34495E',
    note: 'Art as delicate as the mountain air.'
  },
  'Madhya Pradesh': {
    crafts: ['Chanderi Silk', 'Batik Print', 'Dhokra Art'],
    foods: ['Poha Jalebi', 'Bhutte Ka Kees', 'Dal Bafla'],
    artisans: ['Ramesh Jatav', 'Shanti Bai'],
    description: 'The heart of India, home to ancient stupas and dense tiger reserves.',
    color: '#7F8C8D',
    note: 'Heritage carved in the heart of the jungle.'
  },
  'Andhra Pradesh': {
    crafts: ['Kalamkari', 'Kondapalli Toys', 'Leather Puppetry'],
    foods: ['Putharekulu', 'Gongura Pickle', 'Andhra Biryani'],
    artisans: ['Venkat Reddy', 'Padma Rao'],
    description: 'The rice bowl of India, rich in river cultures and spiritual coastlines.',
    color: '#E74C3C',
    note: 'Colors that dance like the Krishna river.'
  },
  'Northeastern States': {
    crafts: ['Muga Silk', 'Bamboo & Cane Work', 'Loin Loom'],
    foods: ['Masor Tenga', 'Jadoh', 'Bamboo Shoot Stew'],
    artisans: ['Homen Borkotoky', 'Lila Devi'],
    description: 'The seven sisters, a lush frontier of tribal heritage and rare silk.',
    color: '#16A085',
    note: 'Where the sun kisses the hills first.'
  }
};

export const CulturalMap = ({ onNavigate }: any) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regions = [
    // The Crown (North)
    { id: 'Jammu & Kashmir', path: 'M40,5 L50,0 C55,0 60,5 60,10 L50,15 L40,10 Z', x: 50, y: 7 },
    { id: 'Punjab', path: 'M45,15 L55,15 L60,25 L50,30 L40,25 Z', x: 50, y: 22 },
    { id: 'Rajasthan', path: 'M20,35 L40,30 L50,45 L40,65 L20,60 C15,55 15,45 20,35 Z', x: 33, y: 45 },
    { id: 'Uttar Pradesh', path: 'M55,35 L85,30 L95,45 L75,60 L55,55 Z', x: 75, y: 43 },

    // Central
    { id: 'Madhya Pradesh', path: 'M45,55 L70,55 L80,75 L60,85 L45,75 Z', x: 62, y: 68 },

    // West
    { id: 'Gujarat', path: 'M5,55 L25,55 L30,75 L15,80 L5,70 C0,65 0,60 5,55 Z', x: 15, y: 68 },
    { id: 'Maharashtra', path: 'M30,75 L55,75 L60,95 L40,105 L25,95 Z', x: 43, y: 90 },

    // East & Northeast
    { id: 'West Bengal', path: 'M95,60 L105,55 L110,75 L95,85 Z', x: 102, y: 72 },
    { id: 'Odisha', path: 'M80,85 L100,85 L95,105 L80,100 Z', x: 90, y: 95 },
    { id: 'Northeastern States', path: 'M110,40 L120,45 L120,60 L110,55 Z', x: 115, y: 50 },

    // South
    { id: 'Andhra Pradesh', path: 'M60,95 L85,95 L80,115 L65,115 Z', x: 72, y: 105 },
    { id: 'Karnataka', path: 'M35,100 L55,100 L50,125 L35,120 Z', x: 42, y: 112 },
    { id: 'Kerala', path: 'M35,122 L42,125 L40,140 L30,135 Z', x: 35, y: 132 },
    { id: 'Tamil Nadu', path: 'M48,122 L60,122 L55,140 L45,138 Z', x: 52, y: 132 },
  ];

  return (
    <section className="section-spacing bg-cream-dark relative overflow-hidden">
      <div className="absolute inset-0 mandala-bg opacity-[0.03] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-[10px] font-bold uppercase tracking-widest mb-6"
          >
            <MapPin className="w-3 h-3" /> Interactive Heritage Explorer
          </motion.div>
          <h2 className="text-primary mb-4">Explore India's Cultural Map</h2>
          <p className="text-text-soft max-w-2xl mx-auto font-serif italic">
            "Every region has a heartbeat, every craft has a soul. Click to discover the stories behind the hands."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Map Container */}
          <div className="lg:col-span-7 bg-white/40 backdrop-blur-md rounded-[48px] p-8 md:p-12 border border-highlight/10 shadow-premium aspect-[4/5] md:aspect-square flex items-center justify-center relative group">
            {/* Hand-drawn style SVG */}
            <svg viewBox="0 0 130 150" className="w-full h-full drop-shadow-2xl">
              <filter id="hand-drawn">
                <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
              </filter>

              {regions.map((region) => (
                <motion.path
                  key={region.id}
                  d={region.path}
                  fill={selectedRegion === region.id ? regionData[region.id].color : '#FDFBF7'}
                  stroke={selectedRegion === region.id ? '#fff' : '#6B1D1D'}
                  strokeWidth="0.8"
                  filter="url(#hand-drawn)"
                  whileHover={{ scale: 1.05, fill: regionData[region.id].color, stroke: '#fff' }}
                  onClick={() => setSelectedRegion(region.id)}
                  className="cursor-pointer transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              ))}

              {regions.map((region) => (
                <text
                  key={`label-${region.id}`}
                  x={region.x}
                  y={region.y}
                  fontSize="3.5"
                  fontWeight="bold"
                  fill={selectedRegion === region.id ? '#fff' : '#6B1D1D'}
                  className="pointer-events-none uppercase tracking-tighter font-display"
                  textAnchor="middle"
                >
                  {region.id}
                </text>
              ))}
            </svg>

            {/* Handwritten Map Annotations */}
            <AnimatePresence>
              {!selectedRegion ? (
                <>
                  <HandwrittenNote className="absolute top-10 right-10 hidden md:block" rotation={5}>
                    "Land of Kings"
                  </HandwrittenNote>
                  <HandwrittenNote className="absolute bottom-28 left-10 hidden md:block" rotation={-12}>
                    "Silk & Sandalwood"
                  </HandwrittenNote>
                </>
              ) : (
                <motion.div
                  key="dynamic-note"
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  className="absolute bottom-28 left-10 hidden md:block pointer-events-none"
                >
                  <HandwrittenNote rotation={-8} className="!text-accent">
                    "{regionData[selectedRegion].note}"
                  </HandwrittenNote>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute bottom-8 right-8 flex items-center gap-4 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-soft">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white border border-primary/20" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-soft">Available</span>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {selectedRegion ? (
                <motion.div
                  key={selectedRegion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-[40px] p-10 border border-highlight/10 shadow-premium space-y-8 relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 right-0 w-32 h-32 opacity-[0.05] -mr-16 -mt-16 rounded-full"
                    style={{ backgroundColor: regionData[selectedRegion].color }}
                  />

                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 text-accent mb-2">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Regional Discovery</span>
                      </div>
                      <h3 className="text-4xl font-display font-bold text-primary">{selectedRegion}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedRegion(null)}
                      className="p-2 hover:bg-cream rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-text-soft" />
                    </button>
                  </div>

                  <div className="relative">
                    <p className="text-text-soft leading-relaxed italic border-l-2 border-accent/20 pl-4 mb-4">
                      {regionData[selectedRegion].description}
                    </p>
                    <p className="font-handwriting text-accent text-2xl rotate-[-2deg]">
                      {regionData[selectedRegion].note}
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Crafts */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-primary">
                        <Palette className="w-4 h-4" />
                        <h4 className="text-sm font-bold uppercase tracking-widest">Signature Crafts</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {regionData[selectedRegion].crafts.map((craft: string) => (
                          <span key={craft} className="px-3 py-1 bg-cream rounded-lg text-[11px] font-medium text-primary border border-highlight/20 hover:bg-accent/5 transition-colors cursor-default">
                            {craft}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Foods */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-primary">
                        <Utensils className="w-4 h-4" />
                        <h4 className="text-sm font-bold uppercase tracking-widest">Traditional Flavors</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {regionData[selectedRegion].foods.map((food: string) => (
                          <span key={food} className="px-3 py-1 bg-accent/5 rounded-lg text-[11px] font-medium text-accent border border-accent/10 hover:bg-accent/10 transition-colors cursor-default">
                            {food}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Artisans */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-primary">
                        <User className="w-4 h-4" />
                        <h4 className="text-sm font-bold uppercase tracking-widest">Featured Artisans</h4>
                      </div>
                      <div className="space-y-2">
                        {regionData[selectedRegion].artisans.map((artisan: string) => (
                          <div key={artisan} className="flex items-center justify-between p-3 bg-cream/30 rounded-xl hover:bg-cream transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-accent shadow-sm">
                                <Star className="w-4 h-4 fill-current" />
                              </div>
                              <span className="text-sm font-bold text-primary">{artisan}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-text-soft group-hover:translate-x-1 transition-transform" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('marketplace')}
                    className="w-full btn-primary !py-4 text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-primary/10"
                  >
                    Explore {selectedRegion} Collection <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white/40 backdrop-blur-md rounded-[40px] border border-dashed border-highlight/30 relative">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-accent mb-6 shadow-premium">
                    <MapPin className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-primary mb-4">Select a Region</h3>
                  <p className="text-text-soft text-sm mb-8">
                    Discover the soul of India by exploring its diverse regional heritage. Click any highlighted area on the map to begin your journey.
                  </p>
                  <HandwrittenNote rotation={-5}>
                    "Where shall we go first?"
                  </HandwrittenNote>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
