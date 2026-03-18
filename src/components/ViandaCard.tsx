import React from 'react';
import { motion } from 'framer-motion';

interface ViandaProps {
  day: string;
  title: string;
  items: string[];
  price: string;
  icon: string;
}

const ViandaCard: React.FC<ViandaProps> = ({ day, title, items, price, icon }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-[#FAF5ED] rounded-2xl p-6 border-l-4 border-[#C06030] shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="text-3xl">{icon}</span>
        <div>
          <p className="text-[0.7rem] uppercase tracking-widest font-bold text-[#4A6741]">{day}</p>
          <h4 className="font-serif text-lg text-[#8B3A1A]">{title}</h4>
        </div>
      </div>
      <ul className="space-y-2 mb-4">
        {items.map((item, idx) => (
          <li key={idx} className="text-sm text-[#5C3317] flex items-start gap-2">
            <span className="text-[#E8906A]">✦</span> {item}
          </li>
        ))}
      </ul>
      <p className="font-bold text-[#C06030]">{price}</p>
    </motion.div>
  );
};

export default ViandaCard;