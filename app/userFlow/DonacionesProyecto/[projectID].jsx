import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Stack } from "expo-router";
import NavBarBack from '../../../components/navbarBack';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import  { Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';


export default function ProjectHistorial() {
    const [donations, setDonations] = useState([]);
    const { projectID } = useLocalSearchParams();

    useEffect(() => {
        const handleGetUserData = async () => {
            const storedUrl = await AsyncStorage.getItem('API_URL');
            try{
                const response = await axios.get(`${storedUrl}/users/donation/all?ProjectID=${projectID}`);
                setDonations(response.data);
            }catch(error) {
                Alert.alert('Error', 'Algo ha salido mal');
                console.error(error);
            }
        }
        handleGetUserData();
    }, []);

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.contentContainer}>
                <NavBarBack />
                {/* <Text style={styles.title}>Historial</Text>
                <Text style={styles.text}>Bienvenido a la pantalla de Historial.</Text> */}
                <ScrollView style={styles.historialContainer}>
                    { donations.length > 0 ? (donations.map((donation) => (
                            <View style={styles.historialItem} key={donation.DonationID}>
                                <Image
                                    style={styles.historialImage}
                                    source={ {uri:'https://surgassociates.com/wp-content/uploads/610-6104451_image-placeholder-png-user-profile-placeholder-image-png-1-286x300.jpg'}}
                                />
                                <View style={styles.historialTextContainer}>
                                    <Text style={styles.providerText}>¡{donation.DonorFirstName} {donation.DonorLastName} te ha donado!</Text>
                                    <Text style={styles.amountText}>{donation.Amount} goofycoins al proyecto: {donation.ProjectName}</Text>
                                </View>
                            </View>
                    ))): (
                        <View style={styles.noDonationsContainer}>
                            <Text style={styles.noDonationsText}>No hay donaciones :(</Text>
                        </View>
                    )}
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