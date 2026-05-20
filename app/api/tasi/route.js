import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol')
  if (!symbol) return NextResponse.json({ error: 'no symbol' }, { status: 400 })

  // Try multiple Yahoo Finance endpoints
  const urls = [
    `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.SR?interval=1d&range=1y`,
    `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}.SR?interval=1d&range=1y`,
  ]

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json',
        },
        next: { revalidate: 3600 }
      })
      if (!res.ok) continue
      const data = await res.json()
      const result = data?.chart?.result?.[0]
      if (!result) continue
      const q = result.indicators.quote[0]
      const candles = []
      for (let i = 0; i < q.close.length; i++) {
        if (q.close[i] && q.high[i] && q.low[i]) {
          candles.push({
            c: parseFloat(q.close[i].toFixed(2)),
            h: parseFloat(q.high[i].toFixed(2)),
            l: parseFloat(q.low[i].toFixed(2)),
            o: parseFloat((q.open[i] || q.close[i]).toFixed(2)),
            v: q.volume[i] || 0
          })
        }
      }
      if (candles.length >= 20) {
        return NextResponse.json({ symbol, candles }, {
          headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200' }
        })
      }
    } catch (e) { continue }
  }
  return NextResponse.json({ error: 'data not available', symbol }, { status: 404 })
}
