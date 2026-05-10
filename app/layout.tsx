import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Xoogler — The Global Community for Ex-Googlers',
  description: "35,000+ Google alumni connecting, funding startups, hiring talent, and building what's next.",
  icons: {
    icon: '/images/xoogler-logo-1.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
