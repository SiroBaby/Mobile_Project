import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import { useRouter } from 'expo-router';

const ChangePasswordScreen = () => {
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const router = useRouter();

  const handleChangePassword = () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Mật khẩu mới không khớp');
      return;
    }

    fetch('http://192.168.1.196:3000/changepassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        oldPassword,
        newPassword,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            Alert.alert('Người dùng không tồn tại!');
          } else if (response.status === 400) {
            Alert.alert('Mật khẩu cũ không chính xác!');
          } else {
            Alert.alert('Đổi mật khẩu thất bại!');
          }
          throw new Error('Change password failed');
        }
        Alert.alert('Đổi mật khẩu thành công!');
        router.push(''); // Chuyển hướng sau khi đổi mật khẩu thành công
      })
      .catch((error) => {
        Alert.alert('Lỗi khi đổi mật khẩu!');
        console.error('Error:', error);
      });
  };

  return (
    <View style={tw`flex-1 p-4 bg-white items-center justify-center`}>
      <Text style={tw`text-2xl font-bold mb-3 text-blue-900`}>ĐỔI MẬT KHẨU</Text>

      <TextInput
        style={tw`h-10 border border-gray-300 px-3 mb-4 w-72 rounded-xl`}
        placeholder="Tên tài khoản"
        onChangeText={setUsername}
        value={username}
      />

      <TextInput
        style={tw`h-10 border border-gray-300 px-3 mb-4 w-72 rounded-xl`}
        placeholder="Mật khẩu cũ"
        secureTextEntry={true}
        onChangeText={setOldPassword}
        value={oldPassword}
      />

      <TextInput
        style={tw`h-10 border border-gray-300 px-3 mb-4 w-72 rounded-xl`}
        placeholder="Mật khẩu mới"
        secureTextEntry={true}
        onChangeText={setNewPassword}
        value={newPassword}
      />

      <TextInput
        style={tw`h-10 border border-gray-300 px-3 mb-4 w-72 rounded-xl`}
        placeholder="Nhập lại mật khẩu mới"
        secureTextEntry={true}
        onChangeText={setConfirmNewPassword}
        value={confirmNewPassword}
      />

      <TouchableOpacity
        style={tw`h-10 bg-blue-900 py-2 px-3 rounded-xl items-center mb-4 w-72`}
        onPress={handleChangePassword}
      >
        <Text style={tw`text-white font-bold pt-0.5`}>ĐỔI MẬT KHẨU</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordScreen;
