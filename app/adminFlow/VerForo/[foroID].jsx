import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavBarBack from '../../../components/navbarBack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { Alert } from 'react-native';
import axios from 'axios';
import { formatDistanceToNow, set } from 'date-fns';
import { es } from 'date-fns/locale';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function ForumPostView() {
    const [forum, setForum] = useState({});
    const [likes, setLikes] = useState(5);
    const [subject, setSubject] = useState('');
    const [date, setDate] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [CommentCount, setCommentCount] = useState(0);
    const [replies, setReplies] = useState(2);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComent] = useState('');
    const { foroID } = useLocalSearchParams();

    const handleReply = async () => {
        if(!newComment) {
            Alert.alert('Error', 'No puedes dejar el comentario vacío');
            return;
        }
        const storedUrl = await AsyncStorage.getItem('API_URL');
        const storedID = await AsyncStorage.getItem('userID');
        try{
            const response = await axios.post(`${storedUrl}/forums/comments`,{
                    forumID: foroID,
                    userID: storedID,
                    text: newComment,
                    isAnswer: 0
                });
            setNewComent('');
            handleGetForum();
            getComments(foroID) 
        }catch(error) {
            Alert.alert('Error', 'Algo ha salido mal');
        }
    };

    function formatRelativeTime(dateString) {
        const date = new Date(dateString);
        return formatDistanceToNow(date, { addSuffix: true, locale: es });
    }

    const getComments = async (foroID) => {
        const storedUrl = await AsyncStorage.getItem('API_URL');
        try{
            const response = await axios.get(`${storedUrl}/forums/comments?forumID=${foroID}`);
            setComments(response.data);
        }catch(error) {
            Alert.alert('Error', 'Algo ha salido mal');
            console.log(error);
        }
    }

    const handleGetForum = async () => {
        const foro = foroID
        const storedUrl = await AsyncStorage.getItem('API_URL');
        try{
            const response = await axios.get(`${storedUrl}/forums/id?forumID=${foro}`);
            console.log(response.data[0]);
            setTitle(response.data[0].Title);
            setDescription(response.data[0].Description);
            setFirstName(response.data[0].FirstName);
            setLastName(response.data[0].LastName);
            setSubject(response.data[0].Subject);
            setDate(formatRelativeTime(response.data[0].Date));
            setCommentCount(response.data[0].CommentCount);
            getComments(foroID);
        }catch(error) {
            Alert.alert('Error', 'Algo ha salido mal');
            console.log(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            handleGetForum();
        }, [foroID])
    )

    return (
        <View style={styles.container}>
            <NavBarBack/>
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.tagContainer}>
                        <Text style={styles.tag}>{subject}</Text>
                    </View>
                    <Text style={styles.title}>{title}</Text>
                </View>

                <View style={styles.userInfoContainer}>
                    <Image source={{ uri: 'https://surgassociates.com/wp-content/uploads/610-6104451_image-placeholder-png-user-profile-placeholder-image-png-1-286x300.jpg' }} style={styles.userImage} />
                    <View>
                        <Text style={styles.userName}>{FirstName} {LastName}</Text>
                        <Text style={styles.postInfo}>{date}</Text>
                    </View>
                </View>

                <Text style={styles.content}>
                    {description}
                </Text>

                <View style={styles.interactionContainer}>
                    <Text style={styles.interactionText}>{CommentCount} respuestas</Text>
                    <View style={styles.actionIcons}>
                        <TouchableOpacity onPress={() => {}}>
                            <Ionicons name="chatbubble-outline" size={20} color="#757575" />
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.commentsTitle}>Comments</Text>
                {comments.map((comment) => (
                    <View key={comment.CommentIDs} style={styles.comment}>
                        <Text style={styles.commentUser}>{comment.FirstName} {comment.LastName}</Text>
                        <Text style={styles.commentText}>{comment.Text}</Text>
                    </View>
                ))}

                <View style={styles.addCommentContainer}>
                    <TextInput
                        style={styles.commentInput}
                        placeholder="Reply to join the discussion..."
                        value={newComment}
                        onChangeText={setNewComent}
                    />
                    <TouchableOpacity onPress={handleReply}>
                        <Ionicons name="send" size={24} color="#1E90FF" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollContainer: {
        padding: 15,
    },
    header: {
        marginBottom: 15,
        marginTop: 70,
    },
    tagContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    tag: {
        backgroundColor: '#F75657',
        color: '#fff',
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 5,
        marginRight: 5,
        fontSize: 12,
        fontFamily: 'SpaceGrotesk',
    },
    title: {
        fontSize: 18,
        fontFamily: 'SpaceGroteskBold',
        color: '#333',
        marginBottom: 10,
    },
    iconsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userName: {
        fontSize: 16,
        fontFamily: 'SpaceGroteskBold',
        color: '#333',
    },
    postInfo: {
        fontSize: 12,
        color: '#757575',
        fontFamily: 'SpaceGrotesk',
    },
    content: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
        marginBottom: 15,
        fontFamily: 'SpaceGrotesk',
    },
    interactionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    interactionText: {
        fontSize: 14,
        color: '#757575',
        fontFamily: 'SpaceGrotesk',
    },
    actionIcons: {
        flexDirection: 'row',
    },
    commentsTitle: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
        fontFamily: 'SpaceGroteskBold',
    },
    comment: {
        backgroundColor: '#1C7690',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,

    },
    commentUser: {
        fontSize: 14,
        marginBottom: 2,
        fontFamily: 'SpaceGroteskBold',
        color: '#ffffff',
    },
    commentText: {
        fontSize: 14,
        color: '#ffffff',
        fontFamily: 'SpaceGrotesk',
    },
    addCommentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
    },
    commentInput: {
        flex: 1,
        fontSize: 14,
        paddingHorizontal: 10,
        fontFamily: 'SpaceGrotesk',
    },
});
