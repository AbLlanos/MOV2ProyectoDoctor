import { StyleSheet } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegistroDoctorScreen from '../screens/RegistroDoctorScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginDoctorScreen from '../screens/LoginDoctorScreen';
import DoctorScreen from '../screens/doctor/DoctorScreen';

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="Inicio" screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Inicio" component={HomeScreen} />
      <Stack.Screen name="Perfil de doctor" component={DoctorScreen} />
      <Stack.Screen name="Login doctor" component={LoginDoctorScreen} />
      <Stack.Screen name="Registro doctor" component={RegistroDoctorScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});

