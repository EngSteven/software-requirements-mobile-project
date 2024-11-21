import React, {useState, useEffect} from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import { createNativeWrapper } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MainPage = () => {
    const router = useRouter()

    const handlePress = async (action) => {
        await AsyncStorage.setItem('API_URL', "http://192.168.100.114:3001");
        if(action === 'registro'){
            router.push('/registro/Registro');
        } else if(action === 'inicio'){
            router.push('/login/LogIn');
        }
    };

    return(
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: false, 
                }}
            >
            </Stack.Screen>
            <ImageBackground 
                source={require('../../assets/background.png')}
                style={styles.background}
            >
                <Image 
                    source={require('../../assets/logo.png')}
                    style={{width: 112, height: 107, alignSelf: 'center', margin: 100, marginBottom: 60}}
                />
                <View 
                    style={{marginBottom: 150, marginLeft: 15}}
                >
                    <Text style={styles.FundMePls}>FundMePls</Text>
                    <Text style={styles.slogan}>Donde tus ideas se hacen realidad</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                        style={styles.homeButton}
                        onPress={() => handlePress('registro')}
                    >
                        <Text style={styles.buttonText}>Regístrate ahora</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handlePress('inicio')}
                    >
                        <Text style={styles.text}>¿Ya tienes cuenta? Inicia sesión</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    FundMePls: {
        color: 'white',
        fontSize: 48,
        fontFamily: 'SpaceGrotesk',
        marginBottom: 20,
    },
    slogan: {
        color: 'white',
        fontSize: 28,
        fontFamily: 'SpaceGrotesk'
    },
    homeButton: {
        width: 390,
        height: 45,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 2,  
        borderRightWidth: 2,  
        borderBottomWidth: 2, 
        borderLeftWidth: 2,  
        borderColor: '#EF5356', 
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20, 
        borderBottomLeftRadius: 20,  
        borderBottomRightRadius: 20,
        marginBottom: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'SpaceGrotesk',
        textAlign: 'center',
        textTransform: 'none'
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'SpaceGrotesk'
    },
})

export default MainPage;