'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavBar from '@/components/NavBar'

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      question: 'What does the Cardio Plan include?',
      answer:
        'Our Cardio Plan includes unlimited treadmill, cycling, HIIT sessions, and access to all cardio equipment.',
    },
    {
      question: 'Is registration really free?',
      answer:
        'Yes, registration is 100% free. You only pay for your selected plan with no hidden fees.',
    },
    {
      question: 'Can I switch plans later?',
      answer:
        'Absolutely! You can upgrade or downgrade your plan at any time with no extra charges.',
    },
    {
      question: 'Do you offer personal training?',
      answer:
        'Yes, we have certified personal trainers available. You can book one-on-one or group sessions.',
    },
    {
      question: 'What payment methods are accepted?',
      answer:
        'We accept cash, debit/credit cards, and mobile wallet payments for your convenience.',
    },
  ]

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <NavBar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-black py-16 text-center">
        <h1 className="text-5xl font-extrabold text-yellow-400">Our Pricing Plans</h1>
        <p className="mt-4 text-gray-300 text-lg">
          Pick your plan. Smash your goals. Start today! 💪
        </p>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cardio Plan */}
          <div className="relative bg-gray-900 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300 h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80"
              fill
              className="object-cover"
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
            <Image
              src="https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=800&q=80"
              fill
              className="object-cover"
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

          {/* Special Offer */}
          <div className="relative bg-gray-900 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300 h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
              fill
              className="object-cover"
              alt="Bring 2 Friends Offer"
            />
            <div className="absolute inset-0 bg-black bg-opacity-80"></div>
            <div className="relative z-10 p-10 flex flex-col h-full text-center">
              <div>
                <h2 className="text-3xl font-bold text-yellow-400">Bring 2 Friends Offer</h2>
                <p className="mt-4 text-5xl font-extrabold">500 PKR OFF</p>
                <p className="mt-2 text-gray-300">Get fit together, save together</p>
              </div>
              <div className="mt-auto">
                <a
                  href="https://wa.me/923035445689?text=Hi!%20I%20want%20to%20know%20about%20the%20Bring%202%20Friends%20Offer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full transition"
                >
                  Start Your Plan
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-yellow-400 mb-12">
            What&apos;s Included in Every Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Premium Equipment */}
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-yellow-400 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Premium Equipment</h3>
              <p className="text-gray-300 text-sm">
                Train with world-class machines designed for results.
              </p>
            </div>

            {/* Flexible Hours */}
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-yellow-400 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Flexible Hours</h3>
              <p className="text-gray-300 text-sm">
                Workout anytime with our extended opening hours.
              </p>
            </div>

            {/* Clean Environment */}
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-yellow-400 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7h18M3 12h18M3 17h18"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Clean Environment</h3>
              <p className="text-gray-300 text-sm">Stay safe & healthy in a hygienic gym space.</p>
            </div>

            {/* Community */}
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-yellow-400 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a2 2 0 00-2-2h-3V9a4 4 0 00-8 0v7H6a2 2 0 00-2 2v2h5"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Supportive Community</h3>
              <p className="text-gray-300 text-sm">
                Be part of a motivating & inspiring fitness family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold text-yellow-400 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl shadow-md">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-5 text-left text-lg font-semibold text-white focus:outline-none group"
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-yellow-400 transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-gray-300 text-base">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-10">
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
              <li>
                <Link href="/" className="hover:text-yellow-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/trainers" className="hover:text-yellow-400 transition">
                  Trainers
                </Link>
              </li>
              <li>
                <Link href="/supplements" className="hover:text-yellow-400 transition">
                  Supplements
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-yellow-400 transition">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-yellow-500 mb-4">Contact</h3>
            <p>
              Email:{' '}
              <a href="mailto:getfitness01@gmail.com" className="hover:text-yellow-400 transition">
                getfitness01@gmail.com
              </a>
            </p>
            <p>
              Phone:{' '}
              <a href="tel:+923143586891" className="hover:text-yellow-400 transition">
                +92 3143586891
              </a>
            </p>
            <p>Address: Islampura Alamgir road Lahore, Pakistan</p>
          </div>
        </div>

        <div className="text-center text-gray-500 mt-8 border-t border-gray-800 pt-4 text-sm">
          &copy; 2025 <span className="text-yellow-500 font-semibold">GetFit Gym</span>. All rights
          reserved.
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/923143586891"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-300 z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 2.1.55 4.14 1.6 5.94L.5 23.5l5.72-1.6c1.73.95 3.68 1.46 5.78 1.46 6.35 0 11.5-5.15 11.5-11.5S18.35.5 12 .5zm0 21c-1.78 0-3.5-.48-5.02-1.38l-.36-.2-3.4.95.93-3.32-.23-.37C3.5 16.48 3 14.3 3 12 3 6.48 7.48 2 13 2s10 4.48 10 10-4.48 10-10 10zm5.28-7.44c-.29-.15-1.7-.84-1.96-.94s-.45-.15-.64.15-.74.94-.91 1.13-.34.22-.63.07c-.29-.15-1.23-.45-2.34-1.48-.86-.77-1.44-1.72-1.61-2.01s-.02-.45.13-.6c.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48s.05-.36-.03-.51c-.07-.15-.64-1.54-.88-2.1-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.51.07-.77.36s-1.01.98-1.01 2.39 1.04 2.77 1.18 2.96c.15.19 2.04 3.11 4.95 4.36.69.3 1.22.48 1.64.61.69.22 1.31.19 1.8.12.55-.08 1.7-.69 1.94-1.36s.24-1.24.17-1.36c-.07-.12-.27-.19-.55-.34z" />
        </svg>
      </a>
    </div>
  )
}
