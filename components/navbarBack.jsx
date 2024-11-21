import * as React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet, TouchableOpacity } from'react-native';
import Ionicons from'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function NavBarBack() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {router.back()}}>
                    <Ionicons name='arrow-back' size={24} color="black"/>
            </TouchableOpacity>
            <Text style={styles.text}>FundMePls</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 30,
        left: 0,
        width: '100%',
        backgroundColor: '#ffffff',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'start',
    },
    text: {
        marginLeft: 15,
        fontSize: 18,
        fontFamily: 'SpaceGrotesk',
    },
});