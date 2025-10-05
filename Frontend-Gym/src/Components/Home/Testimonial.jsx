// src/components/home/Testimonials.jsx

import testimonial from '../../Images/testimonial.jpg';
const Testimonial = () => {
  const testimonials = [
    {
      text: "Get fit gym has completely transformed my fitness journey. Trainers are amazing!",
      author: "Ali Khan",
    },
    {
      text: "Great environment and supportive staff. Highly recommended!",
      author: "Ayesha Fatima",
    },
    {
      text: "The community and vibe at Get fit push me to achieve more every day!",
      author: "Hamza Malik",
    },
  ];

  return (
    <section
      className="relative bg-fixed bg-center bg-cover py-25"
      style={{ backgroundImage: `url(${testimonial})` }}
    >
      {/* Dark overlay */}
      
        <div className="absolute inset-0 bg-black/70"></div>
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center text-white px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-yellow-400">
          What Our Members Say
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-900 bg-opacity-80 p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
            >
              <p className="italic text-lg leading-relaxed">
                "{testimonial.text}"
              </p>
              <h4 className="mt-4 font-bold text-yellow-400">
                - {testimonial.author}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;