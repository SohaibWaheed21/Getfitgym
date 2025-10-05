// src/components/home/BranchesSection.jsx
import React from 'react';
import gulshan2 from '../../Images/gulshan2.jpg';
import islam from '../../Images/islam.webp';

const branches = [
  { name: 'Gulshan Branch', image: gulshan2 },
  {name:'Islampura Branch', image: islam},
  // Add more branches if needed
  // { name: 'Clifton Branch', image: cliftonImg },
];

const Branch = () => {
  const scrollToContact = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-6xl mx-auto py-16 px-6">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-gray-800">
        Our Branches
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        {branches.map((branch, index) => (
          <div
            key={index}
            className="relative h-80 rounded-2xl overflow-hidden shadow-lg group transform transition duration-500 hover:shadow-2xl hover:-translate-y-2"
          >
            <img
              src={branch.image}
              alt={branch.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col items-center justify-end pb-10 text-center text-white p-6">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 drop-shadow-lg">
                {branch.name}
              </h3>
              <button
                onClick={scrollToContact}
                className="inline-block px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg shadow-md transition duration-300 hover:bg-yellow-600 hover:scale-110"
              >
                Contact Us
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Branch;
