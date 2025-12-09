import BackButton from '@components/buttons/BackButton';
import React from 'react';
import { View } from 'react-native';

type Props = {
  onPress: () => void;
  handleFocus: () => void;
  handleBlur: () => void;
  isFocused: boolean;
};
const DetailsHeader = ({
  onPress,
  handleFocus,
  handleBlur,
  isFocused,
}: Props) => {
  return (
    <View className="w-full items-start py-5 px-10 flex flex-row gap-5 absolute z-50">
      <BackButton
        onPress={onPress}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
        isFocused={isFocused}
      />
    </View>
  );
};

export default DetailsHeader;
