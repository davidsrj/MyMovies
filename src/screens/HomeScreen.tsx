import React, { useRef } from 'react';
import { View, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCatalog } from '@hooks/useCatalog';
import MainWrapper from '@components/wrappers/MainWrapper';
import PopularMovies from '@components/sections/PopularMovies';
import LeftNavBar from '@components/navigation/LeftNavBar';
import LatestMovies from '@components/sections/LatestMovies';
import ActionMovies from '@components/sections/ActionMovies';
import { RootStackParamList } from '../navigation/RootNavigator';
import ErrorScreen from '@components/ErrorScreen';
import LoadingScreen from '@components/LoadingScreen';
import { Screen } from '@shared/components/Screen';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { items, loading, error, reload } = useCatalog();
  const scrollViewRef = useRef<ScrollView>(null);

  if (loading) {
    return <LoadingScreen />;
  }
  if (error) {
    return <ErrorScreen message={error} onRetry={reload} />;
  }

  return (
    <Screen className="flex-1 flex-row bg-theme-background">
      <LeftNavBar
        activeRoute="Home"
        onNavigate={route => {
          console.log('Navigate to:', route);
        }}
      />
      <MainWrapper ref={scrollViewRef}>
        <PopularMovies movies={items} scrollViewRef={scrollViewRef} />
        <LatestMovies movies={items} scrollViewRef={scrollViewRef} />
        <ActionMovies movies={items} scrollViewRef={scrollViewRef} />
      </MainWrapper>
    </Screen>
  );
}
