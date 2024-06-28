import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        fetch('http://192.168.1.7:3000/login', {
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
                    router.push('Home');
                } else {
                    Alert.alert('Error', 'Thông tin không hợp lệ');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <View style={tw`flex-1 p-5 bg-white items-center justify-center `}>
            <Image
                source={require('../assets/images/login.png')}
                style={tw`w-78 h-78 mb-4`}
            />
            <Text style={tw`text-3xl font-bold mb-4  text-[#2E328C]`}>ĐĂNG NHẬP</Text>
            <TextInput
                style={tw`h-10 border border-gray-300 px-3 mb-7 rounded-xl w-78`}
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

            <TouchableOpacity style={tw`bg-[#2E328C] p-3 items-center rounded-xl mb-5 w-78`} onPress={handleLogin}>
                <Text style={tw`text-white font-bold`}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>

            <Text style={tw`text-center mb-5`}>Quản trị viên chưa có tài khoản</Text>

            <TouchableOpacity style={tw`bg-[#EEF4FF] p-3 items-center rounded-xl mb-5 w-78`}>
                <Link href={'/Sign-up'}>
                    <Text style={tw`text-[#2E328C] font-bold`}>ĐĂNG KÍ</Text>
                </Link>
            </TouchableOpacity>
            
            <TouchableOpacity style={tw`bg-[#EEF4FF] p-3 items-center rounded-xl mb-5 w-78`}>
                <Link href={'/Change-pass'}>
                    <Text style={tw`text-[#2E328C] font-bold`}>ĐỔI MẬT KHẨU </Text>
                </Link>
            </TouchableOpacity>
        </View>
    );
};

export default Login;
