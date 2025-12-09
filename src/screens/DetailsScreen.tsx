import React, { useState, useCallback } from 'react';
import { Image, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import type { Item } from '@shared/types/catalog';
import DetailsHeader from '@components/header/DetailsHeader';
import PlayButton from '@components/buttons/PlayButton';
import { Screen } from '@shared/components/Screen';

enum FocusedId {
  playButton = 'playButton',
  backButton = 'backButton',
}

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({
  route,
  navigation,
}: DetailsScreenProps) {
  const { item } = route.params as { item: Item };
  const [focusedId, setFocusedId] = useState<FocusedId | null>(null);

  const handlePlayButtonFocus = useCallback(() => {
    setFocusedId(FocusedId.playButton);
  }, []);

  const handlePlayButtonBlur = useCallback(() => {
    setFocusedId(null);
  }, []);

  const handleBackButtonFocus = useCallback(() => {
    setFocusedId(FocusedId.backButton);
  }, []);

  const handleBackButtonBlur = useCallback(() => {
    setFocusedId(null);
  }, []);

  return (
    <Screen className="flex-1 bg-theme-dark">
      <DetailsHeader
        onPress={() => navigation.goBack()}
        handleFocus={handleBackButtonFocus}
        handleBlur={handleBackButtonBlur}
        isFocused={focusedId === FocusedId.backButton}
      />
      <Image
        source={{ uri: item.thumbnail }}
        className="w-full h-full z-10 blur-lg opacity-90"
        resizeMode="cover"
      />
      <View className="absolute bottom-20 left-10 right-10 z-50">
        <Text className="text-6xl font-semibold text-theme-white">
          {item.title}
        </Text>
        <Text className="mt-3 text-lg text-theme-white">
          {item.description}
        </Text>
        <View className="mt-5">
          <PlayButton
            onPress={() => navigation.navigate('Player', { item })}
            handleFocus={handlePlayButtonFocus}
            handleBlur={handlePlayButtonBlur}
            isFocused={focusedId === FocusedId.playButton}
          />
        </View>
      </View>
    </Screen>
  );
}
