import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';
import tw from 'twrnc';

const homeicon = require("../../assets/images/icon/8726049_home_alt_icon.svg");


const AuthLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="Sign-up"
                options={{
                    title: 'Sign-up',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <View style={tw`items-center`}>
                            <Image
                                source={require('@/assets/images/icon/8726049_home_alt_icon.svg')}
                                style={tw`w-5 h-5 ${focused ? 'tint-primary' : 'tint-secondary'}`}
                            />
                            <Text style={tw`${focused ? 'text-primary' : 'text-secondary'} text-xs`}>
                                Home
                            </Text>
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
};

export default AuthLayout;
