import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; // Adjust the import path as needed

// Define the Student type
interface Student {
  id: string;
  name: string;
  studentId: string;
}

// Define the props for the StudentItem component
interface StudentItemProps {
  name: string;
  studentId: string;
  onPress: () => void;
}

const StudentItem: React.FC<StudentItemProps> = ({ name, studentId, onPress }) => (
  <TouchableOpacity onPress={onPress} style={tw`bg-white p-4 shadow flex-row items-center rounded-md`}>
    <View style={tw`mr-4`}>
      <Image
        source={require('../../assets/images/ava.png')}
        style={tw`w-18 h-18 rounded-full`}
      />
    </View>
    <View>
      <Text style={tw`text-xl font-bold`}>{name}</Text>
      <Text style={tw`text-lg text-gray-800`}>MSSV: {studentId}</Text>
    </View>
  </TouchableOpacity>
);

const List: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState<string>('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'List'>>();

  useEffect(() => {
    axios.get('http://localhost:3000/getstudents')
      .then(response => {
        const data: Student[] = response.data.map((item: any) => ({
          id: item.MSSV,
          name: item.Ten,
          studentId: item.MSSV
        }));
        setStudents(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.studentId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={tw`flex-1 pt-2 px-2`}>
      <View style={tw`flex-row h-10 mb-3 rounded-xl`}>
        <TextInput
          style={tw`h-10 border border-gray-300 px-3 mb-7 rounded-l-xl w-78 bg-white shadow`}
          placeholder="Tìm kiếm"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={tw`bg-blue-900 p-2 items-center rounded-r-xl h-10 w-16 shadow`}>
          <Image
            source={require('../../assets/images/icon/8726215_search_alt_icon.png')}
            style={tw`w-6 h-6`}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StudentItem
            name={item.name}
            studentId={item.studentId}
            onPress={() => navigation.navigate('profile', { studentId: item.id })}
          />
        )}
        ItemSeparatorComponent={() => <View style={tw`h-2`} />}
      />
    </View>
  );
};

export default List;
