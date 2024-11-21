import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import NavBarBack from '../../../components/navbarBack';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export default function CreateForum() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [subject, setSubject] = useState('');
    const router = useRouter();

    const handlePost = async() => {
        const storedUrl = await AsyncStorage.getItem('API_URL');
        const id = await AsyncStorage.getItem('userID');
        console.log(title, description, subject);
        if (!title || !description || !subject) {
            Alert.alert('Error', 'Debes llenar ambos campos');
            return;
        }
        try{
            const response = await axios.post(`${storedUrl}/forums`, {
                title,
                subject,
                description,
                ownerID: id
            });
            Alert.alert('Publicación exitosa', 'Tu foro ha sido publicado');
            setTitle('');
            setDescription('');
            setSubject('');
            router.back();
        }catch(error){
            Alert.alert('Error', 'Algo ha salido mal');
            console.log(error);
        }
        // Aquí puedes añadir la lógica para enviar el foro a la base de datos.
    };

    const handleBack = () => {
        router.back();
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => handleBack('Cancelado')}>
                    <Text style={styles.headerText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePost}>
                    <Text style={styles.headerText}>Publicar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.titleInput}
                    placeholder="Título del foro"
                    value={title}
                    onChangeText={setTitle}
                />
                <View style={styles.Picker}>
                    <Picker
                        style={styles.Item}
                        mode={"dropdown"}
                        selectedValue={subject}
                        onValueChange={(itemValue) => setSubject(itemValue)} // Cambiado de onChangeText a onValueChange
                    >
                        <Picker.Item label="Temática" value=""/>
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
                <TextInput
                    style={styles.descriptionInput}
                    placeholder="Escribe tu publicación aquí..."
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        marginTop: 20,
    },
    headerText: {
        fontSize: 18,
        color: '#1C7690',
        fontFamily: 'SpaceGroteskBold'
    },
    inputContainer: {
        marginTop: 20,
    },
    titleInput: {
        height: 50,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        fontSize: 16,
        marginBottom: 10,
        fontFamily: 'SpaceGrotesk',
    },
    descriptionInput: {
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingTop: 10,
        fontSize: 16,
        height: 200,
        textAlignVertical: 'top',
        fontFamily: 'SpaceGrotesk',
    },
    Picker:{
        width: '100%',
        height: 45,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderColor: '#e0e0e0',
        borderTopWidth: 1,  
        borderRightWidth: 1,  
        borderBottomWidth: 1, 
        borderLeftWidth: 1,  
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20, 
        borderBottomLeftRadius: 20,  
        borderBottomRightRadius: 20,
        marginBottom: 10,
        justifyContent: 'center',
        fontFamily: 'SpaceGrotesk',
    },
    Item:{
        height: "100%",
        width:  "100%", 
    },
});
