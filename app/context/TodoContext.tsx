import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo, TodoContextType } from '../types/todo';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const STORAGE_KEY = '@todo_app_items'; // Thêm key cố định

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load todos khi component mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      const storedTodos = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTodos = async (newTodos: Todo[]) => {
    try {
      const todosJSON = JSON.stringify(newTodos);
      await AsyncStorage.setItem(STORAGE_KEY, todosJSON);
      setTodos(newTodos);
    } catch (error) {
      console.error('Error saving todos:', error);
      // Thêm thông báo lỗi nếu cần
    }
  };

  const addTodo = async (title: string) => {
    try {
      const newTodo: Todo = {
        id: Date.now().toString(),
        title,
        completed: false,
        createdAt: Date.now(),
      };
      const newTodos = [...todos, newTodo];
      await saveTodos(newTodos);
      return true; // Thêm thành công
    } catch (error) {
      console.error('Error adding todo:', error);
      return false; // Thêm thất bại
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const newTodos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      await saveTodos(newTodos);
      return true;
    } catch (error) {
      console.error('Error toggling todo:', error);
      return false;
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const newTodos = todos.filter(todo => todo.id !== id);
      await saveTodos(newTodos);
      return true;
    } catch (error) {
      console.error('Error deleting todo:', error);
      return false;
    }
  };

  const updateTodo = async (id: string, title: string) => {
    try {
      const newTodos = todos.map(todo =>
        todo.id === id ? { ...todo, title } : todo
      );
      await saveTodos(newTodos);
      return true;
    } catch (error) {
      console.error('Error updating todo:', error);
      return false;
    }
  };

  return (
    <TodoContext.Provider 
      value={{ 
        todos, 
        addTodo, 
        toggleTodo, 
        deleteTodo, 
        updateTodo,
        isLoading 
      }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};
