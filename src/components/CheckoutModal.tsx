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
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    try {
      // Save order to Payload
      const orderData = {
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        items: cart.map(item => ({
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.price * item.quantity,
        })),
        totalAmount: totalAmount,
        paymentMethod: formData.paymentMethod,
        status: 'pending',
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error('Failed to create order')
      }

      alert(`Order placed successfully!\nTotal: PKR ${totalAmount.toLocaleString()}\n\nOur team will contact you shortly for confirmation.`)
      clearCart()
      onClose()
    } catch (error) {
      console.error('Error creating order:', error)
      alert('Failed to place order. Please try again or contact us on WhatsApp.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsAppOrder = () => {
    const message = `*New Order*\n\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}\n\n*Items:*\n${cart.map(item => `${item.name} x ${item.quantity} = PKR ${(item.price * item.quantity).toLocaleString()}`).join('\n')}\n\n*Total: PKR ${totalAmount.toLocaleString()}*`
    
    const whatsappUrl = `https://wa.me/923143586891?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    
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
              </select>
              <p className="text-sm text-gray-500 mt-2">Pay when your order arrives at your doorstep</p>
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
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-3 rounded-xl font-semibold shadow-lg transition disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : 'Confirm Order'}
              </button>
            </div>

            <div className="pt-4 border-t mt-4">
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold shadow-lg transition flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                Order via WhatsApp
              </button>
              <p className="text-xs text-gray-500 text-center mt-2">Quick order directly through WhatsApp</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
