'use client'
import React, { useState } from 'react'
import { useCart } from '@/contexts/CartContext'

export default function CheckoutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, totalAmount, clearCart } = useCart()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'cash',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill in all required fields')
      return
    }

    alert(`Order placed successfully!\nTotal: PKR ${totalAmount.toLocaleString()}\n\nOur team will contact you shortly for confirmation.`)
    clearCart()
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Checkout</h2>
            <button onClick={onClose} className="text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto bg-gray-50 p-4 rounded-lg">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-semibold text-gray-800">PKR {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t-2 border-gray-200">
              <span className="text-xl font-bold text-gray-800">Total:</span>
              <span className="text-2xl font-bold text-yellow-600">PKR {totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Delivery Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500"
              >
                <option value="cash">Cash on Delivery</option>
                <option value="bank">Bank Transfer</option>
                <option value="card">Credit/Debit Card</option>
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-3 rounded-xl font-semibold shadow-lg transition"
              >
                Confirm Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
