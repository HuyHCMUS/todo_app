import React, { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Check, Trash2, Edit2 } from 'lucide-react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { useTodo } from '../context/TodoContext';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo, updateTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleUpdate = () => {
    if (editedTitle.trim() !== '') {
      updateTodo(todo.id, editedTitle.trim());
      setIsEditing(false);
    }
  };

  return (
    <Animated.View
      entering={FadeInRight}
      exiting={FadeOutLeft}
      className="flex-row items-center justify-between bg-white rounded-xl p-3 mb-3">
      <View className="flex-row items-center flex-1">
        {/* Checkbox */}
        <Pressable
          onPress={() => toggleTodo(todo.id)}
          className="w-6 h-6 border-2 rounded-full items-center justify-center mr-3"
          style={{ borderColor: todo.completed ? '#10B981' : '#D1D5DB' }}>
          {todo.completed && <Check size={16} color="#10B981" />}
        </Pressable>

        {/* Todo Title */}
        {isEditing ? (
          <TextInput
            value={editedTitle}
            onChangeText={setEditedTitle}
            onBlur={handleUpdate}
            onSubmitEditing={handleUpdate}
            autoFocus
            className="flex-1 text-base text-gray-800"
          />
        ) : (
          <Pressable onPress={() => toggleTodo(todo.id)} className="flex-1">
            <Animated.Text
              className={`text-base ${
                todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'
              }`}>
              {todo.title}
            </Animated.Text>
          </Pressable>
        )}
      </View>

      {/* Action Buttons */}
      <View className="flex-row items-center">
        <Pressable
          onPress={() => setIsEditing(!isEditing)}
          className="p-2 mr-1">
          <Edit2 size={20} color="#666666" />
        </Pressable>
        <Pressable
          onPress={() => deleteTodo(todo.id)}
          className="p-2">
          <Trash2 size={20} color="#EF4444" />
        </Pressable>
      </View>
    </Animated.View>
  );
}

