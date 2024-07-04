import { Stack } from 'expo-router';
import React from 'react';
// import Login from './Login';


const RootLayout = () => {
  return (
    <Stack>
      {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tab)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tab_gv)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
