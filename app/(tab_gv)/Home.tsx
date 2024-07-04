// src/screens/Home.tsx
import React from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { Text } from 'react-native-paper';

const Home = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const Attendance = () => {
    navigation.navigate('attendance');
  };

  const Inputscore = () => {
    navigation.navigate('inputscore');
  };

  const Subrp = () => {
    navigation.navigate('subrp');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`bg-white flex-row items-center`}>
        <Image
          source={require('@/assets/images/logo/vina-qt-high-resolution-logo-black-transparent.png')}
          style={tw`w-14 h-12 mt-3`}
        />
        <View style={tw`w-0.5 h-12 bg-black ml-3 mt-2`} />
        <Text style={tw`text-xl text-blue-900 ml-3 mt-3`}>Xin Chào giảng viên!</Text>
      </View>
      <View style={tw`justify-around items-center pt-5`}>
        <Text style={tw`text-2xl font-bold py-2`}>Tên giảng viên</Text> {/*chỗ này để tên giảng viên nè */}
        <Text style={tw`text-xl text-blue-900 font-semibold py-2`}>Tên Môn học</Text> {/*chỗ này đểtên môn học hay lớp học phần nè */}
      </View>
      <View style={tw`flex flex-row justify-around mt-3`}>
        <TouchableOpacity style={tw`items-center`} onPress={Attendance}>
          <View style={tw`bg-blue-900/5 w-80 h-50 rounded-3xl items-center justify-center`}>
            <Image
              source={require('@/assets/images/icon/8726458_user_check_icon.png')}
              style={tw`w-25 h-25 `}
            />
          </View>
          <Text style={tw`text-lg text-blue-900 mt-2 font-semibold`}>Điểm Danh</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`flex flex-row justify-around mt-3`}>
        <TouchableOpacity style={tw`items-center`} onPress={Inputscore}>
          <View style={tw`bg-blue-900/5 w-80 h-50 rounded-3xl items-center justify-center`}>
            <Image
              source={require('@/assets/images/icon/8725775_edit_icon.png')}
              style={tw`w-25 h-25 `}
            />
          </View>
          <Text style={tw`text-lg text-blue-900 mt-2 font-semibold`}>Nhập điểm</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`flex flex-row justify-around mt-3`}>
        <TouchableOpacity style={tw`items-center`} onPress={Subrp}>
          <View style={tw`bg-blue-900/5 w-80 h-50 rounded-3xl items-center justify-center`}>
            <Image
              source={require('@/assets/images/icon/8725582_chart_line_icon.png')}
              style={tw`w-25 h-25 `}
            />
          </View>
          <Text style={tw`text-lg text-blue-900 mt-2 font-semibold`}>Nộp báo cáo</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('@/assets/images/logo/vina-qt-favicon-color.png')}
        style={tw`absolute w-36 h-36 right-0 bottom-0 opacity-10`}
      />
    </View>
    </ScrollView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
  },
});
