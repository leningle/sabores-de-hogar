import React from 'react';
import { Plus, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

interface MenuCardProps {
  dish: Dish;
  onAddToCart: (dish: Dish) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ dish, onAddToCart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-[#E8906A]/20 group"
    >
      <div className="h-48 bg-[#F0E8D8] relative overflow-hidden">
        {dish.image ? (
          <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#C06030] opacity-20">
            <ShoppingCart size={64} />
          </div>
        )}
        <div className="absolute top-3 right-3 bg-[#4A6741] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {dish.category}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-serif text-xl text-[#8B3A1A] mb-2">{dish.name}</h3>
        <p className="text-[#5C3317] text-sm mb-4 line-clamp-2 leading-relaxed">
          {dish.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-[#C06030]">${dish.price}</span>
          <button 
            onClick={() => onAddToCart(dish)}
            className="bg-[#C06030] text-white p-2.5 rounded-xl hover:bg-[#8B3A1A] transition-colors shadow-md shadow-[#C06030]/20 flex items-center gap-2 text-sm font-bold"
          >
            <Plus size={18} /> Agregar
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;