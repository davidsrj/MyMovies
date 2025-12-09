import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PlayButton from '@components/buttons/PlayButton';

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/Entypo', () => 'Icon');

describe('PlayButton Component', () => {
  const mockHandlers = {
    onPress: jest.fn(),
    handleFocus: jest.fn(),
    handleBlur: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText, getByLabelText } = render(
      <PlayButton
        onPress={mockHandlers.onPress}
        handleFocus={mockHandlers.handleFocus}
        handleBlur={mockHandlers.handleBlur}
        isFocused={false}
      />,
    );

    expect(getByText('Play')).toBeTruthy();
    expect(getByLabelText('Play Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByLabelText } = render(
      <PlayButton
        onPress={mockHandlers.onPress}
        handleFocus={mockHandlers.handleFocus}
        handleBlur={mockHandlers.handleBlur}
        isFocused={false}
      />,
    );

    fireEvent.press(getByLabelText('Play Button'));
    expect(mockHandlers.onPress).toHaveBeenCalledTimes(1);
  });

  it('calls handleFocus when focused', () => {
    const { getByLabelText } = render(
      <PlayButton
        onPress={mockHandlers.onPress}
        handleFocus={mockHandlers.handleFocus}
        handleBlur={mockHandlers.handleBlur}
        isFocused={false}
      />,
    );

    fireEvent(getByLabelText('Play Button'), 'focus');
    expect(mockHandlers.handleFocus).toHaveBeenCalledTimes(1);
  });

  it('calls handleBlur when blur event occurs', () => {
    const { getByLabelText } = render(
      <PlayButton
        onPress={mockHandlers.onPress}
        handleFocus={mockHandlers.handleFocus}
        handleBlur={mockHandlers.handleBlur}
        isFocused={true}
      />,
    );

    fireEvent(getByLabelText('Play Button'), 'blur');
    expect(mockHandlers.handleBlur).toHaveBeenCalledTimes(1);
  });

  it('has correct accessibility properties', () => {
    const { getByLabelText } = render(
      <PlayButton
        onPress={mockHandlers.onPress}
        handleFocus={mockHandlers.handleFocus}
        handleBlur={mockHandlers.handleBlur}
        isFocused={false}
      />,
    );

    const button = getByLabelText('Play Button');
    expect(button.props.accessibilityRole).toBe('button');
    expect(button.props.accessibilityHint).toBe('Double tap to view details');
  });
});
