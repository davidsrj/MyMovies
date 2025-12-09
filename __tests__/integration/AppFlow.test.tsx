import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../../src/screens/HomeScreen';
import DetailsScreen from '../../src/screens/DetailsScreen';
import PlayerScreen from '../../src/screens/PlayerScreen';
import type { Item } from '@shared/types/catalog';

jest.mock('../../src/hooks/useCatalog', () => ({
  useCatalog: (): {
    loading: boolean;
    error: string | null;
    items: Item[];
  } => ({
    loading: false,
    error: null,
    items: [
      {
        id: 'integration-1',
        title: 'Integration Movie 1',
        description: 'Integration Description 1',
        thumbnail: 'https://example.com/int-1.jpg',
        streamUrl: 'https://example.com/int-1.m3u8',
        duration: 100,
      },
    ],
  }),
}));

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('react-native-vector-icons/Entypo', () => 'Icon');

type TestStackParamList = {
  Home: undefined;
  Details: { item: Item };
  Player: { item: Item };
};

const Stack = createNativeStackNavigator<TestStackParamList>();

const TestNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Player" component={PlayerScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

describe('App integration flow: Home -> Details -> Player', () => {
  it('navigates from Home to Details and then to Player', async () => {
    const { getByText, getAllByLabelText, getByLabelText } = render(
      <TestNavigator />,
    );

    expect(() => getByText('Loading catalog…')).toThrow();

    const movieCards = getAllByLabelText('Integration Movie 1 movie');
    const firstMovieCard = movieCards[0];
    fireEvent.press(firstMovieCard);

    await waitFor(() => {
      expect(getByText('Integration Movie 1')).toBeTruthy();
    });

    const playButton = getByLabelText('Play Button');
    fireEvent.press(playButton);

    await waitFor(() => {
      expect(getByText('Loading video…')).toBeTruthy();
    });
  });
});
