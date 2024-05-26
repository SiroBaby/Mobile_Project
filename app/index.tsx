import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc';

export default function App() {
    return (
        <View style={tw`flex-1 pt-8 px-5 bg-white`}>
            <Text style={tw`text-3xl font-semibold `}>Hi QTV!</Text>
            <StatusBar style="auto" />
            <Link href="/home" style={tw`text-3xl text-blue-500`}>Go to Home</Link>
        </View>
    );
}
