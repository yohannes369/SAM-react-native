// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import ToggleButton from './components/ToggleButton'; // Import the ToggleButton component
import { DefaultTheme, DarkTheme, ThemeProvider } from '@react-navigation/native';

const Stack = createStackNavigator();

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Track dark mode state

  const theme = isDarkMode ? DarkTheme : DefaultTheme; // Toggle theme based on state

  return (
    <ThemeProvider value={theme}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Attendance App',
              headerRight: () => ( // Add the toggle button to the header
                <ToggleButton
                  isDarkMode={isDarkMode}
                  onToggle={() => setIsDarkMode(!isDarkMode)}
                />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;