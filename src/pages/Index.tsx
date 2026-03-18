import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import MenuCard from '../components/MenuCard';
import CartModal from '../components/CartModal';
import AdminPanel from '../components/AdminPanel';
import ViandaCard from '../components/ViandaCard';
import { ShoppingCart, Phone, Instagram, Facebook, MapPin, Clock, Utensils, Heart, Home, Timer, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';

const INITIAL_DISHES = [
  { id: 1, name: "Lasagna de Carne", description: "Capas de pasta artesanal con boloñesa casera, bechamel y mucho queso gratinado.", price: 450, category: "Viandas" },
  { id: 2, name: "Milanesa con Puré", description: "Milanesa de carne premium con puré de papas cremoso y un toque de manteca.", price: 380, category: "Clásicos" },
  { id: 3, name: "Canelones de Verdura", description: "Rellenos de espinaca fresca y ricota, bañados en salsa mixta.", price: 420, category: "Viandas" },
  { id: 4, name: "Tarta de Zapallitos", description: "Masa casera integral con relleno suave de zapallitos, cebolla y queso.", price: 320, category: "Saludable" },
];

const VIANDAS = [
  { day: "Lunes", icon: "🍲", title: "Guiso de arroz con pollo", items: ["Arroz con pollo al horno", "Pan casero", "Postre del día"], price: "$350/persona" },
  { day: "Martes", icon: "🥩", title: "Milanesas con puré", items: ["Milanesas de ternera", "Puré de papas cremoso", "Ensalada verde"], price: "$380/persona" },
  { day: "Miércoles", icon: "🍝", title: "Pasta a elección", items: ["Fideos con tuco o crema", "Tostadas con ajo", "Fruta de estación"], price: "$320/persona" },
  { day: "Jueves", icon: "🐟", title: "Pescado del día", items: ["Filete a la plancha", "Arroz blanco", "Ensalada mixta"], price: "$360/persona" },
  { day: "Viernes", icon: "🥟", title: "Día de empanadas", items: ["6 empanadas a elección", "Salsa criolla", "Postre casero"], price: "$340/persona" },
];

const Index = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<{id: number, name: string, price: number, quantity: number}[]>([]);
  const [dishes, setDishes] = useState(INITIAL_DISHES);

  const addToCart = (dish: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === dish.id);
      if (existing) {
        return prev.map(item => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: dish.id, name: dish.name, price: dish.price, quantity: 1 }];
    });
    toast.success(`${dish.name} agregado al pedido`, {
      style: { background: '#8B3A1A', color: '#fff', borderRadius: '12px' },
      iconTheme: { primary: '#fff', secondary: '#8B3A1A' }
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const addDish = (newDish: any) => setDishes(prev => [...prev, { ...newDish, id: Date.now() }]);
  const updateDish = (updatedDish: any) => setDishes(prev => prev.map(d => d.id === updatedDish.id ? updatedDish : d));
  const deleteDish = (id: number) => setDishes(prev => prev.filter(d => d.id !== id));

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF5ED] text-[#3A2210] font-sans selection:bg-[#E8906A] selection:text-white">
      <Toaster position="bottom-right" />
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-24 pb-12 px-8 relative overflow-hidden bg-gradient-to-br from-[#FAF5ED] via-[#F0E8D8] to-[#e8d8c0]">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-center md:text-left">
            <p className="text-[#C06030] font-bold text-xs tracking-[0.2em] uppercase mb-2">🌿 Cocina Artesanal · Uruguay</p>
            <h1 className="font-serif text-4xl md:text-6xl text-[#8B3A1A] leading-tight mb-4">El sabor de <em className="text-[#4A6741] not-italic">casa</em>,<br />en tu mesa</h1>
            <p className="text-[#5C3317] text-lg mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">Preparamos cada plato con ingredientes frescos, recetas tradicionales y el amor de siempre.</p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a href="#menu" className="bg-[#C06030] text-white px-8 py-4 rounded-full font-bold hover:bg-[#8B3A1A] transition-all shadow-lg shadow-[#C06030]/30">🍽 Ver el Menú</a>
              <button className="bg-[#25D366] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1da851] transition-all shadow-lg shadow-[#25D366]/30 flex items-center gap-2">
                <Phone size={18} /> Pedir por WhatsApp
              </button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex justify-center">
            <div className="relative animate-float">
              <svg className="w-full max-w-[340px] drop-shadow-2xl" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="105" r="90" fill="#F0E8D8" stroke="#E8906A" strokeWidth="3"/>
                <polygon points="100,25 175,78 158,78 158,175 42,175 42,78 25,78" fill="#E8906A" stroke="#C06030" strokeWidth="3" strokeLinejoin="round"/>
                <polygon points="100,27 173,79 27,79" fill="#C06030"/>
                <rect x="82" y="135" width="36" height="40" rx="18" fill="#8B3A1A"/>
                <text x="100" y="198" textAnchor="middle" fontFamily="Georgia,serif" fontSize="15" fill="#8B3A1A" fontWeight="bold">Sabores de Hogar</text>
                <text x="100" y="213" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fill="#4A6741" letterSpacing="3" fontWeight="bold">COCINA ARTESANAL</text>
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#C06030] font-bold text-xs tracking-[0.2em] uppercase mb-2">🍴 Lo que preparamos</p>
            <h2 className="font-serif text-4xl text-[#8B3A1A] mb-4">Nuestro Menú</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#C06030] to-[#4A6741] rounded-full mx-auto mb-6"></div>
            <p className="text-[#5C3317] max-w-xl mx-auto">Platos caseros preparados a diario con ingredientes frescos de estación.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {dishes.map(dish => <MenuCard key={dish.id} dish={dish} onAddToCart={addToCart} />)}
          </div>
        </div>
      </section>

      {/* Viandas Section */}
      <section id="viandas" className="py-24 px-8 bg-[#F0E8D8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#C06030] font-bold text-xs tracking-[0.2em] uppercase mb-2">📅 Semanal</p>
            <h2 className="font-serif text-4xl text-[#8B3A1A] mb-4">Viandas de la Semana</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#C06030] to-[#4A6741] rounded-full mx-auto mb-6"></div>
            <p className="text-[#5C3317] max-w-xl mx-auto">Menú rotativo semanal. Podés encargar con anticipación y te lo preparamos fresquito.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {VIANDAS.map((v, idx) => <ViandaCard key={idx} {...v} />)}
          </div>
        </div>
      </section>

      {/* Nosotros Section */}
      <section id="nosotros" className="py-24 px-8 bg-[#3A2210] text-white overflow-hidden relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-[#E8906A] font-bold text-xs tracking-[0.2em] uppercase mb-2">❤ Nuestra historia</p>
            <h2 className="font-serif text-4xl text-white mb-6">Cocina hecha con amor</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#E8906A] to-[#4A6741] rounded-full mb-8"></div>
            <p className="text-white/80 text-lg mb-12 leading-relaxed">Somos una cocina artesanal uruguaya que nació de la pasión por la comida casera de verdad. Cada plato lleva tiempo, dedicación y los mejores ingredientes de nuestra tierra.</p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <Utensils />, title: "Ingredientes frescos", desc: "Compramos local" },
                { icon: <Heart />, title: "Recetas tradicionales", desc: "Sabor a casa" },
                { icon: <Home />, title: "Hecho en Uruguay", desc: "Orgullo nacional" },
                { icon: <Timer />, title: "Siempre fresco", desc: "Hecho en el día" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="text-[#E8906A] mb-2">{item.icon}</div>
                  <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-white/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="hidden md:flex justify-center">
            <svg className="w-full max-w-sm opacity-80" viewBox="0 0 260 300" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="130" cy="270" rx="80" ry="12" fill="rgba(255,255,255,.1)"/>
              <rect x="60" y="150" width="140" height="40" rx="10" fill="#C06030"/>
              <ellipse cx="130" cy="150" rx="70" ry="18" fill="#E8906A"/>
              <path d="M175 60 L165 140" stroke="#FAF5ED" strokeWidth="5" strokeLinecap="round"/>
              <ellipse cx="175" cy="55" rx="12" ry="16" fill="#FAF5ED"/>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Reserva Section */}
      <section id="reserva" className="py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-[#C06030] font-bold text-xs tracking-[0.2em] uppercase mb-2">📅 Encargá con tiempo</p>
            <h2 className="font-serif text-4xl text-[#8B3A1A] mb-4">Reservas y Pedidos</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#C06030] to-[#4A6741] rounded-full mb-8"></div>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#5C3317] uppercase tracking-wider">Tu nombre</label>
                  <input className="w-full p-3 rounded-xl border border-[#E8906A]/20 bg-[#FAF5ED] outline-none focus:ring-2 focus:ring-[#C06030]" placeholder="¿Cómo te llamás?" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#5C3317] uppercase tracking-wider">Teléfono</label>
                  <input className="w-full p-3 rounded-xl border border-[#E8906A]/20 bg-[#FAF5ED] outline-none focus:ring-2 focus:ring-[#C06030]" placeholder="+598 ..." />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#5C3317] uppercase tracking-wider">¿Qué querés encargar?</label>
                <select className="w-full p-3 rounded-xl border border-[#E8906A]/20 bg-[#FAF5ED] outline-none focus:ring-2 focus:ring-[#C06030]">
                  <option>Vianda semanal</option>
                  <option>Plato especial</option>
                  <option>Pedido para evento</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#5C3317] uppercase tracking-wider">Detalle</label>
                <textarea className="w-full p-3 rounded-xl border border-[#E8906A]/20 bg-[#FAF5ED] outline-none focus:ring-2 focus:ring-[#C06030] h-32" placeholder="Contanos qué necesitás..." />
              </div>
              <button className="w-full bg-[#C06030] text-white py-4 rounded-xl font-bold hover:bg-[#8B3A1A] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#C06030]/20">
                <Send size={20} /> Enviar por WhatsApp
              </button>
            </form>
          </div>
          <div className="space-y-8">
            <div className="bg-[#FAF5ED] p-8 rounded-3xl border-2 border-[#25D366] text-center">
              <div className="bg-[#25D366] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-[#25D366]/30">
                <Phone size={32} />
              </div>
              <h3 className="font-serif text-2xl text-[#8B3A1A] mb-4">¿Preferís por WhatsApp?</h3>
              <p className="text-[#5C3317] mb-6">Escribinos directamente y te respondemos a la brevedad. Es la forma más rápida.</p>
              <p className="text-2xl font-bold text-[#4A6741] mb-8">098 338 243</p>
              <button className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold hover:bg-[#1da851] transition-all">Abrir WhatsApp</button>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#E8906A]/10">
              <h4 className="font-serif text-xl text-[#8B3A1A] mb-6 flex items-center gap-2"><Clock className="text-[#C06030]" /> Horarios de atención</h4>
              <div className="space-y-4">
                {[
                  { day: "Lunes – Viernes", time: "9:00 – 20:00" },
                  { day: "Sábado", time: "9:00 – 14:00" },
                  { day: "Domingo", time: "Cerrado", closed: true }
                ].map((h, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-[#FAF5ED] pb-2">
                    <span className="font-bold text-sm text-[#5C3317]">{h.day}</span>
                    <span className={`text-sm ${h.closed ? 'text-red-500 italic' : 'text-[#8B3A1A]'}`}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3A2210] text-[#FAF5ED] py-16 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-serif text-2xl mb-6">Sabores de Hogar</h3>
            <p className="opacity-70 leading-relaxed">Llevamos el sabor de la cocina tradicional uruguaya directamente a tu mesa.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-wider text-sm text-[#E8906A]">Contacto</h4>
            <ul className="space-y-4 opacity-70">
              <li className="flex items-center gap-3"><MapPin size={18} /> Montevideo, Uruguay</li>
              <li className="flex items-center gap-3"><Phone size={18} /> +598 98 338 243</li>
              <li className="flex items-center gap-3"><Clock size={18} /> Lun - Sáb: 9:00 - 20:00</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-wider text-sm text-[#E8906A]">Síguenos</h4>
            <div className="flex gap-4">
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-[#C06030] transition-colors"><Instagram size={20} /></a>
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-[#C06030] transition-colors"><Facebook size={20} /></a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/10 text-center opacity-50 text-sm">
          <p>© 2025 Sabores de Hogar · Cocina Artesanal · Hecho con ❤ en Uruguay</p>
        </div>
      </footer>

      {/* Cart FAB */}
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsCartOpen(true)} className="fixed bottom-8 right-8 bg-[#C06030] text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center z-[998] group">
        <ShoppingCart size={28} />
        {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-[#4A6741] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white animate-pulse">{cartCount}</span>}
      </motion.button>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cart} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} />
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} dishes={dishes} onAddDish={addDish} onUpdateDish={updateDish} onDeleteDish={deleteDish} />
    </div>
  );
};

export default Index;