// stylse
import '@/public/styles/globals.scss'
import '@/public/styles/dashboard.module.scss'
import Navigation from '@/components/layout/navigation/Navigation';

export default function RootLayout({ children }) {
  return (
    <div>
      <Navigation />

      <div className="container mx-auto">
        {children}
      </div>
    </div>
  );
}
