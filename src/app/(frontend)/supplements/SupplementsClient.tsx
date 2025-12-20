'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import ProductCard from '@/components/ProductCard'
import CartSidebar from '@/components/CartSidebar'
import CheckoutModal from '@/components/CheckoutModal'
import { CartProvider, useCart } from '@/contexts/CartContext'

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
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <NavBar />

        {/* Floating Cart Button */}
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white w-16 h-16 rounded-full shadow-professional-xl flex items-center justify-center z-40 transition-all hover:scale-110 pulse-glow"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>

        {/* Page Header with Floating Particles */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20 gradient-animated overflow-hidden">
          {/* Banner Image Background (from PageSettings or fallback to supplement banner) */}
          {(pageSettings?.bannerImage?.url || supplements[0]?.bannerImage?.url) && (
            <>
              <div 
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${pageSettings?.bannerImage?.url || supplements[0]?.bannerImage?.url})` }}
              />
              <div 
                className={`absolute inset-0 z-0 ${
                  pageSettings?.bannerOverlayColor === 'light' ? 'bg-black/40' :
                  pageSettings?.bannerOverlayColor === 'medium' ? 'bg-black/60' :
                  pageSettings?.bannerOverlayColor === 'none' ? 'bg-black/0' :
                  'bg-gradient-to-br from-black/80 via-black/70 to-black/80'
                }`}
              ></div>
            </>
          )}
          
          {/* Floating Particles Background Animation */}
          <div className="header-particles absolute w-full h-full overflow-hidden z-1">
            <div className="particle absolute bg-yellow-500/15 rounded-full w-20 h-20 left-[10%]" style={{ animation: 'float 12s infinite ease-in-out' }}></div>
            <div className="particle absolute bg-yellow-500/15 rounded-full w-15 h-15 left-[25%]" style={{ animation: 'float 15s infinite ease-in-out', animationDelay: '2s' }}></div>
            <div className="particle absolute bg-yellow-500/15 rounded-full w-25 h-25 left-[50%]" style={{ animation: 'float 18s infinite ease-in-out', animationDelay: '4s' }}></div>
            <div className="particle absolute bg-yellow-500/15 rounded-full w-[70px] h-[70px] left-[70%]" style={{ animation: 'float 14s infinite ease-in-out', animationDelay: '1s' }}></div>
            <div className="particle absolute bg-yellow-500/15 rounded-full w-[90px] h-[90px] left-[85%]" style={{ animation: 'float 16s infinite ease-in-out', animationDelay: '3s' }}></div>
            <div className="particle absolute bg-yellow-500/15 rounded-full w-[65px] h-[65px] left-[40%]" style={{ animation: 'float 13s infinite ease-in-out', animationDelay: '5s' }}></div>
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative z-10 max-w-6xl mx-auto text-center px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 animate-fadeUp">
              {pageSettings?.bannerTitle || 'Premium Supplements'}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto animate-fadeUp delay-200">
              {pageSettings?.bannerSubtitle || 'Fuel your fitness journey with our carefully selected, high-quality supplements designed to maximize your results'}
            </p>
          </div>
        </section>

        {/* Filter Bar */}
        {categories.length > 1 && (
          <section className="bg-white shadow-professional-lg sticky top-16 z-30 border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-6 py-4">
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                      selectedCategory === cat
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-professional'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Products Grid */}
        <section className="relative max-w-6xl mx-auto py-16 px-6 overflow-hidden">
          {/* Content Background Image (if available) */}
          {supplements[0]?.contentBackgroundImage?.url && (
            <>
              <div 
                className="absolute inset-0 bg-cover bg-center z-0 opacity-10"
                style={{ backgroundImage: `url(${supplements[0].contentBackgroundImage.url})` }}
              />
              <div className="absolute inset-0 bg-gray-50/90 z-0"></div>
            </>
          )}
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12">
            {filteredSupplements.map((supplement, index) => (
              <div key={supplement.id} className="product-card bg-white rounded-3xl shadow-professional-xl overflow-hidden scroll-reveal">
                {/* Product Image */}
                <div className="relative w-full h-80 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden image-zoom rounded-t-2xl flex items-center justify-center p-8">
                  {supplement.image?.url ? (
                    <img
                      src={supplement.image.url}
                      alt={supplement.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-gray-400 text-6xl">📦</div>
                  )}
                  {supplement.badge && (
                    <div className={`absolute top-4 right-4 ${supplement.badgeColor || 'bg-red-500'} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-professional badge-pulse`}>
                      {supplement.badge}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">{supplement.name}</h2>
                  
                  {/* Benefits */}
                  {supplement.benefits && supplement.benefits.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Key Benefits:</h4>
                      <ul className="space-y-2">
                        {supplement.benefits.slice(0, 4).map((benefit, idx) => (
                          <li key={idx} className="flex items-center text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {benefit.benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div>
                      <span className="text-3xl font-bold text-gray-800">PKR {supplement.price.toLocaleString()}</span>
                      {supplement.originalPrice && (
                        <>
                          <span className="text-lg text-gray-500 line-through ml-2">PKR {supplement.originalPrice.toLocaleString()}</span>
                          <div className="text-sm text-green-600 font-semibold">
                            Save {Math.round(((supplement.originalPrice - supplement.price) / supplement.originalPrice) * 100)}%
                          </div>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        addToCart({ name: supplement.name, price: supplement.price, image: supplement.image.url }, 1)
                        setCartOpen(true)
                      }}
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-8 py-3 rounded-xl font-semibold shadow-professional-lg transition transform hover:scale-105 btn-professional"
                    >
                      Add to Cart
                    </button>
                  </div>

                  {/* Specs */}
                  {supplement.specs && (
                    <div className="mt-4 text-sm text-gray-600">
                      {supplement.specs}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredSupplements.length === 0 && (
            <div className="text-center py-20">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 mx-auto mb-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-2xl font-bold text-gray-700 mb-2">No products found</p>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          )}
        </section>

        {/* Why Choose Our Supplements */}
        <section className="bg-gradient-to-br from-gray-900 to-black py-20 bg-textured">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 scroll-reveal">
              Why Choose GetFit Supplements?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="fade-in-up bg-gray-800 p-8 rounded-2xl transform hover:scale-105 transition duration-300 feature-card">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.46,13.97L5.82,21L12,17.27Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Premium Quality</h3>
                <p className="text-gray-300">All products are third-party tested for purity and potency. We source only the highest quality ingredients.</p>
              </div>

              <div className="fade-in-up bg-gray-800 p-8 rounded-2xl transform hover:scale-105 transition duration-300 feature-card">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Expert Approved</h3>
                <p className="text-gray-300">Recommended by certified nutritionists and fitness professionals. Proven formulations for optimal results.</p>
              </div>

              <div className="fade-in-up bg-gray-800 p-8 rounded-2xl transform hover:scale-105 transition duration-300 feature-card">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19,7H22V9H19V12H17V9H14V7H17V4H19V7M17,12L15,10V11H5V9L3,11V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H17Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Fast Delivery</h3>
                <p className="text-gray-300">Free delivery within Lahore. Fast and secure shipping to ensure your supplements arrive fresh.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-yellow-500 py-12">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-3xl font-bold text-black mb-4">Ready to Fuel Your Fitness Journey?</h2>
            <p className="text-lg text-gray-800 mb-8">
              Join thousands of satisfied customers who trust GetFit supplements for their fitness goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCartOpen(true)}
                className="bg-black text-yellow-400 px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition btn-professional shadow-professional"
              >
                View Cart
              </button>
              <Link
                href="/pricing"
                className="bg-white text-black px-8 py-3 rounded-xl font-semibold border-2 border-black hover:bg-gray-100 transition btn-professional shadow-professional inline-block"
              >
                View Pricing
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
