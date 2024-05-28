import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home'
import Login from './Login';

const Stack = createStackNavigator();

const RootLayout = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default RootLayout;
