// src/screens/Home.tsx
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

const Home = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const addNew = () => {
    navigation.navigate('addnew');
  };

  const List = () => {
    navigation.navigate('list');
  };

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
    <View style={tw`flex-1 bg-white p-3`}>
      <View style={tw`bg-white py-1 flex-row items-center`}>
        <Image
          source={require('@/assets/images/logo/vina-qt-high-resolution-logo-black-transparent.png')}
          style={tw`w-14 h-12 mt-8`}
        />
        <View style={tw`w-0.5 h-12 bg-black ml-3 mt-8`} />
        <Text style={tw`text-xl ml-3 mt-8`}>Xin Chào NHÓM 2!</Text>
      </View>
      <View style={tw`w-full h-0.2 bg-black/20`} />
      <Text style={tw`text-xl font-bold py-2`}>Chức năng</Text>
      <View style={tw`flex flex-row justify-around`}>
        <TouchableOpacity style={tw`items-center`} onPress={addNew}>
          <View style={tw`bg-blue-900/5 w-43 h-24 rounded-3xl items-center justify-center`}>
            <Image
              source={require('@/assets/images/icon/8726254_plus_circle_icon.png')}
              style={tw`w-14 h-14 `}
            />
          </View>
          <Text style={tw`text-lg mt-2 font-semibold`}>Thêm sinh Viên</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`items-center`} onPress={List}>
          <View style={tw`bg-blue-900/5 w-43 h-24 rounded-3xl items-center justify-center`}>
            <Image
              source={require('@/assets/images/icon/8726093_list_ul_icon.png')}
              style={tw`w-14 h-14 `}
            />
          </View>
          <Text style={tw`text-lg mt-2 font-semibold`}>Danh Sách</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`flex flex-row justify-around mt-6`}>
        <TouchableOpacity style={tw`items-center`} onPress={List}>
          <View style={tw`bg-blue-900/5 w-43 h-24 rounded-3xl items-center justify-center`}>
            <Image
              source={require('@/assets/images/icon/8726214_search_icon.png')}
              style={tw`w-14 h-14 `}
            />
          </View>
          <Text style={tw`text-lg mt-2 font-semibold`}>Tìm Kiếm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`items-center`} onPress={Attendance}>
          <View style={tw`bg-blue-900/5 w-43 h-24 rounded-3xl items-center justify-center`}>
            <Image
              source={require('@/assets/images/icon/8726458_user_check_icon.png')}
              style={tw`w-14 h-14 `}
            />
          </View>
          <Text style={tw`text-lg mt-2 font-semibold`}>Điểm Danh</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`flex flex-row justify-around mt-6`}>
        <TouchableOpacity style={tw`items-center`} onPress={Inputscore}>
          <View style={tw`bg-blue-900/5 w-43 h-24 rounded-3xl items-center justify-center`}>
            <Image
              source={require('@/assets/images/icon/8725775_edit_icon.png')}
              style={tw`w-14 h-14 `}
            />
          </View>
          <Text style={tw`text-lg mt-2 font-semibold`}>Nhập điểm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`items-center`} onPress={Subrp}>
          <View style={tw`bg-blue-900/5 w-43 h-24 rounded-3xl items-center justify-center`}>
            <Image
              source={require('@/assets/images/icon/8725582_chart_line_icon.png')}
              style={tw`w-14 h-14 `}
            />
          </View>
          <Text style={tw`text-lg mt-2 font-semibold`}>Nộp báo cáo</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('@/assets/images/logo/vina-qt-favicon-color.png')}
        style={tw`absolute w-36 h-36 right-0 bottom-0 opacity-10`}
      />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({});
