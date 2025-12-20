'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import NavBar from '@/components/NavBar'
import { getTrainerImageUrl } from '@/lib/cloudinary-urls'
import WhatsAppButton from '@/components/WhatsAppButton'

interface Trainer {
  id: string
  name: string
  title?: string | null
  bio?: string | null
  photo?: { url: string } | null
  bannerImage?: { url: string } | null
  contentBackgroundImage?: { url: string } | null
  achievements?: Array<{ achievement: string }> | null
  yearsExp?: number | null
  clients?: number | null
  rating?: number | null
  specialties?: Array<{ specialty: string }> | null
}

interface PageSettings {
  bannerImage?: { url: string } | null
  bannerTitle?: string | null
  bannerSubtitle?: string | null
  bannerOverlayColor?: string | null
}

export default function TrainersClient({ 
  trainers, 
  pageSettings 
}: { 
  trainers: Trainer[]
  pageSettings: PageSettings | null
}) {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Scroll Reveal Animation
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

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const openBooking = (trainer: Trainer) => {
    setSelectedTrainer(trainer)
    setBookingOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeBooking = () => {
    setBookingOpen(false)
    setSelectedTrainer(null)
    document.body.style.overflow = 'auto'
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    
    // Collect selected goals
    const goals: string[] = []
    formData.getAll('goals').forEach(goal => {
      if (goal) goals.push(goal as string)
    })

    const bookingData = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      trainer: selectedTrainer?.id,
      goals: goals.map(goal => ({ goal })),
      notes: formData.get('notes') as string,
      preferredTime: formData.get('preferredTime') as string,
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })

      if (response.ok) {
        alert(`🎉 Booking Request Submitted!\n\nWe'll contact you within 24 hours to confirm your session with ${selectedTrainer?.name}.\n\nGet ready to transform! 💪`)
        closeBooking()
      } else {
        const error = await response.json()
        alert(`❌ Error: ${error.message || 'Failed to submit booking. Please try again.'}`)
      }
    } catch (error) {
      console.error('Booking error:', error)
      alert('❌ Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const featuredTrainer = trainers[0]

  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans selection:bg-yellow-500 selection:text-black">
      <NavBar />

      {/* Header Section with Animated Background */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Banner Image if available from PageSettings */}
          {pageSettings?.bannerImage?.url && (
            <>
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${pageSettings.bannerImage.url})` }}
              />
              <div 
                className={`absolute inset-0 ${
                  pageSettings?.bannerOverlayColor === 'light' ? 'bg-black/40' :
                  pageSettings?.bannerOverlayColor === 'medium' ? 'bg-black/60' :
                  pageSettings?.bannerOverlayColor === 'none' ? 'bg-black/0' :
                  'bg-black/80'
                }`}
              />
            </>
          )}
          
          {!pageSettings?.bannerImage?.url && (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black opacity-90"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
            </>
          )}

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold tracking-widest uppercase mb-6 animate-fadeUp">
            Elite Coaching
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 animate-fadeUp delay-100 tracking-tight">
            {pageSettings?.bannerTitle || 'MASTER YOUR'}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              {pageSettings?.bannerTitle ? '' : 'POTENTIAL'}
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fadeUp delay-200 font-light leading-relaxed">
            {pageSettings?.bannerSubtitle || "Train with the industry's best. Our certified experts combine science, motivation, and discipline to help you break every limit."}
          </p>
        </div>
      </section>

      {/* Featured Trainer - Compact Horizontal Design */}
      {featuredTrainer && (
        <section className="relative z-10 max-w-5xl mx-auto px-6 mt-16 mb-24">
          <div className="scroll-reveal group relative bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-yellow-500/30 transition-all duration-500">
            <div className="flex flex-col md:flex-row">
              {/* Left: Image with Color Grade */}
              <div className="relative w-full md:w-2/5 h-[400px] md:h-auto overflow-hidden">
                <div className="absolute inset-0 bg-yellow-500/10 mix-blend-overlay z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80 md:opacity-40"></div>
                {featuredTrainer.photo?.url || getTrainerImageUrl(featuredTrainer.name) ? (
                  <Image
                    src={featuredTrainer.photo?.url || getTrainerImageUrl(featuredTrainer.name)}
                    alt={featuredTrainer.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                )}
                {/* Floating Badge */}
                <div className="absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Available Today
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Content */}
              <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-3xl font-black text-white mb-1 tracking-wide uppercase italic">
                      {featuredTrainer.name}
                    </h2>
                    <p className="text-yellow-500 font-bold tracking-wider text-sm">
                      {featuredTrainer.title || 'Master Trainer'}
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <span className="text-4xl">🔥</span>
                  </div>
                </div>

                {/* Stats Grid - Compact */}
                <div className="grid grid-cols-3 gap-4 mb-8 border-y border-white/5 py-6">
                  <div className="text-center border-r border-white/5 last:border-0">
                    <span className="block text-2xl font-bold text-white">
                      {featuredTrainer.yearsExp || '5'}+
                    </span>
                    <span className="text-[10px] uppercase text-gray-500 tracking-wider">
                      Years Exp
                    </span>
                  </div>
                  <div className="text-center border-r border-white/5 last:border-0">
                    <span className="block text-2xl font-bold text-white">
                      {featuredTrainer.clients || '100'}+
                    </span>
                    <span className="text-[10px] uppercase text-gray-500 tracking-wider">
                      Clients
                    </span>
                  </div>
                  <div className="text-center">
                    <span
                      className="block text-2xl font-bold text-white max-w-[5ch] mx-auto truncate"
                      title={String(featuredTrainer.rating || '5.0')}
                    >
                      {featuredTrainer.rating || '5.0'}
                    </span>
                    <span className="text-[10px] uppercase text-gray-500 tracking-wider">
                      Rating
                    </span>
                  </div>
                </div>

                {/* Compact Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {featuredTrainer.specialties?.slice(0, 3).map((spec, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300 font-medium"
                    >
                      {spec.specialty}
                    </span>
                  ))}
                  {featuredTrainer.achievements?.slice(0, 1).map((ach, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-md bg-yellow-500/10 border border-yellow-500/20 text-xs text-yellow-400 font-medium"
                    >
                      🏆 {ach.achievement}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 mt-auto">
                  <button
                    onClick={() => openBooking(featuredTrainer)}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 rounded-xl uppercase tracking-wider text-sm transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)]"
                  >
                    Book Session
                  </button>
                  <button className="px-6 py-4 rounded-xl border border-white/20 hover:bg-white/5 text-white font-bold transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Upcoming Trainers - Modern Glassmorphism Design */}
          <div className="mt-24">
            <div className="text-center mb-16">
              <span className="text-yellow-400 text-sm font-bold tracking-[0.2em] uppercase">
                UPCOMING SPECIALISTS
              </span>
              <h3 className="text-4xl font-black text-white mt-3 mb-4 tracking-tight uppercase italic">
                New Trainers Joining
              </h3>
              <p className="text-gray-400">Expanding our roster with world-class expertise</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* HIIT Specialist */}
              <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-yellow-500/50 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-2xl">
                    ⚡
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-bold">
                    COMING SOON
                  </span>
                </div>
                <h4 className="text-xl font-black text-white mb-2 uppercase tracking-wide">
                  HIIT Specialist
                </h4>
                <p className="text-sm text-gray-400 mb-4">
                  High-intensity interval training expert with competitive athletic background
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-1 rounded bg-white/5 text-gray-300">Cardio</span>
                  <span className="px-2 py-1 rounded bg-white/5 text-gray-300">Fat Loss</span>
                </div>
              </div>

              {/* Yoga Master */}
              <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-yellow-500/50 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-2xl">
                    🧘‍♂️
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-bold">
                    COMING SOON
                  </span>
                </div>
                <h4 className="text-xl font-black text-white mb-2 uppercase tracking-wide">
                  Yoga Master
                </h4>
                <p className="text-sm text-gray-400 mb-4">
                  Certified yoga instructor specializing in flexibility and mind-body wellness
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-1 rounded bg-white/5 text-gray-300">Yoga</span>
                  <span className="px-2 py-1 rounded bg-white/5 text-gray-300">Mobility</span>
                </div>
              </div>

              {/* Powerlifter */}
              <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-yellow-500/50 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-2xl">
                    🏋️‍♂️
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-bold">
                    COMING SOON
                  </span>
                </div>
                <h4 className="text-xl font-black text-white mb-2 uppercase tracking-wide">
                  Powerlifter
                </h4>
                <p className="text-sm text-gray-400 mb-4">
                  National powerlifting champion focused on maximal strength development
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-1 rounded bg-white/5 text-gray-300">Strength</span>
                  <span className="px-2 py-1 rounded bg-white/5 text-gray-300">Power</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Train With Us - Minimalist */}
      <section className="relative py-24 px-6">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500/5 to-transparent"></div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-yellow-400 text-sm font-bold tracking-[0.2em] uppercase">
              ELITE ADVANTAGES
            </span>
            <h2 className="text-4xl font-black text-white mt-3 tracking-tight uppercase italic">
              Why Choose Our Squad
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:border-yellow-500/50 transition-all">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-sm font-black text-white mb-2 uppercase tracking-wider">Certified Pros</h3>
              <p className="text-xs text-gray-400">International certifications</p>
            </div>

            <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:border-yellow-500/50 transition-all">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-sm font-black text-white mb-2 uppercase tracking-wider">Champions</h3>
              <p className="text-xs text-gray-400">Award-winning trainers</p>
            </div>

            <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:border-yellow-500/50 transition-all">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-sm font-black text-white mb-2 uppercase tracking-wider">Personalized</h3>
              <p className="text-xs text-gray-400">Custom plans for you</p>
            </div>

            <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:border-yellow-500/50 transition-all">
              <div className="text-4xl mb-4">🔥</div>
              <h3 className="text-sm font-black text-white mb-2 uppercase tracking-wider">Motivation</h3>
              <p className="text-xs text-gray-400">24/7 support system</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Compact */}
      <section className="relative py-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-black mb-3 uppercase tracking-tight italic">
            Ready To Transform?
          </h2>
          <p className="text-black/80 font-medium mb-8">
            Book your first session and start your journey today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-yellow-400 px-8 py-4 rounded-xl font-black uppercase tracking-wider text-sm hover:bg-gray-900 transition-all transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
              Book Free Session
            </button>
            <Link 
              href="/pricing" 
              className="bg-white/20 backdrop-blur-sm border-2 border-black text-black px-8 py-4 rounded-xl font-black uppercase tracking-wider text-sm hover:bg-white/30 transition-all transform hover:-translate-y-1 inline-block"
            >
              View Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Minimal Dark */}
      <footer className="relative bg-black py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left mb-8">
            <div>
              <h3 className="text-2xl font-black text-yellow-500 mb-3 uppercase tracking-wider italic">
                GetFit
              </h3>
              <p className="text-gray-400 text-sm">
                Building stronger bodies<br />and sharper minds
              </p>
            </div>

            <div>
              <h4 className="text-sm font-black text-white mb-3 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-gray-400 hover:text-yellow-400 transition">Home</Link></li>
                <li><Link href="/trainers" className="text-gray-400 hover:text-yellow-400 transition">Trainers</Link></li>
                <li><Link href="/supplements" className="text-gray-400 hover:text-yellow-400 transition">Supplements</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-yellow-400 transition">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-black text-white mb-3 uppercase tracking-wider">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p><a href="mailto:getfitness01@gmail.com" className="hover:text-yellow-400 transition">getfitness01@gmail.com</a></p>
                <p><a href="tel:+923143586891" className="hover:text-yellow-400 transition">+92 314 358 6891</a></p>
                <p>Islampura, Lahore, PK</p>
              </div>
            </div>
          </div>

          <div className="text-center text-gray-500 text-xs pt-8 border-t border-white/5">
            &copy; 2025 <span className="text-yellow-500 font-bold">GetFit Gym</span>. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Booking Modal - Dark Theme */}
      {bookingOpen && selectedTrainer && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" 
          onClick={closeBooking}
        >
          <div 
            className="bg-gray-900 border border-white/10 rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header - Black with Yellow Accent */}
            <div className="bg-black border-b border-white/10 p-6 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-wide italic">
                    Book Session
                  </h2>
                  <p className="text-yellow-400 text-sm font-medium mt-1">
                    with {selectedTrainer.name}
                  </p>
                </div>
                <button 
                  onClick={closeBooking} 
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Form - Dark Inputs */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-300 font-bold text-sm mb-2 uppercase tracking-wide">
                  Full Name *
                </label>
                <input 
                  type="text" 
                  name="name"
                  required 
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition text-white placeholder-gray-500" 
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold text-sm mb-2 uppercase tracking-wide">
                  Phone Number *
                </label>
                <input 
                  type="tel" 
                  name="phone"
                  required 
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition text-white placeholder-gray-500" 
                  placeholder="+92 300 1234567" 
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold text-sm mb-2 uppercase tracking-wide">
                  Email Address *
                </label>
                <input 
                  type="email" 
                  name="email"
                  required 
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition text-white placeholder-gray-500" 
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold text-sm mb-2 uppercase tracking-wide">
                  Preferred Time
                </label>
                <select 
                  name="preferredTime"
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition text-white"
                >
                  <option value="">Select time slot</option>
                  <option value="Morning (6 AM - 12 PM)">Morning (6 AM - 12 PM)</option>
                  <option value="Afternoon (12 PM - 6 PM)">Afternoon (12 PM - 6 PM)</option>
                  <option value="Evening (6 PM - 10 PM)">Evening (6 PM - 10 PM)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-bold text-sm mb-2 uppercase tracking-wide">
                  Fitness Goals *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center bg-black border border-white/10 rounded-lg p-3 hover:bg-white/5 transition cursor-pointer">
                    <input type="checkbox" name="goals" value="Weight Loss" className="text-yellow-500 rounded mr-3 focus:ring-yellow-500" />
                    <span className="text-sm text-gray-300">Weight Loss</span>
                  </label>
                  <label className="flex items-center bg-black border border-white/10 rounded-lg p-3 hover:bg-white/5 transition cursor-pointer">
                    <input type="checkbox" name="goals" value="Muscle Building" className="text-yellow-500 rounded mr-3 focus:ring-yellow-500" />
                    <span className="text-sm text-gray-300">Muscle Building</span>
                  </label>
                  <label className="flex items-center bg-black border border-white/10 rounded-lg p-3 hover:bg-white/5 transition cursor-pointer">
                    <input type="checkbox" name="goals" value="Strength Training" className="text-yellow-500 rounded mr-3 focus:ring-yellow-500" />
                    <span className="text-sm text-gray-300">Strength Training</span>
                  </label>
                  <label className="flex items-center bg-black border border-white/10 rounded-lg p-3 hover:bg-white/5 transition cursor-pointer">
                    <input type="checkbox" name="goals" value="General Fitness" className="text-yellow-500 rounded mr-3 focus:ring-yellow-500" />
                    <span className="text-sm text-gray-300">General Fitness</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold text-sm mb-2 uppercase tracking-wide">
                  Additional Notes
                </label>
                <textarea 
                  name="notes"
                  rows={3} 
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition resize-none text-white placeholder-gray-500" 
                  placeholder="Medical conditions, injuries, specific requirements..."
                ></textarea>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black py-4 rounded-xl font-black uppercase tracking-wider text-sm transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Submitting...' : 'Book My Session 🔥'}
                </button>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  We&apos;ll contact you within 24 hours to confirm
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      <WhatsAppButton />
    </div>
  )
}
