import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';
import tw from 'twrnc';

interface IconProps {
    color: string; // Assuming color is a string, adjust type if necessary
    focused: boolean; // Assuming focused is a boolean, adjust type if necessary
}

const HomeIcon: React.FC<IconProps> = ({ color, focused }) => {
    return (
        <View style={tw`items-center ${focused ? 'bg-blue-900/90' : 'bg-transparent'} px-4 py-1 rounded-xl`}>
            <Image
                source={require('@/assets/images/icon/8726049_home_alt_icon.svg')}
                style={[
                    tw`w-5 h-5`,
                    { tintColor: focused ? '#FFFFFF' : '#657786' },
                ]}
            />
            <Text
                style={[
                    tw`text-xs font-semibold`,
                    { color: focused ? '#FFFFFF' : '#657786' }, // Dynamic color for the text
                ]}
            >
                Home
            </Text>
        </View>
    );
};

const UserIcon: React.FC<IconProps> = ({ color, focused }) => {
    return (
        <View style={tw`items-center ${focused ? 'bg-blue-900/90' : 'bg-transparent'} px-4 py-1 rounded-xl`}>
            <Image
                source={require('@/assets/images/icon/8726390_user_icon.svg')}
                style={[
                    tw`w-5 h-5`,
                    { tintColor: focused ? '#FFFFFF' : '#657786' },
                ]}
            />
            <Text
                style={[
                    tw`text-xs font-semibold`,
                    { color: focused ? '#FFFFFF' : '#657786' }, // Dynamic color for the text
                ]}
            >
                User
            </Text>
        </View>
    );
};

const TabNavigator = () => {
    return (
        <Tabs screenOptions={{ tabBarShowLabel: false }}>
            <Tabs.Screen
                name="Home"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => <HomeIcon color={color} focused={focused} />,
                }}
            />
            <Tabs.Screen
                name="user"
                options={{
                    title: 'User',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => <UserIcon color={color} focused={focused} />,
                }}
            />
            {/* Add other Tabs.Screen components here */}
        </Tabs>
    );
};

export default TabNavigator;
