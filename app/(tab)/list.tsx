import React from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import tw from 'twrnc';

const students = [
  { id: '1', name: 'Nguyen Van A', class: '12A1', studentId: '123456' },
  { id: '2', name: 'Tran Thi B', class: '12A2', studentId: '234567' },
  { id: '3', name: 'Le Van C', class: '12A3', studentId: '345678' },
  // Add more students as needed
];

const StudentItem = ({ name, classname, studentId }) => (
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

const List = () => {
  return (
    <View style={tw`flex-1 pt-2 px-2`}>
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
