import React from 'react';
import { Pressable, Text } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

type Props = {
  onPress: () => void;
  handleFocus: () => void;
  handleBlur: () => void;
  isFocused: boolean;
};
const PlayButton = ({ onPress, handleFocus, handleBlur, isFocused }: Props) => {
  return (
    <Pressable
      focusable
      accessibilityRole="button"
      accessibilityLabel="Play Button"
      accessibilityHint="Double tap to view details"
      onPress={onPress}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`px-5 py-3  rounded-full items-center flex flex-row border-2 justify-center w-52 ${
        isFocused
          ? 'bg-theme-white/20 border-theme-white'
          : 'bg-theme-white/10 border-transparent'
      }`}
    >
      <Entypo name="controller-play" size={30} color="#FFFFFF" />
      <Text className="text-3xl text-theme-white">Play</Text>
    </Pressable>
  );
};

export default PlayButton;
