import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

export default function App() {
  const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
      // Xử lý logic đăng nhập
      console.log("Username:", username, "Password:", password);
    };

    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/login.png')}
          style={styles.logo}
        />
        <Text style={[styles.title, { textAlign: 'left' }]}>ĐĂNG NHẬP</Text>

        <TextInput
          style={styles.input}
          placeholder="Tên tài khoản"
          onChangeText={setUsername}
          value={username}
        />

        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>

        <Text style={styles.infoText}>Quản trị viên chưa có tài khoản</Text>

        <TouchableOpacity style={styles.registerButton} onPress={() => {}}>
          <Text style={[styles.buttonText, { color: '#2E328C' }]}>Đăng kí</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <LoginScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#2E328C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  infoText: {
    color: '#333',
    marginBottom: 10,
  },
  registerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2E328C',
  },
});
