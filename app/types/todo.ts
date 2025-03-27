export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

export interface TodoContextType {
  todos: Todo[];
  isLoading: boolean;
  addTodo: (title: string) => Promise<boolean>;
  toggleTodo: (id: string) => Promise<boolean>;
  deleteTodo: (id: string) => Promise<boolean>;
  updateTodo: (id: string, title: string) => Promise<boolean>;
}
