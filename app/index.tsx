import { Link, router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserData {
    id: string;
    HoVaTen: string;
    TenDangNhap: String;
    MatKhau: String;
    SDT: number;
    Email: String;
    Quyen: number;
    [key: string]: any; // Add this line to allow additional properties
}

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const userData = await getUserData();
            if (userData) {
                // Người dùng đã đăng nhập
                if (userData.Quyen === 1) {
                    router.push('Admin');
                } else {
                    router.push('Home');
                }
            } else {
                setLoading(false); // Kết thúc tải nếu không có userData
            }
        };
        checkLoginStatus();
    }, []);

    const getUserData = async (): Promise<UserData | null> => {
        try {
            const jsonValue = await AsyncStorage.getItem('userData');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error('Failed to load user data', e);
            return null;
        }
    };

    const saveUserData = async (userData: UserData) => {
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
        } catch (e) {
            console.error('Failed to save user data', e);
        }
    };

    const handleLogin = () => {
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'Login successful') {
                    Alert.alert('Success', 'Login successful');
                    saveUserData(data.user);
                    if (data.user.Quyen === 1) {
                        router.push('Admin');
                    } else {
                        router.push('Home');
                    }
                } else {
                    Alert.alert('Error', 'Thông tin không hợp lệ');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleSignUpPress = () => {
        router.push('/Sign-up'); // Chuyển hướng đến màn hình Sign-up khi TouchableOpacity được nhấn
    };

    if (loading) {
        return (
            <View style={tw`flex-1 items-center justify-center`}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={tw`flex-1 p-5 bg-white items-center justify-center `}>
            <Image
                source={require('../assets/images/login.png')}
                style={tw`w-78 h-78 mb-4`}
            />
            <Text style={tw`text-3xl font-bold mb-4  text-[#2E328C]`}>ĐĂNG NHẬP</Text>
            <TextInput
                style={tw`h-10 border border-gray-300 px-3 mb-3 rounded-xl w-78`}
                placeholder="Tên tài khoản"
                onChangeText={setUsername}
                value={username}
            />

            <TextInput
                style={tw`h-10 border border-gray-300 px-3 mb-7 rounded-xl w-78`}
                placeholder="Mật khẩu"
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
            />

            <TouchableOpacity style={tw`bg-[#2E328C] p-3 items-center rounded-xl mb-3 w-78`} onPress={handleLogin}>
                <Text style={tw`text-white font-bold`}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>

            <TouchableOpacity style={tw`  items-center mb-5 w-78`}>
                <Link href={'/Change-pass'}>
                    <Text style={tw`text-[#2E328C] font-bold`}>Quên mật khẩu?</Text>
                </Link>
            </TouchableOpacity>

            <Text style={tw`text-center mb-5`}>Quản trị viên chưa có tài khoản</Text>

            <TouchableOpacity style={tw`bg-[#EEF4FF] p-3 items-center rounded-xl mb-5 w-78`} onPress={handleSignUpPress}>
                <Text style={tw`text-[#2E328C] font-bold`}>ĐĂNG KÍ</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;
