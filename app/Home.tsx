import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const Home = () => {
  return (
    <View style={tw`flex-1`}>
      <View style={tw`bg-blue-900 px-3 py-1 flex-row items-center`}>
        <Image
          source={require('@/assets/images/logo/vina-qt-high-resolution-logo-white-transparent.png')}
          style={tw`w-14 h-12 mt-8`}
        />
        <View style={tw`w-0.5 h-12 bg-white ml-3 mt-8`}></View>
        <Text style={tw`text-xl text-white ml-3 mt-8`}>Xin Chào Nhóm 2 !</Text>
      </View>
      <Text style={tw`text-xl font-bold px-3 py-2`}>Chức năng</Text>
      <View style={tw`flex flex-row`}>
        <TouchableOpacity style={tw`px-3 items-center`}>
          <View style={tw`bg-blue-900/5 w-43 h-24 rounded-3xl items-center justify-center`}>
            <Image
              source={require('@/assets/images/icon/8726254_plus_circle_icon.png')}
              style={tw`w-14 h-14 `}
            />
          </View>
          <Text style={tw`text-lg mt-2 font-semibold`}>Thêm sinh Viên</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`px-3 items-center`}>
          <View style={tw`bg-blue-900/5 w-43 h-24 rounded-3xl items-center justify-center`}>
            <Image
              source={require('@/assets/images/icon/8726093_list_ul_icon.png')}
              style={tw`w-14 h-14 `}
            />
          </View>
          <Text style={tw`text-lg mt-2 font-semibold`}>Danh Sách</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`flex flex-row mt-6`}>
        <TouchableOpacity style={tw`px-3 items-center`}>
          <View style={tw`bg-blue-900/5 w-43 h-24 rounded-3xl items-center justify-center`}>
            <Image
              source={require('@/assets/images/icon/8726214_search_icon.png')}
              style={tw`w-14 h-14 `}
            />
          </View>
          <Text style={tw`text-lg mt-2 font-semibold`}>Tìm Kiếm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`px-3 items-center`}>
          <View style={tw`bg-blue-900/5 w-43 h-24 rounded-3xl items-center justify-center`}>
            <Image
              source={require('@/assets/images/icon/8726458_user_check_icon.png')}
              style={tw`w-14 h-14 `}
            />
          </View>
          <Text style={tw`text-lg mt-2 font-semibold`}>Điểm Danh</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`flex flex-row mt-6`}>
        <TouchableOpacity style={tw`px-3 items-center`}>
          <View style={tw`bg-blue-900/5 w-43 h-24 rounded-3xl items-center justify-center`}>
            <Image
              source={require('@/assets/images/icon/8725775_edit_icon.png')}
              style={tw`w-14 h-14 `}
            />
          </View>
          <Text style={tw`text-lg mt-2 font-semibold`}>Nhập điểm</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('@/assets/images/logo/vina-qt-favicon-color.png')}
        style={tw`absolute w-32 h-32 right-0 bottom-0 opacity-10`}
      />
    </View>
    
  );
}

export default Home;

const styles = StyleSheet.create({});
