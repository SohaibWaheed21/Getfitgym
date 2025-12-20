'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import WhatsAppButton from '@/components/WhatsAppButton'

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

  const plans = [
    {
      title: "Cardio Plan",
      price: "4500 PKR",
      priceLabel: "/month",
      description: "Free Registration Included",
      features: [
        "Unlimited treadmill access",
        "Cycling & HIIT sessions",
        "All cardio equipment",
        "Flexible workout hours",
        "Locker room access",
      ],
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
      whatsappLink: "https://wa.me/923001234567?text=Hi!%20I%20want%20to%20start%20the%20Cardio%20Plan",
      isPopular: false,
    },
    {
      title: "Combined Plan",
      price: "6000 PKR",
      priceLabel: "/month",
      description: "Free Registration Included",
      features: [
        "Full weight training area",
        "Complete cardio access",
        "All gym equipment",
        "Personal training guidance",
        "Nutrition consultation",
      ],
      imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
      whatsappLink: "https://wa.me/923001234567?text=Hi!%20I%20want%20to%20start%20the%20Combined%20Plan",
      isPopular: true,
    },
    {
      title: "Non-Cardio Plan",
      price: "3500 PKR",
      priceLabel: "/month",
      description: "Free Registration Included",
      features: [
        "Full weight training area",
        "Strength equipment access",
        "Free weights & machines",
        "Personal training guidance",
        "Nutrition consultation",
      ],
      imageUrl: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=800&q=80",
      whatsappLink: "https://wa.me/923001234567?text=Hi!%20I%20want%20to%20start%20the%20Non-Cardio%20Plan",
      isPopular: false,
    },
  ]

  const stats = [
    { value: "50+", label: "Equipment", icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
      </svg>
    )},
    { value: "500+", label: "Members", icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-3-3h-2m-3-1a3 3 0 110-6 3 3 0 010 6zm-6 7h5v-2a3 3 0 00-3-3H7a3 3 0 00-3 3v2h5zm0 0H7m0 0v-2a3 3 0 013-3m0-6a3 3 0 110-6 3 3 0 010 6z" />
      </svg>
    )},
    { value: "24/7", label: "Access", icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )},
  ]

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .gradient-text {
          background: linear-gradient(to right, #F5C211, #FF6B1A);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <NavBar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #F5C211 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/50 to-[#0A0A0A]" />

        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F5C211]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#F5C211]/5 rounded-full blur-3xl" />

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

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#141414]/80 backdrop-blur-sm border border-[#F5C211]/20 rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#F5C211] animate-pulse" />
            <span className="text-sm font-medium text-gray-400">Limited Time: Free Registration</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-['Bebas_Neue'] text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight opacity-0 animate-fadeInUp">
            {pageSettings?.bannerTitle || (
              <>
                Choose Your <br />
                <span className="gradient-text">Fitness Journey</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            {pageSettings?.bannerSubtitle || 'Pick your plan. Smash your goals. Transform your body with premium equipment and expert guidance.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <a
              href="#pricing"
              className="group relative bg-gradient-to-r from-[#F5C211] to-[#FF6B1A] text-black font-['Bebas_Neue'] font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#F5C211]/30 overflow-hidden"
            >
              <span className="relative z-10">View Plans</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </a>
            <a
              href="https://wa.me/923143586891"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border-2 border-white/20 hover:border-[#F5C211]/50 text-white font-['Bebas_Neue'] font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:bg-[#141414]"
            >
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 2.1.55 4.14 1.6 5.94L.5 23.5l5.72-1.6c1.73.95 3.68 1.46 5.78 1.46 6.35 0 11.5-5.15 11.5-11.5S18.35.5 12 .5z" />
              </svg>
              Contact Us
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#141414] flex items-center justify-center text-[#F5C211]">
                  {stat.icon}
                </div>
                <div className="text-left">
                  <p className="font-['Bebas_Neue'] text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </section>

      {/* Pricing Plans Section */}
      <section id="pricing" className="relative py-24 px-6 bg-[#0A0A0A] overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#F5C211]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#F5C211]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-[#F5C211] font-medium tracking-wider uppercase mb-4">
              Pricing Plans
            </span>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Invest in Your <span className="gradient-text">Health</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Choose the perfect plan that fits your fitness goals. No hidden fees, cancel anytime.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan, index) => (
              <div
                key={plan.title}
                className={`group relative rounded-3xl overflow-hidden h-full ${
                  plan.isPopular ? 'md:-translate-y-4' : ''
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={plan.imageUrl}
                    alt={plan.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]/60" />
                </div>

                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute top-6 right-6 z-20">
                    <div className="bg-gradient-to-r from-[#F5C211] to-[#FF6B1A] text-black text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10 p-8 md:p-10 flex flex-col min-h-[500px]">
                  {/* Plan Name */}
                  <h3 className="font-['Bebas_Neue'] text-2xl md:text-3xl font-bold text-[#F5C211] mb-4">
                    {plan.title}
                  </h3>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="font-['Bebas_Neue'] text-5xl md:text-6xl font-bold text-white">
                        {plan.price.split(' ')[0]}
                      </span>
                      <span className="text-gray-400 font-medium">{plan.priceLabel}</span>
                    </div>
                    <p className="text-gray-400 mt-2">{plan.description}</p>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-6" />

                  {/* Features */}
                  <ul className="space-y-4 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F5C211]/20 flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#F5C211]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <a
                    href={plan.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-8 w-full flex items-center justify-center gap-2 font-['Bebas_Neue'] font-semibold text-lg py-4 rounded-full transition-all duration-300 ${
                      plan.isPopular
                        ? 'bg-gradient-to-r from-[#F5C211] to-[#FF6B1A] text-black hover:shadow-xl hover:shadow-[#F5C211]/30'
                        : 'bg-[#141414] hover:bg-[#1A1A1A] text-white border border-white/20 hover:border-[#F5C211]/50'
                    }`}
                  >
                    Start Your Plan
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F5C211]/10 to-transparent" />
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#F5C211]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#F5C211]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Loved by 500+ Members</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#F5C211]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>No Hidden Fees</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 px-6 bg-[#0A0A0A] overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#F5C211]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-[#F5C211] font-medium tracking-wider uppercase mb-4">
              Got Questions?
            </span>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Find answers to common questions about our membership plans
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="group bg-[#141414]/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#F5C211]/50 hover:shadow-lg hover:shadow-[#F5C211]/10"
              >
                <button
                  className="w-full px-6 md:px-8 py-6 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg md:text-xl font-semibold text-white pr-4 group-hover:text-[#F5C211] transition-colors">{faq.question}</span>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F5C211]/10 flex items-center justify-center group-hover:bg-[#F5C211]/20 transition-colors">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`w-5 h-5 text-[#F5C211] transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {openFaq === index && (
                  <div className="px-6 md:px-8 pb-6 animate-fadeInUp">
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">
              Still have questions? We are here to help!
            </p>
            <a
              href="https://wa.me/923001234567?text=Hi!%20I%20have%20a%20question%20about%20pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F5C211] to-[#FF6B1A] text-black font-['Bebas_Neue'] font-semibold text-lg px-8 py-4 rounded-full hover:shadow-xl hover:shadow-[#F5C211]/30 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contact Us on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] text-gray-400 py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-3 text-center md:text-left">
          <div>
            <h3 className="font-['Bebas_Neue'] text-3xl font-bold text-[#F5C211] mb-4">GetFit Gym</h3>
            <p className="leading-relaxed">
              Building stronger bodies and sharper minds. <br />
              Join our community today!
            </p>
          </div>

          <div>
            <h3 className="font-['Bebas_Neue'] text-2xl font-bold text-[#F5C211] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-[#F5C211] transition">Home</Link></li>
              <li><Link href="/trainers" className="hover:text-[#F5C211] transition">Trainers</Link></li>
              <li><Link href="/supplements" className="hover:text-[#F5C211] transition">Supplements</Link></li>
              <li><Link href="/pricing" className="hover:text-[#F5C211] transition">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-['Bebas_Neue'] text-2xl font-bold text-[#F5C211] mb-4">Contact</h3>
            <p>Email: <a href="mailto:getfitness01@gmail.com" className="hover:text-[#F5C211] transition">getfitness01@gmail.com</a></p>
            <p>Phone: <a href="tel:+923143586891" className="hover:text-[#F5C211] transition">+92 3143586891</a></p>
            <p>Address: Islampura Alamgir road Lahore, Pakistan</p>
          </div>
        </div>

        <div className="text-center text-gray-500 mt-8 border-t border-white/10 pt-6 text-sm">
          &copy; 2025 <span className="text-[#F5C211] font-semibold">GetFit Gym</span>. All rights reserved.
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  )
}
