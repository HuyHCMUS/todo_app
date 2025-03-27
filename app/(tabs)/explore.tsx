import React from 'react';
import { View, Switch } from 'react-native';
import { useTodo } from '../context/TodoContext';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { useColorScheme } from 'nativewind';

export default function ExploreScreen() {
  const { todos } = useTodo();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  // Calculate statistics
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;
  const completionRate = totalTodos ? ((completedTodos / totalTodos) * 100).toFixed(1) : '0';

  return (
    <ThemedView className="flex-1 p-4 pt-12">
      <View className="flex-row justify-between items-center mb-8">
        <ThemedText className="text-2xl font-bold">Statistics</ThemedText>
        <View className="flex-row items-center">
          <ThemedText className="mr-2">Dark Mode</ThemedText>
          <Switch
            value={colorScheme === 'dark'}
            onValueChange={toggleColorScheme}
          />
        </View>
      </View>

      <View className="space-y-4">
        <View className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <ThemedText className="text-lg mb-2">Total Todos: {totalTodos}</ThemedText>
          <ThemedText className="text-lg mb-2">Completed: {completedTodos}</ThemedText>
          <ThemedText className="text-lg mb-2">Pending: {pendingTodos}</ThemedText>
          <ThemedText className="text-lg">Completion Rate: {completionRate}%</ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}


