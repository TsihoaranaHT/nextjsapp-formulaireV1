import type { ReactNode } from 'react';
import ExpertHelpBadge from '@/components/shared/ExpertHelpBadge';

interface FlowLayoutProps {
  children: ReactNode;
}

export default function FlowLayout({ children }: FlowLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Les composants flow ont leur propre header/navigation */}
      <main>
        {children}
      </main>

      {/* Expert help badge - always visible */}
      <ExpertHelpBadge />
    </div>
  );
}
