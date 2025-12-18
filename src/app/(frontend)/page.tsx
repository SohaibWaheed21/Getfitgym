'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BmiCalculator from '@/components/BmiCalculator'
import NavBar from '@/components/NavBar'

export default function HomePage() {
  useEffect(() => {
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })
    }, observerOptions)

    // Observe all scroll-reveal elements
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el)
    })

    // Parallax effect for banner
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const parallaxBg = document.querySelector('.parallax-bg') as HTMLElement
      if (parallaxBg) {
        parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`
      }

      // Parallax for branch images
      document.querySelectorAll('.parallax').forEach(img => {
        const rect = (img as HTMLElement).getBoundingClientRect()
        const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight
        if (scrollPercent > 0 && scrollPercent < 1) {
          ;(img as HTMLElement).style.transform = `scale(${1 + scrollPercent * 0.1})`
        }
      })
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="font-sans text-gray-800">
      <NavBar />

      {/* Banner */}
      <section className="relative h-[60vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
        <Image 
          src="/images/banner17.webp" 
          alt="Banner" 
          fill 
          className="parallax-bg object-cover transform scale-100 hover:scale-105 transition duration-700 ease-in-out" 
          priority 
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 shimmer"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white text-glow animate-fadeUp">
            GetFit Gym
          </h1>
          <p className="mt-3 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-2xl animate-fadeUp delay-200">
            Your Fitness Journey Starts Here
          </p>
          <a 
            href="#trial" 
            className="mt-6 px-6 py-3 sm:px-8 sm:py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold text-sm sm:text-base md:text-lg shadow-lg transition transform hover:scale-110 glow-yellow-strong ripple-effect animate-fadeUp delay-500"
          >
            Start Your Trial
          </a>
        </div>
      </section>

      {/* Our Process */}
      <section className="relative py-16 px-6 bg-gradient-to-r from-gray-900 to-black text-white gradient-mesh">
        <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Our Process</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="scroll-reveal flex flex-col items-center justify-center bg-gray-800 rounded-xl shadow-layered p-6 h-56 text-center card-3d animated-border icon-spin">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 mb-4 glow-yellow">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h2v7H5v-7zm6-5h2v12h-2V7zm6 8h2v4h-2v-4z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg">ANALYZE YOUR GOAL</h3>
          </div>

          {/* Step 2 */}
          <div className="scroll-reveal flex flex-col items-center justify-center bg-gray-800 rounded-xl shadow-layered p-6 h-56 text-center card-3d animated-border icon-spin">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 mb-4 glow-yellow">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 2v6l-4 8v6h14v-6l-4-8V2" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg">WORK HARD ON IT</h3>
          </div>

          {/* Step 3 */}
          <div className="scroll-reveal flex flex-col items-center justify-center bg-gray-800 rounded-xl shadow-layered p-6 h-56 text-center card-3d animated-border icon-spin">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 mb-4 glow-yellow">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3a9 9 0 100 18 9 9 0 000-18zm0 0v9l3 3" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg">IMPROVE YOU</h3>
          </div>

          {/* Step 4 */}
          <div className="scroll-reveal flex flex-col items-center justify-center bg-gray-800 rounded-xl shadow-layered p-6 h-56 text-center card-3d animated-border icon-spin">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 mb-4 glow-yellow">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 10l6-7 6 7-6 11-6-11z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg">ACHIEVE GOALS</h3>
          </div>
        </div>
      </section>

      {/* Branches */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-gray-800 scroll-reveal">
          Our Branches
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Branch 1 */}
          <div className="scroll-reveal relative h-80 rounded-2xl overflow-hidden shadow-layered group transform transition duration-500 animated-border">
            <Image 
              src="/images/gulshan2.jpg" 
              alt="Gulshan Ravi Branch" 
              fill 
              className="parallax object-cover group-hover:scale-125 transition duration-700 ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col items-center justify-end pb-10 text-center text-white p-6">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 drop-shadow-lg">
                Gulshan Ravi Branch
              </h3>
              <a 
                href="#contact" 
                className="inline-block px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg shadow-md transition duration-300 hover:bg-yellow-600 hover:scale-110 pulse-glow ripple-effect"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Branch 2 */}
          <div className="scroll-reveal relative h-80 rounded-2xl overflow-hidden shadow-layered group transform transition duration-500 animated-border">
            <Image 
              src="/images/islam.jpg" 
              alt="Islampura Branch" 
              fill 
              className="parallax object-cover group-hover:scale-125 transition duration-700 ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col items-center justify-end pb-10 text-center text-white p-6">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 drop-shadow-lg">
                Islampura Branch
              </h3>
              <a 
                href="#contact" 
                className="inline-block px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg shadow-md transition duration-300 hover:bg-yellow-600 hover:scale-110 pulse-glow ripple-effect"
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
          <Image src="/images/bmi.jpg" alt="BMI Background" fill className="object-cover" />
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
        <Image src="/images/trial.jpg" alt="Trial Background" fill className="object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
          <div className="text-white space-y-6">
            <h2 className="text-4xl font-bold leading-tight">We’re Not Like Others</h2>
            <p className="text-lg text-gray-300">At GetFit Gym, we don’t believe in shortcuts. We believe in building stronger bodies and sharper minds. Join us and start your transformation today!</p>
            <ul className="space-y-2 text-lg">
              <li>✔ Personalized training</li>
              <li>✔ Modern equipment</li>
              <li>✔ Supportive community</li>
            </ul>
          </div>
          <div className="bg-gray-900 bg-opacity-90 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">Start Your Trial</h3>
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

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-10 border-t-2 border-yellow-500/20 glow-yellow">
        <div className="max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-3 text-center md:text-left">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold text-yellow-500 mb-4">GetFit Gym</h3>
            <p className="leading-relaxed">
              Building stronger bodies and sharper minds. <br />
              Join our community today!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold text-yellow-500 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="link-glow hover:text-yellow-400 transition">Home</Link></li>
              <li><Link href="/trainers" className="link-glow hover:text-yellow-400 transition">Trainers</Link></li>
              <li><Link href="/supplements" className="link-glow hover:text-yellow-400 transition">Supplements</Link></li>
              <li><Link href="/pricing" className="link-glow hover:text-yellow-400 transition">Pricing</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-2xl font-bold text-yellow-500 mb-4">Contact</h3>
            <p>Email: <a href="mailto:getfitness01@gmail.com" className="hover:text-yellow-400 transition">getfitness01@gmail.com</a></p>
            <p>Phone: <a href="tel:+923143586891" className="hover:text-yellow-400 transition">+92 3143586891</a></p>
            <p>Address: Islampura Alamgir road Lahore, Pakistan</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center text-gray-500 mt-8 border-t border-gray-800 pt-4 text-sm">
          &copy; 2025 <span className="text-yellow-500 font-semibold">GetFit Gym</span>. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
