import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

interface Transaction {
  signature: string
  timestamp: number
  type: string
  amount?: number
  token?: string
  success: boolean
}

interface WalletData {
  address: string
  balance: number
  tokenAccounts: Array<{
    mint: string
    symbol: string
    balance: number
    usdValue: number
  }>
  recentTransactions: Transaction[]
}

// Mock data generator
function generateMockWalletData(address: string): WalletData {
  const isValidSolana = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)
  
  if (!isValidSolana) {
    return {
      address,
      balance: 0,
      tokenAccounts: [],
      recentTransactions: []
    }
  }

  // Generate deterministic mock data based on address
  const hash = address.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const txCount = 5 + (hash % 15)
  const tokenCount = hash % 5

  const tokens = [
    { symbol: 'USDC', mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' },
    { symbol: 'RAY', mint: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R' },
    { symbol: 'ORCA', mint: 'orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE' },
    { symbol: 'BONK', mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263' },
    { symbol: 'JUP', mint: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN' }
  ]

  const tokenAccounts = tokens.slice(0, tokenCount).map((token, i) => ({
    mint: token.mint,
    symbol: token.symbol,
    balance: ((hash * (i + 1)) % 10000) / 100,
    usdValue: ((hash * (i + 1)) % 5000) / 100
  }))

  const txTypes = ['Transfer', 'Swap', 'Stake', 'NFT Mint', 'Token Transfer']
  const recentTransactions: Transaction[] = Array.from({ length: txCount }, (_, i) => ({
    signature: Array.from({ length: 88 }, () => 
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[(hash * i) % 62]
    ).join(''),
    timestamp: Date.now() - (i * 3600000),
    type: txTypes[(hash + i) % txTypes.length],
    amount: i % 3 === 0 ? ((hash * i) % 100) / 10 : undefined,
    token: i % 3 === 0 ? ['SOL', 'USDC', 'RAY'][(hash + i) % 3] : undefined,
    success: i % 7 !== 0
  }))

  return {
    address,
    balance: ((hash % 1000) / 10),
    tokenAccounts,
    recentTransactions
  }
}

function formatTime(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  if (seconds < 60) return `${seconds}s ago`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

function shortenAddress(addr: string): string {
  if (addr.length < 16) return addr
  return `${addr.slice(0, 4)}...${addr.slice(-4)}`
}

function shortenSignature(sig: string): string {
  if (sig.length < 16) return sig
  return `${sig.slice(0, 8)}...${sig.slice(-8)}`
}

export default async function WalletPage({
  params
}: {
  params: Promise<{ address: string }>
}) {
  const { address } = await params
  const wallet = generateMockWalletData(address)

  const isValidAddress = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)

  if (!isValidAddress) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#141414]">
      {/* Header */}
      <header className="border-b border-[#2b2b2b] bg-[#141414]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="text-[#e4e4e4] hover:bg-[#1e1e1e]">
                ← Back to Search
              </Button>
            </Link>
            <Badge variant="outline" className="border-[#2b2b2b] text-[#8a8a8a]">
              Live Data
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Wallet Header */}
        <div className="bg-[#1e1e1e] rounded-[20px] p-6 sm:p-8 ring-1 ring-[#2b2b2b] mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <p className="text-[#8a8a8a] text-sm mb-1">Wallet Address</p>
              <h1 className="text-[#e4e4e4] text-lg sm:text-xl font-medium break-all">
                {address}
              </h1>
            </div>
            <Button 
              variant="outline" 
              className="ml-4 shrink-0 border-[#2b2b2b] hover:bg-[#141414]"
              onClick={() => {
                navigator.clipboard.writeText(address)
              }}
            >
              Copy
            </Button>
          </div>
          
          <Separator className="bg-[#2b2b2b] my-6" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-[#8a8a8a] text-sm mb-1">SOL Balance</p>
              <p className="text-[#e4e4e4] text-2xl font-medium">
                {wallet.balance.toFixed(4)} SOL
              </p>
            </div>
            <div>
              <p className="text-[#8a8a8a] text-sm mb-1">Token Accounts</p>
              <p className="text-[#e4e4e4] text-2xl font-medium">
                {wallet.tokenAccounts.length}
              </p>
            </div>
          </div>
        </div>

        {/* Token Holdings */}
        {wallet.tokenAccounts.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[#e4e4e4] text-lg font-medium mb-4">Token Holdings</h2>
            <div className="bg-[#1e1e1e] rounded-[20px] ring-1 ring-[#2b2b2b] overflow-hidden">
              {wallet.tokenAccounts.map((token, i) => (
                <div key={token.mint}>
                  {i > 0 && <Separator className="bg-[#2b2b2b]" />}
                  <div className="p-4 sm:p-6 hover:bg-[#141414] transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <p className="text-[#e4e4e4] font-medium">{token.symbol}</p>
                          <Badge variant="outline" className="border-[#2b2b2b] text-[#8a8a8a] text-xs">
                            {shortenAddress(token.mint)}
                          </Badge>
                        </div>
                        <p className="text-[#8a8a8a] text-sm">{token.balance.toFixed(2)} tokens</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-[#e4e4e4] font-medium">${token.usdValue.toFixed(2)}</p>
                        <p className="text-[#8a8a8a] text-sm">USD Value</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Transactions */}
        <div>
          <h2 className="text-[#e4e4e4] text-lg font-medium mb-4">Recent Transactions</h2>
          <div className="bg-[#1e1e1e] rounded-[20px] ring-1 ring-[#2b2b2b] overflow-hidden">
            {wallet.recentTransactions.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-[#8a8a8a]">No recent transactions</p>
              </div>
            ) : (
              wallet.recentTransactions.map((tx, i) => (
                <div key={tx.signature}>
                  {i > 0 && <Separator className="bg-[#2b2b2b]" />}
                  <div className="p-4 sm:p-6 hover:bg-[#141414] transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Badge 
                            variant={tx.success ? "default" : "outline"}
                            className={tx.success 
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                              : "border-[#2b2b2b] text-[#8a8a8a]"
                            }
                          >
                            {tx.type}
                          </Badge>
                          <span className="text-[#8a8a8a] text-sm">{formatTime(tx.timestamp)}</span>
                        </div>
                        <p className="text-[#8a8a8a] text-sm font-mono break-all">
                          {shortenSignature(tx.signature)}
                        </p>
                      </div>
                      {tx.amount !== undefined && (
                        <div className="text-right shrink-0">
                          <p className="text-[#e4e4e4] font-medium">
                            {tx.amount.toFixed(4)} {tx.token}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-[#8a8a8a] text-sm">
            This is demo data for showcase purposes. Connect to Solana RPC for live blockchain data.
          </p>
        </div>
      </main>
    </div>
  )
}