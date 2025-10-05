// src/components/trainers/TrainerCTA.jsx
import { useNavigate } from 'react-router-dom';

const TrainerCTA = () => {
  const navigate = useNavigate();

  const handleConsultation = () => {
    navigate('/#trial');
  };

  const handleViewPackages = () => {
    navigate('/pricing');
  };

  return (
    <section className="bg-yellow-500 py-12">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold text-black mb-4">
          Ready to Level Up Your Fitness Game? 💯
        </h2>
        <p className="text-lg text-gray-800 mb-8">
          Book your first session with our elite trainers and start your transformation journey today!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleConsultation}
            className="bg-black text-yellow-400 px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Book Free Consultation
          </button>
          <button
            onClick={handleViewPackages}
            className="bg-white text-black px-8 py-3 rounded-xl font-semibold border-2 border-black hover:bg-gray-100 transition"
          >
            View Packages
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrainerCTA;