import React from 'react';
import { TextInput, Pressable, View } from 'react-native';
import { Plus } from 'lucide-react-native';
import { useForm, Controller } from 'react-hook-form';
import { useTodo } from '../context/TodoContext';

interface FormData {
  title: string;
}

export function AddTodo() {
  const { addTodo } = useTodo();
  const { control, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    if (data.title.trim()) {
      addTodo(data.title.trim());
      reset();
    }
  };

  return (
    <View className="flex-row items-center p-4 bg-white dark:bg-gray-800 rounded-lg mb-4 shadow-sm">
      <Controller
        control={control}
        name="title"
        defaultValue=""
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Add a new todo..."
            placeholderTextColor="#9CA3AF"
            value={value}
            onChangeText={onChange}
            onSubmitEditing={handleSubmit(onSubmit)}
            className="flex-1 text-gray-800 dark:text-gray-200 text-base"
          />
        )}
      />
      <Pressable
        onPress={handleSubmit(onSubmit)}
        className="ml-4 bg-blue-500 p-2 rounded-full">
        <Plus size={24} color="white" />
      </Pressable>
    </View>
  );
}