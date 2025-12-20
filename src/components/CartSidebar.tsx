'use client'
import React from 'react'
import { useCart } from '@/contexts/CartContext'

export default function CartSidebar({
  open,
  onClose,
  onCheckout,
}: {
  open: boolean
  onClose: () => void
  onCheckout: () => void
}) {
  const { cart, removeFromCart, changeQuantity, totalAmount } = useCart()

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!')
      return
    }

    const phone = '923214647895'
    const lines = cart.map((item, idx) => {
      const lineTotal = (item.price * item.quantity).toLocaleString()
      return `${idx + 1}. ${item.name} x ${item.quantity} = PKR ${lineTotal}`
    })

    const message = `Hello! I'd like to place an order:\n\n${lines.join('\n')}\n\nTotal: PKR ${totalAmount.toLocaleString()}`
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-[400px] md:w-[450px] bg-white shadow-2xl transform ${open ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 z-50 flex flex-col`}
    >
      <div className="p-4 sm:p-6 bg-gray-900 text-white flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-bold">Shopping Cart</h2>
        <button onClick={onClose} className="text-white hover:text-yellow-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {cart.length === 0 ? (
          <div className="text-center py-8 sm:py-12 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-lg font-semibold">Your cart is empty</p>
          </div>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="flex items-start sm:items-center gap-3 sm:gap-4 bg-gray-50 p-3 sm:p-4 rounded-lg mb-3">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain rounded-lg" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm sm:text-base text-gray-800 truncate">{item.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600">PKR {item.price.toLocaleString()}</p>
                <div className="flex items-center gap-2 sm:gap-3 mt-2">
                  <button onClick={() => changeQuantity(index, -1)} className="w-7 h-7 sm:w-8 sm:h-8 bg-white hover:bg-yellow-500 hover:text-white text-gray-800 border-2 border-gray-300 hover:border-yellow-500 rounded-lg font-bold text-base sm:text-lg transition-all shadow-sm hover:shadow-md">-</button>
                  <span className="font-bold text-sm sm:text-base text-gray-800 min-w-[2ch] text-center">{item.quantity}</span>
                  <button onClick={() => changeQuantity(index, 1)} className="w-7 h-7 sm:w-8 sm:h-8 bg-white hover:bg-yellow-500 hover:text-white text-gray-800 border-2 border-gray-300 hover:border-yellow-500 rounded-lg font-bold text-base sm:text-lg transition-all shadow-sm hover:shadow-md">+</button>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-sm sm:text-base text-gray-800 whitespace-nowrap">PKR {(item.price * item.quantity).toLocaleString()}</p>
                <button onClick={() => removeFromCart(index)} className="text-red-500 hover:text-red-700 text-xs sm:text-sm mt-1 sm:mt-2">Remove</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 sm:p-6 bg-gray-50 border-t">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <span className="text-base sm:text-lg font-semibold">Total:</span>
          <span className="text-xl sm:text-2xl font-bold text-gray-900">PKR {totalAmount.toLocaleString()}</span>
        </div>
        <button
          onClick={onCheckout}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold shadow-lg transition mb-2 sm:mb-3"
        >
          Place Order
        </button>
        <button
          onClick={handleWhatsAppOrder}
          className="w-full flex justify-center items-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold shadow-lg transition text-center"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.572-.01-.199 0-.521.074-.793.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.214 3.074.149.198 2.098 3.202 5.077 4.309.711.244 1.264.39 1.697.499.713.182 1.362.156 1.874.095.572-.067 1.758-.719 2.006-1.414.248-.695.248-1.29.173-1.414-.075-.124-.272-.198-.57-.347zm-5.421 7.617h-.001a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.275c.001-5.455 4.436-9.89 9.892-9.89 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.896 6.992c-.003 5.455-4.437 9.89-9.892 9.89zm8.413-18.304A11.815 11.815 0 0012.05.002C5.495.002.002 5.495.002 12.049c0 2.124.557 4.199 1.613 6.036L.059 23.948a1.027 1.027 0 001.287 1.288l5.987-1.572A11.888 11.888 0 0012.049 24C18.605 24 24 18.506 24 12.049a11.82 11.82 0 00-3.515-8.656z" />
          </svg>
          Order on WhatsApp
        </button>
      </div>
    </div>
  )
}
