import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import RegistroDoctorScreen from '../screens/RegistroDoctorScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginDoctorScreen from '../screens/LoginDoctorScreen';
import DoctorScreen from '../screens/doctor/DoctorScreen';



const Drawer = createDrawerNavigator();


export default function MainNavigator() {
    return (
        <Drawer.Navigator initialRouteName="home">
            <Drawer.Screen name="loginDoctor" component={LoginDoctorScreen} />
            <Drawer.Screen name="registroDoctor" component={RegistroDoctorScreen} />

            <Drawer.Screen name="home" component={HomeScreen} />

            <Drawer.Screen name="doctor" component={DoctorScreen} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({})