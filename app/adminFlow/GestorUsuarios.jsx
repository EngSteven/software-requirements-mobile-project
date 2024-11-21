import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Stack } from "expo-router";
import axios from 'axios';
import NavBarDisplay from '../../components/navbarDisplay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

function UserCard({ user }) {
    const router = useRouter();
    const handlePress = () => {
        router.push(`/adminFlow/PerfilUsuario/${user.UserID}`);
    };

    return (
        <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: 'https://surgassociates.com/wp-content/uploads/610-6104451_image-placeholder-png-user-profile-placeholder-image-png-1-286x300.jpg' }}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.userName}>{user.FirstName} {user.LastName}</Text>
                <Text style={styles.userWorkArea}>{user.WorkArea}</Text>
            </View>
            <View style={styles.statusContainer}>
                {user.IsActive ? (
                    <View style={styles.activeUser}>
                        <Text style={styles.stadeText}>Activo</Text>
                    </View>
                ) : (
                    <View style={styles.inactiveUser}>
                        <Text style={styles.stadeText}>Inactivo</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}

export default function GestorUsuarios() {
    const [usuarios, setUsuarios] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const obtenerUsuarios = async () => {
                const storedUrl = await AsyncStorage.getItem('API_URL');
                try {
                    const response = await axios.get(`${storedUrl}/users`);
                    if (response.status === 200) {
                        setUsuarios(response.data);
                    } else {
                        Alert.alert('Error', 'No se han podido recibir los usuarios');
                    }
                } catch (error) {
                    Alert.alert('Error', 'Algo ha salido mal');
                    console.error(error);
                }
            };

            obtenerUsuarios();
        }, [])
    )

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.contentContainer}>
                <NavBarDisplay />
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>Usuarios Registrados</Text>
                    {usuarios.length > 0 ? usuarios.map((user) => (
                        <UserCard key={user.id} user={user} />
                    )) : <Text style={styles.text}>Cargando usuarios...</Text>}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollView: {
        marginTop: 80,
    },
    title: {
        fontSize: 24,
        fontFamily: 'SpaceGrotesk',
        marginBottom: 10,
        color: '#04233B',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        fontFamily: 'SpaceGrotesk',
        color: 'black',
    },
    cardContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    imageContainer: {
        flex: 2,
        backgroundColor: '#F8BBD0', // Placeholder color
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',   
    },
    infoContainer: {
        flex: 6,
        justifyContent: 'center',
    },
    statusContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    userName: {
        fontSize: 18,
        fontFamily: 'SpaceGrotesk',
        color: '#04233B',
    },
    userWorkArea: {
        fontSize: 14,
        color: '#666',
        fontFamily: 'SpaceGrotesk',
    },
    activeUser: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: 'limegreen',
        justifyContent: 'center',
    },
    inactiveUser: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#FF0000',
        justifyContent: 'center',
    },
    stadeText: {
        fontSize: 14,
        color: '#ffffff',
        fontFamily: 'SpaceGrotesk',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
