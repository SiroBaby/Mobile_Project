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

const ListIcon: React.FC<IconProps> = ({ color, focused }) => {
    return (
        <View style={tw`items-center ${focused ? 'bg-blue-900/90' : 'bg-transparent'} px-4 py-2 rounded-xl`}>
            <Image
                source={require('@/assets/images/icon/8726093_list_ul_icon.png')}
                style={[
                    tw`w-6 h-6`,
                    { tintColor: focused ? '#FFFFFF' : '#657786' },
                ]}
            />
        </View>
    );
};

const AddIcon: React.FC<IconProps> = ({ color, focused }) => {
    return (
        <View style={tw`items-center ${focused ? 'bg-blue-900/90' : 'bg-transparent'} px-4 py-2 rounded-xl`}>
            <Image
                source={require('@/assets/images/icon/8726254_plus_circle_icon.png')}
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
                name="Home_ad"
                options={{
                    title: 'Home_ad',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => <HomeIcon color={color} focused={focused} />,
                }}
            />
            <Tabs.Screen
                name="list"
                options={{
                    title: 'Danh Sách',
                    tabBarIcon: ({ color, focused }) => <ListIcon color={color} focused={focused} />,
                }}
            />
            <Tabs.Screen
                name="addnew"
                options={{
                    title: 'Thêm mới',
                    tabBarIcon: ({ color, focused }) => <AddIcon color={color} focused={focused} />,
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
        </Tabs>
    );
};

export default TabNavigator;
