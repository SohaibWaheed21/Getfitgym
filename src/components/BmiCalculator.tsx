'use client'
import React, { useState } from 'react'

export default function BmiCalculator() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [result, setResult] = useState('')

  function calculate() {
    const w = parseFloat(weight)
    const h = parseFloat(height)
    if (!w || !h) {
      setResult('⚠️ Please enter valid numbers.')
      return
    }
    const heightM = h / 100
    const bmi = (w / (heightM * heightM)).toFixed(1)
    let category = ''
    const v = parseFloat(bmi)
    if (v < 18.5) category = 'Underweight'
    else if (v < 24.9) category = 'Normal'
    else if (v < 29.9) category = 'Overweight'
    else category = 'Obese'
    setResult(`✅ Your BMI is ${bmi} (${category})`)
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input value={weight} onChange={(e) => setWeight(e.target.value)} id="weight" type="number" placeholder="Weight (kg)" className="p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none" />
        <input value={height} onChange={(e) => setHeight(e.target.value)} id="height" type="number" placeholder="Height (cm)" className="p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none" />
      </div>
      <button onClick={calculate} className="mt-4 w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-lg">Calculate</button>
      <p className="mt-6 font-bold text-lg text-gray-900">{result}</p>
    </div>
  )
}
