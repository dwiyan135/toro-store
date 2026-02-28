import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Toro Store | Gift Skin MLBB & Event Pass Terpercaya',
  description: 'Jasa gift skin Mobile Legends (MLBB) dan Event Pass terpercaya. Proses cepat, harga transparan, aman 100%. Order sekarang di Toro Store!',
  openGraph: {
    title: 'Toro Store | Gift Skin MLBB & Event Pass Terpercaya',
    description: 'Jasa gift skin Mobile Legends (MLBB) dan Event Pass terpercaya. Proses cepat, harga transparan, aman 100%. Order sekarang di Toro Store!',
    url: 'https://torostore.id', // Placeholder
    siteName: 'Toro Store',
    images: [{
      url: '/logo.png',
      width: 1200,
      height: 630,
    }],
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={`bg-[#03050a] text-neutral-50 min-h-screen flex flex-col font-sans selection:bg-blue-500/30`}>
        {children}
      </body>
    </html>
  );
}
