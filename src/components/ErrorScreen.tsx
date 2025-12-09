import React, { useCallback, useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export type ErrorScreenProps = {
  message: string;
  onRetry: () => void;
};

enum FocusedId {
  retryButton = 'retryButton',
}

export default function ErrorScreen({ message, onRetry }: ErrorScreenProps) {
  const [focusedId, setFocusedId] = useState<FocusedId | null>(null);

  const handleRetryButtonFocus = useCallback(() => {
    setFocusedId(FocusedId.retryButton);
  }, []);

  const handleRetryButtonBlur = useCallback(() => {
    setFocusedId(null);
  }, []);

  const isFocused = focusedId === FocusedId.retryButton;

  return (
    <View className="flex-1 items-center justify-center bg-theme-background px-6">
      <Text
        accessibilityRole="alert"
        className="text-theme-white text-xl mb-4 text-center"
      >
        {message}
      </Text>
      <Pressable
        focusable
        accessibilityRole="button"
        accessibilityLabel="Retry Button"
        accessibilityHint="Double tap to retry loading the catalog"
        onFocus={handleRetryButtonFocus}
        onBlur={handleRetryButtonBlur}
        onPress={onRetry}
        className={`px-6 py-2 flex-row gap-2 rounded-full bg-theme-primary border-2 ${
          isFocused ? 'border-theme-white' : 'border-transparent'
        }`}
      >
        <Feather name="refresh-ccw" size={25} color="#FFFFFF" />
        <Text className="text-theme-white text-base font-semibold">
          Try again
        </Text>
      </Pressable>
    </View>
  );
}
