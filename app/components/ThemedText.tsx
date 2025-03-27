import React from 'react';
import { Text, TextProps } from 'react-native';

interface ThemedTextProps extends TextProps {
  className?: string;
}

export function ThemedText({ className = '', ...props }: ThemedTextProps) {
  return (
    <Text
      className={`text-gray-900 dark:text-gray-100 ${className}`}
      {...props}
    />
  );
}
