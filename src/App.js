import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WalletProvider } from './utils/WalletContext';
import LoginScreen from './screens/LoginScreen';
import GameScreen from './screens/GameScreen';

const Stack = createStackNavigator();

const App = () => (
  <WalletProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </WalletProvider>
);

export default App;
