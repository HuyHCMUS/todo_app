import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo, TodoContextType } from '../types/todo';
import { Alert } from 'react-native';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const STORAGE_KEY = '@todo_app_items';

export function TodoProvider({ children }: { children: React.ReactNode }) {
  // Khởi tạo với mảng rỗng thay vì undefined
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      const storedTodos = await AsyncStorage.getItem(STORAGE_KEY);
      
      if (storedTodos) {
        const parsedTodos = JSON.parse(storedTodos);
        // Kiểm tra xem parsedTodos có phải là mảng không
        if (Array.isArray(parsedTodos)) {
          setTodos(parsedTodos);
        } else {
          setTodos([]);
          Alert.alert('Error', 'Stored todos is not an array');
        }
      }
    } catch (e) {
      Alert.alert('Error', `Loading error: `);
      setTodos([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  // Thêm useEffect này để theo dõi thay đổi của todos
  // useEffect(() => {
  //   Alert.alert('Debug', `State todos updated: ${JSON.stringify(todos)}`);
  // }, [todos]);

  const saveTodos = async (newTodos: Todo[]) => {
    try {
      const todosJSON = JSON.stringify(newTodos);
      await AsyncStorage.setItem(STORAGE_KEY, todosJSON);
      //console.log('Saved todos:', todosJSON); // Debug log
      setTodos(newTodos);
      return true;
    } catch (error) {
      console.error('Error saving todos:', error);
      return false;
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
      // Alert.alert('Debug', `Adding todo: ${JSON.stringify(newTodo)}`);
      const newTodos = [...todos, newTodo];
      const success = await saveTodos(newTodos);
      if (!success) {
        Alert.alert('Error', 'Failed to save todos');
        return false;
      }
      return true;
    } catch (e) {
      Alert.alert('Error', `Add todo error`);
      return false;
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const newTodos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      return await saveTodos(newTodos);
    } catch (error) {
      console.error('Error toggling todo:', error);
      return false;
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const newTodos = todos.filter(todo => todo.id !== id);
      return await saveTodos(newTodos);
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
      return await saveTodos(newTodos);
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


