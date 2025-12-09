import React, { forwardRef } from 'react';
import { ScrollView, View } from 'react-native';

type Props = {
  children: React.ReactNode;
};

const MainWrapper = forwardRef<ScrollView, Props>(({ children }, ref) => {
  return (
    <ScrollView ref={ref} className="flex flex-1 bg-theme-background px-10">
      <View className="flex flex-1 pb-44 pt-10 gap-20">{children}</View>
    </ScrollView>
  );
});

MainWrapper.displayName = 'MainWrapper';

export default MainWrapper;
