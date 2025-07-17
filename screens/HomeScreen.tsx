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
    gap: 15,
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
    width: 150,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 12,
  }, backgroundImage: {
    flex: 1,
    padding: 20,
  },
});