import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import  { Alert } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import LottieView from 'lottie-react-native';

//TODO: Implementar la respuesta de comentario del creador (Tengo que hacer un componente similar a este para mis proyectos)

const ProjectDetail = () => {
    const { proyectID } = useLocalSearchParams();
    const [comments, setComments] = useState([])
    const [nombreProyecto, setNombreProyecto] = useState('')
    const [autor, setAutor] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [daysLeft, setDaysLeft] = useState(0)
    const [metaRecaudacion, setMetaRecaudacion] = useState(0)
    const [recaudado, setRecaudado] = useState(0)
    const [images, setImages] = useState([])
    const [showConfetti, setShowConfetti] = useState(false);
    const [loaded, setLoaded] =  useState(false)
    const confettiRef = useRef(null);
    const [loadingAnimation, setLoadingAnimation] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [modalDonacionVisible, setModalDonacionVisible] = useState(false);
    const [donacion, setDonacion] = useState(0);

    const animation1 = require('../../../assets/Animation - 1730689921443.json')
    const animation2 = require('../../../assets/Animation - 1730691443181.json')
    const animation3 = require('../../../assets/Animation - 1730691572996.json')

    const getImage = (category) => {
        const images = {
            'Entretenimiento': [
                'https://media.gettyimages.com/id/638651186/es/foto/festival-selfie.jpg?s=612x612&w=0&k=20&c=GJR3_eFkeyDiiXdtSjJi5FeuNtOTeM0hffvTHes6AzA=', 
                'https://media.gettyimages.com/id/1393796813/es/foto/amigos-jugando-juegos-de-computadora.jpg?s=612x612&w=0&k=20&c=sSzARMq2kNIIOiw_ZdfWKP3wr-A78GU-xfRwH0M3ttY=', 
                'https://media.gettyimages.com/id/638651064/es/foto/ambientes-del-festival.jpg?s=612x612&w=0&k=20&c=A5rZ87-6APOzqVSuK_EmZ0vit-c9z4EWd0Yeht06m7s='],
            'Tecnología': [
                'https://media.gettyimages.com/id/1407293956/es/foto/silhouette-of-a-man-interacting-with-virtual-computer-graphics.jpg?s=612x612&w=0&k=20&c=BEKWPEkJjYNOxGv_Izdchb-KhIOZwCokS2FGpTUaNIU=',
                'https://media.gettyimages.com/id/1059088660/es/foto/garantizaremos-que-su-pregunta-obtiene-respuesta.jpg?s=612x612&w=0&k=20&c=ca9ma5FxudtqSKoe_66cYqHRcx73Vspm6bln55evB2s=',
                'https://media.gettyimages.com/id/1397047849/es/foto/placa-de-circuito-abstracto-con-muchos-micro-chips.jpg?s=612x612&w=0&k=20&c=vOXJbKCnPd6yRpTPTQNbcQFi9PcdIKnchCk7p6urcp0='
            ],
            'Salud': [
                'https://media.gettyimages.com/id/1473675453/es/foto/dieta-bien-balanceada-y-control-de-la-presi%C3%B3n-arterial-para-el-cuidado-del-coraz%C3%B3n.jpg?s=612x612&w=0&k=20&c=zotnFKWQunW928VHmoNFPqn05lALF7cu7VCo7KtbDXE=',
                'https://media.gettyimages.com/id/1988844230/es/foto/paediatric-medical-check-up.jpg?s=612x612&w=0&k=20&c=T8YNCimSQyj8VvXMIr3QcpEVQDfn2VplUUIWOUbq2Vg=',
                'https://media.gettyimages.com/id/592647720/es/foto/monitorear-atentamente-los-signos-vitales-de-su-paciente.jpg?s=612x612&w=0&k=20&c=AmPPvjNVCQ18NYbi1hsMRycbSBFx_WEl3V7VPMDejrw='
            ],
            'Educación': [
                'https://media.gettyimages.com/id/1371160686/es/foto/gente-de-negocios-viendo-una-presentaci%C3%B3n-en-la-pizarra.jpg?s=612x612&w=0&k=20&c=pRHw1mTmMlX7dT2FWsvjEnRkImWNS9NuDNs6EYX9Ihk=',
                'https://media.gettyimages.com/id/1346504071/es/foto/divertirse-en-la-escuela.jpg?s=612x612&w=0&k=20&c=rIkmsV97w_OkVTOimfqkIrldsaX8aR8mKM4JFjs-N2U=',
                'https://media.gettyimages.com/id/157719429/es/foto/grupo-de-estudiantes-de-la-escuela-media-de-trabajo-en-proyectos-juntos.jpg?s=612x612&w=0&k=20&c=isKp0bUbYKbss8Z0ihAJ3bPG4nrrhXoPkHrLjXSTHZ0='
            ],
            'Energía': [
                'https://media.gettyimages.com/id/1401906779/es/foto/blocks.jpg?s=612x612&w=0&k=20&c=nOezjSquzXJZOOnx2FiRwZSIkrbSWlnKBHL58qrefxM=',
                'https://media.gettyimages.com/id/1405880267/es/foto/dos-ingenieros-instalando-paneles-solares-en-el-techo.jpg?s=612x612&w=0&k=20&c=dGzNdSO0ye_1RhIa2iXwx4Z5CNPN7Idj4LqHMBrDJEE=',
                'https://media.gettyimages.com/id/1411130003/es/foto/two-rope-access-technicians-working-on-higher-wind-turbine-blades.jpg?s=612x612&w=0&k=20&c=4UmV5ma4PePbOh_oOxqAqDBRNLXUMFqs5pFfuSmk2cI='
            ],
            'Arte': [
                'https://media.gettyimages.com/id/1190200652/es/foto/las-manos-del-pintor.jpg?s=612x612&w=0&k=20&c=-h1bcEnJwIcqm85LwwCteq9OewXvdCnLyV5qVsgDhUM=',
                'https://media.gettyimages.com/id/10117478/es/foto/orchestra-violinist.jpg?s=612x612&w=0&k=20&c=RnuRISxG0nrnp7yDJtbQXEA0YlWeuqufloBNag0rSEs=',
                'https://media.gettyimages.com/id/1321486723/es/foto/hombre-japon%C3%A9s-pasando-la-ma%C3%B1ana-del-fin-de-semana-pintando-en-su-dormitorio-en-casa.jpg?s=612x612&w=0&k=20&c=pkUTYGE54jgILIv84NwpM6vLUHsFYORVfUJqIiYxbu0='
            ],
            'Investigación': [
                'https://media.gettyimages.com/id/1133887502/es/foto/papeleo-y-manos-en-una-mesa-de-la-sala-de-juntas-en-una-presentaci%C3%B3n-de-negocios-o-seminario.jpg?s=612x612&w=0&k=20&c=_EkrB0rQlrQJLAQQT5ZiFTsgNVLfdUpDw8ZeTbWQb5w=',
                'https://media.gettyimages.com/id/468877597/es/foto/electrotherapy.jpg?s=612x612&w=0&k=20&c=Q07_rm21qG4fjT-OSQvMx1at9XNV1BScpzjYaR1VTaI=',
                'https://media.gettyimages.com/id/872019580/es/foto/hombres-viendo-una-gran-pantalla-de-informaci%C3%B3n.jpg?s=612x612&w=0&k=20&c=8sSXhp_4KiuSOehJ_Smgb-W56gzRhAOOJdulySHgeJI='
            ],
            'Cocina': [
                'https://media.gettyimages.com/id/913931820/es/foto/chef-en-cocina-de-restaurante-de-cocina-de-alta-llamas-ardientes.jpg?s=612x612&w=0&k=20&c=jTObHXwBm9tHIYHV_7lFFH3nCYzeKrg-DYTx9FVHpqA=',
                'https://media.gettyimages.com/id/1446478827/es/foto/un-chef-est%C3%A1-cocinando-en-la-cocina-de-su-restaurante.jpg?s=612x612&w=0&k=20&c=oOl4H1nVEOSAydptJMtyNcE6eAgndvPy4f4VhcjH55Q=',
                'https://media.gettyimages.com/id/1062249974/es/foto/amigos-viviendo-y-cocinar-juntos.jpg?s=612x612&w=0&k=20&c=hZqJOQtkCnHjrWlm0eM9yHm9o9duchkIoNnC9lTTw-c='
            ],
        };

        setImages(images[category]);  // Ajusta la imagen si coincide con el área de trabajo
    };
    
    const handleCommentSubmit = async () => {
        const storedUrl = await AsyncStorage.getItem('API_URL');
        const storedUserID = await AsyncStorage.getItem('userID')
        const url = `${storedUrl}/proyectos/ratings`
        const url2 = `${storedUrl}/proyectos/ratings?projectID=${proyectID}`
        const data = {
            projectID: proyectID,
            rating: rating,
            comment: comment,
            userID: 18
        }
        try{
            if(data.rating > 1 && data.rating < 5){
                const response = await axios.post(url, data)
                const responseComments = await axios.get(url2)
                if(responseComments.status === 200){
                    setComments(responseComments.data)
                }else{
                    Alert.alert('Error', 'No se han podido recibir los comentarios')
                }
            }else{
                Alert.alert('Error', 'No se ha ingresado ninguna estrella de valoración')
            }
        }catch (error) {
            console.error('Error al hacer la solicitud POST:', );
            Alert.alert('Error', 'Ya se ha agregado una valoración en este proyecto.');
        }
        setModalVisible(false);
        setComment('');
        setRating(0);
    };

    const handleDonacionSubmit = async () => {
        const storedUrl = await AsyncStorage.getItem('API_URL');
        const storedUserID = await AsyncStorage.getItem('userID')
        const url = `${storedUrl}/users/donation`
        const data = {
            projectID: proyectID,
            donation: donacion,
            userID: storedUserID
        }
        try{
            const response = await axios.post(url, data)
            if(response.status === 200 || response.status === 201){
                Alert.alert('Donación', 'Se ha realizado la donación correctamente.');
            }
        }catch (error) {
            Alert.alert('Error', 'Ocurrió un error al realizar la donación.');
            console.log(error)
        }
        setModalDonacionVisible(false);
        setDonacion(0);
    };

    const handleRating = (value) => {
        setRating(value);
    };
    
    const calculateDaysLeft = (deadline) => {
        const currentDate = new Date();
        const deadlineDate = new Date(deadline);
        const differenceInTime = deadlineDate - currentDate;
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        return differenceInDays;
    };

    useEffect(() => {
        const handleGetProject = async () => {
            const storedUrl = await AsyncStorage.getItem('API_URL');
            const url = `${storedUrl}/proyecto/id/?projectID=${proyectID}`
            const url2 = `${storedUrl}/proyectos/ratings?projectID=${proyectID}`
            const animations = [animation1, animation2, animation3];
            const randomIndex = Math.floor(Math.random() * animations.length);
            setLoadingAnimation(animations[randomIndex]);
            try {
                const response = await axios.get(url);
                const res = response.data[0]
                if (response.status === 200) {
                    setAutor(res.FirstName + " " + res.LastName)
                    setNombreProyecto(res.ProjectName)
                    setDescripcion(res.ProjectDescription)
                    setMetaRecaudacion(res.FundingGoal.toString())
                    setRecaudado(res.CurrentCollection.toString())
                    setDaysLeft(calculateDaysLeft(res.FundingDeadline).toString())
                    getImage(res.Category)
                }else{
                    Alert.alert('Error', 'No se han podido recibir los proyectos');
                }
                const responseComments = await axios.get(url2)
                if(responseComments.status === 200){
                    setComments(responseComments.data)
                    setLoaded(true)
                    if (res.CurrentCollection >= res.FundingGoal) {
                        setShowConfetti(true);
                    }
                }else{
                    Alert.alert('Error', 'No se han podido recibir los comentarios')
                }
            } catch (error) {
                Alert.alert('Error', 'Algo ha salido mal');
                console.error(error);
            }
        };
        handleGetProject();
    }, [proyectID]);

    useEffect(() => {
        if (showConfetti) {
            // Configura el temporizador para ocultar el confetti después de 3 segundos (3000 ms)
            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, 3500);

            // Limpia el temporizador al desmontar el componente o cuando cambie showConfetti
            return () => clearTimeout(timer);
        }
    }, [showConfetti]);

    return (
        <View style={{flex: 1}}>
            {showConfetti && (
                <View style={styles.confettiContainer}>
                    <ConfettiCannon
                        count={200}
                        origin={{ x: 0, y: 0 }}
                        autoStart={true}
                        ref={confettiRef}
                        fadeOut={true}
                    />
                </View>
            )}
            {loaded ? (
                <ScrollView style={styles.container}>
                    <View style={styles.imageBanner}>
                        {images.length > 0 ? (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {images.map((image, index) => (
                                    <Image
                                        key={index}
                                        source={{ uri: image }}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />
                                ))}
                            </ScrollView>
                        ) : (
                            <Image
                                source={require('../../../assets/goofycoin.png')} // Una imagen por defecto
                                style={styles.image}
                                resizeMode="cover"
                            />
                        )}
                    </View>
                    <View style={styles.projectInfoContainer}>
                        <Text style={styles.projectTitle}>{nombreProyecto}</Text>
                        <View style={styles.projectHeaderRow}>
                            <Text style={styles.projectAuthor}>Hecho por <Text style={styles.bold}>{autor}</Text></Text>
                            <Text style={styles.projectDeadline}>Quedan {daysLeft} días</Text>
                        </View>
                        <Text style={styles.projectDescription}>{descripcion}</Text>
                        <View style={styles.statsContainer}>
                            <View style={styles.statBoxPink}>
                                <Text style={styles.statLabel}>Meta</Text>
                                <Text style={styles.statValue}>${metaRecaudacion}</Text>
                            </View>
                            <View style={styles.statBoxGray}>
                                <Text style={styles.statLabel}>Recaudado</Text>
                                <Text style={styles.statValue}>${recaudado}</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.commentSectionTitle}>Comentarios</Text>
                    <View style={styles.commentContainer}>
                        { comments.length > 0 ? comments.map((comment, index) => (
                            <View key={index} style={styles.commentBox}>
                                <View style={styles.rateContainer}>
                                    <Text style={styles.commentAuthor}>{comment.FirstName} {comment.LastName}</Text>
                                    <View style={styles.starsContainer}>
                                        {[...Array(comment.Rating)].map((_, i) => (
                                            <Ionicons key={i} name="star" size={16} color="#FFD700" />
                                        ))}
                                </View>
                                    
                                </View>
                                <Text style={styles.commentText}>{comment.Comment}</Text>
                            </View>
                        )) : <View><Text style={{marginBottom: 10, fontFamily: 'SpaceGrotesk' }}>Aún no hay comentarios</Text></View>}
                        <View style={styles.newCommentBox}>
                            <TouchableOpacity style={styles.submitButtonActivate} onPress={() => setModalVisible(true)}>
                                <Text style={styles.submitButtonText}>Comentar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Deja tu comentario</Text>
                                <View style={styles.starsContainer}>
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <TouchableOpacity key={value} onPress={() => handleRating(value)}>
                                            <Ionicons 
                                                name={value <= rating ? "star" : "star-outline"} 
                                                size={30} 
                                                color="#FFD700" 
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Escribe tu comentario..."
                                    value={comment}
                                    onChangeText={setComment}
                                />
                                <TouchableOpacity style={styles.submitButton} onPress={handleCommentSubmit}>
                                    <Text style={styles.submitButtonText}>Enviar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalDonacionVisible}
                        onRequestClose={() => setModalDonacionVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Digita el monto que deseas donar</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="500"
                                    value={donacion}
                                    onChangeText={setDonacion}
                                />
                                <TouchableOpacity style={styles.submitButton} onPress={handleDonacionSubmit}>
                                    <Text style={styles.submitButtonText}>Donar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalDonacionVisible(false)}>
                                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <TouchableOpacity style={styles.donateButton} onPress={() => setModalDonacionVisible(true)}>
                        <Text style={styles.donateButtonText} >Donar</Text>
                    </TouchableOpacity>
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottie: {
        width: 400,
        height: 400,
    },
    projectInfoContainer: {
        marginBottom: 20,
    },
    projectTitle: {
        fontSize: 24,
        fontFamily: 'SpaceGroteskBold',
        marginBottom: 10,
    },
    projectHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    projectAuthor: {
        fontSize: 16,
        color: '#333',
    },
    bold: {
        fontFamily: 'SpaceGroteskBold',
    },
    projectDeadline: {
        fontSize: 14,
        fontFamily: 'SpaceGrotesk',
        color: '#F75657',
    },
    projectDescription: {
        fontFamily: 'SpaceGrotesk',
        fontSize: 16,
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statBoxPink: {
        backgroundColor: '#F75657',
        padding: 15,
        borderRadius: 10,
        flex: 0.48,
        alignItems: 'center',
    },
    statBoxGray: {
        backgroundColor: '#1C7690',
        padding: 15,
        borderRadius: 10,
        flex: 0.48,
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 14,
        fontFamily: 'SpaceGrotesk',
        color: '#ffffff',
        marginBottom: 5,
    },
    statValue: {
        fontSize: 20,
        color: '#ffffff',
        fontFamily: 'SpaceGroteskBold',
        fontWeight: 'bold',
    },
    commentSectionTitle: {
        fontSize: 18,
        fontFamily: 'SpaceGrotesk',
        marginBottom: 10,
    },
    commentContainer: {
        marginBottom: 20,
    },
    commentBox: {
        backgroundColor: '#04233B',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    commentAuthor: {
        fontSize: 14,
        color: '#ffffff',
        fontFamily: 'SpaceGrotesk',
    },
    commentText: {
        fontSize: 14,
        fontFamily: 'SpaceGrotesk',
        color: '#ffffff',
        marginBottom: 5,
    },
    starsContainer: {
        flexDirection: 'row',
    },
    newCommentBox: {
        backgroundColor: '#04233B',
        padding: 15,
        borderRadius: 10,
    },
    newCommentPrompt: {
        fontSize: 14,
        fontFamily: 'SpaceGrotesk',
        color: '#ffffff',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    submitButtonActivate: {
        backgroundColor: '#F75657',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#ffffff',
        fontFamily: 'SpaceGrotesk',
    },
    donateButton: {
        backgroundColor: '#F75657',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 40
    },
    donateButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'SpaceGrotesk',
    },
    confettiContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center',
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
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
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
    input: {
        width: '80%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontFamily: 'SpaceGrotesk'
    },
    cancelButton: {
        backgroundColor: '#1C7690',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '80%',
    },
    rateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageBanner: {
        height: 200, // Ajusta la altura según sea necesario
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        marginTop: 30
    },
    image: {
        width: 300, // Ajusta el ancho de la imagen
        height: '100%',
        marginRight: 10, // Espacio entre las imágenes
    },
});

export default ProjectDetail;
