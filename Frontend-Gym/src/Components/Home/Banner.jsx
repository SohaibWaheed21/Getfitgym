import bannerImg from '../../Images/banner17.webp';

// src/components/home/Banner.jsx
const Banner = () => {
  const scrollToTrial = () => {
    const trialSection = document.getElementById('trial');
    if (trialSection) {
      trialSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[60vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
      {/* Background Image with Zoom Effect */}
      <img
        src={bannerImg}
        alt="GetFit Gym Banner"
        className="w-full h-full object-cover transform scale-100 hover:scale-105 transition duration-700 ease-in-out"
      />

      {/* Dark Overlay (use modern opacity syntax) */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-lg animate-fadeUp">
          GetFit Gym
        </h1>
        <p className="mt-3 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-2xl animate-fadeUp delay-200">
          Your Fitness Journey Starts Here
        </p>
        <button
          onClick={scrollToTrial}
          className="mt-6 px-6 py-3 sm:px-8 sm:py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold text-sm sm:text-base md:text-lg shadow-lg transition transform hover:scale-105 hover:shadow-yellow-500/50 animate-fadeUp delay-500"
        >
          Start Your Trial
        </button>
      </div>
    </section>

  );
};

export default Banner;

