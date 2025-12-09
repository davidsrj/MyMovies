import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FlatList, Text, View, ScrollView } from 'react-native';
import { Item } from '@shared/types/catalog';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import MovieCard from '../cards/MovieCard';

type Props = {
  movies: Item[];
  scrollViewRef?: React.RefObject<ScrollView | null>;
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PopularMovies = ({ movies, scrollViewRef }: Props) => {
  const navigation = useNavigation<NavigationProp>();
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const sectionRef = useRef<View>(null);

  useEffect(() => {
    if (focusedIndex === null) return;

    const timeout = setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: focusedIndex,
        animated: true,
        viewPosition: 0.5,
      });
    }, 80);

    return () => clearTimeout(timeout);
  }, [focusedIndex]);

  useEffect(() => {
    if (focusedIndex === null) return;
    if (!scrollViewRef?.current || !sectionRef.current) return;

    sectionRef.current.measureLayout(
      scrollViewRef.current as any,
      (x, y) => {
        scrollViewRef.current?.scrollTo({
          y: Math.max(y - 40, 0),
          animated: true,
        });
      },
      () => {},
    );
  }, [focusedIndex, scrollViewRef]);

  const handleScrollToIndexFailed = useCallback((info: any) => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
        viewPosition: 0.5,
      });
    }, 250);
  }, []);

  const handleCardFocus = useCallback((index: number) => {
    setFocusedIndex(index);
  }, []);

  const handleCardBlur = useCallback(() => {
    setFocusedIndex(prev => (prev !== null ? null : prev));
  }, []);

  const keyExtractor = useCallback((item: Item) => item.id.toString(), []);

  const handlePress = useCallback(
    (item: Item) => {
      navigation.navigate('Details', { item });
    },
    [navigation],
  );

  return (
    <View ref={sectionRef} className="flex-1">
      <View className="mb-5">
        <Text className="text-2xl font-medium text-theme-white">
          Popular movies
        </Text>
      </View>
      <FlatList
        ref={flatListRef}
        horizontal
        data={movies}
        className="flex flex-1 overflow-visible"
        keyExtractor={keyExtractor}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        scrollEnabled
        nestedScrollEnabled
        removeClippedSubviews={false}
        onScrollToIndexFailed={handleScrollToIndexFailed}
        renderItem={({ item, index }: { item: Item; index: number }) => (
          <MovieCard
            movie={item}
            onPress={() => handlePress(item)}
            handleFocus={() => handleCardFocus(index)}
            handleBlur={handleCardBlur}
            isFocused={focusedIndex === index}
          />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default PopularMovies;
