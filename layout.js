export const metadata = { title: 'TASI Investor', description: 'Saudi Stock Market Analysis' }
export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{margin:0,padding:0,background:'#060a10'}}>{children}</body>
    </html>
  )
}
