import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/ConfigSupa';

type Doctor = {
  nombreApellido: string;
  cedula: string;
  edad: string;
  telefono: string;
  correo: string;
  especialidad: string;
};

export default function PerfilDoctorScreen({ navigation }: any) {
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    async function cargarDatosDoctor() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('doctor')
        .select('*')
        .eq('correo', user.email)
        .single();

      if (!error && data) {
        setDoctor(data);
      }
    }

    cargarDatosDoctor();
  }, []);


  async function cerrarSesion() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Error', 'No se pudo cerrar sesión.');
    } else {
      Alert.alert('Listo', 'Ha cerrado sesión correctamente.');
      navigation.navigate('Inicio');
    }
  }




  //Muy importante

  if (!doctor) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>Cargando datos del doctor o no encontrado...</Text>
      </View>
    );
  }




  return (

    <ScrollView>

      <View style={styles.container}>

        <Text style={styles.bienvenida}>Bienvenido</Text>
        <Text style={styles.nombre}>{doctor.nombreApellido}</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.valor}>{doctor.nombreApellido}</Text>

          <Text style={styles.label}>Cédula:</Text>
          <Text style={styles.valor}>{doctor.cedula}</Text>

          <Text style={styles.label}>Edad:</Text>
          <Text style={styles.valor}>{doctor.edad} años</Text>

          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.valor}>{doctor.telefono}</Text>

          <Text style={styles.label}>Correo electrónico:</Text>
          <Text style={styles.valor}>{doctor.correo}</Text>

          <Text style={styles.label}>Especialidad:</Text>
          <Text style={styles.valor}>{doctor.especialidad}</Text>
        </View>

        <TouchableOpacity style={styles.botonCerrar} onPress={cerrarSesion}>
          <Text style={styles.textoCerrar}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFF6F4',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    padding: 10,
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
    height: "70%",
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
  botonCerrar: {
    marginTop: 20,
    backgroundColor: '#cc3300',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  textoCerrar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
