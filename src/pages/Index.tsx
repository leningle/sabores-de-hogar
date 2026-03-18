import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MenuCard from '../components/MenuCard';
import CartModal from '../components/CartModal';
import { ShoppingCart, Phone, Instagram, Facebook, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const INITIAL_DISHES = [
  { id: 1, name: "Lasagna de Carne", description: "Capas de pasta artesanal con boloñesa casera, bechamel y mucho queso gratinado.", price: 450, category: "Viandas" },
  { id: 2, name: "Milanesa con Puré", description: "Milanesa de carne premium con puré de papas cremoso y un toque de manteca.", price: 380, category: "Clásicos" },
  { id: 3, name: "Canelones de Verdura", description: "Rellenos de espinaca fresca y ricota, bañados en salsa mixta.", price: 420, category: "Viandas" },
  { id: 4, name: "Tarta de Zapallitos", description: "Masa casera integral con relleno suave de zapallitos, cebolla y queso.", price: 320, category: "Saludable" },
];

const Index = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<{id: number, name: string, price: number, quantity: number}[]>([]);
  const [dishes] = useState(INITIAL_DISHES);

  const addToCart = (dish: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === dish.id);
      if (existing) {
        return prev.map(item => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: dish.id, name: dish.name, price: dish.price, quantity: 1 }];
    });
    setIsCartOpen(true);
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

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF5ED] text-[#3A2210] font-sans selection:bg-[#E8906A] selection:text-white">
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-24 pb-12 px-8 relative overflow-hidden bg-gradient-to-br from-[#FAF5ED] via-[#F0E8D8] to-[#e8d8c0]">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <p className="text-[#C06030] font-bold text-xs tracking-[0.2em] uppercase mb-2">🌿 Cocina Artesanal · Uruguay</p>
            <h1 className="font-serif text-4xl md:text-6xl text-[#8B3A1A] leading-tight mb-4">
              El sabor de <em className="text-[#4A6741] not-italic">casa</em>,<br />en tu mesa
            </h1>
            <p className="text-[#5C3317] text-lg mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
              Preparamos cada plato con ingredientes frescos, recetas tradicionales y el amor de siempre. Viandas diarias, platos especiales y mucho más.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a href="#menu" className="bg-[#C06030] text-white px-8 py-4 rounded-full font-bold hover:bg-[#8B3A1A] transition-all shadow-lg shadow-[#C06030]/30">
                🍽 Ver el Menú
              </a>
              <button className="bg-[#25D366] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1da851] transition-all shadow-lg shadow-[#25D366]/30 flex items-center gap-2">
                <Phone size={18} /> Pedir por WhatsApp
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
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
            {dishes.map(dish => (
              <MenuCard key={dish.id} dish={dish} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3A2210] text-[#FAF5ED] py-16 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-serif text-2xl mb-6">Sabores de Hogar</h3>
            <p className="opacity-70 leading-relaxed">Llevamos el sabor de la cocina tradicional uruguaya directamente a tu mesa, con el cariño de lo hecho en casa.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-wider text-sm text-[#E8906A]">Contacto</h4>
            <ul className="space-y-4 opacity-70">
              <li className="flex items-center gap-3"><MapPin size={18} /> Montevideo, Uruguay</li>
              <li className="flex items-center gap-3"><Phone size={18} /> +598 99 000 000</li>
              <li className="flex items-center gap-3"><Clock size={18} /> Lun - Sáb: 11:00 - 21:00</li>
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
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 bg-[#C06030] text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center z-[998] group"
      >
        <ShoppingCart size={28} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#4A6741] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
            {cartCount}
          </span>
        )}
      </motion.button>

      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
};

export default Index;