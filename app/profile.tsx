import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import tw from 'twrnc';

const StudentInfo = () => {
    const Update = () => {
        // chuyển hướng đến trang cập nhật thông tin sv
    };
    return (
        <ScrollView contentContainerStyle={tw`flex-1 items-center bg-white p-3`} style={tw`bg-white`}>
            <View style={tw`mb-3 items-center`}>
                <View style={tw`flex justify-center pt-2 px-4 mt-2`}>
                    <View style={tw`flex items-center justify-center mb-5`}>
                            <Image
                                source={require('@/assets/images/hi.png')} 
                                style={tw`w-40 h-40 mb-2 rounded-full`}
                            />
                    </View>
                </View>
                <View>
                    <Text style={tw`text-lg font-semibold text-xl font-semibold text-blue-900 mb-2`}> 
                        <Image
                        source={require('@/assets/images/icon/pen.png')}
                        style={tw`w-5 h-5 `}
                        />
                        {'\r'}Thông tin sinh viên:</Text>
                    </View>
                    <View style={tw`bg-blue-900/5 p-3 rounded-xl mb-4 border-dotted border-2 border-gray-400`}>
                        <Text style={tw` p-3 rounded-xl mb-2 border-solid border border-gray-400`}>
                            Họ và tên 
                        </Text>
                        <View style={tw`flex flex-row justify-between w-full w-78 mb-2`}>
                            <Text style={tw` p-3 rounded-xl border-solid border border-gray-400 w-38`}>
                                MSSV 
                            </Text>
                            <Text style={tw` p-3 rounded-xl border-solid border border-gray-400 w-38`}>
                                CCCD
                            </Text>
                        </View>
                        
                        <Text style={tw` p-3 rounded-xl mb-2 border-solid border border-gray-400`}>
                            Ngày sinh
                        </Text>
                        <View style={tw`flex flex-row justify-between w-full w-78 mb-2`}>
                            <Text style={tw` p-3 rounded-xl border-solid border border-gray-400 w-38`}>
                                Giới tính  
                            </Text>
                            <Text style={tw` p-3 rounded-xl border-solid border border-gray-400 w-38`}>
                                Dân tộc
                            </Text>
                        </View>
                        <Text style={tw` p-3 rounded-xl mb-2 border-solid border border-gray-400`}>
                            Địa chỉ
                        </Text>
                        <Text style={tw` p-3 rounded-xl mb-2 border-solid border border-gray-400`}>
                            Quê quán 
                        </Text>
                        <View style={tw`flex flex-row justify-between w-full w-78 mb-2`}>
                            <Text style={tw` p-3 rounded-xl border-solid border border-gray-400 w-38`}>
                                Email  
                            </Text>
                            <Text style={tw` p-3 rounded-xl border-solid border border-gray-400 w-38`}>
                                Số điện thoại
                            </Text>
                        </View>
                        <Text style={tw` p-3 rounded-xl mb-2 border-solid border border-gray-400`}>
                            Lớp học
                        </Text>
                        <Text style={tw` p-3 rounded-xl mb-2 border-solid border border-gray-400`}>
                            Ngành học
                        </Text>
                        <Text style={tw` p-3 rounded-xl mb-2 border-solid border border-gray-400`}>
                            Cơ sở
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={tw`h-10 bg-blue-900 py-2 px-3 mb-5 rounded-xl items-center w-30`}
                        onPress={Update}
                        >
                        <Text style={tw`text-white font-bold pt-0.5`}>CẬP NHẬT</Text>
                    </TouchableOpacity> 
            </View>           
      </ScrollView>
    );
  };
  
  export default StudentInfo;