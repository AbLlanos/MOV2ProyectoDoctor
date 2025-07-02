import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import DoctorScreen from '../screens/doctor/DoctorScreen';
import LeerTodasCitasScreen from '../screens/doctor/LeerTodasCitasScreen';
import EliminarPacienteScreen from '../screens/doctor/EliminarPacienteScreen';
import RegistroDoctorScreen from '../screens/RegistroDoctorScreen';
import PerfilDoctorScreen from '../screens/doctor/PerfilDoctorScreen';

const Bottom = createMaterialTopTabNavigator();



export default function VentanaDoctorNavigator() {
    return (
        <Bottom.Navigator initialRouteName='Perfil'>
            <Bottom.Screen name="Perfil" component={PerfilDoctorScreen} />
            <Bottom.Screen name="Citas" component={LeerTodasCitasScreen} />
            <Bottom.Screen name="EliminarPaciente" component={EliminarPacienteScreen} />
        </Bottom.Navigator>
    )
}

const styles = StyleSheet.create({})