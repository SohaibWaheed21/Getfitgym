// src/pages/Trainers.jsx
import { useState } from 'react';
import TrainerHeader from './TrainerHeader';
import TrainerCard from './TrainerCard';
import WhyTrainSection from './WhyTrainSection';
import BookingModal from './BookingModal';
import TrainerCTA from './TrainerCTA';
import wahab2 from '../../Images/wahab2.png'

const Trainers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const trainers = [
    {
      id: 1,
      name: 'Abdul Wahab',
      title: 'ISSA Certified Fitness Trainer',
      subtitle: 'Certified Personal Trainer',
      image: wahab2,
      achievements: [
        { label: '🏆 Pakistan Classic Gold', color: 'from-yellow-400 to-yellow-500', textColor: 'text-black' },
        { label: '👑 Jr. Mr. Lahore', color: 'from-gray-700 to-gray-800', textColor: 'text-white' }
      ],
      bio: '💪 Your transformation coach who turns impossible into inevitable. Specializing in strength training, bodybuilding, and mindset coaching. Ready to unlock your beast mode? Let\'s get it! 🔥',
      stats: {
        experience: '5+',
        clients: '200+',
        rating: '4.9'
      },
      specialties: [
        { name: 'Strength Training', color: 'bg-red-100 text-red-700' },
        { name: 'Bodybuilding', color: 'bg-blue-100 text-blue-700' },
        { name: 'Weight Loss', color: 'bg-green-100 text-green-700' },
        { name: 'Nutrition', color: 'bg-purple-100 text-purple-700' }
      ],
      isActive: true
    }
  ];

  const handleBookSession = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="trainers-page bg-gray-50">
      <TrainerHeader />
      
      {/* Trainers Grid */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer) => (
            <TrainerCard
              key={trainer.id}
              trainer={trainer}
              onBookSession={handleBookSession}
            />
          ))}
          
          {/* Coming Soon Cards */}
          <ComingSoonCard />
          <ComingSoonCard />
        </div>
      </section>

      <WhyTrainSection />
      
      <TrainerCTA />

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        trainerName="Abdul Wahab"
        trainerTitle="ISSA Certified"
      />
    </div>
  );
};

// Coming Soon Card Component
const ComingSoonCard = () => (
  <div className="group bg-white rounded-3xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl border border-gray-100 opacity-50">
    <div className="p-8 text-center">
      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center shadow-lg mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-400 mb-2">Coming Soon</h2>
      <p className="text-gray-400 font-semibold mb-4">New Trainer Joining</p>
      <p className="text-gray-400 text-sm">
        We're expanding our team of elite trainers. Stay tuned for more amazing coaches!
      </p>
    </div>
  </div>
);

export default Trainers;