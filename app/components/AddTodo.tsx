import React, { useState } from 'react';
import { TextInput, Pressable, View, Alert } from 'react-native';
import { Plus } from 'lucide-react-native';
import { useForm, Controller } from 'react-hook-form';
import { useTodo } from '../context/TodoContext';

interface FormData {
  title: string;
}

export function AddTodo() {
  const { addTodo } = useTodo();
  const { control, handleSubmit, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    if (data.title.trim()) {
      setIsSubmitting(true);
      try {
        const success = await addTodo(data.title.trim());
        if (success) {
          reset();
        } else {
          Alert.alert('Error', 'Failed to add todo');
        }
      } catch (error) {
        console.error('Error in onSubmit:', error);
        Alert.alert('Error', 'An unexpected error occurred');
      } finally {
        setIsSubmitting(false);
      }
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
            editable={!isSubmitting}
          />
        )}
      />
      <Pressable
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className={`ml-4 ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500'} p-2 rounded-full`}>
        <Plus size={24} color="white" />
      </Pressable>
    </View>
  );
}
