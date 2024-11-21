import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { StyleSheet, TouchableOpacity } from'react-native';
import Entypo from'react-native-vector-icons/Entypo';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function NavBarDisplay() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {navigation.openDrawer()}}>
                    <Entypo name='menu' size={24} color="black"/>
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