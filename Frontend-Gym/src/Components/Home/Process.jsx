// src/components/home/ProcessSection.jsx
const Process = () => {
  const processes = [
    {
      title: 'ANALYZE YOUR GOAL',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h2v7H5v-7zm6-5h2v12h-2V7zm6 8h2v4h-2v-4z"
          />
        </svg>
      ),
    },
    {
      title: 'WORK HARD ON IT',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 2v6l-4 8v6h14v-6l-4-8V2"
          />
        </svg>
      ),
    },
    {
      title: 'IMPROVE YOU',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3a9 9 0 100 18 9 9 0 000-18zm0 0v9l3 3"
          />
        </svg>
      ),
    },
    {
      title: 'ACHIEVE GOALS',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 10l6-7 6 7-6 11-6-11z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative py-16 px-6 bg-gradient-to-r from-gray-900 to-black text-white">
      <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {processes.map((process, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-gray-800 rounded-xl shadow-lg p-6 h-56 text-center transition transform hover:-translate-y-3 hover:shadow-yellow-500/50"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 mb-4 shadow-md">
              {process.icon}
            </div>
            <h3 className="font-semibold text-lg">{process.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;