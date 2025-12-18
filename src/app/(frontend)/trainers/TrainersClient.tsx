'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import NavBar from '@/components/NavBar'

interface Trainer {
  id: string
  name: string
  title?: string | null
  bio?: string | null
  photo?: { url: string } | null
  achievements?: Array<{ achievement: string }> | null
  yearsExp?: number | null
  clients?: number | null
  rating?: number | null
  specialties?: Array<{ specialty: string }> | null
}

export default function TrainersClient({ trainers }: { trainers: Trainer[] }) {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`🎉 Booking Request Submitted!\n\nWe'll contact you within 24 hours to confirm your session with ${selectedTrainer?.name}.\n\nGet ready to transform! 💪`)
    closeBooking()
  }

  const featuredTrainer = trainers[0]
  const otherTrainers = trainers.slice(1)

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20 overflow-hidden">
        {/* Animated Background - Floating Dumbbells */}
        <div className="header-fitness-bg">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="dumbbell" viewBox="0 0 100 100" fill="#eab308">
              <rect x="20" y="40" width="8" height="20" rx="2" />
              <rect x="28" y="35" width="44" height="30" rx="3" />
              <rect x="72" y="40" width="8" height="20" rx="2" />
            </svg>
          ))}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 max-w-6xl mx-auto text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 animate-fadeUp">
            Meet Your Elite Trainers
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto animate-fadeUp delay-200">
            World-class certified professionals ready to transform your fitness journey with personalized training
          </p>
          <div className="mt-8 flex justify-center items-center space-x-4 animate-fadeUp delay-400">
            <div className="flex items-center text-yellow-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold">Certified Trainers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Trainer Section */}
      {featuredTrainer && (
        <section className="max-w-7xl mx-auto py-20 px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">Our Featured Trainer</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Meet the champion who will guide you toward your fitness goals</p>
          </div>

          {/* Centralized Featured Trainer Card */}
          <div className="max-w-2xl mx-auto mb-20">
            <div className="trainer-card-main scroll-reveal bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-xl overflow-hidden border border-yellow-500/20">
              <div className="p-8 text-center">
                {/* Profile Photo */}
                <div className="relative mb-6">
                  <div className="w-56 h-56 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl p-0.5">
                    {featuredTrainer.photo?.url ? (
                      <img 
                        src={featuredTrainer.photo.url} 
                        alt={featuredTrainer.name}
                        className="w-full h-full rounded-full object-cover border-2 border-gray-800 shadow-xl"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-28 h-28 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  {/* Status Badge */}
                  <div className="absolute top-2 right-1/2 transform translate-x-24 w-10 h-10 bg-green-500 rounded-full border-4 border-gray-800 flex items-center justify-center shadow-lg">
                    <span className="text-lg text-white font-bold">✓</span>
                  </div>
                </div>

                {/* Name & Title */}
                <h2 className="text-2xl font-bold text-white mb-2">{featuredTrainer.name}</h2>
                {featuredTrainer.title && (
                  <p className="text-yellow-400 font-semibold mb-1">{featuredTrainer.title}</p>
                )}
                <p className="text-gray-300 text-sm mb-4">Certified Personal Trainer</p>

                {/* Achievements Badges */}
                {featuredTrainer.achievements && featuredTrainer.achievements.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {featuredTrainer.achievements.map((achievement, idx) => (
                      <span key={idx} className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs px-3 py-1 rounded-full font-semibold">
                        🏆 {achievement.achievement}
                      </span>
                    ))}
                  </div>
                )}

                {/* Bio */}
                {featuredTrainer.bio && (
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    💪 {featuredTrainer.bio}
                  </p>
                )}

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-800/50 rounded-xl border border-yellow-500/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{featuredTrainer.yearsExp || '-'}+</div>
                    <div className="text-xs text-gray-400">Years Exp</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{featuredTrainer.clients || '-'}+</div>
                    <div className="text-xs text-gray-400">Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{featuredTrainer.rating || '-'}</div>
                    <div className="text-xs text-gray-400">Rating</div>
                  </div>
                </div>

                {/* Specialties */}
                {featuredTrainer.specialties && featuredTrainer.specialties.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-white mb-3 text-sm">Specialties:</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {featuredTrainer.specialties.map((specialty, idx) => (
                        <span key={idx} className="bg-yellow-500/20 text-yellow-400 text-xs px-3 py-1 rounded-full border border-yellow-500/30">
                          {specialty.specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => openBooking(featuredTrainer)}
                    className="btn-ripple w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-3 rounded-xl font-semibold shadow-lg transition transform hover:scale-105"
                  >
                    Book Session
                  </button>
                  <button className="btn-ripple w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-xl font-medium transition">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* More Trainers Coming Soon Section */}
          <div className="mt-16 scroll-reveal delay-200">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">More Elite Trainers Coming Soon</h3>
              <p className="text-gray-600 text-lg">We're expanding our team of world-class professionals</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Coming Soon Card 1 */}
              <div className="coming-soon-card bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center border-2 border-dashed border-gray-300">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,9H13V15H11V9M12,17A1,1 0 0,0 11,18A1,1 0 0,0 12,19A1,1 0 0,0 13,18A1,1 0 0,0 12,17Z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Strength Specialist</h4>
                <p className="text-sm text-gray-600 mb-3">Expert in powerlifting and strength conditioning</p>
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-semibold">Recruiting Now</span>
              </div>

              {/* Coming Soon Card 2 */}
              <div className="coming-soon-card bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center border-2 border-dashed border-gray-300">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,9H13V15H11V9M12,17A1,1 0 0,0 11,18A1,1 0 0,0 12,19A1,1 0 0,0 13,18A1,1 0 0,0 12,17Z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Cardio Coach</h4>
                <p className="text-sm text-gray-600 mb-3">Specializes in HIIT and endurance training</p>
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-semibold">Recruiting Now</span>
              </div>

              {/* Coming Soon Card 3 */}
              <div className="coming-soon-card bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center border-2 border-dashed border-gray-300">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,9H13V15H11V9M12,17A1,1 0 0,0 11,18A1,1 0 0,0 12,19A1,1 0 0,0 13,18A1,1 0 0,0 12,17Z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Nutrition Expert</h4>
                <p className="text-sm text-gray-600 mb-3">Certified nutritionist and diet planning</p>
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-semibold">Recruiting Now</span>
              </div>
            </div>

            {/* Join Team CTA */}
            <div className="mt-12 text-center scroll-reveal delay-300">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-8 max-w-3xl mx-auto border border-yellow-200">
                <h4 className="text-2xl font-bold text-gray-900 mb-3">Are You a Certified Trainer?</h4>
                <p className="text-gray-700 mb-6">Join our elite team and help transform lives. We're looking for passionate, certified trainers to expand our family.</p>
                <button className="btn-ripple bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition transform hover:scale-105">
                  Apply to Join Our Team
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Train With Us */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Why Train With Our Elite Squad?</h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="feature-card scroll-reveal bg-gray-800 p-6 rounded-2xl">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">🎓</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Certified Pros</h3>
              <p className="text-gray-300 text-sm">International certifications & proven expertise</p>
            </div>

            <div className="feature-card scroll-reveal delay-100 bg-gray-800 p-6 rounded-2xl">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">🏆</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Champions</h3>
              <p className="text-gray-300 text-sm">Award-winning trainers with real results</p>
            </div>

            <div className="feature-card scroll-reveal delay-200 bg-gray-800 p-6 rounded-2xl">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">💪</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Personalized</h3>
              <p className="text-gray-300 text-sm">Custom plans tailored to your goals</p>
            </div>

            <div className="feature-card scroll-reveal delay-300 bg-gray-800 p-6 rounded-2xl">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">🔥</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Motivation</h3>
              <p className="text-gray-300 text-sm">24/7 support to keep you on track</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-yellow-500 py-12">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-black mb-4">Ready to Level Up Your Fitness Game? 💯</h2>
          <p className="text-lg text-gray-800 mb-8">Book your first session with our elite trainers and start your transformation journey today!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-ripple bg-black text-yellow-400 px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition transform hover:scale-105">
              Book Free Consultation
            </button>
            <Link href="/pricing" className="btn-ripple bg-white text-black px-8 py-3 rounded-xl font-semibold border-2 border-black hover:bg-gray-100 transition transform hover:scale-105 inline-block">
              View Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-10 border-t-2 border-yellow-500/20 glow-yellow">
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
              <li><Link href="/" className="link-glow hover:text-yellow-400 transition">Home</Link></li>
              <li><Link href="/trainers" className="link-glow hover:text-yellow-400 transition">Trainers</Link></li>
              <li><Link href="/supplements" className="link-glow hover:text-yellow-400 transition">Supplements</Link></li>
              <li><Link href="/pricing" className="link-glow hover:text-yellow-400 transition">Pricing</Link></li>
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

      {/* Booking Modal */}
      {bookingOpen && selectedTrainer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={closeBooking}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Book Your Session</h2>
                <button onClick={closeBooking} className="text-white hover:text-gray-200 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-white text-sm mt-2">Train with {selectedTrainer.name}</p>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition" />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number *</label>
                <input type="tel" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition" placeholder="+92 300 1234567" />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
                <input type="email" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition" />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Fitness Goals *</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="text-yellow-500 mr-2 rounded" />
                    <span className="text-sm">Weight Loss</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="text-yellow-500 mr-2 rounded" />
                    <span className="text-sm">Muscle Building</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="text-yellow-500 mr-2 rounded" />
                    <span className="text-sm">Strength Training</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Additional Notes</label>
                <textarea rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition resize-none" placeholder="Any medical conditions or specific requirements..."></textarea>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-4 rounded-xl font-semibold shadow-lg transition transform hover:scale-105">
                  Book My Session 🔥
                </button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  We'll contact you within 24 hours to confirm your session
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
