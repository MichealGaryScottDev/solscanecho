'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface Transaction {
  signature: string
  slot: number
  blockTime: number
  success: boolean
  fee: number
}

export function SolscanMonitor() {
  const [address, setAddress] = useState('')
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastCheck, setLastCheck] = useState<Date | null>(null)

  useEffect(() => {
    if (!isMonitoring || !address) return

    const interval = setInterval(async () => {
      try {
        const response = await fetch('/api/solscan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address }),
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || 'Failed to fetch transactions')
        }

        const data = await response.json()
        setTransactions(data.transactions || [])
        setLastCheck(new Date())
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isMonitoring, address])

  const handleStart = async () => {
    if (!address.trim()) {
      setError('Please enter a valid Solana address')
      return
    }

    setIsMonitoring(true)
    setError(null)
    
    // Initial fetch
    try {
      const response = await fetch('/api/solscan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to fetch transactions')
      }

      const data = await response.json()
      setTransactions(data.transactions || [])
      setLastCheck(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setIsMonitoring(false)
    }
  }

  const handleStop = () => {
    setIsMonitoring(false)
  }

  return (
    <div className="space-y-6">
      <Card className="border-[#2b2b2b] bg-[#1e1e1e] p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm text-[#5c5c5c]">
              Solana Address
            </Label>
            <Input
              id="address"
              type="text"
              placeholder="Enter Solana wallet address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={isMonitoring}
              className="border-[#2b2b2b] bg-[#141414] text-[#e4e4e4] placeholder:text-[#5c5c5c]"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            {!isMonitoring ? (
              <Button
                onClick={handleStart}
                className="rounded-full bg-[#e4e4e4] text-[#141414] hover:bg-[#d4d4d4]"
              >
                Start Monitoring
              </Button>
            ) : (
              <Button
                onClick={handleStop}
                variant="outline"
                className="rounded-full border-[#2b2b2b] text-[#e4e4e4] hover:bg-[#2b2b2b]"
              >
                Stop Monitoring
              </Button>
            )}
          </div>

          {lastCheck && (
            <p className="text-xs text-[#5c5c5c]">
              Last checked: {lastCheck.toLocaleTimeString()}
            </p>
          )}
        </div>
      </Card>

      {transactions.length > 0 && (
        <Card className="border-[#2b2b2b] bg-[#1e1e1e] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#e4e4e4]">
              Recent Transactions
            </h2>
            <Badge variant="outline" className="border-[#2b2b2b] text-[#8a8a8a]">
              {transactions.length} total
            </Badge>
          </div>

          <div className="space-y-3">
            {transactions.map((tx, index) => (
              <div key={tx.signature}>
                {index > 0 && <Separator className="bg-[#2b2b2b]" />}
                <div className="flex items-start justify-between gap-4 py-3">
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <code className="truncate text-sm text-[#e4e4e4] font-mono">
                        {tx.signature.slice(0, 16)}...{tx.signature.slice(-8)}
                      </code>
                      <Badge
                        variant={tx.success ? 'default' : 'outline'}
                        className={
                          tx.success
                            ? 'bg-green-500/10 text-green-400'
                            : 'border-red-500/50 bg-red-500/10 text-red-400'
                        }
                      >
                        {tx.success ? 'Success' : 'Failed'}
                      </Badge>
                    </div>
                    <div className="flex gap-4 text-xs text-[#5c5c5c]">
                      <span>Slot: {tx.slot.toLocaleString()}</span>
                      <span>Fee: {(tx.fee / 1e9).toFixed(6)} SOL</span>
                      {tx.blockTime && (
                        <span>
                          {new Date(tx.blockTime * 1000).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <a
                    href={`https://solscan.io/tx/${tx.signature}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#8a8a8a] hover:text-[#e4e4e4] transition-colors"
                  >
                    View →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {isMonitoring && transactions.length === 0 && (
        <Card className="border-[#2b2b2b] bg-[#1e1e1e] p-8 text-center">
          <p className="text-sm text-[#5c5c5c]">
            Monitoring for transactions... No activity yet.
          </p>
        </Card>
      )}
    </div>
  )
}