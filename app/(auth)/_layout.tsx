import { Stack, Tabs } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';
import tw from 'twrnc';
import IndexScreen from '../index';


const AuthLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="Sign-up" options={{ headerShown: false }} />
        </Stack>
    );
};

export default AuthLayout;
