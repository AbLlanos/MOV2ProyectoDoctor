import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import RegistroDoctorScreen from '../screens/RegistroDoctorScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginDoctorScreen from '../screens/LoginDoctorScreen';
import DoctorScreen from '../screens/doctor/DoctorScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';



const Drawer = createDrawerNavigator();


export default function MainNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Inicio">
      <Drawer.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Perfil de doctor"
        component={DoctorScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Login doctor"
        component={LoginDoctorScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="login" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Registro doctor"
        component={RegistroDoctorScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-add-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Cerrar sesión"
        component={RegistroDoctorScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="logout" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({});