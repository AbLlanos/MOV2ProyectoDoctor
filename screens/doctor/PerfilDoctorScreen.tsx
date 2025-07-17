import { Alert, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/ConfigSupa';

type Doctor = {
  nombreApellido: string;
  cedula: string;
  edad: string;
  telefono: string;
  correo: string;
  especialidad: string;
  imagen?: string;
};

export default function PerfilDoctorScreen({ navigation }: any) {
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    async function cargarDatosDoctor() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      console.log("Correo usuario autenticado:", user.email);

      const { data, error } = await supabase
        .from('doctor')
        .select(`
          nombreApellido,
          cedula,
          edad,
          telefono,
          correo,
          imagen,
          especialidad:especialidad_id (nombre_especialidad)
        `)
        .eq('correo', user.email)
        .maybeSingle();


      if (error) {
        console.error('Error cargando doctor:', error);
        return;
      }

      if (!data) {
        console.warn('No se encontró doctor con ese correo');
        return;
      }

      const doctorData = {
        nombreApellido: data.nombreApellido,
        cedula: data.cedula,
        edad: data.edad,
        telefono: data.telefono,
        correo: data.correo,
        especialidad: data.especialidad.nombre_especialidad,
        imagen: data.imagen,
      };
      setDoctor(doctorData);
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
        <Text></Text>
      </View>
    );
  }


  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/4421501/pexels-photo-4421501.jpeg' }}
      style={styles.background}
      resizeMode="cover"
      blurRadius={3}
    >

      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.bienvenida}>Bienvenido</Text>
        <Text style={styles.nombre}>{doctor.nombreApellido}</Text>

        <Image style={styles.img} source={{ uri: doctor.imagen }} />

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

      </ScrollView>
      
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#DFF6F4',
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginVertical: 20,
  },
  container: {
    padding: 20,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bienvenida: {
    fontSize: 22,
    color: '#4CAEA9',
    marginBottom: 6,
    fontWeight: '600',
    textAlign: 'center',
  },
  nombre: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2B7A78',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    width: '100%',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    elevation: 5,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#20504F',
    marginTop: 12,
  },
  valor: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
  botonCerrar: {
    marginTop: 25,
    backgroundColor: '#cc3300',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 70
  },
  textoCerrar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
});