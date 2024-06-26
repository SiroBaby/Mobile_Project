import React from 'react';
import { Text, View, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

// Define the Student type
interface Student {
  id: string;
  name: string;
  class: string;
  studentId: string;
}

const students: Student[] = [
  { id: '1', name: 'Nguyen Van A', class: '12A1', studentId: '123456' },
  { id: '2', name: 'Tran Thi B', class: '12A2', studentId: '234567' },
  { id: '3', name: 'Le Van C', class: '12A3', studentId: '345678' },
  // Add more students as needed
];

// Define the props for the StudentItem component
interface StudentItemProps {
  name: string;
  classname: string;
  studentId: string;
}

const StudentItem: React.FC<StudentItemProps> = ({ name, classname, studentId }) => (
  <View style={tw`bg-white p-4 shadow flex-row items-center rounded-md`}>
    <View style={tw`mr-4`}>
      <Image
        source={require('../../assets/images/login.png')}
        style={tw`w-18 h-18 rounded-full`}
      />
    </View>
    <View>
      <Text style={tw`text-xl font-bold`}>{name}</Text>
      <Text style={tw`text-lg text-gray-800`}>Class: {classname}</Text>
      <Text style={tw`text-lg text-gray-800`}>Student ID: {studentId}</Text>
    </View>
  </View>
);

const List: React.FC = () => {
  return (
    <View style={tw`flex-1 pt-2 px-2`}>
      <View style={tw`flex-row h-10 mb-3 rounded-xl`}>
        <TextInput
          style={tw`h-10 border border-gray-300 px-3 mb-7 rounded-l-xl w-78 bg-white shadow`}
          placeholder="Tìm kiếm"
        />
        <TouchableOpacity style={tw`bg-blue-900 p-2 items-center rounded-r-xl h-10 w-16 shadow`}>
          <Image
            source={require('../../assets/images/icon/8726215_search_alt_icon.png')}
            style={tw`w-6 h-6`}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StudentItem name={item.name} classname={item.class} studentId={item.studentId} />
        )}
        ItemSeparatorComponent={() => <View style={tw`h-2`} />}
      />
    </View>
  );
};

export default List;
