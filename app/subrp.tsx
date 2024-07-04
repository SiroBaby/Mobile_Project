import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import tw from 'twrnc';
import { Text, Button } from 'react-native-paper'; // Sử dụng Button từ react-native-paper hoặc TouchableOpacity

const MyComponent = () => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    // Xử lý khi nút nộp được nhấn
    console.log('Submitted:', inputValue);
    // Thực hiện các thao tác cần thiết sau khi nộp dữ liệu, ví dụ như gửi dữ liệu lên server
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={tw`flex-1 bg-white`}>
        <View style={tw`justify-around items-center pt-5`}>
          <Text style={tw`text-2xl text-blue-900 font-bold py-5`}>Báo cáo</Text>

          {/* Form nhập nội dung */}
          <TextInput
            style={tw`border border-gray-300 rounded-lg px-4 py-2 w-80`}
            placeholder="Nhập nội dung báo cáo"
            value={inputValue}
            onChangeText={text => setInputValue(text)}
            multiline
          />

          {/* Nút nộp */}
          <TouchableOpacity onPress={handleSubmit} style={tw`bg-blue-900 mt-3 px-4 py-2 rounded-lg mt-5`}>
            <Text style={tw`text-white text-XL font-bold`}>NỘP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default MyComponent;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
  },
});
