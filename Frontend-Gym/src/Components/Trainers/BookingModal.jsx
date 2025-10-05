// src/components/trainers/BookingModal.jsx
import { useState } from 'react';

const BookingModal = ({ isOpen, onClose, trainerName, trainerTitle }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    gender: '',
    age: '',
    goals: [],
    experience: '',
    preferredTime: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        goals: checked 
          ? [...prev.goals, value]
          : prev.goals.filter(goal => goal !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName || !formData.phone || !formData.email) {
      alert('Please fill in all required fields (Name, Phone, Email)');
      return;
    }

    if (formData.goals.length === 0) {
      alert('Please select at least one fitness goal');
      return;
    }

    // TODO: Backend Integration
    // API Call to submit booking
    // Example: await api.post('/api/trainers/book', formData);
    
    console.log('Booking Form Submitted:', formData);

    // Success message
    alert(`🎉 Booking Request Submitted!\n\nHi ${formData.fullName}!\nWe'll contact you at ${formData.phone} within 24 hours to confirm your session with ${trainerName}.\n\nGet ready to transform! 💪`);

    // Reset form and close modal
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      gender: '',
      age: '',
      goals: [],
      experience: '',
      preferredTime: '',
      notes: ''
    });
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-t-3xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Book Your Session</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <p className="text-white text-sm mt-2">
            Train with {trainerName} - {trainerTitle}
          </p>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+92 300 1234567"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Gender</label>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center p-3 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                  className="text-yellow-500 mr-2"
                />
                <span>Male</span>
              </label>
              <label className="flex items-center p-3 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                  className="text-yellow-500 mr-2"
                />
                <span>Female</span>
              </label>
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="16"
              max="70"
              placeholder="25"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
            />
          </div>

          {/* Goals */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Fitness Goals *
            </label>
            <div className="space-y-2">
              {[
                { value: 'weight-loss', label: 'Weight Loss' },
                { value: 'muscle-gain', label: 'Muscle Building' },
                { value: 'strength', label: 'Strength Training' },
                { value: 'endurance', label: 'Endurance & Cardio' },
                { value: 'general', label: 'General Fitness' }
              ].map((goal) => (
                <label key={goal.value} className="flex items-center">
                  <input
                    type="checkbox"
                    name="goals"
                    value={goal.value}
                    checked={formData.goals.includes(goal.value)}
                    onChange={handleChange}
                    className="text-yellow-500 mr-2 rounded"
                  />
                  <span className="text-sm">{goal.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Experience Level
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
            >
              <option value="">Select Level</option>
              <option value="beginner">Beginner (0-6 months)</option>
              <option value="intermediate">Intermediate (6 months - 2 years)</option>
              <option value="advanced">Advanced (2+ years)</option>
            </select>
          </div>

          {/* Preferred Time */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Preferred Training Time
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center p-3 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                <input
                  type="radio"
                  name="preferredTime"
                  value="morning"
                  checked={formData.preferredTime === 'morning'}
                  onChange={handleChange}
                  className="text-yellow-500 mr-2"
                />
                <span className="text-sm">Morning (6-12 PM)</span>
              </label>
              <label className="flex items-center p-3 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                <input
                  type="radio"
                  name="preferredTime"
                  value="evening"
                  checked={formData.preferredTime === 'evening'}
                  onChange={handleChange}
                  className="text-yellow-500 mr-2"
                />
                <span className="text-sm">Evening (4-10 PM)</span>
              </label>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              placeholder="Any medical conditions, specific requirements, or questions..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-4 rounded-xl font-semibold shadow-lg transition transform hover:scale-105"
            >
              Book My Session 🔥
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              We'll contact you within 24 hours to confirm your session
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;