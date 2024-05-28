import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';


const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Xử lý logic đăng nhập
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',    
  },
  logo: {
    width: 314,
    height: 314,
    marginBottom: 20, 
    marginTop: 70, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10, 
    textAlign: 'left',
    color: '#2E328C',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 30,
    borderRadius: 5,
    width: 314, 
    
  },
  loginButton: {
    backgroundColor: '#2E328C',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 30,
    width: 314, 
  },
  registerButton: {
    backgroundColor: '#EEF4FF',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 20,
    width: 314, 
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  infoText: {
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
});

export default LoginScreen;
