import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable,TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import Modal from './modal'; // Import modal component
import { RootStackParamList } from './types'; // Adjust the import path as needed
import { StackNavigationProp } from '@react-navigation/stack';

interface StudentInfoProps {
    studentId: string;
}

const StudentInfo: React.FC<StudentInfoProps> = () => {
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
        major: '',
        school: 'Học viện Hàng Không Việt Nam' // default value
    });

    const route = useRoute();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'profile'>>();

    useEffect(() => {
        const { studentId } = route.params as { studentId: string };
        axios.get(`http://localhost:3000/getstudent/${studentId}`)
            .then(response => {
                console.log(response.data); // Thêm dòng này để kiểm tra dữ liệu trả về
                // Map the API response keys to state keys
                const mappedData = {
                    name: response.data.Ten,
                    studentId: response.data.MSSV,
                    cccd: response.data.CCCD,
                    dob: response.data.NgaySinh,
                    gender: response.data.GioiTinh,
                    ethnicity: response.data.DanToc,
                    address: response.data.Address,
                    hometown: response.data.QueQuan,
                    email: response.data.Email,
                    phone: response.data.SoDienThoai,
                    major: response.data.MaNganh,
                    school: 'Học viện Hàng Không Việt Nam' // default value
                };
                setStudentInfo(mappedData);
            })
            .catch(error => {
                console.error(error);
            });
    }, [route.params]);

    useEffect(() => {
        console.log(studentInfo);
    }, [studentInfo]);

    const handleInputChange = (field: keyof typeof studentInfo, value: string) => {
        setStudentInfo(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        axios.put(`http://localhost:3000/updatestudent/${studentInfo.studentId}`, studentInfo)
            .then(response => {
                setModalOpen(false);
                alert('Student information updated successfully!');
            })
            .catch(error => {
                console.error(error);
                alert('Failed to update student information.');
            });
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:3000/deletestudent/${studentInfo.studentId}`)
            .then(response => {
                alert('Student deleted successfully!');
                navigation.navigate('list');
            })
            .catch(error => {
                console.error(error);
                alert('Failed to delete student.');
            });
    };

    return (
        <View style={tw`flex-1 bg-white p-4`}>
            <View style={tw`flex justify-center pt-2 px-4`}>
                <View style={tw`flex items-center justify-center mb-4`}>
                    <Image
                        source={require('@/assets/images/ava.png')}
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
                    - Ngành học: <Text style={tw`font-semibold`}>{studentInfo.major}</Text>
                </Text>
                <Text>
                    - Cơ sở: <Text style={tw`font-semibold`}>{studentInfo.school}</Text>
                </Text>
            </View>
            <View style={tw`items-center p-5`}>
            <TouchableOpacity style={tw`bg-blue-700 p-3 items-center rounded-xl mb-3 w-60`} onPress={() => setModalOpen(true)}>
                <Text style={tw`text-white font-bold`}>CHỈNH SỬA</Text>
            </TouchableOpacity>
            <Pressable style={tw`bg-red-700 p-3 items-center rounded-xl mb-3 w-60 m-4`} onPress={handleDelete}>
                <Text style={tw`text-white font-bold`}>XÓA</Text>
            </Pressable>
            </View>

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
