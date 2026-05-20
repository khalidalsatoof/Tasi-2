'use client'
import { useState, useEffect, useCallback } from 'react'

// ── Top 50 TASI Companies ──────────────────────────────────────────
const STOCKS = [
  {sym:"2222",name:"أرامكو السعودية",sector:"طاقة",v2030:95,mcap:"ضخمة",divYield:4.2,debtRatio:0.3,roe:25},
  {sym:"1180",name:"الأهلي السعودي",sector:"مصارف",v2030:85,mcap:"ضخمة",divYield:3.5,debtRatio:0.8,roe:18},
  {sym:"1120",name:"الراجحي",sector:"مصارف",v2030:88,mcap:"ضخمة",divYield:4.1,debtRatio:0.7,roe:22},
  {sym:"2010",name:"سابك",sector:"بتروكيماويات",v2030:75,mcap:"ضخمة",divYield:2.8,debtRatio:0.4,roe:12},
  {sym:"7010",name:"STC",sector:"اتصالات",v2030:90,mcap:"ضخمة",divYield:5.2,debtRatio:0.5,roe:28},
  {sym:"1211",name:"معادن",sector:"تعدين",v2030:92,mcap:"ضخمة",divYield:1.8,debtRatio:0.45,roe:14},
  {sym:"4280",name:"بوبا العربية",sector:"تأمين",v2030:80,mcap:"كبيرة",divYield:2.5,debtRatio:0.3,roe:16},
  {sym:"2350",name:"سيبكم",sector:"بتروكيماويات",v2030:70,mcap:"كبيرة",divYield:3.2,debtRatio:0.5,roe:10},
  {sym:"2380",name:"بترو رابغ",sector:"بتروكيماويات",v2030:65,mcap:"كبيرة",divYield:0,debtRatio:0.6,roe:5},
  {sym:"4030",name:"الراجحي للتأمين",sector:"تأمين",v2030:75,mcap:"كبيرة",divYield:3.0,debtRatio:0.25,roe:15},
  {sym:"2330",name:"أدفانسد",sector:"بتروكيماويات",v2030:72,mcap:"كبيرة",divYield:2.1,debtRatio:0.55,roe:9},
  {sym:"6010",name:"نادك",sector:"غذاء",v2030:60,mcap:"كبيرة",divYield:4.5,debtRatio:0.35,roe:19},
  {sym:"4190",name:"جرير",sector:"تجزئة",v2030:70,mcap:"كبيرة",divYield:6.0,debtRatio:0.2,roe:32},
  {sym:"4240",name:"نهدي",sector:"تجزئة",v2030:75,mcap:"كبيرة",divYield:2.8,debtRatio:0.3,roe:21},
  {sym:"4150",name:"إكسترا",sector:"تجزئة",v2030:75,mcap:"كبيرة",divYield:3.5,debtRatio:0.25,roe:24},
  {sym:"1150",name:"بنك الرياض",sector:"مصارف",v2030:80,mcap:"ضخمة",divYield:3.8,debtRatio:0.75,roe:17},
  {sym:"1160",name:"العربي الوطني",sector:"مصارف",v2030:78,mcap:"ضخمة",divYield:3.2,debtRatio:0.72,roe:16},
  {sym:"1030",name:"السعودي الفرنسي",sector:"مصارف",v2030:75,mcap:"ضخمة",divYield:3.5,debtRatio:0.74,roe:15},
  {sym:"1020",name:"بنك الجزيرة",sector:"مصارف",v2030:72,mcap:"كبيرة",divYield:2.5,debtRatio:0.7,roe:13},
  {sym:"1140",name:"البنك السعودي للاستثمار",sector:"مصارف",v2030:75,mcap:"كبيرة",divYield:3.0,debtRatio:0.72,roe:14},
  {sym:"4321",name:"موبايلي",sector:"اتصالات",v2030:85,mcap:"كبيرة",divYield:3.8,debtRatio:0.55,roe:20},
  {sym:"7020",name:"زين السعودية",sector:"اتصالات",v2030:82,mcap:"كبيرة",divYield:2.2,debtRatio:0.6,roe:12},
  {sym:"2001",name:"كيان",sector:"بتروكيماويات",v2030:68,mcap:"كبيرة",divYield:1.5,debtRatio:0.65,roe:7},
  {sym:"2060",name:"كيمياء",sector:"بتروكيماويات",v2030:68,mcap:"كبيرة",divYield:2.0,debtRatio:0.6,roe:8},
  {sym:"3010",name:"سبكيم",sector:"صناعة",v2030:72,mcap:"كبيرة",divYield:2.5,debtRatio:0.45,roe:11},
  {sym:"2310",name:"المصافي",sector:"طاقة",v2030:85,mcap:"كبيرة",divYield:3.5,debtRatio:0.4,roe:18},
  {sym:"2250",name:"المياه الوطنية",sector:"مياه",v2030:90,mcap:"كبيرة",divYield:2.0,debtRatio:0.5,roe:12},
  {sym:"6050",name:"نقل",sector:"لوجستيات",v2030:90,mcap:"كبيرة",divYield:3.0,debtRatio:0.4,roe:16},
  {sym:"4110",name:"دله البركة",sector:"عقارات",v2030:85,mcap:"كبيرة",divYield:2.5,debtRatio:0.55,roe:10},
  {sym:"4090",name:"أملاك",sector:"عقارات",v2030:82,mcap:"كبيرة",divYield:3.0,debtRatio:0.5,roe:12},
  {sym:"4020",name:"سلامة للتأمين",sector:"تأمين",v2030:70,mcap:"متوسطة",divYield:2.8,debtRatio:0.3,roe:13},
  {sym:"4230",name:"البلاد للتأمين",sector:"تأمين",v2030:70,mcap:"متوسطة",divYield:2.5,debtRatio:0.28,roe:12},
  {sym:"8010",name:"سلامة",sector:"تأمين",v2030:72,mcap:"كبيرة",divYield:3.0,debtRatio:0.3,roe:14},
  {sym:"2370",name:"مدينة المعرفة",sector:"تعليم",v2030:90,mcap:"كبيرة",divYield:1.5,debtRatio:0.35,roe:15},
  {sym:"9200",name:"أبشر",sector:"تقنية",v2030:95,mcap:"كبيرة",divYield:1.0,debtRatio:0.2,roe:22},
  {sym:"2120",name:"ناغي",sector:"تجزئة",v2030:65,mcap:"متوسطة",divYield:4.0,debtRatio:0.3,roe:18},
  {sym:"4160",name:"تمويل السيارات",sector:"مالية",v2030:78,mcap:"متوسطة",divYield:4.5,debtRatio:0.6,roe:16},
  {sym:"3020",name:"الغاز",sector:"طاقة",v2030:80,mcap:"كبيرة",divYield:3.8,debtRatio:0.4,roe:17},
  {sym:"4130",name:"تبوك الزراعية",sector:"زراعة",v2030:70,mcap:"متوسطة",divYield:3.5,debtRatio:0.35,roe:12},
  {sym:"6020",name:"نسيج",sector:"غذاء",v2030:65,mcap:"متوسطة",divYield:4.2,debtRatio:0.3,roe:16},
  {sym:"4040",name:"صدى",sector:"إعلام",v2030:75,mcap:"متوسطة",divYield:3.0,debtRatio:0.4,roe:11},
  {sym:"8210",name:"مزايا",sector:"عقارات",v2030:80,mcap:"متوسطة",divYield:2.8,debtRatio:0.52,roe:10},
  {sym:"2290",name:"يانسا",sector:"بتروكيماويات",v2030:65,mcap:"متوسطة",divYield:2.5,debtRatio:0.58,roe:8},
  {sym:"4200",name:"أنابيب",sector:"صناعة",v2030:85,mcap:"متوسطة",divYield:3.5,debtRatio:0.42,roe:15},
  {sym:"2170",name:"صناعات الورق",sector:"صناعة",v2030:65,mcap:"متوسطة",divYield:3.0,debtRatio:0.45,roe:11},
  {sym:"4180",name:"خزائن",sector:"عقارات",v2030:78,mcap:"متوسطة",divYield:3.2,debtRatio:0.5,roe:11},
  {sym:"1010",name:"الرياض المالية",sector:"مالية",v2030:70,mcap:"كبيرة",divYield:4.0,debtRatio:0.5,roe:15},
  {sym:"4001",name:"ثمار",sector:"تجزئة",v2030:80,mcap:"كبيرة",divYield:2.0,debtRatio:0.35,roe:14},
  {sym:"2170",name:"ورق",sector:"صناعة",v2030:60,mcap:"متوسطة",divYield:3.0,debtRatio:0.5,roe:9},
  {sym:"6090",name:"تدوير",sector:"بيئة",v2030:92,mcap:"كبيرة",divYield:1.5,debtRatio:0.3,roe:13},
]

// ── Technical Analysis ────────────────────────────────────────────
function calcEMA(arr, p) {
  if(arr.length<p) return null
  const k=2/(p+1); let e=arr.slice(0,p).reduce((a,b)=>a+b)/p
  for(let i=p;i<arr.length;i++) e=arr[i]*k+e*(1-k)
  return parseFloat(e.toFixed(2))
}
function calcRSI(closes, p=14) {
  if(closes.length<p+1) return 50
  let g=0,l=0
  for(let i=closes.length-p;i<closes.length;i++){const d=closes[i]-closes[i-1];if(d>0)g+=d;else l-=d}
  return parseFloat((100-100/(1+g/(l||0.001))).toFixed(1))
}
function calcMACD(closes) {
  const e12=calcEMA(closes,12),e26=calcEMA(closes,26)
  if(!e12||!e26) return {hist:0,val:0}
  return {hist:e12>e26?1:-1,val:parseFloat((e12-e26).toFixed(2))}
}
function calcBollinger(closes, p=20) {
  if(closes.length<p) return {upper:0,lower:0,mid:0,pct:50}
  const slice=closes.slice(-p)
  const mid=slice.reduce((a,b)=>a+b)/p
  const std=Math.sqrt(slice.reduce((a,b)=>a+(b-mid)**2,0)/p)
  const upper=mid+2*std, lower=mid-2*std
  const price=closes.at(-1)
  const pct=parseFloat(((price-lower)/(upper-lower||1)*100).toFixed(1))
  return {upper:parseFloat(upper.toFixed(2)),lower:parseFloat(lower.toFixed(2)),mid:parseFloat(mid.toFixed(2)),pct}
}
function calcATR(candles, p=14) {
  const trs=[]
  for(let i=1;i<candles.length;i++) trs.push(Math.max(candles[i].h-candles[i].l,Math.abs(candles[i].h-candles[i-1].c),Math.abs(candles[i].l-candles[i-1].c)))
  const r=trs.slice(-p); return r.reduce((a,b)=>a+b,0)/r.length
}

function calcTechnicalScore(candles) {
  const closes=candles.map(c=>c.c)
  const price=closes.at(-1),prev=closes.at(-2)
  const change=parseFloat(((price-prev)/prev*100).toFixed(2))
  const high52=Math.max(...closes), low52=Math.min(...closes)
  const pos52=parseFloat(((price-low52)/(high52-low52||1)*100).toFixed(1))

  const rsi=calcRSI(closes)
  const ema20=calcEMA(closes,20)
  const ema50=calcEMA(closes,50)
  const ema200=calcEMA(closes,closes.length>=200?200:closes.length-1)
  const macd=calcMACD(closes)
  const boll=calcBollinger(closes)
  const atr=calcATR(candles)

  // حجم التداول
  const vol=candles.at(-1).v||0
  const avgVol=candles.slice(-20).reduce((a,c)=>a+(c.v||0),0)/20
  const volRatio=avgVol>0?vol/avgVol:1

  // Golden/Death Cross
  const goldenCross=ema50&&ema200&&ema50>ema200
  const priceAboveEMA50=ema50&&price>ema50
  const priceAboveEMA20=ema20&&price>ema20

  let score=0, details={}

  // 1. RSI (0-15)
  let rsiScore=0, rsiLabel=""
  if(rsi<30){rsiScore=15;rsiLabel="تشبع بيعي قوي"}
  else if(rsi<40){rsiScore=12;rsiLabel="تشبع بيعي"}
  else if(rsi<50){rsiScore=9;rsiLabel="منطقة شراء"}
  else if(rsi<60){rsiScore=5;rsiLabel="محايد"}
  else if(rsi<70){rsiScore=2;rsiLabel="مرتفع"}
  else{rsiScore=0;rsiLabel="تشبع شرائي"}
  score+=rsiScore; details.rsi={val:rsi,score:rsiScore,max:15,label:rsiLabel}

  // 2. EMA Trend (0-12)
  let trendScore=0, trendLabel=""
  if(goldenCross&&priceAboveEMA50&&priceAboveEMA20){trendScore=12;trendLabel="اتجاه صاعد قوي"}
  else if(goldenCross&&priceAboveEMA50){trendScore=9;trendLabel="Golden Cross ✓"}
  else if(priceAboveEMA50){trendScore=6;trendLabel="فوق EMA50"}
  else if(priceAboveEMA20){trendScore=3;trendLabel="فوق EMA20 فقط"}
  else{trendScore=1;trendLabel="تحت المتوسطات"}
  score+=trendScore; details.trend={score:trendScore,max:12,label:trendLabel}

  // 3. MACD (0-8)
  const macdScore=macd.hist>0?8:1
  score+=macdScore; details.macd={val:macd.val,score:macdScore,max:8,label:macd.hist>0?"إيجابي ↑":"سلبي ↓"}

  // 4. Bollinger Bands (0-8)
  let bollScore=0, bollLabel=""
  if(boll.pct<20){bollScore=8;bollLabel="قرب الحد السفلي"}
  else if(boll.pct<40){bollScore=6;bollLabel="منطقة جيدة"}
  else if(boll.pct<60){bollScore=4;bollLabel="منتصف النطاق"}
  else if(boll.pct<80){bollScore=2;bollLabel="مرتفع"}
  else{bollScore=0;bollLabel="قرب الحد العلوي"}
  score+=bollScore; details.boll={val:boll.pct,score:bollScore,max:8,label:bollLabel}

  // 5. موقع 52 أسبوع (0-7)
  let pos52Score=0, pos52Label=""
  if(pos52<20){pos52Score=7;pos52Label="قرب القاع التاريخي"}
  else if(pos52<35){pos52Score=5;pos52Label="منطقة تراكم"}
  else if(pos52<55){pos52Score=3;pos52Label="منتصف المدى"}
  else if(pos52<75){pos52Score=1;pos52Label="مرتفع"}
  else{pos52Score=0;pos52Label="قرب القمة"}
  score+=pos52Score; details.pos52={val:pos52,score:pos52Score,max:7,label:pos52Label}

  // 6. حجم التداول (0-5)
  let volScore=0, volLabel=""
  if(volRatio>2){volScore=5;volLabel="حجم استثنائي"}
  else if(volRatio>1.3){volScore=4;volLabel="حجم قوي"}
  else if(volRatio>0.8){volScore=2;volLabel="حجم طبيعي"}
  else{volScore=1;volLabel="حجم ضعيف"}
  score+=volScore; details.vol={val:volRatio.toFixed(1),score:volScore,max:5,label:volLabel}

  return {
    score, details, rsi, ema20, ema50, ema200, macd, boll,
    pos52, price, change, closes:closes.slice(-30), atr,
    high52, low52, volRatio:parseFloat(volRatio.toFixed(1))
  }
}

function calcFundamentalScore(info) {
  let score=0, details={}

  // 1. توزيعات الأرباح (0-10)
  let divScore=0, divLabel=""
  const div=info.divYield
  if(div>=5){divScore=10;divLabel:`${div}% ممتاز`}
  else if(div>=3.5){divScore=8;divLabel=`${div}% جيد جداً`}
  else if(div>=2){divScore=6;divLabel=`${div}% مقبول`}
  else if(div>0){divScore=3;divLabel=`${div}% محدود`}
  else{divScore=0;divLabel:"لا توزيعات"}
  score+=divScore; details.div={val:div,score:divScore,max:10,label:`${div}% توزيعات`}

  // 2. نسبة العائد على حقوق الملكية ROE (0-8)
  let roeScore=0
  if(info.roe>=25){roeScore=8}
  else if(info.roe>=18){roeScore=6}
  else if(info.roe>=12){roeScore=4}
  else if(info.roe>=8){roeScore=2}
  else{roeScore=1}
  score+=roeScore; details.roe={val:info.roe,score:roeScore,max:8,label:`ROE ${info.roe}%`}

  // 3. نسبة الدين (0-7) — أقل = أفضل
  let debtScore=0
  if(info.debtRatio<0.25){debtScore=7;} 
  else if(info.debtRatio<0.4){debtScore=5}
  else if(info.debtRatio<0.55){debtScore=3}
  else{debtScore=1}
  score+=debtScore; details.debt={val:info.debtRatio,score:debtScore,max:7,label:`دين ${(info.debtRatio*100).toFixed(0)}%`}

  // 4. حجم السوق (0-5)
  const mcapScore={ضخمة:5,كبيرة:3,متوسطة:1}[info.mcap]||1
  score+=mcapScore; details.mcap={score:mcapScore,max:5,label:info.mcap}

  return {score, details}
}

function calcSectorScore(info) {
  let score=0, details={}

  // 1. رؤية 2030 (0-10)
  const v2030Score=Math.round(info.v2030/100*10)
  score+=v2030Score; details.vision={val:info.v2030,score:v2030Score,max:10,label:`${info.v2030}% استفادة`}

  // 2. القطاع في الدورة الاقتصادية (0-10)
  const hotSectors={تقنية:10,مياه:9,لوجستيات:9,تعليم:9,بيئة:9,اتصالات:8,تأمين:7,مصارف:7,تعدين:7,طاقة:7,تجزئة:6,غذاء:6,عقارات:6,صناعة:5,مالية:5,بتروكيماويات:4,إعلام:4,زراعة:5}
  const cycleScore=hotSectors[info.sector]||5
  score+=cycleScore; details.cycle={score:cycleScore,max:10,label:`${info.sector}`}

  return {score, details}
}

function getRating(total) {
  if(total>=75) return {label:"شراء قوي ⭐",color:"#10b981",bg:"rgba(16,185,129,0.08)",border:"rgba(16,185,129,0.3)",key:"STRONG_BUY"}
  if(total>=60) return {label:"تراكم 📈",color:"#f59e0b",bg:"rgba(245,158,11,0.07)",border:"rgba(245,158,11,0.25)",key:"ACCUMULATE"}
  if(total>=45) return {label:"انتظار ⏳",color:"#60a5fa",bg:"rgba(96,165,250,0.06)",border:"rgba(96,165,250,0.2)",key:"WAIT"}
  return {label:"تجنب ⚠",color:"#ef4444",bg:"rgba(239,68,68,0.06)",border:"rgba(239,68,68,0.2)",key:"AVOID"}
}

// ── Main Component ─────────────────────────────────────────────────
export default function TASIInvestor() {
  const [stocks, setStocks] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [loading, setLoading] = useState(true)
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [curStock, setCurStock] = useState('')
  const [lastUpdate, setLastUpdate] = useState(null)
  const [filter, setFilter] = useState('ALL')
  const [tab, setTab] = useState('analysis')
  const [failed, setFailed] = useState(0)

  const runScan = useCallback(async () => {
    if(scanning) return
    setScanning(true); setLoading(s=>s); setProgress(0); setFailed(0)
    const results=[]; let fails=0, done=0
    const BATCH=6

    for(let i=0;i<STOCKS.length;i+=BATCH){
      const batch=STOCKS.slice(i,i+BATCH)
      const batchResults=await Promise.all(batch.map(async info=>{
        setCurStock(info.name)
        try{
          const res=await fetch(`/api/tasi?symbol=${info.sym}`)
          const data=await res.json()
          done++
          setProgress(Math.round(done/STOCKS.length*100))
          if(data.candles&&data.candles.length>=20){
            const tech=calcTechnicalScore(data.candles)
            const fund=calcFundamentalScore(info)
            const sect=calcSectorScore(info)
            // Normalize: tech=55pts, fund=30pts, sector=20pts → max=105, scale to 100
            const rawTotal=tech.score+fund.score+sect.score
            const total=Math.min(100,Math.round(rawTotal/105*100))
            const rating=getRating(total)
            return {...info,...tech,fundDetails:fund.details,sectDetails:sect.details,
              techScore:tech.score,fundScore:fund.score,sectScore:sect.score,
              total,rating,hasRealData:true}
          }else{
            fails++
            // Fallback: fund+sector only
            const fund=calcFundamentalScore(info)
            const sect=calcSectorScore(info)
            const rawTotal=fund.score+sect.score
            const total=Math.min(70,Math.round(rawTotal/50*60))
            const rating=getRating(total)
            return {...info,price:null,change:0,rsi:null,closes:[],
              fundDetails:fund.details,sectDetails:sect.details,
              techScore:0,fundScore:fund.score,sectScore:sect.score,
              total,rating,hasRealData:false}
          }
        }catch{fails++;done++;return null}
      }))
      batchResults.forEach(r=>r&&results.push(r))
      if(i+BATCH<STOCKS.length) await new Promise(r=>setTimeout(r,100))
    }

    results.sort((a,b)=>b.total-a.total)
    setStocks(results); setFailed(fails)
    setPortfolio(prev=>prev.map(p=>{
      const u=results.find(s=>s.sym===p.sym)
      if(!u) return p
      const pnl=p.entryPrice&&u.price?+((u.price-p.entryPrice)/p.entryPrice*100).toFixed(2):0
      return {...p,currentPrice:u.price,pnl,rating:u.rating,total:u.total}
    }))
    setLastUpdate(new Date()); setLoading(false); setScanning(false); setProgress(100)
  }, [scanning])

  useEffect(()=>{runScan()},[])

  const addToPortfolio=(sym)=>{
    if(portfolio.find(p=>p.sym===sym)) return
    const s=stocks.find(s=>s.sym===sym)
    if(!s) return
    const sl=s.price?(s.price*(1-0.08)).toFixed(2):null
    const target=s.price?(s.price*(1+0.20)).toFixed(2):null
    setPortfolio(p=>[...p,{sym:s.sym,name:s.name,sector:s.sector,
      entryPrice:s.price,currentPrice:s.price,
      entryDate:new Date().toLocaleDateString('ar-SA'),
      pnl:0,rating:s.rating,total:s.total,
      stopLoss:sl,target12m:target}])
    setTab('portfolio')
  }
  const removeFromPortfolio=(sym)=>{
    setPortfolio(p=>p.filter(x=>x.sym!==sym))
  }

  const filtered=stocks.filter(s=>filter==='ALL'||s.rating.key===filter)
  const strong=stocks.filter(s=>s.rating.key==='STRONG_BUY').length
  const accum=stocks.filter(s=>s.rating.key==='ACCUMULATE').length
  const wait=stocks.filter(s=>s.rating.key==='WAIT').length
  const avoid=stocks.filter(s=>s.rating.key==='AVOID').length
  const fmt=n=>n?.toLocaleString('ar-SA',{minimumFractionDigits:2,maximumFractionDigits:2})||'–'

  const ScoreBar=({label,val,max,color})=>(
    <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:5}}>
      <span style={{fontSize:8,color:'#6b7280',width:90,flexShrink:0}}>{label}</span>
      <div style={{flex:1,background:'#0a0e1a',borderRadius:3,height:5,overflow:'hidden'}}>
        <div style={{width:`${Math.round(val/max*100)}%`,height:'100%',background:color,borderRadius:3,transition:'width .6s'}}/>
      </div>
      <span style={{fontSize:8,fontWeight:600,color,width:36,textAlign:'left'}}>{val}/{max}</span>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#060a10',color:'#e2e8f0',fontFamily:"'IBM Plex Mono',monospace",direction:'rtl'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#0a0e1a}::-webkit-scrollbar-thumb{background:#1e2a3a;border-radius:2px}
        @keyframes pg{0%,100%{box-shadow:0 0 6px #f59e0b}50%{box-shadow:0 0 16px #f59e0b}}
        @keyframes fi{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
        .card{animation:fi .3s ease forwards}
        .dot-active{animation:pg 2s infinite}
      `}</style>

      {/* HEADER */}
      <div style={{background:'rgba(6,10,16,.97)',borderBottom:'1px solid #0d1524',padding:'10px 14px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100,backdropFilter:'blur(12px)'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div className={scanning?'':'dot-active'} style={{width:7,height:7,borderRadius:'50%',background:scanning?'#fbbf24':'#f59e0b',flexShrink:0}}/>
          <span style={{fontSize:9,color:'#4b5563',letterSpacing:1}}>
            {scanning?`تحليل ${curStock}...`:lastUpdate?`${lastUpdate.toLocaleTimeString('ar-SA')} · ${stocks.length} شركة`:'جاري التحميل...'}
          </span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <button onClick={runScan} disabled={scanning} style={{background:'transparent',border:'1px solid #1e2a3a',color:scanning?'#374151':'#6b7280',padding:'3px 10px',borderRadius:5,cursor:scanning?'not-allowed':'pointer',fontSize:9,fontFamily:'inherit'}}>
            {scanning?'جاري...':'⟳ تحليل'}
          </button>
          <div style={{fontSize:14,fontWeight:700,letterSpacing:2}}>
            TASI<span style={{color:'#f59e0b'}}>INVESTOR</span>
            <span style={{fontSize:7,color:'#f59e0b',border:'1px solid #f59e0b33',borderRadius:3,padding:'1px 4px',marginRight:5}}>LIVE</span>
          </div>
        </div>
      </div>

      {/* PROGRESS */}
      {scanning&&<div style={{height:2,background:'#0d1524'}}><div style={{height:'100%',background:'linear-gradient(90deg,#f59e0b,#d97706)',width:`${progress}%`,transition:'width .3s',boxShadow:'0 0 8px #f59e0b55'}}/></div>}

      <div style={{padding:'14px',maxWidth:1200,margin:'0 auto'}}>
        {/* STATS */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:8,marginBottom:14}}>
          {[
            {label:'شراء قوي ⭐',val:strong,color:'#10b981'},
            {label:'تراكم 📈',val:accum,color:'#f59e0b'},
            {label:'انتظار ⏳',val:wait,color:'#60a5fa'},
            {label:'تجنب ⚠',val:avoid,color:'#ef4444'},
            {label:'محفظتي 💼',val:portfolio.length,color:'#a78bfa'},
          ].map(s=>(
            <div key={s.label} style={{background:`${s.color}08`,border:`1px solid ${s.color}20`,borderRadius:10,padding:'10px 8px',textAlign:'center'}}>
              <div style={{fontSize:20,fontWeight:700,color:s.color}}>{loading?'–':s.val}</div>
              <div style={{fontSize:7,color:'#4b5563',marginTop:2,letterSpacing:1}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* LOADING */}
        {loading&&(
          <div style={{textAlign:'center',padding:'50px 20px'}}>
            <div style={{fontSize:14,color:'#f59e0b',marginBottom:6,letterSpacing:2}}>TASI INVESTOR</div>
            <div style={{fontSize:10,color:'#4b5563',marginBottom:16}}>تحليل شامل: فني + مالي + قطاعي<br/><span style={{fontSize:9,color:'#374151'}}>بيانات حقيقية من Yahoo Finance</span></div>
            <div style={{background:'#0d1524',borderRadius:6,height:6,overflow:'hidden',maxWidth:300,margin:'0 auto 8px'}}>
              <div style={{height:'100%',background:'linear-gradient(90deg,#f59e0b,#d97706)',width:`${progress}%`,transition:'width .4s',borderRadius:6}}/>
            </div>
            <div style={{fontSize:10,color:'#374151'}}>{progress}% · {curStock}</div>
          </div>
        )}

        {/* CONTENT */}
        {!loading&&(
          <>
            {/* TABS */}
            <div style={{display:'flex',borderBottom:'1px solid #0d1524',marginBottom:14}}>
              {[{id:'analysis',label:`تحليل السوق (${stocks.length})`},{id:'portfolio',label:`محفظتي (${portfolio.length})`}].map(t=>(
                <button key={t.id} onClick={()=>setTab(t.id)} style={{background:'transparent',borderBottom:tab===t.id?'2px solid #f59e0b':'2px solid transparent',border:'none',color:tab===t.id?'#f59e0b':'#4b5563',padding:'7px 14px',cursor:'pointer',fontSize:10,letterSpacing:1,fontFamily:'inherit'}}>
                  {t.label}
                </button>
              ))}
              <span style={{marginRight:'auto',alignSelf:'center',fontSize:8,color:'#1e2a3a',padding:'0 8px'}}>
                تحليل فني + مالي + قطاعي{failed>0?` · ${failed} بدون بيانات فنية`:''}
              </span>
            </div>

            {/* ANALYSIS */}
            {tab==='analysis'&&(
              <>
                <div style={{display:'flex',gap:6,marginBottom:12,flexWrap:'wrap'}}>
                  {[{id:'ALL',l:'الكل'},{id:'STRONG_BUY',l:'⭐ شراء قوي'},{id:'ACCUMULATE',l:'📈 تراكم'},{id:'WAIT',l:'⏳ انتظار'},{id:'AVOID',l:'⚠ تجنب'}].map(f=>(
                    <button key={f.id} onClick={()=>setFilter(f.id)} style={{background:filter===f.id?'#0d1524':'transparent',border:`1px solid ${filter===f.id?'#1e2a3a':'#0d1524'}`,color:filter===f.id?'#e2e8f0':'#4b5563',padding:'4px 11px',borderRadius:20,cursor:'pointer',fontSize:9,fontFamily:'inherit'}}>
                      {f.l}
                    </button>
                  ))}
                  <span style={{marginRight:'auto',fontSize:8,color:'#1e2a3a',alignSelf:'center'}}>{filtered.length} شركة</span>
                </div>

                {filtered.length===0?<div style={{textAlign:'center',padding:'40px',color:'#1e2a3a',fontSize:11}}>لا توجد نتائج</div>:(
                  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:10}}>
                    {filtered.map((s,idx)=>{
                      const rt=s.rating
                      const inPort=portfolio.some(p=>p.sym===s.sym)
                      return (
                        <div key={s.sym} className="card" style={{animationDelay:`${idx*.02}s`,background:rt.bg,border:`1px solid ${rt.border}`,borderRadius:12,padding:'14px 15px',transition:'transform .15s'}}
                          onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                          onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>

                          {/* Header */}
                          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
                            <div>
                              <div style={{fontSize:14,fontWeight:700,letterSpacing:2}}>{s.sym}</div>
                              <div style={{fontSize:9,color:'#6b7280',marginTop:1}}>{s.name}</div>
                              <div style={{fontSize:7,color:'#6b7280',background:'#0a0e1a',border:'1px solid #0d1524',borderRadius:10,padding:'2px 7px',display:'inline-block',marginTop:3}}>{s.sector}</div>
                              {s.price&&<div style={{fontSize:17,fontWeight:300,color:rt.color,marginTop:4}}>{fmt(s.price)} ر.س</div>}
                              {s.change!==0&&<div style={{fontSize:9,color:s.change>=0?'#10b981':'#ef4444',marginTop:1}}>{s.change>=0?'▲':'▼'} {Math.abs(s.change)}%</div>}
                              {!s.hasRealData&&<div style={{fontSize:7,color:'#6b7280',marginTop:3,background:'#0a0e1a',border:'1px solid #1e2a3a',borderRadius:3,padding:'1px 5px',display:'inline-block'}}>تحليل مالي فقط</div>}
                            </div>
                            <div style={{textAlign:'left'}}>
                              <div style={{fontSize:32,fontWeight:700,color:rt.color,lineHeight:1}}>{s.total}</div>
                              <div style={{fontSize:8,color:'#6b7280',marginTop:1,textAlign:'center'}}>/ 100</div>
                              <div style={{background:`${rt.color}18`,border:`1px solid ${rt.color}44`,borderRadius:20,padding:'3px 8px',fontSize:9,color:rt.color,fontWeight:700,marginTop:6,whiteSpace:'nowrap'}}>{rt.label}</div>
                            </div>
                          </div>

                          {/* Score Bars */}
                          <div style={{marginBottom:8}}>
                            <ScoreBar label="فني (55 نقطة)" val={s.techScore} max={55} color="#60a5fa"/>
                            <ScoreBar label="مالي (30 نقطة)" val={s.fundScore} max={30} color="#10b981"/>
                            <ScoreBar label="قطاعي (20 نقطة)" val={s.sectScore} max={20} color="#f59e0b"/>
                          </div>

                          {/* Technical Details */}
                          {s.hasRealData&&(
                            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:5,marginBottom:8}}>
                              {[
                                {l:'RSI',v:s.rsi,c:s.rsi<40?'#10b981':s.rsi>65?'#ef4444':'#f59e0b'},
                                {l:'MACD',v:s.macd?.hist>0?'↑':'↓',c:s.macd?.hist>0?'#10b981':'#ef4444'},
                                {l:'Bollinger%',v:`${s.boll?.pct}%`,c:s.boll?.pct<30?'#10b981':s.boll?.pct>70?'#ef4444':'#f59e0b'},
                                {l:'EMA50',v:s.ema50,c:s.price>s.ema50?'#10b981':'#ef4444'},
                                {l:'52أسبوع%',v:`${s.pos52}%`,c:s.pos52<30?'#10b981':s.pos52>70?'#ef4444':'#f59e0b'},
                                {l:'حجم×',v:s.volRatio,c:s.volRatio>1.3?'#10b981':'#6b7280'},
                              ].map(cell=>(
                                <div key={cell.l} style={{background:'#080d18',borderRadius:5,padding:'5px 6px',border:'1px solid #0d1524'}}>
                                  <div style={{fontSize:7,color:'#4b5563',marginBottom:2}}>{cell.l}</div>
                                  <div style={{fontSize:9,color:cell.c,fontWeight:600}}>{cell.v}</div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Fundamental Details */}
                          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:5,marginBottom:8}}>
                            {[
                              {l:'توزيعات',v:`${s.divYield}%`,c:s.divYield>=4?'#10b981':s.divYield>=2?'#f59e0b':'#6b7280'},
                              {l:'ROE',v:`${s.roe}%`,c:s.roe>=20?'#10b981':s.roe>=12?'#f59e0b':'#6b7280'},
                              {l:'نسبة الدين',v:`${(s.debtRatio*100).toFixed(0)}%`,c:s.debtRatio<0.35?'#10b981':s.debtRatio<0.55?'#f59e0b':'#ef4444'},
                              {l:'رؤية 2030',v:`${s.v2030}%`,c:s.v2030>=85?'#10b981':s.v2030>=70?'#f59e0b':'#6b7280'},
                            ].map(cell=>(
                              <div key={cell.l} style={{background:'#080d18',borderRadius:5,padding:'5px 6px',border:'1px solid #0d1524'}}>
                                <div style={{fontSize:7,color:'#4b5563',marginBottom:2}}>{cell.l}</div>
                                <div style={{fontSize:9,color:cell.c,fontWeight:600}}>{cell.v}</div>
                              </div>
                            ))}
                          </div>

                          {(rt.key==='STRONG_BUY'||rt.key==='ACCUMULATE')&&(
                            <button onClick={()=>addToPortfolio(s.sym)} disabled={inPort} style={{width:'100%',padding:'6px',background:inPort?'transparent':'rgba(16,185,129,.08)',border:`1px solid ${inPort?'#1e2a3a':'rgba(16,185,129,.25)'}`,color:inPort?'#374151':'#10b981',borderRadius:6,cursor:inPort?'default':'pointer',fontSize:9,fontWeight:600,fontFamily:'inherit',letterSpacing:1}}>
                              {inPort?'✓ في محفظتك':'+ أضف للمحفظة'}
                            </button>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </>
            )}

            {/* PORTFOLIO */}
            {tab==='portfolio'&&(
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {portfolio.length===0?(
                  <div style={{textAlign:'center',padding:'50px',color:'#1e2a3a',fontSize:11,letterSpacing:2}}>
                    محفظتك فارغة<br/><span style={{fontSize:9,display:'block',marginTop:6}}>أضف أسهم من تحليل السوق</span>
                  </div>
                ):(
                  <>
                    {/* Portfolio Summary */}
                    <div style={{background:'rgba(245,158,11,.06)',border:'1px solid rgba(245,158,11,.2)',borderRadius:10,padding:'12px 14px',display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,textAlign:'center',marginBottom:4}}>
                      <div><div style={{fontSize:20,fontWeight:700,color:'#f59e0b'}}>{portfolio.length}</div><div style={{fontSize:8,color:'#6b7280'}}>أسهم</div></div>
                      <div><div style={{fontSize:20,fontWeight:700,color:(portfolio.reduce((a,p)=>a+(p.pnl||0),0)/portfolio.length)>=0?'#10b981':'#ef4444'}}>{((portfolio.reduce((a,p)=>a+(p.pnl||0),0)/portfolio.length)||0).toFixed(1)}%</div><div style={{fontSize:8,color:'#6b7280'}}>متوسط الأداء</div></div>
                      <div><div style={{fontSize:20,fontWeight:700,color:'#a78bfa'}}>{portfolio.filter(p=>(p.pnl||0)>=0).length}/{portfolio.length}</div><div style={{fontSize:8,color:'#6b7280'}}>رابحة</div></div>
                    </div>

                    {portfolio.map(p=>{
                      const pnl=p.pnl||0
                      const isStop=p.currentPrice&&p.stopLoss&&p.currentPrice<=parseFloat(p.stopLoss)
                      return (
                        <div key={p.sym} style={{background:isStop?'rgba(239,68,68,.05)':'rgba(245,158,11,.04)',border:`1px solid ${isStop?'rgba(239,68,68,.3)':'rgba(245,158,11,.15)'}`,borderRadius:11,padding:'12px 14px'}}>
                          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:9}}>
                            <div style={{display:'flex',alignItems:'center',gap:8}}>
                              <span style={{fontSize:16,fontWeight:700,letterSpacing:2}}>{p.sym}</span>
                              <span style={{fontSize:9,color:'#6b7280'}}>{p.name}</span>
                              {p.rating&&<span style={{background:`${p.rating.color}15`,border:`1px solid ${p.rating.color}33`,borderRadius:20,padding:'2px 7px',fontSize:8,color:p.rating.color,fontWeight:700}}>{p.rating.label}</span>}
                            </div>
                            <button onClick={()=>removeFromPortfolio(p.sym)} style={{background:'rgba(239,68,68,.08)',border:'1px solid rgba(239,68,68,.25)',color:'#ef4444',padding:'2px 8px',borderRadius:4,cursor:'pointer',fontSize:9,fontFamily:'inherit'}}>✕ حذف</button>
                          </div>
                          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(110px,1fr))',gap:5}}>
                            {[
                              {l:'سعر الدخول',v:p.entryPrice?`${fmt(p.entryPrice)} ر.س`:'–',c:'#e2e8f0'},
                              {l:'السعر الحالي',v:p.currentPrice?`${fmt(p.currentPrice)} ر.س`:'–',c:pnl>=0?'#10b981':'#ef4444'},
                              {l:'ربح/خسارة',v:`${pnl>=0?'+':''}${pnl.toFixed(2)}%`,c:pnl>=0?'#10b981':'#ef4444'},
                              {l:'وقف الخسارة (8%)',v:p.stopLoss?`${p.stopLoss} ر.س`:'–',c:'#ef4444'},
                              {l:'الهدف 12 شهر (+20%)',v:p.target12m?`${p.target12m} ر.س`:'–',c:'#10b981'},
                              {l:'تاريخ الدخول',v:p.entryDate,c:'#a78bfa'},
                              {l:'التقييم الحالي',v:p.total?`${p.total}/100`:'–',c:p.rating?.color||'#e2e8f0'},
                              {l:'القطاع',v:p.sector,c:'#6b7280'},
                            ].map(cell=>(
                              <div key={cell.l} style={{background:'#080d18',borderRadius:6,padding:'6px 7px',border:'1px solid #0d1524'}}>
                                <div style={{fontSize:6,color:'#4b5563',marginBottom:2}}>{cell.l}</div>
                                <div style={{fontSize:9,color:cell.c,fontWeight:600}}>{cell.v}</div>
                              </div>
                            ))}
                          </div>
                          {isStop&&<div style={{marginTop:8,background:'rgba(239,68,68,.07)',border:'1px solid rgba(239,68,68,.2)',borderRadius:6,padding:'7px 10px',fontSize:10,color:'#ef4444'}}>🛑 وصل وقف الخسارة — راجع قرار البقاء في السهم</div>}
                        </div>
                      )
                    })}
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
