'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import NavBar from '@/components/NavBar'

interface PageSettings {
  bannerImage?: { url: string } | null
  bannerTitle?: string | null
  bannerSubtitle?: string | null
  bannerOverlayColor?: string | null
}

export default function PricingClient({ pageSettings }: { pageSettings: PageSettings | null }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      question: "What does the Cardio Plan include?",
      answer: "Our Cardio Plan includes unlimited treadmill, cycling, HIIT sessions, and access to all cardio equipment."
    },
    {
      question: "Is registration really free?",
      answer: "Yes, registration is 100% free. You only pay for your selected plan with no hidden fees."
    },
    {
      question: "Can I switch plans later?",
      answer: "Absolutely! You can upgrade or downgrade your plan at any time with no extra charges."
    },
    {
      question: "Do you offer personal training?",
      answer: "Yes, we have certified personal trainers available. You can book one-on-one or group sessions."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept cash, debit/credit cards, and mobile wallet payments for your convenience."
    }
  ]

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <NavBar />

      {/* Hero Section with PageSettings Support */}
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-black py-16 text-center overflow-hidden">
        {/* Banner Image Background (if available) */}
        {pageSettings?.bannerImage?.url && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{ backgroundImage: `url(${pageSettings.bannerImage.url})` }}
            />
            <div 
              className={`absolute inset-0 z-0 ${
                pageSettings?.bannerOverlayColor === 'light' ? 'bg-black/40' :
                pageSettings?.bannerOverlayColor === 'medium' ? 'bg-black/60' :
                pageSettings?.bannerOverlayColor === 'none' ? 'bg-black/0' :
                'bg-black/80'
              }`}
            ></div>
          </>
        )}
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-yellow-400">
            {pageSettings?.bannerTitle || 'Our Pricing Plans'}
          </h1>
          <p className="mt-4 text-gray-300 text-lg">
            {pageSettings?.bannerSubtitle || 'Pick your plan. Smash your goals. Start today! 💪'}
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Cardio Plan */}
          <div className="relative bg-gray-900 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300 h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80" 
              className="absolute inset-0 w-full h-full object-cover"
              alt="Cardio Plan"
            />
            <div className="absolute inset-0 bg-black bg-opacity-80"></div>
            <div className="relative z-10 p-10 flex flex-col h-full text-center">
              <div>
                <h2 className="text-3xl font-bold text-yellow-400">Cardio Plan</h2>
                <p className="mt-4 text-5xl font-extrabold">4500 PKR</p>
                <p className="mt-2 text-gray-300">Free Registration</p>
              </div>
              <div className="mt-auto">
                <a 
                  href="https://wa.me/923001234567?text=Hi!%20I%20want%20to%20start%20the%20Cardio%20Plan" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full transition"
                >
                  Start Your Plan
                </a>
              </div>
            </div>
          </div>

          {/* Non-Cardio Plan */}
          <div className="relative bg-gray-900 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300 h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=800&q=80" 
              className="absolute inset-0 w-full h-full object-cover"
              alt="Non-Cardio Plan"
            />
            <div className="absolute inset-0 bg-black bg-opacity-80"></div>
            <div className="relative z-10 p-10 flex flex-col h-full text-center">
              <div>
                <h2 className="text-3xl font-bold text-yellow-400">Non-Cardio Plan</h2>
                <p className="mt-4 text-5xl font-extrabold">3500 PKR</p>
                <p className="mt-2 text-gray-300">Free Registration</p>
              </div>
              <div className="mt-auto">
                <a 
                  href="https://wa.me/923001234567?text=Hi!%20I%20want%20to%20start%20the%20Non-Cardio%20Plan" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full transition"
                >
                  Start Your Plan
                </a>
              </div>
            </div>
          </div>

          {/* Combined Plan */}
          <div className="relative bg-gray-900 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300 h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80" 
              className="absolute inset-0 w-full h-full object-cover"
              alt="Combined Plan"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/30 to-yellow-600/40"></div>
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            <div className="relative z-10 p-10 flex flex-col h-full text-center">
              <div className="bg-yellow-500 text-black text-xs font-bold py-1 px-3 rounded-full mb-2 self-center">
                MOST POPULAR ⭐
              </div>
              <div>
                <h2 className="text-3xl font-bold text-yellow-400">Combined Plan</h2>
                <p className="mt-4 text-5xl font-extrabold">6000 PKR</p>
                <p className="mt-2 text-gray-300">Free Registration</p>
              </div>
              <div className="mt-auto">
                <a 
                  href="https://wa.me/923001234567?text=Hi!%20I%20want%20to%20start%20the%20Combined%20Plan" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 px-6 rounded-full transition shadow-lg"
                >
                  Start Your Plan
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-yellow-400 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden transition hover:border-yellow-500"
              >
                <button
                  className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg font-semibold text-white">{faq.question}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`w-6 h-6 text-yellow-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-8 pb-6 text-gray-400">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-10 border-t-2 border-yellow-500/20">
        <div className="max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-3 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-bold text-yellow-500 mb-4">GetFit Gym</h3>
            <p className="leading-relaxed">
              Building stronger bodies and sharper minds. <br />
              Join our community today!
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-yellow-500 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-yellow-400 transition">Home</Link></li>
              <li><Link href="/trainers" className="hover:text-yellow-400 transition">Trainers</Link></li>
              <li><Link href="/supplements" className="hover:text-yellow-400 transition">Supplements</Link></li>
              <li><Link href="/pricing" className="hover:text-yellow-400 transition">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-yellow-500 mb-4">Contact</h3>
            <p>Email: <a href="mailto:getfitness01@gmail.com" className="hover:text-yellow-400 transition">getfitness01@gmail.com</a></p>
            <p>Phone: <a href="tel:+923143586891" className="hover:text-yellow-400 transition">+92 3143586891</a></p>
            <p>Address: Islampura Alamgir road Lahore, Pakistan</p>
          </div>
        </div>

        <div className="text-center text-gray-500 mt-8 border-t border-gray-800 pt-4 text-sm">
          &copy; 2025 <span className="text-yellow-500 font-semibold">GetFit Gym</span>. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
