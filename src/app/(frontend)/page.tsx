'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BmiCalculator from '@/components/BmiCalculator'
import NavBar from '@/components/NavBar'
import WhatsAppButton from '@/components/WhatsAppButton'

interface TrialData {
  title: string
  description: string
  backgroundImage?: {
    url: string
    alt?: string
  }
  features: Array<{ feature: string; id?: string }>
  formTitle: string
}

export default function HomePage() {
  const [trialData, setTrialData] = useState<TrialData | null>(null)

  useEffect(() => {
    // Fetch Trial data from Payload
    fetch('/api/trial?limit=1')
      .then(res => res.json())
      .then(data => {
        if (data.docs && data.docs.length > 0) {
          setTrialData(data.docs[0])
        }
      })
      .catch(err => console.error('Failed to fetch trial data:', err))
  }, [])

  return (
    <div className="font-sans">
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scrollDown {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }

        @keyframes glow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.1);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 6s ease-in-out infinite;
        }

        .animate-scroll {
          animation: scrollDown 2s ease-in-out infinite;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-600 {
          animation-delay: 0.6s;
        }

        .gradient-text {
          background: linear-gradient(to right, #F5C211, #FF6B1A);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-card {
          background: rgba(20, 20, 20, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .glass-card:hover {
          background: rgba(20, 20, 20, 0.9);
          border-color: rgba(245, 194, 17, 0.3);
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(245, 194, 17, 0.2);
        }
      `}</style>

      <NavBar />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="https://res.cloudinary.com/dqxfjca8p/image/upload/v1766228244/gym-media/banner17.webp" 
            alt="GetFit Gym Banner" 
            fill 
            className="object-cover" 
            priority 
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-[#0A0A0A]/40 to-[#0A0A0A]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-transparent to-[#0A0A0A]/80" />
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-1/4 right-20 w-32 h-32 rounded-full bg-[#F5C211]/20 blur-3xl animate-float" />
        <div className="absolute bottom-1/3 left-10 w-48 h-48 rounded-full bg-[#F5C211]/10 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 pt-20">
          <span className="text-[#F5C211] uppercase tracking-[0.3em] text-sm md:text-base font-medium mb-6 opacity-0 animate-fadeInUp">
            Transform Your Life
          </span>

          <h1 className="font-['Bebas_Neue'] text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-none opacity-0 animate-fadeInUp delay-200">
            GETFIT
            <span className="block gradient-text">GYM</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-xl opacity-0 animate-fadeInUp delay-400">
            Your fitness journey starts here. Build strength, gain confidence, and transform your body with us.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 opacity-0 animate-fadeInUp delay-600">
            <a
              href="#trial"
              className="px-10 py-4 bg-gradient-to-r from-[#F5C211] to-[#FF6B1A] text-black rounded-full font-semibold text-lg uppercase tracking-wide transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(245,194,17,0.5)]"
            >
              Start Your Trial
            </a>
            <a
              href="#process"
              className="px-10 py-4 border-2 border-white/20 text-white rounded-full font-semibold text-lg uppercase tracking-wide hover:border-[#F5C211] hover:text-[#F5C211] transition-all hover:scale-105"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-scroll">
          <a href="#process" className="flex flex-col items-center text-gray-400 hover:text-[#F5C211] transition-colors">
            <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Our Process */}
      <section id="process" className="py-20 px-6 bg-gradient-to-b from-[#0A0A0A] via-[#141414] to-[#0A0A0A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#F5C211] uppercase tracking-[0.3em] text-sm font-medium">How It Works</span>
            <h2 className="font-['Bebas_Neue'] text-5xl md:text-6xl mt-4 text-white">OUR PROCESS</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="group relative">
              <div className="glass-card p-8 h-full text-center rounded-xl">
                {/* Step Number */}
                <span className="absolute top-4 right-4 text-6xl font-['Bebas_Neue'] text-[#F5C211]/10 group-hover:text-[#F5C211]/20 transition-colors">
                  01
                </span>

                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#F5C211]/10 flex items-center justify-center group-hover:bg-[#F5C211]/20 transition-all group-hover:rotate-6 group-hover:scale-110">
                  <svg className="w-10 h-10 text-[#F5C211]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="font-['Bebas_Neue'] text-xl text-white mb-3">ANALYZE YOUR GOAL</h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">We assess your current fitness level and understand your objectives.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative">
              <div className="glass-card p-8 h-full text-center rounded-xl">
                <span className="absolute top-4 right-4 text-6xl font-['Bebas_Neue'] text-[#F5C211]/10 group-hover:text-[#F5C211]/20 transition-colors">
                  02
                </span>

                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#F5C211]/10 flex items-center justify-center group-hover:bg-[#F5C211]/20 transition-all group-hover:rotate-6 group-hover:scale-110">
                  <svg className="w-10 h-10 text-[#F5C211]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>

                <h3 className="font-['Bebas_Neue'] text-xl text-white mb-3">WORK HARD ON IT</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Follow a customized workout plan designed for your body.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative">
              <div className="glass-card p-8 h-full text-center rounded-xl">
                <span className="absolute top-4 right-4 text-6xl font-['Bebas_Neue'] text-[#F5C211]/10 group-hover:text-[#F5C211]/20 transition-colors">
                  03
                </span>

                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#F5C211]/10 flex items-center justify-center group-hover:bg-[#F5C211]/20 transition-all group-hover:rotate-6 group-hover:scale-110">
                  <svg className="w-10 h-10 text-[#F5C211]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>

                <h3 className="font-['Bebas_Neue'] text-xl text-white mb-3">IMPROVE YOU</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Track progress and push your limits with expert guidance.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="group relative">
              <div className="glass-card p-8 h-full text-center rounded-xl">
                <span className="absolute top-4 right-4 text-6xl font-['Bebas_Neue'] text-[#F5C211]/10 group-hover:text-[#F5C211]/20 transition-colors">
                  04
                </span>

                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#F5C211]/10 flex items-center justify-center group-hover:bg-[#F5C211]/20 transition-all group-hover:rotate-6 group-hover:scale-110">
                  <svg className="w-10 h-10 text-[#F5C211]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>

                <h3 className="font-['Bebas_Neue'] text-xl text-white mb-3">ACHIEVE GOALS</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Celebrate your transformation and set new milestones.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branches */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-center mb-12 text-white">
          Our Branches
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Branch 1 */}
          <div className="relative h-80 rounded-2xl overflow-hidden group transform transition duration-500">
            <Image 
              src="https://res.cloudinary.com/dqxfjca8p/image/upload/v1766228246/gym-media/gulshan2.jpg" 
              alt="Gulshan Ravi Branch" 
              fill 
              className="object-cover group-hover:scale-110 transition duration-700 ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col items-center justify-end pb-10 text-center text-white p-6">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 drop-shadow-lg">
                Gulshan Ravi Branch
              </h3>
              <a 
                href="#contact" 
                className="inline-block px-6 py-2 bg-gradient-to-r from-[#F5C211] to-[#FF6B1A] text-black font-semibold rounded-lg shadow-md transition duration-300 hover:scale-110"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Branch 2 */}
          <div className="relative h-80 rounded-2xl overflow-hidden group transform transition duration-500">
            <Image 
              src="https://res.cloudinary.com/dqxfjca8p/image/upload/v1766228247/gym-media/islam.jpg" 
              alt="Islampura Branch" 
              fill 
              className="object-cover group-hover:scale-110 transition duration-700 ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col items-center justify-end pb-10 text-center text-white p-6">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 drop-shadow-lg">
                Islampura Branch
              </h3>
              <a 
                href="#contact" 
                className="inline-block px-6 py-2 bg-gradient-to-r from-[#F5C211] to-[#FF6B1A] text-black font-semibold rounded-lg shadow-md transition duration-300 hover:scale-110"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BMI Section */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Side: What is BMI */}
        <div className="relative h-96 md:h-auto">
          <Image src="https://res.cloudinary.com/dqxfjca8p/image/upload/v1766228256/gym-media/bmi.jpg" alt="BMI Background" fill className="object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center p-8">
            <div className="text-center text-white animate-fadeInUp scroll-reveal">
              <h2 className="text-4xl font-extrabold mb-4 tracking-wide drop-shadow-md">
                What is BMI?
              </h2>
              <p className="text-lg max-w-md mx-auto leading-relaxed text-gray-200">
                Body Mass Index (BMI) is a measure that uses your height and weight to estimate if you are{' '}
                <span className="font-semibold text-yellow-400">underweight, healthy, overweight, or obese</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: BMI Calculator */}
        <div className="bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-10 gradient-mesh">
          <div className="w-full max-w-md text-center animate-fadeInRight float">
            <h2 className="text-3xl font-extrabold mb-6 text-white tracking-wide">
              BMI Calculator
            </h2>
            <div className="bg-white text-gray-800 rounded-2xl shadow-layered p-8 transform transition hover:scale-105 duration-300 animated-border">
              <BmiCalculator />
            </div>
          </div>
        </div>
      </section>

      <section id="trial" className="relative py-20">
        <Image 
          src={trialData?.backgroundImage?.url || "https://res.cloudinary.com/dqxfjca8p/image/upload/v1766228258/gym-media/trial.jpg"} 
          alt={trialData?.backgroundImage?.alt || "Trial Background"} 
          fill 
          className="object-cover" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
          <div className="text-white space-y-6">
            <h2 className="text-4xl font-bold leading-tight">
              {trialData?.title || "We Are Not Like Others"}
            </h2>
            <p className="text-lg text-gray-300">
              {trialData?.description || "At GetFit Gym, we do not believe in shortcuts. We believe in building stronger bodies and sharper minds. Join us and start your transformation today!"}
            </p>
            <ul className="space-y-2 text-lg">
              {trialData?.features && trialData.features.length > 0 ? (
                trialData.features.map((item, index) => (
                  <li key={item.id || index}>✔ {item.feature}</li>
                ))
              ) : (
                <>
                  <li>✔ Personalized training</li>
                  <li>✔ Modern equipment</li>
                  <li>✔ Supportive community</li>
                </>
              )}
            </ul>
          </div>
          <div className="bg-gray-900 bg-opacity-90 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">
              {trialData?.formTitle || "Start Your Trial"}
            </h3>
            <form className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white" />
              <input type="email" placeholder="Email Address" className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white" />
              <input type="tel" placeholder="Phone Number" className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white" />
              <textarea placeholder="Your Goals" className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"></textarea>
              <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-lg font-semibold">Submit</button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dqxfjca8p/image/upload/v1766246418/testimonial_ouwcfx.jpg"
            alt="Testimonials Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0A0A0A]/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#F5C211] uppercase tracking-[0.3em] text-sm font-medium">
              Testimonials
            </span>
            <h2 className="font-['Bebas_Neue'] text-5xl md:text-6xl mt-4 text-white">
              WHAT OUR MEMBERS SAY
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "GetFit Gym has completely transformed my fitness journey. The trainers are amazing and truly care about your progress!",
                name: "Ali Khan",
                role: "Member since 2023",
              },
              {
                quote: "Great environment and supportive staff. I have never felt more motivated. Highly recommended for anyone serious about fitness!",
                name: "Ayesha Fatima",
                role: "Member since 2022",
              },
              {
                quote: "The community and vibe at GetFit push me to achieve more every day. It is more than a gym, it is a family!",
                name: "Hamza Malik",
                role: "Member since 2024",
              },
            ].map((testimonial, index) => (
              <div key={index} className="group">
                <div className="glass-card p-8 h-full relative rounded-xl">
                  {/* Quote Icon */}
                  <svg className="w-10 h-10 text-[#F5C211]/30 mb-4 group-hover:text-[#F5C211]/50 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                  </svg>

                  {/* Quote Text */}
                  <p className="text-white/80 text-lg leading-relaxed mb-8 italic">
                    &quot;{testimonial.quote}&quot;
                  </p>

                  {/* Author */}
                  <div className="mt-auto">
                    <p className="font-['Bebas_Neue'] text-xl text-[#F5C211]">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>

                  {/* Decorative Line */}
                  <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-[#F5C211]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] text-gray-400 py-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-3 text-center md:text-left">
          {/* About */}
          <div>
            <h3 className="font-['Bebas_Neue'] text-2xl text-[#F5C211] mb-4">GetFit Gym</h3>
            <p className="leading-relaxed">
              Building stronger bodies and sharper minds. <br />
              Join our community today!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-['Bebas_Neue'] text-2xl text-[#F5C211] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-[#F5C211] transition">Home</Link></li>
              <li><Link href="/trainers" className="hover:text-[#F5C211] transition">Trainers</Link></li>
              <li><Link href="/supplements" className="hover:text-[#F5C211] transition">Supplements</Link></li>
              <li><Link href="/pricing" className="hover:text-[#F5C211] transition">Pricing</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-['Bebas_Neue'] text-2xl text-[#F5C211] mb-4">Contact</h3>
            <p>Email: <a href="mailto:getfitness01@gmail.com" className="hover:text-[#F5C211] transition">getfitness01@gmail.com</a></p>
            <p>Phone: <a href="tel:+923138884736" className="hover:text-[#F5C211] transition">+92 3138884736</a></p>
            <p>Address: Islampura Alamgir road Lahore, Pakistan</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center text-gray-500 mt-8 border-t border-gray-800 pt-4 text-sm">
          &copy; 2025 <span className="text-[#F5C211] font-semibold">GetFit Gym</span>. All rights reserved.
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  )
}
