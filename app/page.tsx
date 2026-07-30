'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSearch = () => {
    setError('')
    
    if (!address.trim()) {
      setError('Please enter a wallet address')
      return
    }

    // Basic Solana address validation (base58, 32-44 chars)
    const solanaAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/
    if (!solanaAddressRegex.test(address.trim())) {
      setError('Invalid Solana address format')
      return
    }

    router.push(`/wallet/${address.trim()}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const exampleAddresses = [
    {
      name: 'Example Wallet 1',
      address: 'DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK'
    },
    {
      name: 'Example Wallet 2', 
      address: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM'
    },
    {
      name: 'Example Wallet 3',
      address: 'FXjvTEQ67mwdqXLXKFqohJ8RqtPmWH1GVLRQNVoLvS9p'
    }
  ]

  return (
    <div className="min-h-screen bg-[#141414] relative overflow-hidden">
      {/* Subtle radial wash */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)'
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-[#2b2b2b]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[#e4e4e4] text-2xl font-medium">Solscan Echo</h1>
                <p className="text-[#8a8a8a] text-sm mt-1">Explore Solana wallet activity</p>
              </div>
              <Badge variant="outline" className="border-[#2b2b2b] text-[#8a8a8a]">
                Demo Mode
              </Badge>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="max-w-2xl mx-auto">
            {/* Search Section */}
            <div className="text-center mb-12">
              <h2 className="text-[#e4e4e4] text-3xl sm:text-4xl font-medium mb-4">
                Search Any Solana Wallet
              </h2>
              <p className="text-[#8a8a8a] text-lg">
                Enter a wallet address to view balances, tokens, and transaction history
              </p>
            </div>

            {/* Search Input */}
            <div className="bg-[#1e1e1e] rounded-[20px] p-6 sm:p-8 ring-1 ring-[#2b2b2b] mb-8">
              <div className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Enter Solana wallet address (e.g., DYw8jC...)"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value)
                      setError('')
                    }}
                    onKeyPress={handleKeyPress}
                    className="bg-[#141414] border-[#2b2b2b] text-[#e4e4e4] placeholder:text-[#5c5c5c] h-12 text-base font-mono"
                  />
                  {error && (
                    <p className="text-red-400 text-sm mt-2">{error}</p>
                  )}
                </div>
                <Button 
                  onClick={handleSearch}
                  className="w-full rounded-full h-12 bg-[#e4e4e4] text-[#141414] hover:bg-[#d4d4d4] font-medium"
                >
                  Search Wallet
                </Button>
              </div>
            </div>

            {/* Example Wallets */}
            <div>
              <p className="text-[#8a8a8a] text-sm mb-4 text-center">
                Try these example wallets:
              </p>
              <div className="grid gap-3">
                {exampleAddresses.map((example) => (
                  <Card
                    key={example.address}
                    className="bg-[#1e1e1e] border-[#2b2b2b] p-4 hover:bg-[#252525] transition-colors cursor-pointer"
                    onClick={() => setAddress(example.address)}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-[#e4e4e4] font-medium mb-1">{example.name}</p>
                        <p className="text-[#8a8a8a] text-sm font-mono truncate">
                          {example.address}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="shrink-0 text-[#8a8a8a] hover:text-[#e4e4e4] hover:bg-[#141414]"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/wallet/${example.address}`)
                        }}
                      >
                        View →
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-[#2b2b2b] mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[#8a8a8a] text-sm">
                Built with Next.js and Tailwind CSS
              </p>
              <p className="text-[#5c5c5c] text-sm">
                Demo data • Not connected to live blockchain
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}