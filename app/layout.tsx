import './globals.css';
export const metadata = { title: 'LE MAMBO Cash Service', description: 'Suivi caisse LE MAMBO' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fr"><body>{children}</body></html>;
}
