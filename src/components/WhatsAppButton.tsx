'use client'

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/923143586891"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-[#25D366] hover:bg-[#20ba5a] rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/30 transition-all hover:scale-110 active:scale-95 animate-fadeInUp group"
      aria-label="Contact us on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7 md:w-8 md:h-8 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 2.1.55 4.14 1.6 5.94L.5 23.5l5.72-1.6c1.73.95 3.68 1.46 5.78 1.46 6.35 0 11.5-5.15 11.5-11.5S18.35.5 12 .5zm0 21c-1.78 0-3.5-.48-5.02-1.38l-.36-.2-3.4.95.93-3.32-.23-.37C3.5 16.48 3 14.3 3 12 3 6.48 7.48 2 13 2s10 4.48 10 10-4.48 10-10 10zm5.28-7.44c-.29-.15-1.7-.84-1.96-.94s-.45-.15-.64.15-.74.94-.91 1.13-.34.22-.63.07c-.29-.15-1.23-.45-2.34-1.48-.86-.77-1.44-1.72-1.61-2.01s-.02-.45.13-.6c.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48s.05-.36-.03-.51c-.07-.15-.64-1.54-.88-2.1-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.51.07-.77.36s-1.01.98-1.01 2.39 1.04 2.77 1.18 2.96c.15.19 2.04 3.11 4.95 4.36.69.3 1.22.48 1.64.61.69.22 1.31.19 1.8.12.55-.08 1.7-.69 1.94-1.36s.24-1.24.17-1.36c-.07-.12-.27-.19-.55-.34z" />
      </svg>
      
      {/* Pulse Animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
    </a>
  )
}

export default WhatsAppButton
