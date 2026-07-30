import { NextRequest, NextResponse } from 'next/server'

const SOLANA_RPC = 'https://api.mainnet-beta.solana.com'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { address } = body

    if (!address || typeof address !== 'string') {
      return NextResponse.json(
        { error: 'Valid address is required' },
        { status: 400 }
      )
    }

    // Fetch recent signatures from Solana RPC
    const response = await fetch(SOLANA_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getSignaturesForAddress',
        params: [
          address,
          {
            limit: 10,
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch from Solana RPC')
    }

    const data = await response.json()

    if (data.error) {
      return NextResponse.json(
        { error: data.error.message || 'RPC error' },
        { status: 400 }
      )
    }

    const signatures = data.result || []

    // Transform to our transaction format
    const transactions = signatures.map((sig: any) => ({
      signature: sig.signature,
      slot: sig.slot,
      blockTime: sig.blockTime,
      success: !sig.err,
      fee: sig.fee || 0,
    }))

    return NextResponse.json({ transactions })
  } catch (error) {
    console.error('Solscan API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}