import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Stack } from "expo-router";
import axios from 'axios';
import NavBarDisplay from '../../components/navbarDisplay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
function Estadisticas() {
    const [projectCount, setProjectCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [donationCount, setDonationCount] = useState(0);

    useEffect(() => {
        const obtenerEstadisticas = async () => {
            const storedUrl = await AsyncStorage.getItem('API_URL');
            try {
                const response = await axios.get(`${storedUrl}/proyecto/active/count`);
                if (response.status === 200) {
                    setProjectCount(response.data.activeProjectCount);
                } else {
                    Alert.alert('Error', 'No se han podido recibir las estadísticas');
                }
                const response2 = await axios.get(`${storedUrl}/users/activate/count`);
                if (response.status === 200) {
                    setUserCount(response2.data.activeUserCount);
                } else {
                    Alert.alert('Error', 'No se han podido recibir las estadísticas');
                }
                const response3 = await axios.get(`${storedUrl}/users/donation/count`);
                if (response.status === 200) {
                    setDonationCount(response3.data.donationsCount);
                } else {
                    Alert.alert('Error', 'No se han podido recibir las estadísticas');
                }
            } catch (error) {
                Alert.alert('Error', 'Algo ha salido mal');
                console.error(error);
            }
        };
        obtenerEstadisticas();
    }, []);

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.contentContainer}>
                <NavBarDisplay />
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <Text style={styles.headerText}>Estadísticas Generales</Text>
                    <View style={styles.statsContainer}>
                        <View style={styles.statsBox}>
                            <Text style={styles.statsTitle}>Usuarios</Text>
                            <Text style={styles.statsNumber}>{userCount}</Text>
                        </View>
                        <View style={styles.statsBox}>
                            <Text style={styles.statsTitle}>Donaciones</Text>
                            <Text style={styles.statsNumber}>{donationCount}</Text>
                        </View>
                        <View style={styles.statsBox}>
                            <Text style={styles.statsTitle}>Proyectos</Text>
                            <Text style={styles.statsNumber}>{projectCount}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f6fc',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    scrollView: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 70,
    },
    headerText: {
        fontSize: 28,
        fontFamily: 'SpaceGroteskBold',
        color: '#04233B',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    statsContainer: {
        marginTop: 10,
        marginBottom: 20,
    },
    statsBox: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        paddingVertical: 25,
        paddingHorizontal: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4,
        alignItems: 'center',
    },
    statsTitle: {
        fontSize: 20,
        fontFamily: 'SpaceGrotesk',
        color: '#667085',
        marginBottom: 5,
    },
    statsNumber: {
        fontSize: 32,
        fontFamily: 'SpaceGroteskBold',
        color: '#04233B',
    },
});

export default Estadisticas;
