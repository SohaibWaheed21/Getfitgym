import React from 'react'
import './styles.css'
import ClientLayout from './ClientLayout'

export const metadata = {
  description: 'GetFit Gym website',
  title: 'GetFit Gym',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
