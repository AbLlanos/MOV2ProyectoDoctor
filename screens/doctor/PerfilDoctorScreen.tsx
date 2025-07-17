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

        <View style={styles.card2}>
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
        <View style={styles.missionVisionContainer}>
                <View style={styles.card2}>
                  <Image
                    source={{
                      uri: 'https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg',
                    }}
                    style={styles.topImage}
                  />
                  <View style={styles.textContent}>
                    <Text style={styles.cardTitle}>Misión</Text>
                    <Text style={styles.cardText}>
                      Proveer una plataforma confiable para que los doctores gestionen
                      sus consultas y mejoren la atención al paciente.
                    </Text>
                  </View>
                </View>
        
                <View style={styles.card2}>
                  <Image
                    source={{
                      uri: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg',
                    }}
                    style={styles.topImage}
                  />
                  <View style={styles.textContent}>
                    <Text style={styles.cardTitle}>Visión</Text>
                    <Text style={styles.cardText}>
                      Ser la app líder en tecnología médica que conecta profesionales y
                      pacientes eficientemente.
                    </Text>
                  </View>
                </View>
              </View>
        
        
        
              <ImageBackground
                source={{ uri: 'https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg' }}
                style={styles.backgroundImage}
                resizeMode="cover"
              >
                <Text style={styles.bienvenida1}>Funcionalidades</Text>
        
        
                <View style={styles.missionVisionContainer}>
                  <View style={styles.card2}>
                    <Image
                      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTahjsyM6wgEXE7Uag0vtx6DbylrhpZP_mspA&s' }}
                      style={styles.topImage}
                    />
                    <View style={styles.textContent}>
                      <Text style={styles.cardTitle}>Editar Citas</Text>
                      <Text style={styles.cardText}>
                        El doctor puede actualizar fecha, hora o motivo de cada cita asignada.
                      </Text>
                    </View>
                  </View>
        
                  <View style={styles.card2}>
                    <Image
                      source={{ uri: 'https://imagenes.20minutos.es/files/image_1920_1080/uploads/imagenes/2021/09/17/eliminar-tus-cuentas.jpeg' }}
                      style={styles.topImage}
                    />
                    <View style={styles.textContent}>
                      <Text style={styles.cardTitle}>Eliminar Citas</Text>
                      <Text style={styles.cardText}>
                        Permite cancelar citas médicas innecesarias o duplicadas del sistema.
                      </Text>
                    </View>
                  </View>
                </View>
        
                <View style={styles.missionVisionContainer}>
                  <View style={styles.card2}>
                    <Image
                      source={{ uri: 'https://clinic-cloud.com/hs-fs/hubfs/GettyImages-1392889303-2.jpg?width=1200&height=800&name=GettyImages-1392889303-2.jpg' }}
                      style={styles.topImage}
                    />
                    <View style={styles.textContent}>
                      <Text style={styles.cardTitle}>Ver Historial de citas médicas</Text>
                      <Text style={styles.cardText}>
                        Acceso al historial de citas atendidas con datos del paciente.
                      </Text>
                    </View>
                  </View>
        
                  <View style={styles.card2}>
                    <Image
                      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd4grBkMiOmt8W4QeXXnLaSwYfLSj7y4NxkQ&s' }}
                      style={styles.topImage}
                    />
                    <View style={styles.textContent}>
                      <Text style={styles.cardTitle}>Confirmar Atenciones</Text>
                      <Text style={styles.cardText}>
                        El doctor puede marcar citas como completadas tras atender al paciente.
                      </Text>
                    </View>
                  </View>
                </View>
                </ImageBackground>
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
   missionVisionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    width: '100%',
    marginBottom: 40,
    
  },
  card2: {
    flex: 1,
    backgroundColor: '#EFF6F7',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center",
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  sideImage: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    marginRight: 12,
    marginLeft: 12,
  },
  textContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2B7A78',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: '#4CAEA9',
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: '#4CAEA9',
    paddingTop: 16,
    alignItems: 'center',
    width: '100%',
  },
  footerText: {
    fontSize: 16,
    color: '#2B7A78',
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 20,
  },
  socialIcon: {
    width: 32,
    height: 32,
  },
  topImage: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 12,
  }, backgroundImage: {
    flex: 1,
    padding: 20,
  },
  bienvenida1: {
    fontSize: 30,
    textAlign: 'center',
    color: '#4CAEA9',
    fontWeight: '600',
    marginBottom: 15
  },
});