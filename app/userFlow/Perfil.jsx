import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Stack, useRouter } from "expo-router";
import NavBarDisplay from '../../components/navbarDisplay';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import axios from "axios";
import LottieView from 'lottie-react-native';
import { Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';

//TODO: Implementar borrado de cuenta

export default function Profile() {

    const [userData, setUserData] = useState(null);
    const [loaded, setLoaded] =  useState(false);
    const [loadingAnimation, setLoadingAnimation] = useState('');
    const [modalCorreoVisible, setCorreoModalVisible] = useState(false);
    const [modalContraseñaVisible, setContraseñaModalVisible] = useState(false);
    const [modalTelefonoVisible, setTelefonoModalVisible] = useState(false);
    const [modalAreaVisible, setModalAreaVisible] = useState(false);
    const [modalSaldoVisible, setModalSaldoVisible] = useState(false);
    const [modalBorrarCuenta, setModalBorrarCuenta] = useState(false);
    const [correo, setCorreo] = useState('')
    const [password, setPassword] = useState('')
    const [telefono, setTelefono] = useState('')
    const [area, setArea] = useState('')
    const [saldo, setSaldo] = useState('')
    
    const animation1 = require('../../assets/Animation - 1730689921443.json')
    const animation2 = require('../../assets/Animation - 1730691443181.json')
    const animation3 = require('../../assets/Animation - 1730691572996.json')

    const router = useRouter();
    const handleCorreoSubmit = async() => {
        if(correo.includes('@estudiantec.cr')){
            const email = correo;
            const id = await AsyncStorage.getItem('userID');
            const parsedUserID = parseInt(id, 10);
            const storedUrl = await AsyncStorage.getItem('API_URL');
            const url = `${storedUrl}/users/correo`;
            try {
                const response = await axios.put(url, 
                    { UserID: parsedUserID, NewEmail: email },
                );
                handleGetUserData();
                setCorreo('');
                setCorreoModalVisible(false);
            }catch (error) {
                console.error('Error al actualizar el saldo:', error);
            }
        }else{
            Alert.alert('Correo no válido', 'Por favor, ingrese un correo válido.');
        }
    };
    const handlePasswordSubmit = async () => {
        const pass = password;
        const id = await AsyncStorage.getItem('userID');
        const parsedUserID = parseInt(id, 10);
        const storedUrl = await AsyncStorage.getItem('API_URL');
        const url = `${storedUrl}/users/password`;
        try {
            const response = await axios.put(url, 
                { UserID: parsedUserID, NewPassword: pass },
            );
            handleGetUserData();
            setPassword('');
            setContraseñaModalVisible(false);
        }catch (error) {
            console.error('Error al actualizar el saldo:', error);
        }
    };
    const handleTelefonoSubmit = async () => {
        const tel = telefono;
        const id = await AsyncStorage.getItem('userID');
        const parsedUserID = parseInt(id, 10);
        const storedUrl = await AsyncStorage.getItem('API_URL');
        const url = `${storedUrl}/users/telefono`;
        try {
            const response = await axios.put(url, 
                { UserID: parsedUserID, NewPhoneNumber: tel },
            );
            handleGetUserData();
            setTelefono('');
            setTelefonoModalVisible(false);
        }catch (error) {
            console.error('Error al actualizar el saldo:', error);
        }
    };
    const handleAreaSubmit = async() => {
        const workArea = area;
        const id = await AsyncStorage.getItem('userID');
        const parsedUserID = parseInt(id, 10);
        const storedUrl = await AsyncStorage.getItem('API_URL');
        const url = `${storedUrl}/users/area`;
        try {
            const response = await axios.put(url, 
                { UserID: parsedUserID, NewArea: workArea },
            );
            handleGetUserData();
            setArea('');
            setModalAreaVisible(false);
        }catch (error) {
            console.error('Error al actualizar el saldo:', error);
        }
    };

    const handleSaldoSubmit = async () => {
        const saldoValue = saldo;
        const id = await AsyncStorage.getItem('userID');
        const parsedUserID = parseInt(id, 10);
        const storedUrl = await AsyncStorage.getItem('API_URL');
        const url = `${storedUrl}/users/money`;
        try {
            const response = await axios.put(url, 
                { userID: parsedUserID, amount: saldoValue },
            );
            handleGetUserData();
            setSaldo('');
            setModalSaldoVisible(false)
        }catch (error) {
            console.error('Error al actualizar el saldo:', error);
        }
    };

    const handleBorrarCuenta = async () => {
        const id = await AsyncStorage.getItem('userID');
        const parsedUserID = parseInt(id, 10);
        const storedUrl = await AsyncStorage.getItem('API_URL');
        const activo = userData.IsActive === true ? 0 : 1
        const url = `${storedUrl}/users/activate`;
        try {
            const response = await axios.put(url,
                { 
                    userID: parsedUserID,
                    isActive: activo
                },
            );
            Alert.alert('Cuenta borrada', 'La cuenta ha sido borrada.');
            setModalBorrarCuenta(false);
            router.push('main/MainPage')
        }catch (error) {
            console.error('Error al borrar cuenta:', error);
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
        ProfilePhoto: "https://surgassociates.com/wp-content/uploads/610-6104451_image-placeholder-png-user-profile-placeholder-image-png-1-286x300.jpg"
        }

    const handleGetUserData = async () => {
        const id = await AsyncStorage.getItem('userID');
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

    useEffect(() => {
        handleGetUserData();
    }, []);

    return (
        <View style={{flex: 1}}>
            {loaded ? (
                <ScrollView contentContainerStyle={styles.container}>
                <NavBarDisplay/>
                    <View style={styles.profileContainer}>
                        <Image
                            style={styles.profileImage}
                            source={{ uri: simData?.ProfilePhoto }}
                        />
                        <Text style={styles.profileName}>{userData?.FirstName} {userData?.LastName}</Text>
                        <View style={styles.moneyContainer}>
                            <Text style={styles.moneyText}>Saldo: {userData?.DigitalMoney}</Text>
                            <Image style={styles.moneyImage} source={require('../../assets/goofycoin.png')}/>
                        </View>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoLabel}>Correo</Text>
                        <View style={styles.infoGroup}>
                            <Text style={styles.infoText}>{userData?.Email}</Text>
                            <TouchableOpacity><Text style={styles.editLink} onPress={() => setCorreoModalVisible(true)}>Cambiar correo</Text></TouchableOpacity>
                        </View>
                        <Text style={styles.infoLabel}>Contraseña</Text>
                        <View style={styles.infoGroup}>
                            <Text style={styles.infoText}>**************</Text>
                            <TouchableOpacity><Text style={styles.editLink} onPress={() => setContraseñaModalVisible(true)}>Cambiar contraseña</Text></TouchableOpacity>
                        </View>
                        <Text style={styles.infoLabel}>Cédula</Text>
                        <Text style={styles.infoText}>{userData?.Cedula}</Text>
                        <Text style={styles.infoLabel}>Teléfono</Text>
                        <View style={styles.infoGroup}>                    
                            <Text style={styles.infoText}>{userData?.PhoneNumber}</Text>
                            <TouchableOpacity><Text style={styles.editLink} onPress={() => setTelefonoModalVisible(true)}>Cambiar teléfono</Text></TouchableOpacity>
                        </View>
                        <Text style={styles.infoLabel}>Rol</Text>
                        <Text style={styles.infoText}>{userData?.Rol}</Text>
                        <Text style={styles.infoLabel}>Área de conocimiento</Text>
                        <View style={styles.infoGroup}>
                            <Text style={styles.infoText}>{userData?.WorkArea}</Text>
                            <TouchableOpacity><Text style={styles.editLink} onPress={() => setModalAreaVisible(true)}>Cambiar área</Text></TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => setModalSaldoVisible(true)}>
                        <Text style={styles.buttonText}>Recargar GoofyCoins</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => setModalBorrarCuenta(true)}>
                        <Text style={styles.buttonText}>Borrar Cuenta</Text>
                    </TouchableOpacity>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalCorreoVisible}
                        onRequestClose={() => setCorreoModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Digita el nuevo correo</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="correo@example.com"
                                    value={correo}
                                    onChangeText={setCorreo}
                                />
                                <TouchableOpacity style={styles.submitButton} onPress={handleCorreoSubmit}>
                                    <Text style={styles.submitButtonText}>Enviar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setCorreoModalVisible(false)}>
                                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
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
                        visible={modalTelefonoVisible}
                        onRequestClose={() => setTelefonoModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Digita el nuevo teléfono</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="62668512"
                                    value={telefono}
                                    onChangeText={setTelefono}
                                />
                                <TouchableOpacity style={styles.submitButton} onPress={handleTelefonoSubmit}>
                                    <Text style={styles.submitButtonText}>Enviar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setTelefonoModalVisible(false)}>
                                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalAreaVisible}
                        onRequestClose={() => setModalAreaVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Seleccione la nueva área</Text>
                                <View style={styles.Picker}>
                                    <Picker
                                        style={styles.Item}
                                        mode={"dropdown"}
                                        selectedValue={area}
                                        onValueChange={(itemValue) => setArea(itemValue)} // Cambiado de onChangeText a onValueChange
                                    >
                                        <Picker.Item label="Área de trabajo" value=""/>
                                        <Picker.Item label="Tecnología" value="Tecnología" />
                                        <Picker.Item label="Salud" value="Salud" />
                                        <Picker.Item label="Entretenimiento" value="Entretenimiento" />
                                        <Picker.Item label="Educación" value="Educación" />
                                        <Picker.Item label="Energía" value="Energía" />
                                        <Picker.Item label="Arte" value="Arte" />
                                        <Picker.Item label="Investigación" value="Investigación" />
                                        <Picker.Item label="Cocina" value="Cocina" />
                                    </Picker>
                                </View>
                                <TouchableOpacity style={styles.submitButton} onPress={handleAreaSubmit}>
                                    <Text style={styles.submitButtonText}>Enviar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalAreaVisible(false)}>
                                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalSaldoVisible}
                        onRequestClose={() => setModalSaldoVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Digita el saldo que desea recargar</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="500"
                                    value={saldo}
                                    onChangeText={setSaldo}
                                />
                                <TouchableOpacity style={styles.submitButton} onPress={handleSaldoSubmit}>
                                    <Text style={styles.submitButtonText}>Enviar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalSaldoVisible(false)}>
                                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalBorrarCuenta}
                        onRequestClose={() => setModalBorrarCuenta(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>¿Está seguro de que desea borrar la cuenta?</Text>
                                <TouchableOpacity style={styles.submitButton} onPress={handleBorrarCuenta}>
                                    <Text style={styles.submitButtonText}>Borrar cuenta</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalBorrarCuenta(false)}>
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
        marginBottom: 10,
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
        textAlign: 'center',
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
