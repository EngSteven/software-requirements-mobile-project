// userFlow/proyectos/Proyectos.jsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { router, Stack } from "expo-router";
import NavBarDisplay from '../../components/navbarDisplay';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';

function ProjectCard({ project }) {

    const router = useRouter();
    const [image, setImage] = useState('https://media.gettyimages.com/id/1226328537/es/vector/soporte-de-posici%C3%B3n-de-imagen-con-un-icono-de-c%C3%A1mara-gris.jpg?s=612x612&w=0&k=20&c=8igCt_oe2wE-aP0qExUDfwicSNUCb4Ho9DiKCq0rSaA=')
    const handleProyect = (proyectID) => {
        router.push(`/adminFlow/Proyecto/${proyectID}`);
    };
    const handleHistory = (proyectID) => {
        router.push(`/adminFlow/DonacionesProyecto/${proyectID}`);
    };

    useEffect(() => {
        getImage()
    }, [])

    const getImage = () => {
        // Configura la imagen según el área de trabajo
        const images = {
            'Entretenimiento': 'https://media.gettyimages.com/id/638651186/es/foto/festival-selfie.jpg?s=612x612&w=0&k=20&c=GJR3_eFkeyDiiXdtSjJi5FeuNtOTeM0hffvTHes6AzA=',
            'Tecnología': 'https://media.gettyimages.com/id/1407293956/es/foto/silhouette-of-a-man-interacting-with-virtual-computer-graphics.jpg?s=612x612&w=0&k=20&c=BEKWPEkJjYNOxGv_Izdchb-KhIOZwCokS2FGpTUaNIU=',
            'Salud': 'https://media.gettyimages.com/id/1473675453/es/foto/dieta-bien-balanceada-y-control-de-la-presi%C3%B3n-arterial-para-el-cuidado-del-coraz%C3%B3n.jpg?s=612x612&w=0&k=20&c=zotnFKWQunW928VHmoNFPqn05lALF7cu7VCo7KtbDXE=',
            'Educación': 'https://media.gettyimages.com/id/1371160686/es/foto/gente-de-negocios-viendo-una-presentaci%C3%B3n-en-la-pizarra.jpg?s=612x612&w=0&k=20&c=pRHw1mTmMlX7dT2FWsvjEnRkImWNS9NuDNs6EYX9Ihk=',
            'Energía': 'https://media.gettyimages.com/id/1401906779/es/foto/blocks.jpg?s=612x612&w=0&k=20&c=nOezjSquzXJZOOnx2FiRwZSIkrbSWlnKBHL58qrefxM=',
            'Arte': 'https://media.gettyimages.com/id/1190200652/es/foto/las-manos-del-pintor.jpg?s=612x612&w=0&k=20&c=-h1bcEnJwIcqm85LwwCteq9OewXvdCnLyV5qVsgDhUM=',
            'Investigación': 'https://media.gettyimages.com/id/1133887502/es/foto/papeleo-y-manos-en-una-mesa-de-la-sala-de-juntas-en-una-presentaci%C3%B3n-de-negocios-o-seminario.jpg?s=612x612&w=0&k=20&c=_EkrB0rQlrQJLAQQT5ZiFTsgNVLfdUpDw8ZeTbWQb5w=',
            'Cocina': 'https://media.gettyimages.com/id/913931820/es/foto/chef-en-cocina-de-restaurante-de-cocina-de-alta-llamas-ardientes.jpg?s=612x612&w=0&k=20&c=jTObHXwBm9tHIYHV_7lFFH3nCYzeKrg-DYTx9FVHpqA=',
        };

        setImage(images[project.Category]); 
    };

    return(
        <View style={styles.cardContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.avatar}>
                    <Image 
                        style={styles.avatarImage}
                        source={{ uri: 'https://surgassociates.com/wp-content/uploads/610-6104451_image-placeholder-png-user-profile-placeholder-image-png-1-286x300.jpg' }}
                    />
                </View>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>{project.FirstName}</Text>
                    <Text style={styles.headerSubtitle}>{project.WorkArea.toUpperCase()}</Text>
                </View>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: image }}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.projectTitle}>{project.ProjectName}</Text>
                <Text style={styles.projectSubtitle}>{project.Category}</Text>
                <Text style={styles.projectDescription}>{project.ProjectDescription}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleHistory(project.ProjectID)}>
                    <Text style={styles.buttonText}>Donaciones</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleProyect(project.ProjectID)}>
                    <Text style={styles.buttonText}>Conocer</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default function Proyectos() {
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loaded, setLoaded] =  useState(false);
    const [loadingAnimation, setLoadingAnimation] = useState('');

    const animation1 = require('../../assets/Animation - 1730689921443.json')
    const animation2 = require('../../assets/Animation - 1730691443181.json')
    const animation3 = require('../../assets/Animation - 1730691572996.json')
    

    const handleGetProjects = async (filter) => {
        const storedUrl = await AsyncStorage.getItem('API_URL');
        const url = `${storedUrl}/proyectos?query=${filter}`
        try {
            if(filter === ""){
                const response = await axios.get(`${storedUrl}/proyectos`);
                if (response.status === 200) {
                    setProjects(response.data);
                    setLoaded(true)
                } else {
                    Alert.alert('Error', 'No se han podido recibir los proyectos');
                }
            }else{
                const response = await axios.get(url);
                if (response.status === 200) {
                    setProjects(response.data);
                    setLoaded(true)
                } else {
                    Alert.alert('Error', 'No se han podido recibir los proyectos');
                }
            }
        } catch (error) {
            Alert.alert('Error', 'Algo ha salido mal');
            console.error(error);
        }
    };

    useEffect(() => {
        handleGetProjects("");
        const animations = [animation1, animation2, animation3];
        const randomIndex = Math.floor(Math.random() * animations.length);
        setLoadingAnimation(animations[randomIndex]);
    }, []);

    const handleFilter = async (filter) => {
        const storedUrl = await AsyncStorage.getItem('API_URL');
        const url = `${storedUrl}/proyectos/categoria?query=${filter}`
        try {
            if(filter === ""){
                const response = await axios.get(`${storedUrl}/proyectos`);
                if (response.status === 200) {
                    setProjects(response.data);
                    setLoaded(true)
                } else {
                    Alert.alert('Error', 'No se han podido recibir los proyectos');
                }
            }else{
                const response = await axios.get(url);
                if (response.status === 200) {
                    setProjects(response.data);
                    setLoaded(true)
                } else {
                    Alert.alert('Error', 'No se han podido recibir los proyectos');
                }
            }
        } catch (error) {
            Alert.alert('Error', 'Algo ha salido mal');
            console.error(error);
        }
    };

    const handleFilterFundingGoal = async (filter) => {
        const storedUrl = await AsyncStorage.getItem('API_URL');
        const url = `${storedUrl}/proyectos/objetivo?query=${filter}`
        try {
            if(filter === ""){
                const response = await axios.get(`${storedUrl}/proyectos`);
                if (response.status === 200) {
                    setProjects(response.data);
                    setLoaded(true)
                } else {
                    Alert.alert('Error', 'No se han podido recibir los proyectos');
                }
            }else{
                const response = await axios.get(url);
                if (response.status === 200) {
                    setProjects(response.data);
                    setLoaded(true)
                } else {
                    Alert.alert('Error', 'No se han podido recibir los proyectos');
                }
            }
        } catch (error) {
            Alert.alert('Error', 'Algo ha salido mal');
            console.error(error);
        }
    };

    const handleFilterCollection = async (filter) => {
        const storedUrl = await AsyncStorage.getItem('API_URL');
        const url = `${storedUrl}/proyectos/recaudado?query=${filter}`
        try {
            if(filter === ""){
                const response = await axios.get(`${storedUrl}/proyectos`);
                if (response.status === 200) {
                    setProjects(response.data);
                    setLoaded(true)
                } else {
                    Alert.alert('Error', 'No se han podido recibir los proyectos');
                }
            }else{
                const response = await axios.get(url);
                if (response.status === 200) {
                    setProjects(response.data);
                    setLoaded(true)
                } else {
                    Alert.alert('Error', 'No se han podido recibir los proyectos');
                }
            }
        } catch (error) {
            Alert.alert('Error', 'Algo ha salido mal');
            console.error(error);
        }
    };

    const handleFilterLimitDate = async (filter) => {
        const storedUrl = await AsyncStorage.getItem('API_URL');
        const url = `${storedUrl}/proyectos/fechaLimite?query=${filter}`
        try {
            if(filter === ""){
                const response = await axios.get(`${storedUrl}/proyectos`);
                if (response.status === 200) {
                    setProjects(response.data);
                    setLoaded(true)
                } else {
                    Alert.alert('Error', 'No se han podido recibir los proyectos');
                }
            }else{
                const response = await axios.get(url);
                if (response.status === 200) {
                    setProjects(response.data);
                } else {
                    Alert.alert('Error', 'No se han podido recibir los proyectos');
                }
            }
        } catch (error) {
            Alert.alert('Error', 'Algo ha salido mal');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            {loaded ? (
                <View style={styles.contentContainer}>
                    <NavBarDisplay/>
                    <ScrollView style={{marginTop: 80, marginHorizontal: 30}} showsVerticalScrollIndicator={false}>
                        <ScrollView horizontal={true} style={styles.UpperfilterContainer}>
                            <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter("Tecnología")}>
                                <Text style={styles.filterButtonText}>Tecnología</Text>
                            </TouchableOpacity>                    
                            <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter("Salud")}>
                                <Text style={styles.filterButtonText}>Salud</Text>
                            </TouchableOpacity>                    
                            <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter("Entretenimiento")}>
                                <Text style={styles.filterButtonText}>Entretenimiento</Text>
                            </TouchableOpacity>                    
                            <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter("Educación")}>
                                <Text style={styles.filterButtonText}>Educación</Text>
                            </TouchableOpacity>                    
                            <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter("Energía")}>
                                <Text style={styles.filterButtonText}>Energía</Text>
                            </TouchableOpacity>                    
                            <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter("Arte")}>
                                <Text style={styles.filterButtonText}>Arte</Text>
                            </TouchableOpacity>                    
                            <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter("Investigación")}>
                                <Text style={styles.filterButtonText}>Investigación</Text>
                            </TouchableOpacity>                    
                            <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter("Cocina")}>
                                <Text style={styles.filterButtonText}>Cocina</Text>
                            </TouchableOpacity>                    
                        </ScrollView>
                        <View style={styles.filterContainer}>                    
                            <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter("")}>
                                <Text style={styles.filterButtonText}> General</Text>
                            </TouchableOpacity>                    
                            <TouchableOpacity style={styles.filterButton} onPress={() => handleFilterCollection()}>
                                <Text style={styles.filterButtonText}>Recaudado</Text> handleFilterFundingGoal
                            </TouchableOpacity>                    
                            <TouchableOpacity style={styles.filterButton} onPress={() => handleFilterFundingGoal()}>
                                <Text style={styles.filterButtonText}>Meta</Text>
                            </TouchableOpacity>                    
                            <TouchableOpacity style={styles.filterButton} onPress={() => handleFilterLimitDate()}>
                                <Text style={styles.filterButtonText}>Fecha límite</Text>
                            </TouchableOpacity>                    
                        </View>
                        <View style={styles.SearchBar}>
                            <Ionicons name="search" size={20} color="black" style={{marginRight: 10, marginLeft: 2}} onPress={() => handleGetProjects(searchQuery)}/>
                            <TextInput
                                style={{fontFamily: 'SpaceGrotesk', paddingHorizontal: 5, flex: 1}}
                                placeholder="Buscar proyectos"
                                placeholderTextColor={'black'}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                onSubmitEditing={() => handleGetProjects(searchQuery)}
                            />
                        </View>
                        {projects ? projects.map((project) => (
                            <ProjectCard key={project.ProjectID} project={project} />
                        )) : <Text style={styles.text}>Cargando proyectos...</Text>}
                    </ScrollView>
                </View>
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
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'SpaceGrotesk',
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
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        backgroundColor: '#6A1B9A',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    avatarText: {
        color: '#ffffff',
        fontSize: 18,
        fontFamily: 'SpaceGrotesk',
    },
    headerTextContainer: {
        marginLeft: 10,
    },
    headerTitle: {
        fontSize: 16,
        fontFamily: 'SpaceGrotesk',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#666',
    },
    imageContainer: {
        backgroundColor: '#F8BBD0', // Placeholder color
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    contentContainer: {
        marginBottom: 10,
    },
    projectTitle: {
        fontSize: 18,
        fontFamily: 'SpaceGrotesk',
        marginBottom: 5,
    },
    projectSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
        fontFamily: 'SpaceGrotesk',
    },
    projectDescription: {
        fontSize: 14,
        color: '#333',
        fontFamily: 'SpaceGrotesk',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#04233B',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 14,
        fontFamily: 'SpaceGrotesk',
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    UpperfilterContainer: {
        marginBottom: 10,
        marginTop: 10,
        marginHorizontal: 5,
    },
    filterButton: {
        backgroundColor: '#1C7690',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 2,
        borderRadius: 50,
    },
    filterButtonText: {
        color: '#ffffff',
        fontSize: 14,
        fontFamily: 'SpaceGrotesk',
    },
    filterButtonActive: {
        backgroundColor: '#EF5356',
    },
    SearchBar: {
        backgroundColor: '#F3EDF7',
        borderRadius: 50,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
    }
});

