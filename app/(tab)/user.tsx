import React from 'react';
import { Text, View, Pressable, Image } from 'react-native';
import tw from 'twrnc';

const Home = () => {
  const handleLogout = () => {
    // Xử lý đăng xuất ở đây
    console.log('Đăng xuất');
  };

  return (
    <View style={tw`flex-1 bg-white p-3`}>
      <View style={tw`bg-white py-1 flex-row items-center`}>
        <Image
          source={require('@/assets/images/logo/vina-qt-high-resolution-logo-black-transparent.png')}
          style={tw`w-14 h-12 mt-8`}
        />
        <View style={tw`w-0.5 h-12 bg-black ml-3 mt-8`} />
        <Text style={tw`text-xl ml-3 mt-8`}>Menu</Text>
      </View>

      <View style={tw`bg-black w-full h-40 rounded-2xl relative items-center`}>
        <Image
          source={require('@/assets/images/pexels-netviet-media-1139605192-22848375.jpg')}
          style={tw`w-full h-40 rounded-2xl opacity-80`}
        />
        <View style={[tw`absolute bottom-[-50px] flex-row items-center`, { left: '45%', transform: [{ translateX: -50 }] }]}>
          <Image
            source={require('@/assets/images/logo/logo-white.png')} // Thay đổi với đường dẫn hình ảnh avatar của bạn
            style={tw`w-35 h-35 rounded-full border-4 border-white`}
          />
        </View>
      </View>

      <View style={tw`items-center mt-14`}>
        <Text style={tw`text-blue-900 text-3xl font-bold`}>NHÓM 2</Text>
      </View>

      <Pressable
        onPress={handleLogout}
        android_ripple={{ color: 'rgba(255, 255, 255, 0.3)', borderless: true }}
        style={tw`bg-red-800 p-3 rounded mt-10 items-center`}
      >
        <Text style={tw`text-white text-base font-bold`}>Đăng xuất</Text>
      </Pressable>
    </View>
  );
};

export default Home;
