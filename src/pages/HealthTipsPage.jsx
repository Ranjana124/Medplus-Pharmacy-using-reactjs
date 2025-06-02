
import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Heart, Shield, Zap } from 'lucide-react';

const HealthTipsPage = () => {
  const tips = [
    {
      id: 1,
      title: 'Stay Hydrated',
      content: 'Drink at least 8 glasses of water a day to keep your body functioning optimally. Proper hydration aids digestion, circulation, and temperature regulation.',
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      color: 'blue'
    },
    {
      id: 2,
      title: 'Eat a Balanced Diet',
      content: 'Consume a variety of fruits, vegetables, lean proteins, and whole grains. A balanced diet provides essential nutrients for energy and disease prevention.',
      icon: <Heart className="w-8 h-8 text-green-500" />,
      color: 'green'
    },
    {
      id: 3,
      title: 'Get Enough Sleep',
      content: 'Aim for 7-9 hours of quality sleep per night. Sufficient sleep improves mood, concentration, and immune function, and reduces stress.',
      icon: <Lightbulb className="w-8 h-8 text-purple-500" />,
      color: 'purple'
    },
    {
      id: 4,
      title: 'Regular Exercise',
      content: 'Engage in at least 150 minutes of moderate-intensity aerobic exercise or 75 minutes of vigorous-intensity exercise per week, plus muscle-strengthening activities.',
      icon: <Shield className="w-8 h-8 text-red-500" />,
      color: 'red'
    },
     {
      id: 5,
      title: 'Manage Stress Effectively',
      content: 'Practice stress-reducing activities like meditation, yoga, deep breathing, or spending time in nature. Chronic stress can negatively impact your health.',
      icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
      color: 'yellow'
    },
    {
      id: 6,
      title: 'Wash Hands Frequently',
      content: 'Wash your hands regularly with soap and water for at least 20 seconds, especially before eating and after using the restroom, to prevent the spread of germs.',
      icon: <Shield className="w-8 h-8 text-teal-500" />,
      color: 'teal'
    }
  ];

  const cardColors = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    purple: 'bg-purple-50 border-purple-200',
    red: 'bg-red-50 border-red-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    teal: 'bg-teal-50 border-teal-200',
  };


  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <Lightbulb className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">Daily Health Tips</h1>
          <p className="text-lg text-gray-600 mt-2">Simple advice for a healthier lifestyle.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`rounded-xl shadow-lg overflow-hidden p-6 border-t-4 ${cardColors[tip.color] || 'bg-gray-50 border-gray-200'}`}
            >
              <div className="flex items-center mb-4">
                {tip.icon}
                <h2 className="text-xl font-semibold text-gray-800 ml-3">{tip.title}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">{tip.content}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HealthTipsPage;
