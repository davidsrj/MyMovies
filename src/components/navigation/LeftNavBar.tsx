import React, { useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  onPress: () => void;
}

interface LeftNavBarProps {
  activeRoute?: string;
  onNavigate?: (route: string) => void;
}

export default function LeftNavBar({
  activeRoute = 'Home',
  onNavigate,
}: LeftNavBarProps) {
  const [focusedItem, setFocusedItem] = useState<string | null>(null);
  const navItems: NavItem[] = [
    {
      id: 'Home',
      label: 'Home',
      icon: 'home',
      onPress: () => onNavigate?.('Home'),
    },
    {
      id: 'Categories',
      label: 'Categories',
      icon: 'list-unordered',
      onPress: () => onNavigate?.('Categories'),
    },
    {
      id: 'Account',
      label: 'Account',
      icon: 'person',
      onPress: () => onNavigate?.('Account'),
    },
  ];

  return (
    <View className="w-20 bg-theme-secondary/30 flex-col items-center justify-center">
      {navItems.map((item, index) => {
        const isActive = activeRoute === item.id;
        const isFocused = focusedItem === item.id;
        return (
          <Pressable
            key={item.id}
            onPress={item.onPress}
            onFocus={() => setFocusedItem(item.id)}
            onBlur={() => setFocusedItem(null)}
            className={`w-full items-center py-6 ${
              isFocused ? 'bg-theme-primary/10' : ''
            }`}
          >
            <Icon
              name={item.icon}
              size={28}
              color={isFocused ? '#ffffff' : isActive ? '#D90B4C' : '#9ca3af'}
            />
            <Text
              className={`text-xs mt-2 ${
                isFocused
                  ? 'text-white font-bold'
                  : isActive
                  ? 'text-theme-primary'
                  : 'text-gray-400'
              }`}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
