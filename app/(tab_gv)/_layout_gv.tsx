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
        <View style={tw`items-center ${focused ? 'bg-blue-900/90' : 'bg-transparent'} px-4 py-2 rounded-xl`}>
            <Image
                source={require('@/assets/images/icon/8726049_home_alt_icon.svg')}
                style={[
                    tw`w-6 h-6`,
                    { tintColor: focused ? '#FFFFFF' : '#657786' },
                ]}
            />
        </View>
    );
};



const UserIcon: React.FC<IconProps> = ({ color, focused }) => {
    return (
        <View style={tw`items-center ${focused ? 'bg-blue-900/90' : 'bg-transparent'} px-4 py-2 rounded-xl`}>
            <Image
                source={require('@/assets/images/icon/8726390_user_icon.svg')}
                style={[
                    tw`w-6 h-6`,
                    { tintColor: focused ? '#FFFFFF' : '#657786' },
                ]}
            />
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
                name="user_gv"
                options={{
                    title: 'User_gv',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => <UserIcon color={color} focused={focused} />,
                }}
            />
        </Tabs>
    );
};

export default TabNavigator;
