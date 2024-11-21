import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Proyectos from './Proyectos';
import Perfil from './Perfil';
import MisProyectos from './MisProyectos';
import Foro from './Foro';
import Historial from './Historial';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, Image, StyleSheet } from 'react-native';
import { DrawerItemList } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Image source={require('../../assets/logo.png')} style={styles.logo} />
                <Text style={styles.title}>FundMePls</Text>
            </View>
            <DrawerItemList {...props} />
        </View>
    );
}

export default function UserFlow() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer independent={true} >
            <Drawer.Navigator 
                initialRouteName="Descubir Proyectos"
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    headerShown: false,
                    drawerStyle: {
                        backgroundColor: '#002A4E',
                    },
                    drawerLabelStyle: {
                        color: '#ffffff',
                        fontSize: 14,
                        fontFamily: 'SpaceGrotesk',
                    },
                    drawerItemStyle: {
                        backgroundColor: '#0B538A',
                        borderRadius: 500,
                        padding: 5,
                        marginBottom: 20,
                    },
                }}
            >
                <Drawer.Screen 
                    name="Descubrir Proyectos" 
                    component={Proyectos} 
                    options={{
                        backgroundColor: '#1C7690',
                        drawerIcon: () =>(
                            <Entypo name='open-book' size={24} color="#F75657"/>
                        )
                    }}
                />
                <Drawer.Screen 
                    name="Mis Proyectos"
                    component={MisProyectos} 
                    options={{
                        backgroundColor: '#1C7690',
                        drawerIcon: () =>(
                            <Feather name='activity' size={24} color="#F75657"/>
                        )
                    }}
                />
                <Drawer.Screen 
                    name="Historial" 
                    component={Historial} 
                    options={{
                        drawerIcon: () =>(
                            <Feather name='clock' size={24} color="#F75657"/>
                        )
                    }}
                />
                <Drawer.Screen
                    name="Perfil" 
                    component={Perfil} 
                    options={{
                        drawerIcon: () =>(
                            <Feather name='user' size={24} color="#F75657"/>
                        )
                    }}
                />
                <Drawer.Screen 
                    name="Foro General" 
                    component={Foro} 
                    options={{
                        drawerIcon: () =>(
                            <Ionicons name='earth-outline' size={24} color="#F75657"/>
                        )
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#002A4E',
        padding: 20,
        marginTop: 30,
    },
    logo: {
        width: 80, // Ajusta el tamaño del logo según tus necesidades
        height: 80,
        marginBottom: 10,
    },
    title: {
        color: '#ffffff',
        fontSize: 20,
        fontFamily: 'SpaceGrotesk',
    },
});