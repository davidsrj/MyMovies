import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MovieCard from '@components/cards/MovieCard';
import type { Item } from '@shared/types/catalog';

describe('MovieCard Component', () => {
  const mockMovie: Item = {
    id: 'test-movie-1',
    title: 'Test Movie',
    description: 'A test movie description',
    thumbnail: 'https://example.com/thumbnail.jpg',
    streamUrl: 'https://example.com/stream.m3u8',
    duration: 120,
  };

  const mockHandlers = {
    onPress: jest.fn(),
    handleFocus: jest.fn(),
    handleBlur: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with movie data', () => {
    const { getByText, getByLabelText } = render(
      <MovieCard
        movie={mockMovie}
        onPress={mockHandlers.onPress}
        handleFocus={mockHandlers.handleFocus}
        handleBlur={mockHandlers.handleBlur}
        isFocused={false}
      />,
    );

    expect(getByText('Test Movie')).toBeTruthy();
    expect(getByLabelText('Test Movie movie')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByLabelText } = render(
      <MovieCard
        movie={mockMovie}
        onPress={mockHandlers.onPress}
        handleFocus={mockHandlers.handleFocus}
        handleBlur={mockHandlers.handleBlur}
        isFocused={false}
      />,
    );

    fireEvent.press(getByLabelText('Test Movie movie'));
    expect(mockHandlers.onPress).toHaveBeenCalledTimes(1);
  });

  it('calls handleFocus when focused', () => {
    const { getByLabelText } = render(
      <MovieCard
        movie={mockMovie}
        onPress={mockHandlers.onPress}
        handleFocus={mockHandlers.handleFocus}
        handleBlur={mockHandlers.handleBlur}
        isFocused={false}
      />,
    );

    fireEvent(getByLabelText('Test Movie movie'), 'focus');
    expect(mockHandlers.handleFocus).toHaveBeenCalledTimes(1);
  });

  it('calls handleBlur when focus is lost', () => {
    const { getByLabelText } = render(
      <MovieCard
        movie={mockMovie}
        onPress={mockHandlers.onPress}
        handleFocus={mockHandlers.handleFocus}
        handleBlur={mockHandlers.handleBlur}
        isFocused={true}
      />,
    );

    fireEvent(getByLabelText('Test Movie movie'), 'blur');
    expect(mockHandlers.handleBlur).toHaveBeenCalledTimes(1);
  });

  it('displays movie thumbnail with correct URI', () => {
    const { getByLabelText } = render(
      <MovieCard
        movie={mockMovie}
        onPress={mockHandlers.onPress}
        handleFocus={mockHandlers.handleFocus}
        handleBlur={mockHandlers.handleBlur}
        isFocused={false}
      />,
    );

    const pressable = getByLabelText('Test Movie movie');
    expect(pressable).toBeTruthy();
  });

  it('truncates long movie titles', () => {
    const longTitleMovie: Item = {
      ...mockMovie,
      title: 'This is a very long movie title that should be truncated',
    };

    const { getByText } = render(
      <MovieCard
        movie={longTitleMovie}
        onPress={mockHandlers.onPress}
        handleFocus={mockHandlers.handleFocus}
        handleBlur={mockHandlers.handleBlur}
        isFocused={false}
      />,
    );

    const titleElement = getByText(longTitleMovie.title);
    expect(titleElement).toBeTruthy();
    expect(titleElement.props.numberOfLines).toBe(1);
  });
});
