import React from 'react';
import { ScrollView, View, Text, ActivityIndicator, Alert } from 'react-native';
import { TodoProvider } from '../context/TodoContext';
import { AddTodo } from '../components/AddTodo';
import { TodoItem } from '../components/TodoItem';
import { useTodo } from '../context/TodoContext';

function TodoList() {
  const { todos, isLoading } = useTodo();

  // Alert.alert('Debug', `Todos value: ${JSON.stringify(todos)}`);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Thêm debug text để kiểm tra từng bước render
  return (
    <View className="flex-1 bg-gray-100 dark:bg-gray-900">
      <View className="flex-1 p-4 pt-12">
        <Text className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Todo List
        </Text>
        <AddTodo />
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ flex: 1 }}
        >
          {todos?.map((todo, index) => {
            //console.log('Rendering todo:', todo);
            return (
              <View key={todo.id}>
                <TodoItem todo={todo} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

export default function IndexScreen() {
  return (
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  );
}






