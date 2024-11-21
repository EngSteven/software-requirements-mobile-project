import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { router, Stack } from "expo-router";
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import axios from "axios";
import LottieView from 'lottie-react-native';
import { Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams } from 'expo-router';
import NavBarBack from '../../../components/navbarBack';
import { useFocusEffect } from '@react-navigation/native';

export default function Profile() {

    const [userData, setUserData] = useState(null);
    const { UserID } = useLocalSearchParams();
    const [loaded, setLoaded] =  useState(false);
    const [loadingAnimation, setLoadingAnimation] = useState('');
    const [modalContraseñaVisible, setContraseñaModalVisible] = useState(false);
    const [modalRolVisible, setModalRolVisible] = useState(false);
    const [modalDesactivarVisible, setModalDesactivarVisible] = useState(false);
    const [password, setPassword] = useState('')
    const [rol, setRol] = useState('')
    
    const animation1 = require('../../../assets/Animation - 1730689921443.json')
    const animation2 = require('../../../assets/Animation - 1730691443181.json')
    const animation3 = require('../../../assets/Animation - 1730691572996.json')

    const handlePasswordSubmit = async () => {
        const pass = password;
        const id = UserID;
        const parsedUserID = parseInt(id, 10);
        const storedUrl = await AsyncStorage.getItem('API_URL');
        const url = `${storedUrl}/users/password`;
        try {
            const response = await axios.put(url, 
                { UserID: parsedUserID, NewPassword: pass },
            );
            setPassword('');
            setContraseñaModalVisible(false);
        }catch (error) {
            console.error('Error al actualizar el saldo:', error);
        }
    };

    const handleRolSubmit = async() => {
        const id = UserID;
        const parsedUserID = parseInt(id, 10);
        const newRol = rol;
        const storedUrl = await AsyncStorage.getItem('API_URL');
        const url = `${storedUrl}/users/rol`;
        try {
            const response = await axios.put(url, 
                { UserID: parsedUserID, NewRol: newRol },
            );
            setRol('');
            handleGetUserData();
            setModalRolVisible(false);

        }catch (error) {
            console.error('Error al actualizar el Rol:', error);
        }
    };

    const handleDesactivarSubmit = async() => {
        const id = UserID;
        const parsedUserID = parseInt(id, 10);
        console.log(parsedUserID);
        const storedUrl = await AsyncStorage.getItem('API_URL');
        const url = `${storedUrl}/users/activate`;
        const activo = userData.IsActive === true ? 0 : 1
        try {
            const response = await axios.put(url,
                { 
                    userID: parsedUserID,
                    isActive: activo
                },
            );
            Alert.alert('Cuenta borrada', 'La cuenta ha sido borrada.');
            setModalDesactivarVisible(false);
            router.back();
        }catch (error) {
            console.error('Error al actualizar el saldo:', error);
        }
    };
    
    // Simulación de datos de usuario
    const simData = {
        UserID: 9,
        FirstName: "Brayton",
        LastName: "Solano",
        Cedula: "118640057",
        Email: "bsolano@estudiantec.cr",
        WorkArea: "computación",
        DigitalMoney: 500,
        PhoneNumber: "62668621",
        IsActive: true,
        CreatedAt: "2024-09-17T22:35:59.417Z",
        Rol: 'Usuario',
        ProfilePhoto: 'https://scontent.fsjo10-1.fna.fbcdn.net/v/t39.30808-1/447462029_7509873185757609_8697984359719734285_n.jpg?stp=dst-jpg_s200x200&_nc_cat=111&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=nfAnNnqcq2kQ7kNvgHJRClu&_nc_zt=24&_nc_ht=scontent.fsjo10-1.fna&_nc_gid=AW1gDXCqQuhoYZWQBUFzfYU&oh=00_AYDGDgTp6qbD8zQBJDTBwOFOEXkZfa0rVn0YZE9-nmMQuQ&oe=672B9487'
    }

    const handleGetUserData = async () => {
        const id = UserID;
        const parsedUserID = parseInt(id, 10);
        const storedUrl = await AsyncStorage.getItem('API_URL');
        const animations = [animation1, animation2, animation3];
        const randomIndex = Math.floor(Math.random() * animations.length);
        setLoadingAnimation(animations[randomIndex]);
        try {
            const response = await axios.get(`${storedUrl}/users/id`, {
                params: { userID: parsedUserID }
            });
    
            if (response.status === 200) {
                setUserData(response.data[0]);
            } else {
                Alert.alert('Error', 'No se han podido recibir los proyectos');
            }
            setLoaded(true)
        } catch (error) {
            Alert.alert('Error', 'Algo ha salido mal');
            console.error(error);
        } 
    };

    useFocusEffect(   
        useCallback(() => {
            handleGetUserData();
            return () => {
                setLoaded(false); // Resetea el estado de carga si vuelves a salir
            };
        }, [])
    );

    return (
        <View style={{flex: 1}}>
            {loaded ? (
                <ScrollView contentContainerStyle={styles.container}>
                <NavBarBack/>
                    <View style={styles.profileContainer}>
                        <Image
                            style={styles.profileImage}
                            source={{ uri: 'https://surgassociates.com/wp-content/uploads/610-6104451_image-placeholder-png-user-profile-placeholder-image-png-1-286x300.jpg' }}
                        />
                        <Text style={styles.profileName}>{userData?.FirstName} {userData?.LastName}</Text>
                        <View style={styles.moneyContainer}>
                            <Text style={styles.moneyText}>Saldo: {userData?.DigitalMoney}</Text>
                            <Image style={styles.moneyImage} source={require('../../../assets/goofycoin.png')}/>
                        </View>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoLabel}>Correo</Text>
                        <View style={styles.infoGroup}>
                            <Text style={styles.infoText}>{userData?.Email}</Text>
                        </View>
                        <Text style={styles.infoLabel}>Contraseña</Text>
                        <View style={styles.infoGroup}>
                            <Text style={styles.infoText}>**************</Text>
                            <TouchableOpacity><Text style={styles.editLink} onPress={() => setContraseñaModalVisible(true)}>Cambiar contraseña</Text></TouchableOpacity>
                        </View>
                        <Text style={styles.infoLabel}>Cédula</Text>
                        <Text style={styles.infoText}>{userData?.Cedula}</Text>
                        <Text style={styles.infoLabel}>Teléfono</Text>
                        <Text style={styles.infoText}>{userData?.PhoneNumber}</Text>
                        <Text style={styles.infoLabel}>Rol</Text>
                        <View style={styles.infoGroup}>
                            <Text style={styles.infoText}>{userData?.Rol}</Text>
                            <TouchableOpacity><Text style={styles.editLink} onPress={() => setModalRolVisible(true)}>Cambiar Rol</Text></TouchableOpacity>
                        </View>
                        <Text style={styles.infoLabel}>Área de conocimiento</Text>
                        <Text style={styles.infoText}>{userData?.WorkArea}</Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => setModalDesactivarVisible(true)}>
                        <Text style={styles.buttonText}>Desactivar cuenta</Text>
                    </TouchableOpacity>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalContraseñaVisible}
                        onRequestClose={() => setContraseñaModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Digita la nueva contraseña</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="**************"
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity style={styles.submitButton} onPress={handlePasswordSubmit}>
                                    <Text style={styles.submitButtonText}>Enviar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setContraseñaModalVisible(false)}>
                                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalRolVisible}
                        onRequestClose={() => setModalRolVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Seleccione el nuevo rol</Text>
                                <View style={styles.Picker}>
                                    <Picker
                                        style={styles.Item}
                                        mode={"dropdown"}
                                        selectedValue={rol}
                                        onValueChange={(itemValue) => setRol(itemValue)} // Cambiado de onChangeText a onValueChange
                                    >
                                        <Picker.Item label="Rol" value=""/>
                                        <Picker.Item label="Usuario" value="Usuario"/>
                                        <Picker.Item label="Administrador" value="Administrador"/>
                                        <Picker.Item label="Analista" value="Analista"/>
                                        <Picker.Item label="Encargado" value="Encargado"/>
                                        <Picker.Item label="Supervisor" value="Supervisor"/>
                                    </Picker>
                                </View>
                                <TouchableOpacity style={styles.submitButton} onPress={handleRolSubmit}>
                                    <Text style={styles.submitButtonText}>Enviar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalRolVisible(false)}>
                                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalDesactivarVisible}
                        onRequestClose={() => setModalDesactivarVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>¿Está seguro que quiere desactivar este usuario?</Text>
                                <TouchableOpacity style={styles.submitButton} onPress={handleDesactivarSubmit}>
                                    <Text style={styles.submitButtonText}>Estoy seguro</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalDesactivarVisible(false)}>
                                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            ):(
                <View style={styles.loadingContainer}>
                    <LottieView
                        source={loadingAnimation}
                        autoPlay
                        loop
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    lottie: {
        width: 400,
        height: 400,
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
    menuButton: {
        marginRight: 10,
    },
    menuIcon: {
        fontSize: 24,
        fontFamily: 'SpaceGrotesk'
    },
    title: {
        fontSize: 20,
        fontFamily: 'SpaceGrotesk',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 70,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 22,
        fontFamily: 'SpaceGrotesk'
    },
    infoContainer: {
        marginBottom: 20,
    },
    infoLabel: {
        fontSize: 18,
        fontFamily: 'SpaceGrotesk',
        marginTop: 10,
    },
    infoText: {
        fontSize: 14,
        fontFamily: 'SpaceGrotesk',
        marginBottom: 5,
    },
    infoGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editLink: {
        color: '#1E90FF',
        fontSize: 14,
        fontFamily: 'SpaceGrotesk',
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#F75657',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    moneyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        backgroundColor: '#04233B',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 50,
    },
    moneyText: {
        color: '#ffffff',
        fontSize: 18,
        fontFamily: 'SpaceGrotesk',
        marginLeft: 10,
    },
    moneyImage: {
        marginLeft: 10,
        width: 50,
        height: 50,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingVertical: 20,
        width: '90%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontFamily: 'SpaceGroteskBold',
        marginBottom: 15,
    },
    cancelButtonText: {
        color: '#ffffff',
        fontFamily: 'SpaceGrotesk'
    },
    submitButton: {
        backgroundColor: '#F75657',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
        width: '80%',
    },
    cancelButton: {
        backgroundColor: '#1C7690',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '80%',
    },
    submitButtonText: {
        color: '#ffffff',
        fontFamily: 'SpaceGrotesk',
    },
    input: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '80%',
        fontFamily: 'SpaceGrotesk',
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 1,
    },
});
