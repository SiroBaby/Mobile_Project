import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Redirect, router } from 'expo-router';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        fetch('http://192.168.0.53:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'Login successful') {
                    
                    Alert.alert('Success', 'Login successful');
                    router.push('Home')
                    // Xử lý logic khi đăng nhập thành công
                    
                } else {
                    Alert.alert('Error', 'Thông tin không hợp lệ');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
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

            <TouchableOpacity style={styles.registerButton} onPress={() => { }}>
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
        marginBottom: 90,

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
        marginBottom: 20,
        width: 314,
    },
    registerButton: {
        backgroundColor: '#EEF4FF',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 20,

        width: 314,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    infoText: {
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default Login;

