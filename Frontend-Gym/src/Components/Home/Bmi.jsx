import { useState } from 'react';
import bmi from '../../Images/bmi.jpg';

const Bmi = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState('');

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightCm = parseFloat(height);

    if (!weightNum || !heightCm) {
      setResult('⚠️ Please enter valid numbers.');
      return;
    }

    const heightM = heightCm / 100;
    const bmiValue = (weightNum / (heightM * heightM)).toFixed(1);

    let category = '';
    if (bmiValue < 18.5) category = 'Underweight';
    else if (bmiValue < 24.9) category = 'Normal';
    else if (bmiValue < 29.9) category = 'Overweight';
    else category = 'Obese';

    setResult(`✅ Your BMI is ${bmiValue} (${category})`);
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      {/* Left Side: What is BMI */}
      <div
        className="relative bg-cover bg-center h-96 md:h-auto"
        style={{ backgroundImage: `url(${bmi})` }}

      >
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center p-8">
          <div className="text-center text-white animate-fadeInUp">
            <h2 className="text-4xl font-extrabold mb-4 tracking-wide drop-shadow-md">
              What is BMI?
            </h2>
            <p className="text-lg max-w-md mx-auto leading-relaxed text-gray-200">
              Body Mass Index (BMI) is a measure that uses your height and
              weight to estimate if you are{' '}
              <span className="font-semibold text-yellow-400">
                underweight, healthy, overweight, or obese
              </span>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: BMI Calculator */}
      <div className="bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-10">
        <div className="w-full max-w-md text-center animate-fadeInRight">
          <h2 className="text-3xl font-extrabold mb-6 text-white tracking-wide">
            BMI Calculator
          </h2>
          <div className="bg-white text-gray-800 rounded-2xl shadow-2xl p-8 transform transition hover:scale-105 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none transition"
              />
              <input
                type="number"
                placeholder="Height (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none transition"
              />
              <button
                type="button"
                onClick={calculateBMI}
                className="col-span-1 md:col-span-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-3 rounded-lg font-semibold shadow-md transition transform hover:scale-105"
              >
                Calculate
              </button>
            </div>
            {result && (
              <p className="mt-6 font-bold text-lg text-gray-900">{result}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bmi;
