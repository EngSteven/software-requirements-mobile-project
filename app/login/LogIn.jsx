import { TextInput, View, Text, StyleSheet, ImageBackground, TouchableOpacity, KeyboardAvoidingView} from "react-native";
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { Picker } from '@react-native-picker/picker'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { Alert } from "react-native";

export default function LogIn(){
    const router = useRouter();
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // if(correo === 'admin'){
        //     await AsyncStorage.setItem('userID', '1');
        //     router.push('/adminFlow');
        // }else{
        //     await AsyncStorage.setItem('userID', '1');
        //     router.push('/userFlow');
        // }
        try {
            // para probar desde el expo go se usa el ipv4 local en las routes
            // const response = await axios.post('http://192.168.100.29:3001/users/login', {
            // desde la web se usa localhost en las routes
            const storedUrl = await AsyncStorage.getItem('API_URL');
            const response = await axios.post(`${storedUrl}/users/login`, {
                email: correo,
                password: password
            });
    
            if (response.status === 200) {
                console.log("Login existoso")
                const { userID, rol } = response.data;
    
                // Guardar el ID del usuario en AsyncStorage para saber cual es usuario activo
                // Para accederlo se hace un const userID = AsyncStorage.getItem('userID');
                await AsyncStorage.setItem('userID', userID.toString());
                if (rol === 'User' ) {
                    router.push('/userFlow');
                } else {
                    router.push('/adminFlow');
                }
            } else {
                Alert.alert('Error', 'Credenciales incorrectas');
            }
        } catch (error) {
            Alert.alert('Error', 'El usuario ingresado no existe');
            console.error(error);
        }
    };
    

    return (
        <View style={{flex: 1}}>
            <Stack.Screen options={{ headerShown: false }} />
            <ImageBackground source={require('../../assets/background.png')} style={styles.background}>
                <KeyboardAvoidingView style={styles.containerWrapper} behavior="height" keyboardVerticalOffset={10}>    
                    <View style={styles.container}>
                        <Text style={styles.titleText}>Iniciar Sesión</Text>
                        <View>
                            <TextInput
                                style={styles.Items}
                                placeholder="Correo"
                                value={correo}
                                onChangeText={setCorreo}
                            />
                            <TextInput
                                style={styles.Items}
                                placeholder="Contraseña"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={true}
                            />
                        </View>
                        <TouchableOpacity style={styles.Button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Iniciar Sesión</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push('/registro/Registro')}>
                            <Text style={styles.text}>¿No tienes cuenta? Regístrate</Text>
                        </TouchableOpacity>
                    </View >
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    containerWrapper: {
        flex: 1,
    },
    container: {
        width: 'auto',
        height: 500,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 120,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    containerText: {
        fontFamily: 'SpaceGrotesk',
        fontSize: 15,
        fontWeight: '400',
        textAlign: 'center',
        color: 'white'
    },
    Items:{
        width: 320,
        height: 45,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderTopWidth: 1,  
        borderRightWidth: 1,  
        borderBottomWidth: 1, 
        borderLeftWidth: 1,  
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20, 
        borderBottomLeftRadius: 20,  
        borderBottomRightRadius: 20,
        marginBottom: 10,
        paddingLeft: 15,
        justifyContent: 'center'
    },
    Picker:{
        width: 320,
        height: 45,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderTopWidth: 1,  
        borderRightWidth: 1,  
        borderBottomWidth: 1, 
        borderLeftWidth: 1,  
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20, 
        borderBottomLeftRadius: 20,  
        borderBottomRightRadius: 20,
        marginBottom: 10,
        justifyContent: 'center'
    },
    Item:{
        height: "100%",
        width:  "100%"
    },
    Button: {
        width: 320,
        height: 45,
        backgroundColor: '#04233B',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 2,  
        borderRightWidth: 2,  
        borderBottomWidth: 2, 
        borderLeftWidth: 2,  
        borderColor: '#04233B', 
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20, 
        borderBottomLeftRadius: 20,  
        borderBottomRightRadius: 20,
        marginBottom: 20,
        marginTop: 50
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'SpaceGrotesk',
        textAlign: 'center',
        textTransform: 'none'
    },
    text: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'SpaceGrotesk'
    },
    titleText:{
        color: 'black',
        fontSize: 30,
        fontFamily: 'SpaceGrotesk',
        marginBottom: 40
    }
})


