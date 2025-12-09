import catalog from '../../../../assets/catalog.json';
import type { Item } from '../../../shared/types/catalog';

export function fetchCatalog(): Item[] {
  return (catalog as any).items as Item[];
}
