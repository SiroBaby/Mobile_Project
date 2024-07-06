import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Button, TextInput } from 'react-native';
import tw from 'twrnc';
import Modal from './modal';
import * as types from './types';

function StudentInfo() {
    const [modalOpen, setModalOpen] = useState(false);
    const [studentInfo, setStudentInfo] = useState({
        name: '',
        studentId: '',
        cccd: '',
        dob: '',
        gender: '',
        ethnicity: '',
        address: '',
        hometown: '',
        email: '',
        phone: '',
        class: '',
        major: '',
        school: 'Học viện Hàng Không Việt Nam' // default value
    });


    const handleInputChange = (field: keyof types.StudentInfoType, value: string) => {
        setStudentInfo(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleSubmit = () => {


    };

    return (
        <View style={tw`flex-1 bg-white p-4`}>
            <View style={tw`flex justify-center pt-2 px-4`}>
                <View style={tw`flex items-center justify-center mb-4`}>
                    <Image
                        source={require('@/assets/images/hi.png')}
                        style={tw`w-40 h-40 mb-4 rounded-full`} />
                </View>
            </View>
            <View>
                <Text style={tw`text-lg font-semibold my-2 text-xl font-semibold text-blue-900`}>
                    <Image
                        source={require('@/assets/images/icon/pen.png')}
                        style={tw`w-5 h-5 `} />
                    {'\r'}Thông tin cá nhân:</Text>
            </View>

            <View style={tw`bg-blue-900/5 p-4 rounded-lg mb-4 border-dotted border-2 border-indigo-900`}>
                <Text>
                    - Họ và tên: <Text style={tw`font-semibold`}>{studentInfo.name}</Text>
                </Text>
                <Text>
                    - MSSV: <Text style={tw`font-semibold`}>{studentInfo.studentId}</Text>
                </Text>
                <Text>
                    - CCCD: <Text style={tw`font-semibold`}>{studentInfo.cccd}</Text>
                </Text>
                <Text>
                    - Ngày sinh: <Text style={tw`font-semibold`}>{studentInfo.dob}</Text>
                </Text>
                <Text>
                    - Giới tính: <Text style={tw`font-semibold`}>{studentInfo.gender}</Text>
                </Text>
                <Text>
                    - Dân tộc: <Text style={tw`font-semibold`}>{studentInfo.ethnicity}</Text>
                </Text>
                <Text>
                    - Địa chỉ: <Text style={tw`font-semibold`}>{studentInfo.address}</Text>
                </Text>
                <Text>
                    - Quê quán: <Text style={tw`font-semibold`}>{studentInfo.hometown}</Text>
                </Text>
                <Text>
                    - Email: <Text style={tw`font-semibold`}>{studentInfo.email}</Text>
                </Text>
                <Text>
                    - Số điện thoại: <Text style={tw`font-semibold`}>{studentInfo.phone}</Text>
                </Text>
            </View>
            <View>
                <Text style={tw`text-lg font-semibold my-2 text-xl font-semibold text-blue-900`}>
                    <Image
                        source={require('@/assets/images/icon/gradua.png')}
                        style={tw`w-5 h-5 `} />
                    {'\r'}Thông tin học vấn:</Text>
            </View>
            <View style={tw`bg-blue-900/5 p-4 rounded-lg mb-4 border-dotted border-2 border-indigo-900`}>
                <Text>
                    - Lớp học: <Text style={tw`font-semibold`}>{studentInfo.class}</Text>
                </Text>
                <Text>
                    - Ngành học: <Text style={tw`font-semibold`}>{studentInfo.major}</Text>
                </Text>
                <Text>
                    - Cơ sở: <Text style={tw`font-semibold`}>{studentInfo.school}</Text>
                </Text>
            </View>
            <Button title='Chỉnh sửa' onPress={() => setModalOpen(true)} />
            <Pressable>
                <Text style={tw`text-lg font-bold bg-red-700 p-1 rounded text-white w-full mt-4 text-center`}>XÓA</Text>
            </Pressable>
            <Modal isOpen={modalOpen}>
                <View style={tw`w-90 p-4 rounded-xl justify-center `}>
                    <View style={tw`flex justify-center pt-2 px-4`}>
                        <View style={tw`flex items-center justify-center`}>
                            <Image
                                source={require('@/assets/images/hi.png')}
                                style={tw`w-40 h-40 mb-4 rounded-full`} />
                        </View>
                    </View>

                    <View style={tw`bg-blue-900/5 p-4 rounded-lg mb-4 border-dotted border-2 border-indigo-900`}>
                        <TextInput
                            style={tw`h-8 border border-gray-300 px-3 mb-2 rounded-xl`}
                            placeholder="Họ Và Tên"
                            value={studentInfo.name}
                            onChangeText={(value) => handleInputChange('name', value)} />
                        <View style={tw`flex-row justify-between`}>
                            <TextInput
                                style={tw`w-34 h-8 border border-gray-300 px-3 mb-2 rounded-xl`}
                                placeholder="Mã số Sinh Viên"
                                value={studentInfo.studentId}
                                onChangeText={(value) => handleInputChange('studentId', value)} />
                            <TextInput
                                style={tw`w-34 h-8 border border-gray-300 px-3 mb-2 rounded-xl`}
                                placeholder="CCCD"
                                value={studentInfo.cccd}
                                onChangeText={(value) => handleInputChange('cccd', value)} />
                        </View>
                        <TextInput
                            style={tw`h-8 border border-gray-300 px-3 mb-2 rounded-xl`}
                            placeholder="Ngày sinh"
                            value={studentInfo.dob}
                            onChangeText={(value) => handleInputChange('dob', value)} />
                        <View style={tw`flex-row justify-between`}>
                            <TextInput
                                style={tw`w-34 h-8 border border-gray-300 px-3 mb-2 rounded-xl`}
                                placeholder="Giới tính"
                                value={studentInfo.gender}
                                onChangeText={(value) => handleInputChange('gender', value)} />
                            <TextInput
                                style={tw`w-34 h-8 border border-gray-300 px-3 mb-2 rounded-xl`}
                                placeholder="Dân tộc"
                                value={studentInfo.ethnicity}
                                onChangeText={(value) => handleInputChange('ethnicity', value)} />
                        </View>
                        <TextInput
                            style={tw`h-8 border border-gray-300 px-3 mb-2 rounded-xl`}
                            placeholder="Địa chỉ"
                            value={studentInfo.address}
                            onChangeText={(value) => handleInputChange('address', value)} />
                        <TextInput
                            style={tw`h-8 border border-gray-300 px-3 mb-2 rounded-xl`}
                            placeholder="Quê quán"
                            value={studentInfo.hometown}
                            onChangeText={(value) => handleInputChange('hometown', value)} />
                        <View style={tw`flex-row justify-between`}>
                            <TextInput
                                style={tw`w-34 h-8 border border-gray-300 px-3 mb-2 rounded-xl`}
                                placeholder="Email"
                                value={studentInfo.email}
                                onChangeText={(value) => handleInputChange('email', value)} />
                            <TextInput
                                style={tw`w-34 h-8 border border-gray-300 px-3 mb-2 rounded-xl`}
                                placeholder="Số điện thoại"
                                value={studentInfo.phone}
                                onChangeText={(value) => handleInputChange('phone', value)} />
                        </View>

                        <TextInput
                            style={tw`h-8 border border-gray-300 px-3 mb-2 rounded-xl`}
                            placeholder="Lớp học"
                            value={studentInfo.class}
                            onChangeText={(value) => handleInputChange('class', value)} />
                        <TextInput
                            style={tw`h-8 border border-gray-300 px-3 mb-2 rounded-xl`}
                            placeholder="Ngành học"
                            value={studentInfo.major}
                            onChangeText={(value) => handleInputChange('major', value)} />
                        <TextInput
                            style={tw`h-8 border border-gray-300 px-3 mb-2 rounded-xl`}
                            placeholder="Trường học"
                            value={studentInfo.school}
                            onChangeText={(value) => handleInputChange('school', value)} />
                    </View>
                    <View style={tw`flex-row justify-around`}>
                        <Pressable onPress={handleSubmit}>
                            <Text style={tw`text-xl font-bold bg-blue-700 p-2 rounded-xl text-white w-30 text-center`}>Lưu</Text>
                        </Pressable>
                        <Pressable onPress={() => setModalOpen(false)}>
                            <Text style={tw`text-xl font-bold bg-red-700 p-2 rounded-xl text-white w-30 text-center`}>Đóng</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default StudentInfo;
