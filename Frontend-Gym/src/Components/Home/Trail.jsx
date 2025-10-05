// src/components/home/TrialSection.jsx
import { useState } from 'react';
import trial from '../../Images/trial.jpg';

const Trial = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    goals: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Trial Form Submitted:', formData);
    alert('Thank you for your interest! We will contact you soon.');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      goals: '',
    });
  };

  return (
    <section
      id="trial"
      className="relative bg-fixed bg-center bg-cover py-20"
      style={{ backgroundImage: `url(${trial})` }}
    >
      {/* Dark overlay (keep semi-transparent, not solid black) */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
        {/* Left Text */}
        <div className="text-white space-y-6 animate-fadeInLeft">
          <h2 className="text-4xl font-bold leading-tight">
            We're Not Like Others
          </h2>
          <p className="text-lg text-gray-300">
            At GetFit Gym, we don't believe in shortcuts. We believe in
            building stronger bodies and sharper minds. Join us and start your
            transformation today!
          </p>
          <ul className="space-y-2 text-lg">
            <li>✔ Personalized training</li>
            <li>✔ Modern equipment</li>
            <li>✔ Supportive community</li>
          </ul>
        </div>

        {/* Right Form */}
        <div className="bg-gray-900 bg-opacity-90 p-8 rounded-xl shadow-lg animate-fadeInRight">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">
            Start Your Trial
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
            />
            <textarea
              name="goals"
              placeholder="Your Goals"
              value={formData.goals}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-3 rounded-lg font-semibold shadow-lg transition transform hover:scale-105"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Trial;
