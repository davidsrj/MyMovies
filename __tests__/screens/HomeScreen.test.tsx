/**
 * @format
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../src/screens/HomeScreen';

jest.mock('../../src/hooks/useCatalog', () => ({
  useCatalog: jest.fn(),
}));

const mockNavigation = {
  navigate: jest.fn(),
};

const mockProps = {
  navigation: mockNavigation,
  route: {
    key: 'home-key',
    name: 'Home',
  },
};

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

import { useCatalog } from '@hooks/useCatalog';

const renderWithNavigation = (component: React.ReactElement) => {
  return render(<NavigationContainer>{component}</NavigationContainer>);
};

describe('HomeScreen Component', () => {
  const mockItems = [
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
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state', () => {
    (useCatalog as jest.Mock).mockReturnValue({
      items: [],
      loading: true,
      error: null,
    });

    const { getByText } = renderWithNavigation(
      <HomeScreen {...(mockProps as any)} />,
    );

    expect(getByText('Loading catalog…')).toBeTruthy();
  });

  it('displays error state', () => {
    const errorMessage = 'Failed to load catalog';
    (useCatalog as jest.Mock).mockReturnValue({
      items: [],
      loading: false,
      error: errorMessage,
    });

    const { getByText } = renderWithNavigation(
      <HomeScreen {...(mockProps as any)} />,
    );

    expect(getByText(errorMessage)).toBeTruthy();
  });

  it('renders movie catalog when loaded successfully', () => {
    (useCatalog as jest.Mock).mockReturnValue({
      items: mockItems,
      loading: false,
      error: null,
    });

    const { getByText } = renderWithNavigation(
      <HomeScreen {...(mockProps as any)} />,
    );

    expect(() => getByText('Loading catalog…')).toThrow();
    expect(() => getByText('Failed to load catalog')).toThrow();
  });

  it('transitions from loading to loaded state', async () => {
    const { getByText, rerender } = renderWithNavigation(
      <HomeScreen {...(mockProps as any)} />,
    );

    (useCatalog as jest.Mock).mockReturnValue({
      items: [],
      loading: true,
      error: null,
    });

    rerender(
      <NavigationContainer>
        <HomeScreen {...(mockProps as any)} />
      </NavigationContainer>,
    );
    expect(getByText('Loading catalog…')).toBeTruthy();

    (useCatalog as jest.Mock).mockReturnValue({
      items: mockItems,
      loading: false,
      error: null,
    });

    rerender(
      <NavigationContainer>
        <HomeScreen {...(mockProps as any)} />
      </NavigationContainer>,
    );

    await waitFor(() => {
      expect(() => getByText('Loading catalog…')).toThrow();
    });
  });

  it('error state has correct accessibility role', () => {
    (useCatalog as jest.Mock).mockReturnValue({
      items: [],
      loading: false,
      error: 'Failed to load catalog',
    });

    const { getByText } = renderWithNavigation(
      <HomeScreen {...(mockProps as any)} />,
    );

    const errorText = getByText('Failed to load catalog');
    expect(errorText.props.accessibilityRole).toBe('alert');
  });

  it('error state shows a retry button', () => {
    (useCatalog as jest.Mock).mockReturnValue({
      items: [],
      loading: false,
      error: 'Failed to load catalog',
      reload: jest.fn(),
    });

    const { getByText } = renderWithNavigation(
      <HomeScreen {...(mockProps as any)} />,
    );

    const retryButtonText = getByText('Try again');
    expect(retryButtonText).toBeTruthy();
  });
});
