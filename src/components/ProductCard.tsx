'use client'
import React from 'react'
import { useCart } from '@/contexts/CartContext'

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  badge?: string
  badgeColor?: string
  benefits?: string[]
  specs?: string
}

export default function ProductCard({ id, name, price, originalPrice, image, badge, badgeColor, benefits, specs }: ProductCardProps) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = React.useState(1)
  const [animating, setAnimating] = React.useState(false)

  const handleAddToCart = () => {
    addToCart({ name, price, image }, quantity)
    
    // Trigger bounce animation
    setAnimating(true)
    setTimeout(() => setAnimating(false), 600)

    // Reset quantity
    setQuantity(1)
  }

  const badgeColors = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
  }

  return (
    <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105 border border-gray-100">
      <div className="relative p-8 bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-yellow-50 group-hover:to-gray-50 transition-all duration-500">
        {badge && (
          <span className={`absolute top-6 right-6 ${badgeColors[badgeColor as keyof typeof badgeColors] || 'bg-blue-500'} text-white text-sm font-extrabold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg animate-pulse`}>
            {badge}
          </span>
        )}
        <div className="w-full h-72 flex items-center justify-center">
          <img src={image} alt={name} className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500" />
        </div>
      </div>
      
      <div className="p-8 bg-gradient-to-b from-white to-gray-50">
        <h3 className="text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors duration-300">{name}</h3>
        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-3xl font-black bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">PKR {price.toLocaleString()}</span>
          {originalPrice && (
            <span className="text-xl text-gray-400 line-through font-semibold">PKR {originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* Benefits */}
        {benefits && benefits.length > 0 && (
          <div className="mb-6 bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-2xl p-4">
            <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-yellow-600">✨</span> Key Benefits
            </h4>
            <ul className="space-y-2">
              {benefits.slice(0, 3).map((benefit, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Specs */}
        {specs && (
          <div className="mb-6 bg-gray-100 rounded-xl p-3">
            <p className="text-xs text-gray-600 font-semibold">📦 {specs}</p>
          </div>
        )}

        <div className="flex items-center justify-between mb-6 bg-gray-100 rounded-2xl p-4">
          <label className="text-gray-800 font-bold text-lg">Quantity:</label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 bg-white hover:bg-yellow-500 hover:text-white text-gray-800 border-2 border-gray-300 hover:border-yellow-500 rounded-xl font-bold text-xl transition-all shadow-md hover:shadow-lg"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 text-center border-2 border-gray-300 rounded-xl py-2 font-bold text-lg focus:outline-none focus:border-yellow-500"
              min="1"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 bg-white hover:bg-yellow-500 hover:text-white text-gray-800 border-2 border-gray-300 hover:border-yellow-500 rounded-xl font-bold text-xl transition-all shadow-md hover:shadow-lg"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className={`w-full bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 hover:from-yellow-600 hover:via-yellow-700 hover:to-yellow-600 text-white py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-yellow-500/50 transition-all transform hover:scale-105 ${animating ? 'animate-bounce' : ''}`}
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  )
}
