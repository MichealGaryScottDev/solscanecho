import { Suspense } from 'react'
import { SolscanMonitor } from '@/components/solscan-monitor'

export const metadata = {
  title: 'Solscan Echo - Real-time Solana Transaction Monitor',
  description: 'Monitor Solana blockchain transactions in real-time with Echo',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#141414] text-[#e4e4e4]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-[#e4e4e4] sm:text-4xl">
            Solscan Echo
          </h1>
          <p className="mt-2 text-sm text-[#8a8a8a]">
            Real-time Solana transaction monitoring
          </p>
        </div>

        <Suspense fallback={<MonitorSkeleton />}>
          <SolscanMonitor />
        </Suspense>
      </div>
    </main>
  )
}

function MonitorSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-[400px] animate-pulse rounded-[20px] bg-[#1e1e1e]" />
      <div className="h-[200px] animate-pulse rounded-[20px] bg-[#1e1e1e]" />
    </div>
  )
}