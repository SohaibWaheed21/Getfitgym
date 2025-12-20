'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import ProductCard from '@/components/ProductCard'
import CartSidebar from '@/components/CartSidebar'
import CheckoutModal from '@/components/CheckoutModal'
import { CartProvider, useCart } from '@/contexts/CartContext'
import { getSupplementImageUrl } from '@/lib/cloudinary-urls'

interface Supplement {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: { url: string }
  bannerImage?: { url: string }
  contentBackgroundImage?: { url: string }
  badge?: string
  badgeColor?: string
  category?: string
  benefits?: Array<{ benefit: string; id?: string }>
  specs?: string
}

interface PageSettings {
  bannerImage?: { url: string } | null
  bannerTitle?: string | null
  bannerSubtitle?: string | null
  bannerOverlayColor?: string | null
}

function SupplementsClientInner({ 
  supplements,
  pageSettings 
}: { 
  supplements: Supplement[]
  pageSettings: PageSettings | null
}) {
  const { addToCart } = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')

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

    // Fade-in animation
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.fade-in-up').forEach(el => {
      fadeObserver.observe(el)
    })

    return () => {
      observer.disconnect()
      fadeObserver.disconnect()
    }
  }, [])

  const categories = ['all', ...Array.from(new Set(supplements.map(s => s.category).filter((c): c is string => Boolean(c))))]

  const filteredSupplements = selectedCategory === 'all' 
    ? supplements 
    : supplements.filter(s => s.category === selectedCategory)

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans">
      {/* Add missing animations */}
      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(60px);
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
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
      
      <NavBar />

        {/* Floating Cart Button - Modern Style */}
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-8 right-8 bg-gradient-to-br from-[#F5C211] to-[#FF6B1A] hover:from-[#FFD700] hover:to-[#FF8533] text-black w-16 h-16 rounded-2xl shadow-[0_0_40px_rgba(245,194,17,0.4)] flex items-center justify-center z-50 transition-all hover:scale-110 hover:shadow-[0_0_60px_rgba(245,194,17,0.6)]"
          style={{
            animation: 'float 6s ease-in-out infinite'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>

        {/* Hero Section - Modern Dark Design */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#0A0A0A]" />
          
          {/* Glowing Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F5C211]/20 rounded-full blur-[100px]" style={{ animation: 'float 8s ease-in-out infinite' }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#FF6B1A]/20 rounded-full blur-[100px]" style={{ animation: 'float 8s ease-in-out infinite', animationDelay: '-4s' }} />
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(#F5C211 1px, transparent 1px), linear-gradient(90deg, #F5C211 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }}
          />

          {/* Banner Image (if available) */}
          {(pageSettings?.bannerImage?.url || supplements[0]?.bannerImage?.url) && (
            <>
              <div 
                className="absolute inset-0 bg-cover bg-center z-0 opacity-10"
                style={{ backgroundImage: `url(${pageSettings?.bannerImage?.url || supplements[0]?.bannerImage?.url})` }}
              />
            </>
          )}
          
          <div className="relative z-10 max-w-6xl mx-auto text-center px-6">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5C211]/10 border border-[#F5C211]/30 mb-8"
              style={{ animation: 'slideUp 0.8s ease-out forwards' }}
            >
              <svg className="w-4 h-4 text-[#F5C211]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium text-[#F5C211]">Premium Quality Supplements</span>
            </div>

            {/* Main Heading */}
            <h1 
              className="font-['Bebas_Neue'] text-6xl sm:text-8xl md:text-9xl text-white mb-6 tracking-wider"
              style={{ animation: 'slideUp 0.8s ease-out forwards 0.1s', opacity: 0, animationFillMode: 'forwards' }}
            >
              {pageSettings?.bannerTitle || (
                <>
                  FUEL YOUR
                  <span className="block bg-gradient-to-r from-[#F5C211] to-[#FF6B1A] bg-clip-text text-transparent">
                    POTENTIAL
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p 
              className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
              style={{ animation: 'slideUp 0.8s ease-out forwards 0.2s', opacity: 0, animationFillMode: 'forwards' }}
            >
              {pageSettings?.bannerSubtitle || 'Premium supplements crafted for peak performance. Third-party tested, athlete approved, results guaranteed.'}
            </p>

            {/* Stats */}
            <div 
              className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16"
              style={{ animation: 'slideUp 0.8s ease-out forwards 0.3s', opacity: 0, animationFillMode: 'forwards' }}
            >
              {[
                { value: '50K+', label: 'Happy Customers' },
                { value: '100%', label: 'Lab Tested' },
                { value: '24/7', label: 'Support' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-['Bebas_Neue'] text-4xl text-[#F5C211] mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            style={{ animation: 'bounce 2s infinite' }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-[#F5C211]/50 flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-[#F5C211] rounded-full" style={{ animation: 'bounce 2s infinite' }} />
            </div>
          </div>
        </section>

        {/* Filter Bar - Modern Glass Effect */}
        {categories.length > 1 && (
          <section className="sticky top-0 z-40 backdrop-blur-xl bg-[#0A0A0A]/80 border-b border-white/10">
            <div className="max-w-6xl mx-auto px-6 py-4">
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2.5 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                      selectedCategory === cat
                        ? 'bg-gradient-to-r from-[#F5C211] to-[#FF6B1A] text-black shadow-[0_0_30px_rgba(245,194,17,0.4)]'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Products Grid - Modern Dark Cards */}
        <section className="relative max-w-7xl mx-auto py-20 px-6">
          {/* Background Glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#F5C211]/5 rounded-full blur-[150px] pointer-events-none" />
          
          <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredSupplements.map((supplement, index) => (
              <div 
                key={supplement.id} 
                className="group relative bg-[#141414]/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-[#F5C211]/30 transition-all duration-500 hover:-translate-y-2"
                style={{ 
                  animation: `slideUp 0.8s ease-out forwards ${index * 0.1}s`,
                  opacity: 0,
                  animationFillMode: 'forwards'
                }}
              >
                {/* Product Image Section with Gradient */}
                <div className="relative h-80 overflow-hidden">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F5C211]/10 to-[#FF6B1A]/10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                  
                  {/* Image */}
                  <div className="relative h-full flex items-center justify-center p-8">
                    {supplement.image?.url || getSupplementImageUrl(supplement.name) ? (
                      <img
                        src={supplement.image?.url || getSupplementImageUrl(supplement.name)}
                        alt={supplement.name}
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                      />
                    ) : (
                      <div className="text-gray-600 text-6xl">📦</div>
                    )}
                  </div>

                  {/* Badge */}
                  {supplement.badge && (
                    <div className={`absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      supplement.badgeColor || 'bg-red-500'
                    } text-white shadow-lg`}>
                      {supplement.badge}
                    </div>
                  )}

                  {/* Discount Badge */}
                  {supplement.originalPrice && (
                    <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full text-xs font-bold bg-green-500 text-white shadow-lg">
                      Save {Math.round(((supplement.originalPrice - supplement.price) / supplement.originalPrice) * 100)}%
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-8">
                  <h2 className="font-['Bebas_Neue'] text-3xl text-white mb-4 group-hover:text-[#F5C211] transition-colors tracking-wider">
                    {supplement.name}
                  </h2>
                  
                  {/* Benefits */}
                  {supplement.benefits && supplement.benefits.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Key Benefits</h4>
                      <ul className="space-y-2">
                        {supplement.benefits.slice(0, 4).map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                            <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>{benefit.benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Specs */}
                  {supplement.specs && (
                    <div className="mb-6 text-sm text-gray-500">
                      {supplement.specs}
                    </div>
                  )}

                  {/* Price and CTA */}
                  <div className="flex items-end justify-between pt-6 border-t border-white/10">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-['Bebas_Neue'] text-4xl text-white tracking-wider">
                          PKR {supplement.price.toLocaleString()}
                        </span>
                        {supplement.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            PKR {supplement.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const imageUrl = supplement.image?.url || getSupplementImageUrl(supplement.name)
                        addToCart({ name: supplement.name, price: supplement.price, image: imageUrl }, 1)
                        setCartOpen(true)
                      }}
                      className="bg-gradient-to-r from-[#F5C211] to-[#FF6B1A] hover:from-[#FFD700] hover:to-[#FF8533] text-black px-6 py-3 rounded-xl font-bold shadow-[0_0_30px_rgba(245,194,17,0.3)] hover:shadow-[0_0_40px_rgba(245,194,17,0.5)] transition-all transform hover:scale-105 flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add
                    </button>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#F5C211]/5 to-[#FF6B1A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredSupplements.length === 0 && (
            <div className="text-center py-20">
              <svg className="w-24 h-24 mx-auto mb-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="font-['Bebas_Neue'] text-3xl text-gray-600 mb-2 tracking-wider">No Products Found</p>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          )}
        </section>

        {/* Why Choose Section - Modern */}
        <section className="relative py-24 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#141414] via-[#0A0A0A] to-[#141414]" />
          
          {/* Decorative Orbs */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#F5C211]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF6B1A]/10 rounded-full blur-[100px]" />

          <div className="relative z-10 max-w-6xl mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="font-['Bebas_Neue'] text-5xl md:text-7xl text-white mb-4 tracking-wider">
                WHY CHOOSE <span className="bg-gradient-to-r from-[#F5C211] to-[#FF6B1A] bg-clip-text text-transparent">GETFIT?</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                We&apos;re committed to helping you achieve your fitness goals with premium supplements and exceptional service.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.46,13.97L5.82,21L12,17.27Z" />
                    </svg>
                  ),
                  title: 'Premium Quality',
                  description: 'All products are third-party tested for purity and potency. We source only the highest quality ingredients.'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z" />
                    </svg>
                  ),
                  title: 'Expert Approved',
                  description: 'Recommended by certified nutritionists and fitness professionals. Proven formulations for optimal results.'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19,7H22V9H19V12H17V9H14V7H17V4H19V7M17,12L15,10V11H5V9L3,11V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H17Z" />
                    </svg>
                  ),
                  title: 'Fast Delivery',
                  description: 'Free delivery within Lahore. Fast and secure shipping to ensure your supplements arrive fresh.'
                }
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="group relative bg-[#141414]/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#F5C211]/30 transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5C211] to-[#FF6B1A] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 text-black">
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h3 className="font-['Bebas_Neue'] text-2xl text-white mb-3 group-hover:text-[#F5C211] transition-colors tracking-wider">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F5C211]/5 to-[#FF6B1A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Bold */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5C211] to-[#FF6B1A]" />
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)',
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px'
          }} />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-6xl text-black mb-4 tracking-wider">
              Ready to Fuel Your Fitness Journey?
            </h2>
            <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust GetFit supplements for their fitness goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCartOpen(true)}
                className="bg-black hover:bg-black/80 text-[#F5C211] px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                View Cart
              </button>
              <Link
                href="/pricing"
                className="bg-white hover:bg-gray-100 text-black px-8 py-4 rounded-xl font-bold border-2 border-black transition-all transform hover:scale-105 shadow-xl inline-flex items-center justify-center"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Footer - Modern Dark */}
        <footer className="relative bg-[#0A0A0A] border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid md:grid-cols-3 gap-10 text-center md:text-left mb-8">
              <div>
                <h3 className="font-['Bebas_Neue'] text-3xl text-[#F5C211] mb-4 tracking-wider">GetFit Gym</h3>
                <p className="text-gray-400 leading-relaxed">
                  Building stronger bodies and sharper minds. <br />
                  Join our community today!
                </p>
              </div>

              <div>
                <h3 className="font-['Bebas_Neue'] text-2xl text-white mb-4 tracking-wider">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-gray-400 hover:text-[#F5C211] transition">Home</Link></li>
                  <li><Link href="/trainers" className="text-gray-400 hover:text-[#F5C211] transition">Trainers</Link></li>
                  <li><Link href="/supplements" className="text-gray-400 hover:text-[#F5C211] transition">Supplements</Link></li>
                  <li><Link href="/pricing" className="text-gray-400 hover:text-[#F5C211] transition">Pricing</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-['Bebas_Neue'] text-2xl text-white mb-4 tracking-wider">Contact</h3>
                <p className="text-gray-400 mb-2">
                  Email: <a href="mailto:getfitness01@gmail.com" className="hover:text-[#F5C211] transition">getfitness01@gmail.com</a>
                </p>
                <p className="text-gray-400 mb-2">
                  Phone: <a href="tel:+923143586891" className="hover:text-[#F5C211] transition">+92 3143586891</a>
                </p>
                <p className="text-gray-400">
                  Address: Islampura Alamgir road Lahore, Pakistan
                </p>
              </div>
            </div>

            <div className="text-center text-gray-500 pt-8 border-t border-white/10 text-sm">
              &copy; 2025 <span className="text-[#F5C211] font-bold">GetFit Gym</span>. All rights reserved.
            </div>
          </div>
        </footer>

        {/* Cart & Checkout */}
        <CartSidebar 
          open={cartOpen} 
          onClose={() => setCartOpen(false)} 
          onCheckout={() => {
            setCartOpen(false)
            setCheckoutOpen(true)
          }} 
        />
        <CheckoutModal 
          open={checkoutOpen} 
          onClose={() => setCheckoutOpen(false)} 
        />
      </div>
  )
}

export default function SupplementsClient(props: { supplements: Supplement[], pageSettings: PageSettings | null }) {
  return (
    <CartProvider>
      <SupplementsClientInner {...props} />
    </CartProvider>
  )
}
