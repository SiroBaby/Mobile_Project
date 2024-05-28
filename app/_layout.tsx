import React from 'react';
import { Stack } from 'expo-router';
// import Login from './Login';


const RootLayout = () => {
  return (
    <Stack>
      {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
