import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

export default function PerfilDoctorScreen() {
  // Suponiendo que los datos ya están cargados desde el registro o sesión
  const [nombre] = useState('Dr. Juan Pérez');
  const [cedula] = useState('1723456789');
  const [edad] = useState('45');
  const [telefono] = useState('0991234567');
  const [correo] = useState('juan.perez@medicplus.com');
  const [especialidad] = useState('Medicina Interna');

  return (
    <View style={styles.container}>
      <Text style={styles.bienvenida}>Bienvenido</Text>
      <Text style={styles.nombre}>{nombre}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.valor}>{nombre}</Text>

        <Text style={styles.label}>Cédula:</Text>
        <Text style={styles.valor}>{cedula}</Text>

        <Text style={styles.label}>Edad:</Text>
        <Text style={styles.valor}>{edad} años</Text>

        <Text style={styles.label}>Teléfono:</Text>
        <Text style={styles.valor}>{telefono}</Text>

        <Text style={styles.label}>Correo electrónico:</Text>
        <Text style={styles.valor}>{correo}</Text>

        <Text style={styles.label}>Especialidad:</Text>
        <Text style={styles.valor}>{especialidad}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFF6F4',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  bienvenida: {
    fontSize: 22,
    color: '#4CAEA9',
    marginBottom: 4,
    fontWeight: '600',
  },
  nombre: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2B7A78',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: "50%",
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignContent: "center",
    justifyContent: "center",
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#20504F',
    marginTop: 10,
  },
  valor: {
    fontSize: 16,
    color: '#333',
    marginTop: 2,
  },
});
