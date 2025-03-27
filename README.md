# Todo App with React Native & Expo

A modern, feature-rich Todo application built with React Native, Expo, and TypeScript. This app demonstrates best practices in mobile development with features like persistent storage, animations, and dark mode support.

## Features

- ✨ Create, read, update, and delete todos
- 💾 Persistent storage using AsyncStorage
- 🎯 TypeScript for type safety
- 💅 Styled with TailwindCSS (NativeWind)
- 📱 Cross-platform (iOS, Android)

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or newer)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client) app on your mobile device

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd todo-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npx expo start
```

## Running the App

After starting the development server, you have several options to run the app:

1. **On your phone:**
   - Install the Expo Go app
   - Scan the QR code shown in the terminal with your phone's camera
   - The app will open in Expo Go

2. **On iOS Simulator:**
   - Press `i` in the terminal
   - Make sure you have Xcode installed

3. **On Android Emulator:**
   - Press `a` in the terminal
   - Make sure you have Android Studio and an emulator set up

## Project Structure

```
todo-app/
├── app/
│   ├── (tabs)/                 # Tab navigation screens
│   ├── components/             # Reusable components
│   ├── context/               # Context providers
│   ├── types/                 # TypeScript type definitions
│   └── _layout.tsx           # Root layout configuration
├── assets/                    # Static assets
└── ...configuration files
```

## Key Technologies

- [Expo](https://expo.dev/) - Development platform
- [React Native](https://reactnative.dev/) - Mobile framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [NativeWind](https://www.nativewind.dev/) - TailwindCSS for React Native
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - Animations
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) - Persistent storage
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing

## Features in Detail

### Todo Management
- Create new todos with a title
- Mark todos as complete/incomplete
- Edit todo titles
- Delete todos
- Persistent storage across app restarts

### Development Features
- Type-safe development with TypeScript
- Modern styling with TailwindCSS
- File-based routing with Expo Router
- Context-based state management

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Troubleshooting

If you encounter any issues:

1. **Metro bundler issues:**
   ```bash
   # Clear metro bundler cache
   npx expo start -c
   ```

2. **Dependencies issues:**
   ```bash
   # Remove node_modules and reinstall
   rm -rf node_modules
   npm install
   ```

3. **Build issues:**
   - Ensure all dependencies are correctly installed
   - Check if your development environment meets the prerequisites
   - Try clearing the Expo cache: `expo r -c`
