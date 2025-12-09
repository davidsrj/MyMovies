import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export type LoadingScreenProps = {
  message?: string;
};

/**
 * Full-screen loading indicator used while data is being fetched.
 */
export default function LoadingScreen({
  message = 'Loading catalog…',
}: LoadingScreenProps) {
  return (
    <View className="flex-1 items-center justify-center bg-theme-background">
      <ActivityIndicator size="large" color="#D90B4C" />
      <Text className="mt-5 text-xl text-theme-white">{message}</Text>
    </View>
  );
}
