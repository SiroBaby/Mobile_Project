import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import tw from 'twrnc';

const AddStudentScreen = () => {
  const [name, setName] = useState('');
  const [mssv, setMssv] = useState('');
  const [cccd, setCccd] = useState('');
  const [ngaysinh, setNgaysinh] = useState('');
  const [gioitinh, setGioitinh] = useState('');
  const [dantoc, setDantoc] = useState('');
  const [diachi, setDiachi] = useState('');
  const [quequan, setQuequan] = useState('');
  const [email, setEmail] = useState('');
  const [sdt, setSdt] = useState('');
  const [nganhhoc, setNganhhoc] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const handleSave = async () => {
    console.log('Save student data:', {
      name,
      mssv,
      cccd,
      ngaysinh,
      gioitinh,
      dantoc,
      diachi,
      quequan,
      email,
      sdt,
      nganhhoc,
    });

    fetch('http://localhost:3000/addnew', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mssv,
        name,
        ngaysinh,
        gioitinh,
        cccd,
        dantoc,
        quequan,
        email,
        sdt,
        diachi,
        nganhhoc,
      }),
    })
      .then(response => {
        if (!response.ok) {
          Alert.alert('Thêm sinh viên thất bại!');
          throw new Error('Thêm mới sinh viên thất bại');
        }
        Alert.alert('Thêm mới sinh viên thành công!');
      })
      .catch(error => {
        Alert.alert('Lỗi khi thêm sinh viên!');
        console.error('Error:', error);
      });
  };

  return (
    <ScrollView contentContainerStyle={tw`flex items-center p-4`} keyboardShouldPersistTaps="handled">
      <View style={tw`flex items-center justify-center mb-4`}>
        {image ? (
          <Image source={{ uri: image }} style={tw`w-40 h-40 mb-2 rounded-full`} />
        ) : (
          <Image source={require('@/assets/images/ava.png')} style={tw`w-40 h-40 mb-2 rounded-full`} />
        )}
      </View>
      <Text style={tw`text-lg font-bold mb-2`}>NHẬP THÔNG TIN</Text>
      <TextInput
        style={tw`h-10 border border-gray-300 px-3 mb-2 rounded-xl w-full w-78`}
        placeholder="Họ và tên"
        placeholderTextColor="#a1a1aa"
        onChangeText={setName}
        value={name}
      />
      <View style={tw`flex flex-row justify-between w-full w-78 mb-2`}>
        <TextInput
          style={tw`h-10 border border-gray-300 px-3 rounded-xl w-38`}
          placeholder="MSSV"
          placeholderTextColor="#a1a1aa"
          onChangeText={setMssv}
          value={mssv}
        />
        <TextInput
          style={tw`h-10 border border-gray-300 px-3 rounded-xl w-38`}
          placeholder="CCCD"
          placeholderTextColor="#a1a1aa"
          onChangeText={setCccd}
          value={cccd}
        />
      </View>
      <TextInput
        style={tw`h-10 border border-gray-300 px-3 mb-2 rounded-xl w-full w-78`}
        placeholder="Ngày sinh"
        placeholderTextColor="#a1a1aa"
        onChangeText={setNgaysinh}
        value={ngaysinh}
      />
      <View style={tw`flex flex-row justify-between w-full w-78 mb-2`}>
        <View style={tw`h-10 border border-gray-300 px-3 pb-2 rounded-xl w-38`}>
          <Picker
            style={tw`text-xs text-slate-400 px-3`}
            selectedValue={gioitinh}
            onValueChange={(itemValue) => setGioitinh(itemValue)}
          >
            <Picker.Item label="Giới tính" value="" />
            <Picker.Item label="Nam" value="Nam" />
            <Picker.Item label="Nữ" value="Nữ" />
          </Picker>
        </View>
        <TextInput
          style={tw`h-10 border border-gray-300 px-3 rounded-xl w-38`}
          placeholder="Dân tộc"
          placeholderTextColor="#a1a1aa"
          onChangeText={setDantoc}
          value={dantoc}
        />
      </View>
      <TextInput
        style={tw`h-10 border border-gray-300 px-3 mb-2 rounded-xl w-full w-78`}
        placeholder="Địa chỉ"
        placeholderTextColor="#a1a1aa"
        onChangeText={setDiachi}
        value={diachi}
      />
      <TextInput
        style={tw`h-10 border border-gray-300 px-3 mb-2 rounded-xl w-full w-78`}
        placeholder="Quê quán"
        placeholderTextColor="#a1a1aa"
        onChangeText={setQuequan}
        value={quequan}
      />
      <View style={tw`flex flex-row justify-between w-full w-78 mb-2`}>
        <TextInput
          style={tw`h-10 border border-gray-300 px-3 rounded-xl w-38`}
          placeholder="Email"
          placeholderTextColor="#a1a1aa"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={tw`h-10 border border-gray-300 px-3 rounded-xl w-38`}
          placeholder="Số điện thoại"
          placeholderTextColor="#a1a1aa"
          onChangeText={setSdt}
          value={sdt}
        />
      </View>
      <TextInput
        style={tw`h-10 border border-gray-300 px-3 mb-2 rounded-xl w-full w-78`}
        placeholder="Ngành học"
        placeholderTextColor="#a1a1aa"
        onChangeText={setNganhhoc}
        value={nganhhoc}
      />
      <TouchableOpacity
        style={tw`h-10 bg-blue-900 py-2 px-3 mt-5 rounded-xl items-center mb-4 w-28`}
        onPress={handleSave}
      >
        <Text style={tw`text-white font-bold pt-0.5`}>LƯU</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddStudentScreen;