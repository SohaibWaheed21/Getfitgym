// src/components/trainers/TrainerCard.jsx
const TrainerCard = ({ trainer, onBookSession }) => {
  const handleViewProfile = () => {
    alert('Detailed trainer profile coming soon!');
  };

  return (
    <div className="group bg-white rounded-3xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl border border-gray-100">
      <div className="p-8 text-center">
        {/* Profile Photo */}
        <div className="relative mb-6">
          <div className="w-54 h-54 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
            <img
              src={trainer.image}
              alt={`Trainer ${trainer.name}`}
              className="w-52 h-52 rounded-full object-cover border-2 border-white shadow-md"
            />
          </div>
          {/* Status Badge */}
          {trainer.isActive && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
              <span className="text-xs text-white font-bold">✓</span>
            </div>
          )}
        </div>

        {/* Name & Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{trainer.name}</h2>
        <p className="text-yellow-600 font-semibold mb-1">{trainer.title}</p>
        <p className="text-gray-600 text-sm mb-4">{trainer.subtitle}</p>

        {/* Achievements Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {trainer.achievements.map((achievement, index) => (
            <span
              key={index}
              className={`bg-gradient-to-r ${achievement.color} ${achievement.textColor} text-xs px-3 py-1 rounded-full font-semibold`}
            >
              {achievement.label}
            </span>
          ))}
        </div>

        {/* Bio */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {trainer.bio}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {trainer.stats.experience}
            </div>
            <div className="text-xs text-gray-600">Years Exp</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {trainer.stats.clients}
            </div>
            <div className="text-xs text-gray-600">Clients</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {trainer.stats.rating}
            </div>
            <div className="text-xs text-gray-600">Rating</div>
          </div>
        </div>

        {/* Specialties */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3 text-sm">
            Specialties:
          </h4>
          <div className="flex flex-wrap justify-center gap-2">
            {trainer.specialties.map((specialty, index) => (
              <span
                key={index}
                className={`${specialty.color} text-xs px-3 py-1 rounded-full`}
              >
                {specialty.name}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <button
            onClick={onBookSession}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-3 rounded-xl font-semibold shadow-lg transition transform hover:scale-105"
          >
            Book Session
          </button>
          <button
            onClick={handleViewProfile}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-xl font-medium transition"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;