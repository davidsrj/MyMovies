import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Video from 'react-native-video';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import type { Item } from '@shared/types/catalog';
import { Screen } from '@shared/components/Screen';
import BackButton from '@components/buttons/BackButton';

enum FocusedId {
  playButton = 'playButton',
  backButton = 'backButton',
}

type PlayerScreenProps = NativeStackScreenProps<RootStackParamList, 'Player'>;

export default function PlayerScreen({ route, navigation }: PlayerScreenProps) {
  const { item } = route.params as { item: Item };
  const [playError, setPlayError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [controlsVisible, setControlsVisible] = useState(false);

  const [focusedId, setFocusedId] = useState<FocusedId | null>(null);

  const handleBackButtonFocus = useCallback(() => {
    setFocusedId(FocusedId.backButton);
  }, []);

  const handleBackButtonBlur = useCallback(() => {
    setFocusedId(null);
  }, []);

  return (
    <Screen className="flex-1 bg-theme-dark relative">
      {controlsVisible && (
        <View className="absolute top-5 left-5 z-[999]">
          <BackButton
            onPress={() => navigation.goBack()}
            handleFocus={handleBackButtonFocus}
            handleBlur={handleBackButtonBlur}
            isFocused={focusedId === FocusedId.backButton}
          />
        </View>
      )}
      {playError ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-theme-white" accessibilityRole="alert">
            Playback error. Please try another movie.
          </Text>
        </View>
      ) : (
        <View className="flex-1 bg-theme-primary">
          {loading && (
            <View className="absolute inset-0 items-center justify-center">
              <ActivityIndicator size="large" />
              <Text className="mt-3 text-theme-white">Loading video…</Text>
            </View>
          )}
          <Video
            source={{ uri: item.streamUrl }}
            style={{ flex: 1, backgroundColor: 'black' }}
            controls
            resizeMode="contain"
            onControlsVisibilityChange={(e: Readonly<{ isVisible: boolean }>) =>
              setControlsVisible(e.isVisible)
            }
            onError={e => {
              setPlayError('error');
              setLoading(false);
            }}
            onLoadStart={() => {
              setLoading(true);
              setControlsVisible(false);
            }}
            onLoad={() => {
              setLoading(false);
            }}
            onReadyForDisplay={() => {
              setLoading(false);
            }}
            paused={false}
          />
        </View>
      )}
    </Screen>
  );
}
