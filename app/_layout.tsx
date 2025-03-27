import { Stack } from "expo-router";
import "./global.css"
import { TodoProvider } from './context/TodoContext';

export default function RootLayout() {
  return (
    <TodoProvider>
      <Stack 
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </TodoProvider>
  );
}





