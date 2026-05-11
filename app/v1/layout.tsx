import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Xoogler Apoorv v1',
  icons: {
    icon: '/images/xoogler-logo-1.png',
  },
}

export default function V1Layout({ children }: { children: React.ReactNode }) {
  return children
}
