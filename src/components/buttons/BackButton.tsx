import React from 'react';
import { Pressable } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  onPress: () => void;
  handleFocus: () => void;
  handleBlur: () => void;
  isFocused: boolean;
};
const BackButton = ({ onPress, handleFocus, handleBlur, isFocused }: Props) => {
  return (
    <Pressable
      focusable
      accessibilityRole="button"
      accessibilityLabel="Back Button"
      accessibilityHint="Tap to go back"
      onPress={onPress}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`flex flex-row items-center gap-2 clear-start rounded-full p-3 border-2 ${
        isFocused
          ? 'bg-theme-white/20 border-theme-white'
          : 'bg-theme-white/10 border-transparent'
      }`}
    >
      <MaterialIcons name="keyboard-backspace" size={30} color="#fff" />
    </Pressable>
  );
};

export default BackButton;
