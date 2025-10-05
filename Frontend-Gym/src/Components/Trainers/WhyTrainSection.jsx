// src/components/trainers/WhyTrainSection.jsx
const WhyTrainSection = () => {
  const benefits = [
    {
      icon: '🎓',
      title: 'Certified Pros',
      description: 'International certifications & proven expertise'
    },
    {
      icon: '🏆',
      title: 'Champions',
      description: 'Award-winning trainers with real results'
    },
    {
      icon: '💪',
      title: 'Personalized',
      description: 'Custom plans tailored to your goals'
    },
    {
      icon: '🔥',
      title: 'Motivation',
      description: '24/7 support to keep you on track'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-gray-900 to-black py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          Why Train With Our Elite Squad?
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-2xl transform hover:scale-105 transition duration-300"
            >
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">{benefit.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-300 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTrainSection;