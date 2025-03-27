import React from 'react';
import { View, ViewProps } from 'react-native';

interface ThemedViewProps extends ViewProps {
  className?: string;
}

export function ThemedView({ className = '', ...props }: ThemedViewProps) {
  return (
    <View
      className={`bg-white dark:bg-gray-900 ${className}`}
      {...props}
    />
  );
}
