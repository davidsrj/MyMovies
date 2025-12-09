import React from 'react';
import { View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenProps = ViewProps & {
  unsafe?: boolean;
};

export function Screen({ children, unsafe, style, ...rest }: ScreenProps) {
  if (unsafe) {
    return (
      <View style={style} {...rest}>
        {children}
      </View>
    );
  }

  return (
    <SafeAreaView style={style} {...rest}>
      {children}
    </SafeAreaView>
  );
}
