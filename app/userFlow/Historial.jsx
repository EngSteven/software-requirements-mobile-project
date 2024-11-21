import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Stack } from "expo-router";
import NavBarDisplay from '../../components/navbarDisplay';
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import  { Alert } from 'react-native';
import  LottieView from 'lottie-react-native';
import { useFocusEffect } from '@react-navigation/native';
export default function Historial() {
    const [donations, setDonations] = useState([]);
    const [userID, setUserID] = useState(0);
    const [loaded, setLoaded] =  useState(false);
    const [loadingAnimation, setLoadingAnimation] = useState('');

    const animation1 = require('../../assets/Animation - 1730689921443.json')
    const animation2 = require('../../assets/Animation - 1730691443181.json')
    const animation3 = require('../../assets/Animation - 1730691572996.json')

    useFocusEffect(
        useCallback(() => {
            const handleGetUserData = async () => {
                const animations = [animation1, animation2, animation3];
                const randomIndex = Math.floor(Math.random() * animations.length);
                setLoadingAnimation(animations[randomIndex]);
                const id = await AsyncStorage.getItem('userID');
                if (id) {
                    setUserID(parseInt(id, 10));
                }
                const parsedUserID = parseInt(id, 10);
                const storedUrl = await AsyncStorage.getItem('API_URL');
                try{
                    const response = await axios.get(`${storedUrl}/users/donation?userID=${parsedUserID}`);
                    setDonations(response.data);
                    setLoaded(true)
                }catch(error) {
                    Alert.alert('Error', 'Algo ha salido mal');
                    console.error(error);
                }
            }
            handleGetUserData();

            return () => {
                setLoaded(false); // Resetea el estado de carga si vuelves a salir
            };
        }, [])
    );

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.contentContainer}>
                <NavBarDisplay/>
                {/* <Text style={styles.title}>Historial</Text>
                <Text style={styles.text}>Bienvenido a la pantalla de Historial.</Text> */}
                {loaded ? (
                    <ScrollView style={styles.historialContainer}>
                        { donations.length > 0 ? (donations.map((donation) => (
                                <View style={styles.historialItem} key={donation.DonationID}>
                                    <Image
                                        style={styles.historialImage}
                                        source={ {uri:'https://surgassociates.com/wp-content/uploads/610-6104451_image-placeholder-png-user-profile-placeholder-image-png-1-286x300.jpg'}}

                                    />
                                    <View style={styles.historialTextContainer}>
                                        { donation.OwnerID !== userID ? (
                                            <Text style={styles.providerText}>¡Has donado a {donation.OwnerFirstName} {donation.OwnerLastName}!</Text>
                                        ):(
                                            <Text style={styles.providerText}>¡{donation.DonorFirstName} {donation.DonorLastName} te ha donado!</Text>
                                        )}
                                        <Text style={styles.amountText}>{donation.Amount} goofycoins al proyecto: {donation.ProjectName}</Text>
                                    </View>
                                </View>
                        ))): (
                            <View style={styles.noDonationsContainer}>
                                <Text style={styles.noDonationsText}>No hay donaciones :(</Text>
                            </View>
                        )}
                    </ScrollView>
                ):(
                    <View style={styles.loadingContainer}>
                        <LottieView 
                            source={loadingAnimation} 
                            autoPlay 
                            loop 
                            style={styles.lottie}
                        />
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    lottie: {
        width: 400,
        height: 400,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontFamily: 'SpaceGrotesk',
        marginBottom: 20,
        color: '#04233B',
    },
    text: {
        fontSize: 16,
        fontFamily: 'SpaceGrotesk',
        color: 'black',
    },
    historialContainer: {
        flex: 1,
        width: '100%',
        padding: 16,
        marginTop: 70,
    },
    historialImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginBottom: 10,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
    },
    historialItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 15,
    },
    historialTextContainer: {
        flex: 1,
    },
    providerText: {
        fontSize: 16,
        fontFamily: 'SpaceGroteskBold',
        marginBottom: 10,
    },
    amountText: {
        fontSize: 14,
        fontFamily: 'SpaceGrotesk',
        paddingRight: 10,
    },
    noDonationsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDonationsText: {
        fontSize: 18,
        fontFamily: 'SpaceGrotesk',
    }
});