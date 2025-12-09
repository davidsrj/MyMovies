import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DetailsScreen from '../../src/screens/DetailsScreen';
import type { Item } from '@shared/types/catalog';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../src/navigation/RootNavigator';

type DetailsNavProp = NativeStackNavigationProp<RootStackParamList, 'Details'>;

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
  goBack: mockGoBack,
} as unknown as DetailsNavProp;

describe('DetailsScreen Component', () => {
  const mockMovie: Item = {
    id: 'test-movie-1',
    title: 'Test Movie',
    description: 'This is a test movie with a detailed description',
    thumbnail:
      'https://img.freepik.com/premium-vector/love-poster-movie_992397-2623.jpg?semt=ais_hybrid&w=740&q=80',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 120,
  };

  const mockRoute = {
    key: 'details-test-key',
    name: 'Details' as const,
    params: {
      item: mockMovie,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders movie title and description correctly', () => {
    const { getByText } = render(
      <DetailsScreen route={mockRoute} navigation={mockNavigation} />,
    );

    expect(getByText('Test Movie')).toBeTruthy();
    expect(
      getByText('This is a test movie with a detailed description'),
    ).toBeTruthy();
  });

  it('renders the Play button', () => {
    const { getByLabelText } = render(
      <DetailsScreen route={mockRoute} navigation={mockNavigation} />,
    );

    expect(getByLabelText('Play Button')).toBeTruthy();
  });

  it('navigates to Player screen when Play button is pressed', () => {
    const { getByLabelText } = render(
      <DetailsScreen route={mockRoute} navigation={mockNavigation} />,
    );

    const playButton = getByLabelText('Play Button');
    fireEvent.press(playButton);

    expect(mockNavigate).toHaveBeenCalledWith('Player', { item: mockMovie });
  });

  it('calls goBack when back button is pressed', () => {
    const { getByLabelText } = render(
      <DetailsScreen route={mockRoute} navigation={mockNavigation} />,
    );

    const backButton = getByLabelText('Back Button');
    fireEvent.press(backButton);

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it('handles different movie data correctly', () => {
    const differentMovie: Item = {
      id: 'different-movie',
      title: 'Different Movie',
      description: 'A different description',
      thumbnail:
        'https://img.freepik.com/premium-psd/happy-valentines-day-poster-template-with-romantic-couple-background_634423-18959.jpg',
      streamUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      duration: 240,
    };

    const differentRoute = {
      key: 'details-different-key',
      name: 'Details' as const,
      params: {
        item: differentMovie,
      },
    };

    const { getByText } = render(
      <DetailsScreen route={differentRoute} navigation={mockNavigation} />,
    );

    expect(getByText('Different Movie')).toBeTruthy();
    expect(getByText('A different description')).toBeTruthy();
  });
});
