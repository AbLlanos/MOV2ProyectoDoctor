import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import DoctorScreen from '../screens/doctor/DoctorScreen';
import LeerTodasCitasScreen from '../screens/doctor/LeerTodasCitasScreen';
import EliminarPacienteScreen from '../screens/doctor/EliminarPacienteScreen';
import RegistroDoctorScreen from '../screens/RegistroDoctorScreen';
import PerfilDoctorScreen from '../screens/doctor/PerfilDoctorScreen';
import EditarCitaPacienteScreen from '../screens/doctor/EditarCitaPacienteScreen';
import GuardarCitaMedica from '../screens/doctor/GuardarCitaMedica';

const Bottom = createMaterialTopTabNavigator();



export default function VentanaDoctorNavigator() {
    return (
        <Bottom.Navigator initialRouteName='Perfil'>
            <Bottom.Screen name="Perfil" component={PerfilDoctorScreen} />
            <Bottom.Screen name="Lista de Citas" component={LeerTodasCitasScreen} />
            <Bottom.Screen name="Editar Cita" component={EditarCitaPacienteScreen} />
            <Bottom.Screen name="Eliminar Cita" component={EliminarPacienteScreen} />
            <Bottom.Screen name="Guardar" component={GuardarCitaMedica} />
        </Bottom.Navigator>
    )
}

const styles = StyleSheet.create({})