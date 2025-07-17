import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import DoctorScreen from '../screens/doctor/DoctorScreen';
import LeerTodasCitasScreen from '../screens/doctor/LeerTodasCitasScreen';
import EliminarPacienteScreen from '../screens/doctor/EliminarPacienteScreen';
import RegistroDoctorScreen from '../screens/RegistroDoctorScreen';
import PerfilDoctorScreen from '../screens/doctor/PerfilDoctorScreen';
import EditarCitaPacienteScreen from '../screens/doctor/EditarCitaPacienteScreen';
import Funcionalidades from '../screens/doctor/Funcionalidades';

const Bottom = createMaterialTopTabNavigator();



export default function VentanaDoctorNavigator() {
    return (
        <Bottom.Navigator
            initialRouteName='Funcion'
            screenOptions={{
                animationEnabled: true, 
                tabBarStyle: {
                    backgroundColor: '#F5F7FA',
                    elevation: 4,
                    shadowColor: '#274472',
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#274472',
                    textTransform: 'none',
                },
                tabBarIndicatorStyle: {
                    backgroundColor: '#41729F',
                    height: 3,
                    borderRadius: 2,
                },
                tabBarActiveTintColor: '#41729F',
                tabBarInactiveTintColor: '#274472',
                tabBarPressColor: '#E9ECEF',
            }}
        >
            <Bottom.Screen name="Funcion" component={Funcionalidades} />
            <Bottom.Screen name="Perfil" component={PerfilDoctorScreen} />
            <Bottom.Screen name="Lista de Citas" component={LeerTodasCitasScreen} />
            <Bottom.Screen name="Editar Cita" component={EditarCitaPacienteScreen} />
            <Bottom.Screen name="Eliminar Cita" component={EliminarPacienteScreen} />
        </Bottom.Navigator>
    )
}

const styles = StyleSheet.create({})