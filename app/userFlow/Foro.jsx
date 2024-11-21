import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import NavBarDisplay from '../../components/navbarDisplay';
import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { Alert } from 'react-native';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export default function Forum() {
    const [forums, setForums] = useState([]);
    const router = useRouter();

    function formatRelativeTime(dateString) {
        const date = new Date(dateString);
        return formatDistanceToNow(date, { addSuffix: true, locale: es });
    }

    const handleInsertForum = () => {
        router.push('/userFlow/CrearForo/crear');
    }

    const handleGetPost = (foroID) => {
        router.push(`/userFlow/VerForo/${foroID}`);
    }
    

    useFocusEffect(
        useCallback(() => {
            const handleGetForums = async () => {
                const storedUrl = await AsyncStorage.getItem('API_URL');
                try{
                    const response = await axios.get(`${storedUrl}/forums`);
                    setForums(response.data);
                }catch(error) {
                    Alert.alert('Error', 'Algo ha salido mal');
                }
            }

            handleGetForums();
        }, [])
    )

    return (
        <ScrollView style={styles.container}>
            <NavBarDisplay/>
            <TouchableOpacity style={styles.header} onPress={handleInsertForum}>
                <Ionicons name="create-outline" size={24} color="#0B538A" />
                <Text style={styles.startDiscussionInput}>Iniciar una discusión</Text>
            </TouchableOpacity>
            <View style={styles.filterContainer}>
                <Text style={styles.filterText}>Foros</Text>
            </View>
            {forums.map((post) => (
                <TouchableOpacity key={post.ForumID} style={styles.postContainer} onPress={() => handleGetPost(post.ForumID)}>
                    <View style={styles.tagContainer}>
                        <Text style={styles.tagText}>{post.Subject}</Text>
                    </View>
                    <Text style={styles.postTitle}>{post.Title}</Text>
                    <View style={styles.userInfoContainer}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: 'https://surgassociates.com/wp-content/uploads/610-6104451_image-placeholder-png-user-profile-placeholder-image-png-1-286x300.jpg' }}
                        />
                        <View>
                            <Text style={styles.userName}>{post.FirstName} {post.LastName}</Text>
                            <Text style={styles.timeText}>{formatRelativeTime(post.Date)}</Text>
                        </View>
                    </View>
                    <Text style={styles.description}>{post.Description}</Text>
                    <View style={styles.actionContainer}>
                        <TouchableOpacity style={styles.commentButton}>
                            <Ionicons name="chatbubble-outline" size={18} color="#666" />
                            <Text style={styles.commentText}>{post.CommentCount}</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 15,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f4f6fc',
        borderRadius: 10,
        padding: 10,
        marginTop: 80,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    startDiscussionInput: {
        fontSize: 16,
        marginLeft: 10,
        color: '#333',
        flex: 1,
        fontFamily: 'SpaceGrotesk',
    },
    filterContainer: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingBottom: 5,
    },
    postContainer: {
        backgroundColor: '#f4f6fc',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    tagContainer: {
        backgroundColor: '#0B538A',
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 15,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    postTitle: {
        fontSize: 20,
        fontFamily: 'SpaceGroteskBold',
        color: '#04233B',
        marginBottom: 8,
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userName: {
        fontSize: 14,
        color: '#04233B',
        fontFamily: 'SpaceGroteskBold',
    },
    timeText: {
        fontSize: 12,
        color: '#999',
        fontFamily: 'SpaceGrotesk',
    },
    description: {
        fontSize: 14,
        color: '#333',
        marginBottom: 10,
        fontFamily: 'SpaceGrotesk',
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: '#ddd',
        paddingTop: 8,
    },
    commentButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentText: {
        marginLeft: 5,
        color: '#666',
        fontSize: 14,
        fontFamily: 'SpaceGrotesk',
    },
    filterText: {
        fontSize: 14,
        fontFamily: 'SpaceGrotesk',
    },
    tagContainer: {
        backgroundColor: '#1C7690',
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 15,
        alignSelf: 'flex-start',
        marginBottom: 8,
        alignContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
    },
    tagText: {
        color: '#ffffff',
        fontSize: 12,
        fontFamily: 'SpaceGrotesk',
        padding: 2,
    },
});
