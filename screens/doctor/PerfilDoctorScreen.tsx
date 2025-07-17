import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/ConfigSupa';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/ConfigFire';

type Doctor = {
  id: string; // ID real del doctor en la tabla doctor
  nombreApellido: string;
  cedula: string;
  edad: string;
  telefono: string;
  correo: string;
  especialidad: string;
  imagen: string;
};

export default function PerfilDoctorScreen({ navigation }: any) {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [promedioCalificacion, setPromedioCalificacion] = useState<number | null>(null);

  useEffect(() => {
    async function cargarDatosDoctor() {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error("No se pudo obtener el usuario:", userError?.message);
        return;
      }

      // Traemos el doctor completo, incluyendo su ID real en la tabla doctor
      const { data, error } = await supabase
        .from('doctor')
        .select(`
          id,
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
        console.error('Error cargando doctor:', error.message);
        return;
      }

      if (!data) {
        console.warn('No se encontró doctor con ese correo');
        return;
      }

      setDoctor({
        id: data.id,
        nombreApellido: data.nombreApellido,
        cedula: data.cedula,
        edad: data.edad,
        telefono: data.telefono,
        correo: data.correo,
        especialidad: data.especialidad?.nombre_especialidad || '',
        imagen: data.imagen,
      });

      // Ahora que tenemos el id real, cargamos el promedio
      await cargarPromedioCalificacion(data.id);
    }

    async function cargarPromedioCalificacion(doctorId: string) {
      const { data, error } = await supabase
        .from('citaMedica')
        .select('calificacionDoctor')
        .eq('doctor_id', doctorId)
        .not('calificacionDoctor', 'is', null);

      if (error) {
        console.error('Error al obtener calificaciones:', error.message);
        setPromedioCalificacion(null);
        return;
      }

      if (!data || data.length === 0) {
        console.log('No hay calificaciones registradas');
        setPromedioCalificacion(null);
        return;
      }

      // Filtrar y convertir a números válidos
      const calificacionesNumericas = data
        .map(item => {
          const raw = item.calificacionDoctor;
          const num = typeof raw === 'string' ? parseFloat(raw.trim()) : Number(raw);
          return !isNaN(num) ? num : null;
        })
        .filter((n): n is number => n !== null);

      if (calificacionesNumericas.length === 0) {
        console.log('No hay calificaciones numéricas válidas');
        setPromedioCalificacion(null);
        return;
      }

      const suma = calificacionesNumericas.reduce((acc, val) => acc + val, 0);
      const promedio = suma / calificacionesNumericas.length;
      setPromedioCalificacion(promedio);
    }


    cargarDatosDoctor();
  }, []);

  async function cerrarSesion() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        Alert.alert('Error', 'No se pudo cerrar sesión en Supabase.');
        return;
      }

      await signOut(auth);

      // Limpiar datos del doctor y calificación
      setDoctor(null);
      setPromedioCalificacion(null);

      Alert.alert('Listo', 'Ha cerrado sesión correctamente.');
      navigation.navigate('Inicio');
    } catch (error: any) {
      Alert.alert('Error', `No se pudo cerrar sesión: ${error.message}`);
    }
  }

  if (!doctor) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/736x/6c/5a/e8/6c5ae8c7e3637d509724267a0bc90541.jpg' }}
      style={styles.background}
      blurRadius={0}
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

          <Text style={[styles.label, { marginTop: 20 }]}>Promedio de Valoraciones de Pacientes:</Text>
          <Text style={styles.valor}>
            {promedioCalificacion !== null ? promedioCalificacion.toFixed(2) : 'Sin valoraciones'}
          </Text>
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
    resizeMode: "cover",
  },
  img: {
    width: 150,
    height: 150,
    marginVertical: 20,
    resizeMode: "cover",
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
    backgroundColor: '#af1400ff',
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
