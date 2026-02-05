import { ReactNode } from 'react';
import { AnnouncementBar } from './AnnouncementBar';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  showAnnouncement?: boolean;
}

export function Layout({ children, showAnnouncement = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background noise">
      {showAnnouncement && <AnnouncementBar />}
      <Header />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
