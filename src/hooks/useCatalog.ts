import React from 'react';
import type { Item } from '@shared/types/catalog';
import { fetchCatalog } from '@features/catalog/api/catalogApi';

export function useCatalog() {
  const [items, setItems] = React.useState<Item[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(() => {
    setLoading(true);
    setError(null);

    const t = setTimeout(() => {
      try {
        const items = fetchCatalog();
        setItems(items);
        setLoading(false);
      } catch (e: any) {
        setError('Failed to load catalog');
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(t);
  }, []);

  React.useEffect(() => {
    const cleanup = load();
    return cleanup;
  }, [load]);

  return { items, loading, error, reload: load };
}
