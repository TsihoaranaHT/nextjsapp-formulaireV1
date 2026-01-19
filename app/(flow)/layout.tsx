import type { ReactNode } from 'react';
import FlowStorageReset from '@/components/flow/FlowStorageReset';

interface FlowLayoutProps {
  children: ReactNode;
}

export default function FlowLayout({ children }: FlowLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Vide le sessionStorage à chaque F5/rechargement */}
      <FlowStorageReset />
      {/* Les composants flow ont leur propre header/navigation */}
      <main>
        {children}
      </main>
    </div>
  );
}
