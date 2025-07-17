import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.bienvenida}>¡Bienvenido!</Text>
      <Text style={styles.title}>MedicPlus</Text>
      <Text style={styles.subtitle}>Portal para Doctores</Text>

      <Image
        source={{
          uri: 'https://images.pexels.com/photos/4386489/pexels-photo-4386489.jpeg',
        }}
        style={styles.bannerImage}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login doctor')}
        >
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/295/295128.png' }}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Registro doctor')}
        >
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/16206/16206813.png' }}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.missionVisionContainer}>
        <View style={styles.card}>
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

        <View style={styles.card}>
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
          <View style={styles.card}>
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

          <View style={styles.card}>
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
          <View style={styles.card}>
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

          <View style={styles.card}>
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


      <View style={styles.footer}>
        <Text style={styles.footerText}>Síguenos en redes sociales</Text>
        <View style={styles.socialIcons}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png' }}
            style={styles.socialIcon}
          />
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/733/733547.png' }}
            style={styles.socialIcon}
          />
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2504/2504941.png' }}
            style={styles.socialIcon}
          />
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png' }}
            style={styles.socialIcon}
          />
        </View>
      </View>


    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DFF6F4',
    padding: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  bienvenida: {
    fontSize: 25,
    textAlign: 'center',
    color: '#4CAEA9',
    fontWeight: '600',
  },
  bienvenida1: {
    fontSize: 30,
    textAlign: 'center',
    color: '#4CAEA9',
    fontWeight: '600',
    marginBottom: 15
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#2B7A78',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#4CAEA9',
    textAlign: 'center',
    marginBottom: 24,
  },
  bannerImage: {
    width: 250,
    height: 250,
    borderRadius: 150,
    marginBottom: 30,
  },
  buttonContainer: {
    gap: 20,
    width: '100%',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#3AAFA9',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  buttonImage: {
    width: 32,
    height: 32,
    marginRight: 14,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },

  missionVisionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
    width: '100%',
    marginBottom: 40,

  },
  card: {
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
    width: 120,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 4,
  },
  backgroundImage: {
    flex: 1,
    padding: 5,
    borderRadius:10,
  },
});