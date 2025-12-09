import React, { useEffect, useRef, memo, useMemo } from 'react';
import { Animated, Image, Pressable, Text, View } from 'react-native';
import type { Item } from '@shared/types/catalog';

const ANIMATION_CONFIG = {
  SCALE_FOCUSED: 1.1,
  SCALE_DEFAULT: 1,
  FRICTION: 8,
  TENSION: 40,
  SHADOW_DURATION: 200,
} as const;

const CARD_DIMENSIONS = {
  WIDTH: 'w-40',
  HEIGHT: 'h-56',
} as const;

const SHADOW_CONFIG = {
  COLOR: '#000',
  OFFSET: { width: 0, height: 4 },
  OPACITY_FOCUSED: 0.3,
  OPACITY_DEFAULT: 0,
  RADIUS: 8,
} as const;

type MovieCardProps = {
  movie: Item;
  onPress: () => void;
  handleFocus: () => void;
  handleBlur: () => void;
  isFocused: boolean;
};

const MovieCardComponent = ({
  movie,
  onPress,
  handleFocus,
  handleBlur,
  isFocused,
}: MovieCardProps) => {
  const scaleAnim = useRef(
    new Animated.Value(ANIMATION_CONFIG.SCALE_DEFAULT),
  ).current;

  useEffect(() => {
    const animation = Animated.spring(scaleAnim, {
      toValue: isFocused
        ? ANIMATION_CONFIG.SCALE_FOCUSED
        : ANIMATION_CONFIG.SCALE_DEFAULT,
      useNativeDriver: true,
      friction: ANIMATION_CONFIG.FRICTION,
      tension: ANIMATION_CONFIG.TENSION,
    });

    animation.start();

    return () => animation.stop();
  }, [isFocused, scaleAnim]);

  const animatedStyle = useMemo(
    () => ({
      transform: [{ scale: scaleAnim }],
      shadowColor: SHADOW_CONFIG.COLOR,
      shadowOffset: SHADOW_CONFIG.OFFSET,
      shadowOpacity: isFocused
        ? SHADOW_CONFIG.OPACITY_FOCUSED
        : SHADOW_CONFIG.OPACITY_DEFAULT,
      shadowRadius: SHADOW_CONFIG.RADIUS,
    }),
    [isFocused, scaleAnim],
  );

  return (
    <View className={`mr-6 ${CARD_DIMENSIONS.WIDTH}`}>
      <Pressable
        focusable
        onFocus={handleFocus}
        onBlur={handleBlur}
        accessibilityRole="button"
        accessibilityLabel={`${movie.title} movie`}
        accessibilityHint="Double tap to view details"
        onPress={onPress}
        className="overflow-visible"
      >
        <View
          className={`${CARD_DIMENSIONS.HEIGHT} justify-center items-center`}
        >
          <Animated.View style={animatedStyle}>
            <Image
              accessible={false}
              source={{ uri: movie.thumbnail }}
              resizeMode="cover"
              className={`rounded-xl ${CARD_DIMENSIONS.WIDTH} ${CARD_DIMENSIONS.HEIGHT}`}
            />
          </Animated.View>
        </View>

        <View className="px-1">
          <Text
            numberOfLines={1}
            className="mt-3 text-theme-white font-semibold"
          >
            {movie.title}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};
const MovieCard = memo(MovieCardComponent);

export default MovieCard;
