import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Link, router } from 'expo-router';
import tw from 'twrnc';

const StudentInfo = () => {
    return (
      <View style={tw`flex-1 bg-white p-4`}>
            <View style={tw`flex justify-center pt-2 px-4`}>
                <View style={tw`flex items-center justify-center mb-4`}>
                    <Image
                        source={require('@/assets/images/hi.png')} 
                        style={tw`w-40 h-40 mb-4 rounded-full`}
                    />
                </View>
            </View>
            <View>
            <Text style={tw`text-lg font-semibold my-2 text-xl font-semibold text-blue-900`}> 
            <Image
              source={require('@/assets/images/icon/pen.png')}
              style={tw`w-5 h-5 `}
            />
            {'\r'}Thông tin cá nhân:</Text>
            </View>
            <View style={tw`bg-blue-900/5 p-4 rounded-lg mb-4 border-dotted border-2 border-indigo-900`}>
                <Text>
                    - Họ và tên: <Text style={tw`font-semibold`}>điền vào đây</Text>
                </Text>
                <Text>
                    - MSSV: <Text style={tw`font-semibold`}>điền vào đây</Text> 
                </Text>
                <Text>
                    - CCCD: <Text style={tw`font-semibold`}>điền vào đây</Text>
                </Text>
                <Text>
                    - Ngày sinh: <Text style={tw`font-semibold`}>điền vào đây</Text>
                    </Text>
                <Text>
                    - Giới tính: <Text style={tw`font-semibold`}>điền vào đây</Text>  
                </Text>
                <Text>
                    - Dân tộc: <Text style={tw`font-semibold`}>điền vào đây</Text> 
                </Text>
                <Text>
                    - Địa chỉ: <Text style={tw`font-semibold`}>điền vào đây</Text>
                </Text>
                <Text>
                    - Quê quán: <Text style={tw`font-semibold`}>điền vào đây</Text> 
                </Text>
                <Text> 
                    - Email: <Text style={tw`font-semibold`}>điền vào đây</Text> 
                </Text>
                <Text>
                    - Số điện thoại: <Text style={tw`font-semibold`}>điền vào đây</Text>
                </Text>
            </View>
            <View>
            <Text style={tw`text-lg font-semibold my-2 text-xl font-semibold text-blue-900`}>
            <Image
              source={require('@/assets/images/icon/gradua.png')}
              style={tw`w-5 h-5 `}
            />
            {'\r'}Thông tin học vấn:</Text>
            </View>
            <View style={tw`bg-blue-900/5 p-4 rounded-lg mb-4 border-dotted border-2 border-indigo-900`}>
                <Text>
                    - Lớp học: <Text style={tw`font-semibold`}>điền vào đây</Text> 
                </Text>
                <Text>
                    - Ngành học: <Text style={tw`font-semibold`}>điền vào đây</Text>
                </Text>
                <Text>
                    - Cơ sở: <Text style={tw`font-semibold`}> Học viện Hàng Không Việt Nam </Text> {/*mặc định */}
                </Text>
            </View>
      </View>
    );
  };
  
  export default StudentInfo;