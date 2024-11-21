import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { router, Stack } from "expo-router";
import NavBarDisplay from '../../components/navbarDisplay';
import axios, { Axios } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';

//TODO: Implementar borrado de proyectos

function ProjectCard({ project }) {
    const router = useRouter();
    const [image, setImage] = useState('https://media.gettyimages.com/id/1226328537/es/vector/soporte-de-posici%C3%B3n-de-imagen-con-un-icono-de-c%C3%A1mara-gris.jpg?s=612x612&w=0&k=20&c=8igCt_oe2wE-aP0qExUDfwicSNUCb4Ho9DiKCq0rSaA=')
    const handleEdit = (editProyectId) => {
        router.push(`/userFlow/EditarProyecto/${editProyectId}`);
    };
    const handleDonations = (proyectID) => {
        router.push(`/userFlow/DonacionesProyecto/${proyectID}`);
    };
    const handleDelete = async () => {
        const projectID = project.ProjectID;
        const storedUrl = await AsyncStorage.getItem('API_URL');
        try{
            const response = axios.delete(`${storedUrl}/proyecto/?id=${projectID}`)
            if((await response).status === 200){
                Alert.alert('Proyecto eliminado correctamente!');
            }
            if((await response).status === 201){
                Alert.alert('Exito','Proyecto eliminado correctamente!');
            }
        }catch(err){
            console.log(err);
        }
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
                        source={{ uri: 'https://scontent.fsjo10-1.fna.fbcdn.net/v/t39.30808-1/447462029_7509873185757609_8697984359719734285_n.jpg?stp=dst-jpg_s200x200&_nc_cat=111&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=nfAnNnqcq2kQ7kNvgHJRClu&_nc_zt=24&_nc_ht=scontent.fsjo10-1.fna&_nc_gid=AW1gDXCqQuhoYZWQBUFzfYU&oh=00_AYDGDgTp6qbD8zQBJDTBwOFOEXkZfa0rVn0YZE9-nmMQuQ&oe=672B9487' }}
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
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={() => handleDonations(project.ProjectID)}>Donaciones</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={() => handleDelete(project.ProjectID)}>Borrar proyecto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={() => handleEdit(project.ProjectID)}>Editar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default function MisProyectos() {
    const router = useRouter();
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [userID, setUserID] = useState(0);
    const [loaded, setLoaded] =  useState(false);
    const [loadingAnimation, setLoadingAnimation] = useState('');

    const animation1 = require('../../assets/Animation - 1730689921443.json')
    const animation2 = require('../../assets/Animation - 1730691443181.json')
    const animation3 = require('../../assets/Animation - 1730691572996.json')


    const handleGetProjects = async (filter) => {
        const storedUrl = await AsyncStorage.getItem('API_URL');
        const id = await AsyncStorage.getItem('userID');
        const parsedUserID = parseInt(id, 10); 
        setUserID(parsedUserID);
        const animations = [animation1, animation2, animation3];
        const randomIndex = Math.floor(Math.random() * animations.length);
        setLoadingAnimation(animations[randomIndex]);
        const url = `${storedUrl}/proyectos/id?userID=${parsedUserID}&query=${filter}`
        
        try {
            if(filter === ""){
                const response = await axios.get(`${storedUrl}/proyectos/usuario?userID=${parsedUserID}`);
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
    }, []);

    const handleFilter = async (filter) => {
        const storedUrl = await AsyncStorage.getItem('API_URL');
        const url = `${storedUrl}/proyectos/usuario/categoria?userID=${userID}&query=${filter}`

        try {
            if(filter === ""){
                const response = await axios.get(`${storedUrl}/proyectos/usuario/categoria?userID=${userID}`);
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
        const url = `${storedUrl}/proyectos/usuario/objetivo?userID=${userID}&query=${filter}`
        try {
            if(filter === ""){
                const response = await axios.get(`${storedUrl}/proyectos/usuario/objetivo?userID=${userID}`);
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
        const url = `${storedUrl}/proyectos/usuario/recaudado?userID=${userID}&query=${filter}`
        try {
            if(filter === ""){
                const response = await axios.get(`${storedUrl}/proyectos/usuario/recaudado?userID=${userID}`);
                if (response.status === 200) {
                    setProjects(response.data);
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

    const handleFilterLimitDate = async (filter) => {
        const storedUrl = await AsyncStorage.getItem('API_URL');
        const url = `${storedUrl}/proyectos/usuario/fechaLimite?userID=${userID}&query=${filter}`
        try {
            if(filter === ""){
                const response = await axios.get(`${storedUrl}/proyectos/usuario/fechaLimite?userID=${userID}`);
                if (response.status === 200) {
                    setProjects(response.data);
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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container} >
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
                                <TouchableOpacity style={styles.filterButton} onPress={() => handleGetProjects("")}>
                                    <Text style={styles.filterButtonText}> General</Text>
                                </TouchableOpacity>                    
                                <TouchableOpacity style={styles.filterButton} onPress={() => handleFilterCollection()}>
                                    <Text style={styles.filterButtonText}>Recaudado</Text>
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
            {loaded ? (
                <TouchableOpacity style={styles.floatingButton} onPress={() => router.push('../userFlow/InsertarProyecto/Insertar')}>
                    <Ionicons name="add" size={50} color="#ffffff" />
                </TouchableOpacity>
            ):(
                <View></View>
            )}
        </GestureHandlerRootView>
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
        backgroundColor: '#F75657',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 50,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 14,
        fontFamily: 'SpaceGrotesk',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#F75657',
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    },
    lottie: {
        width: 400,
        height: 400,
        marginTop: 200,
    },
});

