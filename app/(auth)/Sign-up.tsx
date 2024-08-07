import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import tw from 'twrnc';
import { Link, router } from 'expo-router';

const SignupScreen = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    if (password !== confirmPassword) {
      // Xử lý khi mật khẩu không khớp
      return;
    }

    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName,
        username,
        password,
        phoneNumber,
        email,
      }),
    })
      .then((response) => {
        if (!response.ok) {
        Alert.alert('Đăng kí tài khoản thất bại!')
          throw new Error('Signup failed');

        }
        Alert.alert('Đăng kí tài khoản thành công!')
        router.push('');
        // Xử lý khi đăng ký thành công
      })
      .catch((error) => {
        Alert.alert('Lỗi khi đăng kí tài khoản!')
        console.error('Error:', error);
      });
  };

  const handleLoginPress = () => {
    router.push(''); // Chuyển hướng đến màn hình Sign-up khi TouchableOpacity được nhấn
};

  return (
    <View style={tw`flex-1 p-4 bg-white items-center justify-center`}>
      <Image
        source={require('@/assets/images/signin.jpg')}
        style={tw`w-80 h-56`}
      />
      <Text style={tw`text-2xl font-bold mb-3 text-blue-900`}>ĐĂNG KÝ</Text>

      <TextInput
        style={tw`h-10 border border-gray-300 px-3 mb-4 w-72 rounded-xl`}
        placeholder="Họ và tên"
        onChangeText={setFullName}
        value={fullName}
      />

      <TextInput
        style={tw`h-10 border border-gray-300 px-3 mb-4 w-72 rounded-xl`}
        placeholder="Tên tài khoản"
        onChangeText={setUsername}
        value={username}
      />

      <TextInput
        style={tw`h-10 border border-gray-300 px-3 mb-4 w-72 rounded-xl`}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        style={tw`h-10 border border-gray-300 px-3 mb-4 w-72 rounded-xl`}
        placeholder="Số điện thoại"
        onChangeText={setPhoneNumber}
        value={phoneNumber}
      />

      <TextInput
        style={tw`h-10 border border-gray-300 px-3 mb-4 w-72 rounded-xl`}
        placeholder="Mật khẩu"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />

      <TextInput
        style={tw`h-10 border border-gray-300 px-3 mb-4 w-72 rounded-xl`}
        placeholder="Nhập lại mật khẩu"
        secureTextEntry={true}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />

      <TouchableOpacity style={tw`h-10 bg-blue-900 py-2 px-3 rounded-xl items-center mb-4 w-72`} onPress={handleSignup}>
        <Text style={tw`text-white font-bold pt-0.5`}>ĐĂNG KÝ</Text>
      </TouchableOpacity>

      <Text style={tw`text-center mb-4 text-blue-900`}> --- Quản trị viên đã có tài khoản --- </Text>

      
      <TouchableOpacity style={tw`h-10 bg-blue-100 py-2 px-5 rounded-xl items-center justify-center mb-8 w-72`} onPress={handleLoginPress}>
        <Link href={''}><Text style={tw`text-blue-900 font-bold pt-0.5`}>ĐĂNG NHẬP</Text></Link>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;