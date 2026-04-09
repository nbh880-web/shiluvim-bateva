import './globals.css';

export const metadata = {
  title: 'שילובים בטבע | Family Resort',
  description: 'חוויית אירוח יוקרתית בלב הטבע הגלילי — שתולה, גליל המערבי',
  keywords: 'צימרים, גליל מערבי, שתולה, צימר יוקרתי, חופשה, נופש, שילובים בטבע',
  openGraph: {
    title: 'שילובים בטבע | Family Resort',
    description: 'חוויית אירוח יוקרתית בלב הטבע הגלילי',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
