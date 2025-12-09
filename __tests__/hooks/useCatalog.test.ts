import { renderHook, act } from '@testing-library/react-native';
import { useCatalog } from '@hooks/useCatalog';

// Mock the catalog JSON
jest.mock('../../assets/catalog.json', () => ({
  items: [
    {
      id: 'test-1',
      title: 'Test Movie 1',
      description: 'Test Description 1',
      thumbnail: 'https://example.com/1.jpg',
      streamUrl: 'https://example.com/1.m3u8',
      duration: 120,
    },
    {
      id: 'test-2',
      title: 'Test Movie 2',
      description: 'Test Description 2',
      thumbnail: 'https://example.com/2.jpg',
      streamUrl: 'https://example.com/2.m3u8',
      duration: 180,
    },
  ],
}));

describe('useCatalog Hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('starts with loading state', () => {
    const { result } = renderHook(() => useCatalog());

    expect(result.current.loading).toBe(true);
    expect(result.current.items).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  it('loads catalog items successfully', async () => {
    const { result } = renderHook(() => useCatalog());

    // Fast-forward time to complete the timeout
    await act(async () => {
      jest.advanceTimersByTime(250);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.items).toHaveLength(2);
    expect(result.current.items[0].title).toBe('Test Movie 1');
    expect(result.current.items[1].title).toBe('Test Movie 2');
    expect(result.current.error).toBe(null);
  });

  it('returns items with correct structure', async () => {
    const { result } = renderHook(() => useCatalog());

    await act(async () => {
      jest.advanceTimersByTime(250);
    });

    const item = result.current.items[0];
    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('title');
    expect(item).toHaveProperty('description');
    expect(item).toHaveProperty('thumbnail');
    expect(item).toHaveProperty('streamUrl');
    expect(item).toHaveProperty('duration');
  });

  it('sets loading to false after data is loaded', async () => {
    const { result } = renderHook(() => useCatalog());

    expect(result.current.loading).toBe(true);

    await act(async () => {
      jest.advanceTimersByTime(250);
    });

    expect(result.current.loading).toBe(false);
  });

  it('maintains stable reference when no changes occur', async () => {
    const { result } = renderHook(() => useCatalog());

    await act(async () => {
      jest.advanceTimersByTime(250);
    });

    const firstItems = result.current.items;

    // Items should remain stable
    expect(result.current.items).toBe(firstItems);
    expect(result.current.items).toHaveLength(2);
  });
});
