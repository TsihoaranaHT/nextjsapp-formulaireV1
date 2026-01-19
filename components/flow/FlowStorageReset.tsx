'use client';

import { useEffect } from 'react';
import { useFlowStore } from '@/lib/stores/flow-store';

/**
 * Composant qui vide le store Zustand (sessionStorage) à chaque chargement de page.
 * Cela garantit que l'utilisateur recommence toujours un funnel vierge après un F5.
 */
export default function FlowStorageReset() {
  const reset = useFlowStore((state) => state.reset);

  useEffect(() => {
    // Vider le store au montage du composant (= chargement de page)
    reset();
  }, [reset]);

  return null;
}
